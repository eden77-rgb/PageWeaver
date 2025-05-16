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

async function getContent(sujet, html, apiKey) {
	if (sujet != null && sujet.trim() != '') {
		const data = await getData(apiKey, sujet);
		html += data
	}

	return html;
}

export default {
	async fetch(request, env) {
		
		const groqApiKey = env.GROQ_API_KEY

		const url = new URL(request.url);
		const name = url.searchParams.get("name");
		const color = url.searchParams.get("color");
		const template = url.searchParams.get("template");
		const sujet = url.searchParams.get("sujet");

		if (url.pathname == "/style.css") {
			return new Response(getCSS(), {
				headers: { 'Content-Type': 'text/css' },
			})
		}

		let html = `
		<!DOCTYPE html>
        <html lang='fr'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>PageWeaver</title>
			<link rel="stylesheet" href="style.css">
        </head>
        <body class="${template}">
		`;

		html = getNameHtml(name, html);
		html = getColorHtml(color, html);
		html = await getContent(sujet, html, groqApiKey);

		html += `
		</body> 
		</html>
		`

		return new Response(html, {
			headers: { 'Content-Type': 'text/html; charset=UTF-8' },
		});
	},
};
