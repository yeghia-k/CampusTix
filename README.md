# CampusTix

Campus event ticket booking app for the Cloud IT final project.

Dockerized microservices orchestrated/hosted on Render.

## Architecture (microservices)

| Service | Role | Host |
| --- | --- | --- |
| `frontend/` | React SPA (5 pages) | Netlify |
| `services/catalog-api/` | Events REST API (Docker) | Render |
| `services/booking-api/` | Bookings REST API (Docker) | Render |
| `netlify/functions/confirm-booking.js` | Serverless confirmation | Netlify Function |
| `frontend/public/images/` | Event images (cloud static storage) | Netlify CDN |
| `k8s/*.yaml` | Kubernetes Deployment + Service manifests | Orchestration config |

```
Browser → Netlify (frontend + /images/*)
       → Render catalog-api  (GET /events)
       → Render booking-api  (POST/GET /bookings)
       → Netlify Function    (POST confirm-booking)
```

## Container orchestration

**Live hosting:** Docker images run as cloud services on **Render** (build, deploy, restart).

**Kubernetes manifests** (also in the repo for orchestration config):

- [`k8s/catalog-api-deployment.yaml`](k8s/catalog-api-deployment.yaml)
- [`k8s/booking-api-deployment.yaml`](k8s/booking-api-deployment.yaml)

Each file defines a `Deployment` + `Service`. To apply on any cluster (after building/pushing images):

```bash
kubectl apply -f k8s/
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

- GitHub: https://github.com/yeghia-k/CampusTix
- Frontend: https://campustix-app.netlify.app
- Catalog API: https://campustix.onrender.com
- Booking API: https://campustix-1.onrender.com
- Serverless confirm: https://campustix-app.netlify.app/.netlify/functions/confirm-booking

## Rubric checklist

- [x] Full stack website, 5 pages
- [x] Microservice FE + 2 backend services
- [x] REST between FE and BE
- [x] Dockerfiles for backend services
- [x] Cloud container hosting (Render) + Kubernetes manifests in `k8s/`
- [x] Serverless component (Netlify Function)
- [x] Cloud image storage (Netlify CDN / static hosting)
