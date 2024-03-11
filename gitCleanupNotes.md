- deleted seed-data.sql and supaSchema.sql
- changed `.yml` extensions to `.yaml`
- cleaned up weird extra blank text space in root dir README
- deleted files in `/admin`
  - redundant docker compose file (Deletecompose.yaml)
  - `README.Docker.md`
  - `README.md` (Vite)
- changed values in root dir `docker-compose.yaml`
  - services `db` and `postgREST` : properties `restart` had values changed from `always` to `unless-stopped`. added `restart: unless-stopped` to remaining services.
    This is to account for having a server restart after error, but if we purposefully stop a service, it stays stopped, even after Docker daemon restarts.
