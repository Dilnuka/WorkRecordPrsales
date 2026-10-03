# VSIS Presales — Weekly Pulse

Presales pipeline intelligence dashboard (static React app).

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy on GitHub Pages (shareable link)

1. Create a GitHub repo and push this project to `main`.
2. Repo **Settings → Pages → Source**: **GitHub Actions**.
3. After the workflow runs, your link will be:

   `https://<your-username>.github.io/<repo-name>/`

Example: `https://dilnuka.github.io/vsis-presales/`

### Important (confidential data)

This dashboard contains **company opportunity data**. A GitHub Pages site is **public** (anyone with the URL can open it). Prefer:

- Sharing only with trusted people, **or**
- A host with password protection (e.g. Netlify password), **or**
- A private repo + private hosting if you need restricted access

## Weekly update

Edit `src/data/opportunities.ts`, push to `main`, and Pages updates automatically.
