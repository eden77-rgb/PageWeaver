export function getCSS(color) {
    return `
    body {
        margin: 0;
        padding: 2rem;
        font-family: Arial, sans-serif;
        transition: background-color 0.3s, color 0.3s;
    }

    strong {
        color: ${color};
    }

    .dark {
        background-color: #121212;
    }

    .dark p {
        color: #ffffff;
    }

    .dark {
        color: #ffffff;
    }

    .white {
        background-color: #ffffff;
    }

    .white p {
        color: #121212;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.1rem;
    }
    `
}