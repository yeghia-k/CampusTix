# Deploy checklist (CampusTix)

Repo: https://github.com/yeghia-k/CampusTix

## A) Render — catalog-api

1. Open https://dashboard.render.com and sign up / log in (GitHub login is fine).
2. **New +** → **Web Service** → connect `yeghia-k/CampusTix`.
3. Settings:
   - Name: `campustix-catalog`
   - Root Directory: `services/catalog-api`
   - Runtime: **Docker**
   - Instance: Free
4. Deploy. Copy the URL, e.g. `https://campustix-catalog.onrender.com`

## B) Render — booking-api

1. **New +** → **Web Service** → same repo.
2. Settings:
   - Name: `campustix-booking`
   - Root Directory: `services/booking-api`
   - Runtime: **Docker**
   - Instance: Free
3. Deploy. Copy the URL, e.g. `https://campustix-booking.onrender.com`

Note: Free Render services sleep after idle; first request can take ~30–60s.

## C) Netlify — frontend + function

1. Open https://app.netlify.com → **Add new site** → **Import an existing project**.
2. Pick GitHub → `CampusTix`.
3. Build settings should auto-read `netlify.toml`. If not:
   - Build command: `npm install --prefix frontend && npm run build --prefix frontend`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`
4. **Site configuration → Environment variables** (before or after first deploy):
   - `VITE_CATALOG_URL` = catalog Render URL (no trailing slash)
   - `VITE_BOOKING_URL` = booking Render URL
5. Trigger a **Redeploy** after saving env vars (Vite bakes env into the build).
6. Copy the Netlify site URL.

## D) Point images at Netlify

On Render → `campustix-catalog` → Environment:

- `IMAGE_BASE_URL` = `https://YOUR_NETLIFY_SITE.netlify.app/images`

Redeploy catalog (or restart).

## E) Test

1. Open Netlify URL → Home → Events → Details → Book → My Bookings.
2. Paste all live links into README “Hosted links”.
3. Submit Moodle: GitHub link + hosted frontend link.
