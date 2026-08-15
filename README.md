# Henil Patel — Portfolio

Personal portfolio website built with [TanStack Start](https://tanstack.com/start) (React + Vite + SSR), Tailwind CSS, and shadcn/ui components.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploying it live (recommended: Cloudflare Pages)

This project already ships with a Cloudflare build target, so the simplest way to get a live URL connected to this GitHub repo is Cloudflare Pages:

1. Push this repo to GitHub (see steps below).
2. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repository.
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.output/public`
5. Click **Save and Deploy**. Cloudflare will give you a live `*.pages.dev` URL, and will automatically redeploy every time you push to GitHub.
6. Optional: add a custom domain under the Pages project's **Custom domains** tab.

### Alternative: Vercel

TanStack Start also deploys to Vercel with zero config — go to https://vercel.com/new, import this GitHub repo, and click Deploy.

> Note: plain **GitHub Pages** only serves static files and does not support this project's SSR server, so it isn't a good fit here — use Cloudflare Pages or Vercel instead.

## Project Structure

- `src/routes` — page routes (TanStack Router)
- `src/components` — UI components (shadcn/ui based)
- `public` — static assets, resume, and certificates
