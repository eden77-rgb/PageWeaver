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
		html += ` <p>Couleur : <span style="color:${color}">${color}</span></p>`;
	}

	return html;
}

export default {
	async fetch(request, env, ctx) {

		const url = new URL(request.url);
		const name = url.searchParams.get("name");
		const color = url.searchParams.get("color");

		let html = `
		<!DOCTYPE html>
        <html lang='fr'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>PageWeaver</title>
        </head>
        <body>
		`;

		html = getNameHtml(name, html);
		html = getColorHtml(color, html);

		html += `
		</body>
		</html>
		`

		return new Response(html, {
			headers: { 'Content-Type': 'text/html; charset=UTF-8' },
		});
	},
};
