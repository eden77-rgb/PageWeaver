# PageWeaver

## 🌐 Générateur de pages HTML dynamiques personnalisées

**PageWeaver** est une application serverless développée avec **Cloudflare Workers** permettant de générer des pages HTML personnalisées à partir d'une URL. Elle offre un système de templates, de contenus dynamiques (par IA), et un cache intelligent via KV Namespace.

---

## 🚀 Fonctionnalités principales

- 🔤 **Personnalisation du nom** via l’URL : `?name=Eden`
- 🖌️ **Personnalisation de la couleur** : `?color=red`
- 🎨 **Choix du template** : clair, sombre via `?template=dark`
- 🧠 **Contenu IA** : contenu généré par IA via `?sujet=...`
- ⚡ **Cache intelligent** via KV Namespace pour éviter les régénérations
- 📄 **Génération HTML à la volée** côté serveur

---

## 🔧 Technologies utilisées

| Technologie            | Rôle                                                    |
|------------------------|----------------------------------------------------------|
| **Cloudflare Workers** | Hébergement serverless des scripts de génération         |
| **JavaScript**         | Traitement des URL et génération du contenu HTML         |
| **HTML & CSS**         | Templates et mise en page personnalisée                  |
| **KV Namespace**       | Cache des pages générées                                 |
| **Groq**               | Génération de contenu enrichi (cours, articles, etc.)    |

---

## 🧪 Utilisation

### 🔗 Exemple d’URL

[https://pageweaver.eden77-rgb.workers.dev/?template=dark&color=red&sujet=pourquoi%20l%27assembleur%20c%27est%20il%20g%C3%A9nial%20?](https://pageweaver.eden77-rgb.workers.dev/?template=dark&color=red&sujet=pourquoi%20l%27assembleur%20c%27est%20il%20g%C3%A9nial%20?)

---

## 📚 Documentation

- 🔧 [Cloudflare Workers](https://developers.cloudflare.com/workers/) – Pour comprendre le fonctionnement et le lancement du serveur sans infrastructure.
- 🗃️ [KV Namespace](https://developers.cloudflare.com/workers/platform/sites/configuration/#kv-namespaces) – Pour stocker les pages HTML en cache.
- 🧠 [Groq](https://groq.com/docs) – Pour intégrer de la génération de contenu enrichi par IA.

---

## 📄 LICENSE

© 2025 – Tous droits réservés.

Ce projet est protégé. Il ne peut être copié, distribué ou utilisé sans autorisation préalable de l’auteur.
Voir le fichier [LICENSE](./LICENSE) pour plus d’informations.
