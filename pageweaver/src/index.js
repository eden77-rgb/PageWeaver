import { getCSS } from "./style/style.js";
import { getData } from "./service/GroqService.js";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

function getNameHtml(name, html) {
	if (name != null && name.trim() != '') {
		html += ` <p>Nom : <strong>${name}</strong></p>`;
	}

	return html;
}

function getColorHtml(color, html) {
	if (color != null && color.trim() != '') {
		html += `<p>Couleur : <span style="color:${color}">${color}</span></p>`;
	}

	return html;
}

async function getCachedContent(env, sujet, apiKey) {
	const cacheKey = `sujet:${sujet}`;

	let cached = await env.PAGEWEAVER_KV.get(cacheKey);
	if (cached) {
		return cached;
	}

	const content = await getData(apiKey, sujet);
	await env.PAGEWEAVER_KV.put(cacheKey, content);

	return content;
}

export default {
	async fetch(request, env) {
		
		const url = new URL(request.url);
		const color = url.searchParams.get("color");

		if (url.pathname == "/style.css") {
			return new Response(getCSS(color), {
				headers: { 'Content-Type': 'text/css' },
			})
		}

		const groqApiKey = env.GROQ_API_KEY

		const name = url.searchParams.get("name");
		const template = url.searchParams.get("template");
		const sujet = url.searchParams.get("sujet");

		let html = `
		<!DOCTYPE html>
        <html lang='fr'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>PageWeaver</title>
			<link rel="stylesheet" href="style.css?color=${encodeURIComponent(color)}">
        </head>
        <body class="${template}">
		`;

		html = getNameHtml(name, html);
		html = getColorHtml(color, html);

		if (sujet != null && sujet.trim() != '') {
			const content = await getCachedContent(env, sujet, groqApiKey);
			html += `<div>${content}</div>`;
		}

		html += `
		</body> 
		</html>
		`

		return new Response(html, {
			headers: { 'Content-Type': 'text/html; charset=UTF-8' },
		});
	},
};
