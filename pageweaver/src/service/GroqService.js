import Groq from "groq-sdk"

export async function getData(apiKey, sujet, color) {
    const groq = new Groq({ apiKey: apiKey });

    let message = `Donne-moi une liste structurée en HTML (ul/li, p, h2, etc.) pour un site web autour du sujet : ${sujet}.`;
    message += `Inlcus des balise strong sur les mot important mais pas les titres`;
    message += `N'inclus aucun style, aucune couleur, seulement le contenu HTML brut.`; 


    const rep = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const data = rep.choices[0].message.content

    return data;
}
