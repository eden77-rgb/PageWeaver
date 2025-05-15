/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
function addResponse(param, rep) {
	if (param != null && param.trim() != '') {
		rep += ` ${param}`;
	}

	return rep;
}

export default {
	async fetch(request, env, ctx) {

		const url = new URL(request.url);
		const name = url.searchParams.get("name");
		const color = url.searchParams.get("color");

		let rep = "Hello";

		rep = addResponse(name, rep);
		rep = addResponse(color, rep);

		return new Response(rep);
	},
};
