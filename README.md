# Sohel Rana — Full-Stack Developer Portfolio

A Vite + React portfolio website for **Sohel Rana** with public portfolio pages, course pricing, service packages, project management, contact inquiries, a payment-request UI, and a browser-local admin console.

## Cloudflare Pages

This project is designed for Cloudflare Pages with Vite:

```bash
npm install
npm run build
```

The production output is `dist/`. `public/_redirects` keeps BrowserRouter routes working on direct refreshes in Cloudflare Pages. No Worker or Wrangler configuration is required.

## Important infrastructure limitation

The uploaded project does **not** contain a real server, database, object storage, email service, blockchain verification service, or server-side authentication system.

The current application therefore uses browser `localStorage` for editable site data and submitted payment/contact records. The `/admin` password is a browser-local credential gate only; it is explicitly not production-grade authentication. Payment requests are always created as `Pending` and are never automatically marked `Verified`.

For a real public production deployment, connect the existing UI/data model to a server-side authentication system, database, secure file storage, email provider, and independent blockchain/payment verification service.

## Included public routes

- `/`
- `/about`
- `/skills`
- `/courses`
- `/courses/full-stack`
- `/courses/python`
- `/courses/app-development`
- `/courses/bundle`
- `/services`
- `/services/portfolio`
- `/services/custom-web`
- `/projects`
- `/contact`
- `/fiverr`
- `/payment`
- `/admin`
