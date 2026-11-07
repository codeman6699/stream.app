# Stream.Store — Complete Project

## Setup
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173

## Admin
- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`

## Structure
- **Public site** — /home, /movies, /series, /watch/:id, /download/:type/:id, /embed/:type/:id, etc.
- **Admin panel** — /admin (Dashboard, Content CRUD, Settings)
- **Store** — content persisted in localStorage key `stream_store_content_v1`

## Key features
- Real video player with parts (movies) & seasons/episodes (series)
- Watch history with resume (localStorage)
- Download page (4K/1080p/720p/480p links)
- Share (WhatsApp, Telegram, FB, X, Email) + copy link
- Embed code generator + chromeless embed route
- Comments per title
- Search end-to-end (?search=)
- Admin login → dashboard → CRUD → export/import JSON

# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# stream.app" 
