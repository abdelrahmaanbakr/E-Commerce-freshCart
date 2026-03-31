# FreshCart

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Environment variables

The app builds without custom environment variables, but you can override these values when needed:

- `VITE_API_BASE_URL`
- `VITE_APP_BASE_URL`

Use `.env.example` as the reference for local and Vercel configuration.

## Vercel

This project is configured as a Vite SPA. The included `vercel.json` rewrites all requests to `index.html` so React Router routes continue to work on refresh.
