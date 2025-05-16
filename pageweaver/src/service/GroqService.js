import Groq from "groq-sdk"

export async function getData(apiKey, sujet) {
    const groq = new Groq({ apiKey: apiKey });

    const rep = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Rédige moi le contenu d'un site web autour du sujet (sous forme de balise sans ***): ${sujet}`
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const data = rep.choices[0].message.content

    return data;
}
