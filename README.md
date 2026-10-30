# Yuque Notes

This repository is synchronized from two private Yuque knowledge bases with Elog:

- `games` -> [`games/`](./games/)
- `软件` -> [`software/`](./software/)

## Local sync

1. Copy `.elog.env.example` to `.elog.env` and set `YUQUE_TOKEN`.
2. Run `npm ci`.
3. Run `npm run sync`.

`.elog.env` is ignored and is never committed.

## GitHub Actions

The workflow in `.github/workflows/sync-yuque.yml` runs every six hours and can also be started manually. Add a repository secret named `YUQUE_TOKEN` under **Settings -> Secrets and variables -> Actions** before enabling it.
