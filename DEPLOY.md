# Deployment Guide

## 1. Local Preview
Before deploying, verify the production build locally:
```bash
npm run preview
```
Open the given URL (e.g., http://localhost:4173) on your phone or desktop to test.

## 2. PWA Icons (Important)
The build is successful, but the PWA manifest references `pwa-192x192.png` and `pwa-512x512.png`, which are currently missing (we only have `icon.svg`).
For the best "Add to Home Screen" experience:
1. Use a tool like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) or [favicon.io](https://favicon.io/).
2. Generate PNGs from `public/icon.svg`.
3. Place `pwa-192x192.png` and `pwa-512x512.png` in the `public/` folder.
4. Re-run `npm run build`.

## 3. Deploying to Vercel (Recommended)
1. Push this code to GitHub/GitLab/Bitbucket.
2. Login to [Vercel](https://vercel.com).
3. "Add New Project" -> Import your repository.
4. Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

## 4. Deploying to Netlify
1. Run `npm run build` locally.
2. Login to [Netlify](https://netlify.com).
3. Drag and drop the `dist/` folder into the "Sites" area.
4. (Optional) A `_redirects` file has been added to `public/` to handle SPA routing if you expand the app later.

## 5. Host it yourself
Serve the contents of the `dist/` folder using any static file server (Nginx, Apache, `serve`, etc.).
```bash
npm install -g serve
serve -s dist
```
