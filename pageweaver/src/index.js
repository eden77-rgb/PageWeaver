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

async function getContent(env, sujet, apiKey) {
	const cacheKey = `sujet:${sujet}`;

	const cached = await env.PAGEWEAVER_KV.get(cacheKey);
	if (cached) {
		return cached;
	}

	const content = await getData(apiKey, sujet);
	await env.PAGEWEAVER_KV.put(cacheKey, content);

	return content;
}

export default {
	async fetch(request, env, ctx) {

		const groqApiKey = env.GROQ_API_KEY

		const url = new URL(request.url);
		const sujet = url.searchParams.get("sujet");
		const color = url.searchParams.get("color");
		const template = url.searchParams.get("template");
		const name = url.searchParams.get("name");

		let html = `
			<!DOCTYPE html>
			<html lang='fr'>

			<head>
				<meta charset='UTF-8'>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'>
				<title>PageWeaver</title>
				<link rel="stylesheet" href="style.css">
			</head>

			<style>
				strong {
					color: ${color};
				}
			</style>

			<body class="${template}">
		`

		if (name) {
			html += `
				<p class="prenom">${name}</div>
			`
		}

		const content = await getContent(env, sujet, groqApiKey)
		html += `
				<div>${content}</div>
			</body>

			</html>
		`

		if (url.pathname == "/content") {
			return new Response(html, {
				headers: { 'Content-Type': 'text/html; charset=UTF-8' }
			})
		}

		return new Response("Not Found", { status: 404 });
	}
};
