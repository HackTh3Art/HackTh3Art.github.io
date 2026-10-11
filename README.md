# HackTheArt Website

This repository contains the source code for the HackTheArt website: **https://hacktheart.ro**.

It is a Jekyll site built on top of the `jekyll-theme-chirpy` theme.

## Tech stack

- Jekyll
- Ruby + Bundler
- `jekyll-theme-chirpy`
- `html-proofer` for local link/content checks

## Repository structure

- `/_config.yml` — main Jekyll site configuration
- `/_posts/` — blog/news posts
- `/_tabs/` — top-level pages (About, Categories, Team, etc.)
- `/assets/` — CSS, JS, images, and static assets
- `/images/` — additional image content
- `/tools/run.sh` — helper script for local development server
- `/tools/test.sh` — helper script for production build + HTML checks

## Local setup

1. Install Ruby (version compatible with the current `Gemfile`).
2. Install dependencies:

   ```bash
   bundle install
   ```

## Run locally

Start the local development server:

```bash
bash /home/runner/work/HackTh3Art.github.io/HackTh3Art.github.io/tools/run.sh
```

Optional flags:

- `-H, --host <HOST>` — bind to a custom host
- `-p, --production` — run with `JEKYLL_ENV=production`

## Build and validate

Build and run HTML checks:

```bash
bash /home/runner/work/HackTh3Art.github.io/HackTh3Art.github.io/tools/test.sh
```

You can also pass custom config files:

```bash
bash /home/runner/work/HackTh3Art.github.io/HackTh3Art.github.io/tools/test.sh -c "_config.yml"
```

## Content workflow

### Add a post

1. Create a Markdown file in `/_posts/` using Jekyll naming convention: `YYYY-MM-DD-title.md`.
2. Add front matter (`title`, `date`, `categories`, `tags`, etc.).
3. Preview locally with `tools/run.sh`.

### Update navigation pages

Edit or add files in `/_tabs/` and define front matter fields such as:

- `icon`
- `order`

## Deployment notes

The repository includes deployment and rollback notes in `ROLLBACK.md` for the production hosting workflow.
