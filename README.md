# Stream.Store

Stream.Store is the existing Vue 3 / Express application with a MySQL-backed content catalog and protected administrator CMS. The public home, Movies, Series, Browse, and Watch screens use the Express API as their catalog source. Content changes are refreshed in the browser after admin mutations and polled every 30 seconds.

## Requirements

- Node.js 18+ and npm
- XAMPP MySQL/MariaDB (or another MySQL-compatible server)
- A database account with permission to create/alter tables and read/write content

## Database setup (data-preserving)

1. Back up your current MySQL database first.
2. In phpMyAdmin, select the existing database used by Stream.Store. Set `DB_NAME` to that exact database name in `backend/.env`; do not create a replacement database just to match the example.
3. Run `backend/migrations/001_content_cms.sql` against that database. It only creates the CMS tables if absent; it does not drop, truncate, or reset records.
4. On API startup, the backend inspects `content` columns and adds only missing CMS fields. Existing rows remain in place. If the existing `content` table uses an incompatible schema, take a backup and inspect it before changing anything; do not run a destructive reset.

The API uses the existing `content` table shape (`id`, `type`, `title`, `genre`, `year`, `released`, `rating`, `quality`, `info`, `image`, `video_url`, `download_base`) and adds `featured`, `trending`, timestamps, and any missing CMS columns when needed. It adds `episodes` for season/episode metadata. Backend startup and `/api/health` check the schema without replacing existing rows.

## Backend configuration

1. Copy `backend/.env.example` to `backend/.env` (do not commit `.env`).
2. Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` for the XAMPP database.
3. Set a unique `ADMIN_EMAIL` and strong `ADMIN_PASSWORD`.
4. Set `JWT_SECRET` to a random secret with at least 32 characters. Keep credentials and this secret only in the backend environment.
5. Set `CORS_ORIGIN` to the frontend origin(s); Vue CLI commonly uses `http://localhost:8080`.
6. Optionally adjust `MAX_UPLOAD_BYTES` and `UPLOAD_DIR`. Uploaded media is written under `backend/uploads` by default.

## Install and run

From the project root, install frontend packages with `npm install`. In `backend/`, install backend packages with `npm install`.

From the project root, install frontend packages with `npm install`, then start Vue with `npm run serve`. In another terminal, enter `backend/`, install backend packages with `npm install`, and start the API with `npm start` (or `npm run dev`). On Windows, if PowerShell blocks npm scripts, run `npm.cmd` instead (for example, `npm.cmd run serve`). The frontend defaults to `http://localhost:5000` for the API. To override it, set `VUE_APP_API_URL` in the root Vue environment (for example, in `.env.local`) and restart the frontend.

If the API says port 5000 is already in use, an API process is already listening there. Keep it if `http://localhost:5000/api/health` is the Stream.Store API; otherwise close the stale server terminal (Ctrl+C) or identify and stop that Node process before starting the API again. Do not start a second backend on the same port.

The API health endpoint is `GET http://localhost:5000/api/health`. It reports backend/database status without revealing credentials.

## Admin usage

Open `/admin/login` on the Vue site and sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the backend `.env`. There is no built-in default account. Admin create/update/delete endpoints require the returned Bearer JWT.

In Manage Content, add a Movie or Series, upload a poster or enter its URL, and set metadata and featured/trending flags. Series can contain ordered seasons and episodes, each with a URL or uploaded video. The editor supports updating and deleting individual episodes. Deleting content removes its episode records as well.

Supported poster types: JPEG, PNG, WebP, AVIF. Supported video types: MP4, WebM, Ogg, MOV (subject to browser playback support and the configured upload-size limit).

## API overview

- `POST /api/admin/login` — admin sign-in and JWT
- `GET /api/health` — API and database connection status
- `GET /api/content` and `GET /api/content/:id` — public catalog/details
- `POST /api/content`, `PUT /api/content/:id`, `DELETE /api/content/:id` — authenticated content CRUD
- `GET /api/admin/stats` — authenticated dashboard statistics

Uploads are served from `/uploads/...`; MySQL stores their paths or the supplied video/poster URLs.

## Build and verification

- Frontend production build: `npm run build`
- Frontend lint: `npm run lint`
- API: start `backend/` with `npm start`, then check `/api/health`

A live upload/playback test requires the configured XAMPP database and administrator credentials. No working local MySQL credentials are assumed or embedded in this repository.
