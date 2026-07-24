# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`cllde8.github.io` — a static GitHub Pages site with no build step, no package manager, and no test suite. It serves two things:

1. **LabIMotion Template Schema site** ([index.html](index.html)) — a landing page linking to versioned JSON Schema files describing the LabIMotion Element/Segment/Dataset template contract.
2. **chem-units playground** ([chem-units/](chem-units/)) — a small unit-conversion tool. This directory contains only a *built* Vite bundle (`assets/index-*.js` + sourcemap) deployed from a separate source repo; there is no source to edit here. Treat it as a deployment target, not an app to develop.

## Structure

- `index.html` — main landing page. Bootstrap-based, adapted from a Bootstrap example template (hence unused leftover classes like `.b-example-divider`, `.bd-mode-toggle`).
- `labimotion/schema/<version>/` — published, versioned JSON Schema files (e.g. `v1.0/`, `latest/`), each with a `$id` pointing at its own `cllde8.github.io` URL.
- `labimotion/src/` — the working/unpublished source for the schema files, edited before cutting a new version.
- `script.sh` — rewrites `$id` fields in `labimotion/src/*.json` to point at a new version's URL, then copies `labimotion/src/` into both `labimotion/schema/<targetVersion>/` and `labimotion/schema/latest/`. Edit `targetVersion` at the top before running.
- `.github/workflows/release-tag.yml` — on a `v*` tag pushed to `develop`, replaces the literal string `VERSION` in all JSON files with the tag name and commits/pushes back to `develop`. Schema files use `VERSION` as a placeholder until this runs.
- `chem-units/` — deployed build output only (no source, no package.json).

## Working on the schema

- Edit files under `labimotion/src/`, not directly under `labimotion/schema/` — the latter is generated/copied output.
- New template properties/constraints go through `labimotion/src/sch-element.json`, `sch-segment.json`, `sch-dataset.json`, and their shared `include/` fragments.
- Versioning is manual via `script.sh` + the release-tag workflow, not semver-in-package.json — there is no `package.json` anywhere in this repo.

## Front-end dependencies

`index.html` pulls Bootstrap, Bootstrap Icons, and `@docsearch/css` from jsdelivr CDN with pinned versions (Bootstrap has SRI `integrity` hashes; the others don't). There's no lockfile, so "updating a library" means bumping the version in the URL by hand:

- Bootstrap CSS/JS must stay in lockstep, and the `integrity` hash must be regenerated for the new version:
  ```bash
  curl -s "https://cdn.jsdelivr.net/npm/bootstrap@<version>/dist/css/bootstrap.min.css" | openssl dgst -sha384 -binary | openssl base64 -A
  ```
  (same for `dist/js/bootstrap.bundle.min.js`)
- `@docsearch/css@3` is loaded but not actually used anywhere — there's no docsearch widget or JS on the page. It's a carryover from the Bootstrap example template this page was based on; leave it or remove it deliberately, don't assume it needs version bumps.
- Check current CDN-hosted versions before bumping: `curl -s https://data.jsdelivr.com/v1/packages/npm/<name>`.

## Conventions

- No build/lint/test commands exist for this repo — verify HTML/CSS changes by opening the file directly (or via a local static server), not `npm run` anything.
- Commit messages in this repo lean `feat: ...` / plain imperative summaries; no strict convention enforced.
