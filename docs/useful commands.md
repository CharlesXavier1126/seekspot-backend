# Local dev
## Database
Check the users table:
```powershell
docker compose --env-file .env.dev exec db mysql -u seekspot_user -pseekspot_pass seekspotdb -e "select * from users;"
```

## Day-to-Day Dev Workflow

| Task | Command |
|---|---|
| Start backend | `docker compose --env-file .env.dev up -d` |
| Start frontend | `npm run dev` |
| Stop backend | `docker compose down` |
| Reset DB entirely | `docker compose down -v` |
| Frontend changes | Hot reload — Vite watches automatically |
| Backend changes | **No hot reload in Docker** (uses `node`, not `nodemon`) — restart the container to pick up changes: `docker compose restart backend` |
| Smoke-test a production build | `npm run build:sandbox` then `npm run preview` |
