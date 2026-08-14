# CampusTix

Campus event ticket booking app for the Cloud IT final project.

## Architecture (microservices)

| Service | Role | Host |
| --- | --- | --- |
| `frontend/` | React SPA (5 pages) | Netlify |
| `services/catalog-api/` | Events REST API (Docker) | Render |
| `services/booking-api/` | Bookings REST API (Docker) | Render |
| `netlify/functions/confirm-booking.js` | Serverless confirmation | Netlify Function |
| `frontend/public/images/` | Event images (cloud static storage) | Netlify CDN |

```
Browser → Netlify (frontend + /images/*)
       → Render catalog-api  (GET /events)
       → Render booking-api  (POST/GET /bookings)
       → Netlify Function    (POST confirm-booking)
```

## Local run

Requires Node.js 20+.

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# APIs
cd services/catalog-api; npm install; npm start
# new terminal
cd services/booking-api; npm install; npm start
# new terminal
cd frontend; npm install; npm run dev
```

Frontend: http://localhost:5173  
Catalog: http://localhost:4001/events  
Booking: http://localhost:4002/bookings  

Images are served locally from `frontend/public/images` (Vite). Catalog defaults to `http://localhost:5173/images`.

## Deploy

### 1. Render — catalog-api

- New Web Service → this GitHub repo
- Root directory: `services/catalog-api`
- Runtime: Docker
- After Netlify is live, set env:
  - `IMAGE_BASE_URL=https://YOUR_SITE.netlify.app/images`

### 2. Render — booking-api

- Same repo, root directory: `services/booking-api`
- Runtime: Docker

### 3. Netlify — frontend + function + images

- Connect the same GitHub repo
- Build settings come from `netlify.toml`
- Images ship with the site from `frontend/public/images/`
- Env vars:
  - `VITE_CATALOG_URL` = Render catalog HTTPS URL (no trailing slash)
  - `VITE_BOOKING_URL` = Render booking HTTPS URL

## Hosted links

- Frontend: _add after Netlify deploy_
- Catalog API: _add after Render deploy_
- Booking API: _add after Render deploy_

## Rubric checklist

- [x] Full stack website, 5 pages
- [x] Microservice FE + 2 backend services
- [x] REST between FE and BE
- [x] Dockerfiles for backend services
- [x] Cloud container hosting (Render)
- [x] Serverless component (Netlify Function)
- [x] Cloud image storage (Netlify CDN / static hosting)
