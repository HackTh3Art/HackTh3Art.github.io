# Deployment rollback

This site deploys automatically when `main` or `master` is pushed. The workflow builds Jekyll, tests it, then uploads the generated `_site/` directory to cPanel over FTPS.

## Restore the previous HackTheART landing page

A cPanel JetBackup snapshot exists from **18 Aug 2026, 05:17 AM**, before the first automated deployment.

1. In cPanel, open **JetBackup 5** → **Restore & Download** → **Home Directory**.
2. Select the snapshot dated **18 Aug 2026, 05:17 AM**.
3. Restore **only** `public_html/` to its original location. Do not restore the whole home directory, databases, mail, or other subdomains.
4. Wait for the restore job to finish, then check `https://hacktheart.ro/` in a private window or after a hard refresh.

## Stop automatic deployments first

Before restoring files, prevent a later GitHub push from re-deploying the Jekyll site:

1. In GitHub Actions, disable the **Build and deploy to cPanel** workflow, or remove `.github/workflows/pages-deploy.yml`.
2. After the hosting rollback is verified, delete the repository secret `CPANEL_FTP_PASSWORD`.
3. In cPanel → **FTP Accounts**, remove `github-deploy@hacktheart.ro` if automated deployment will no longer be used.

## Revert repository configuration

If the repository should return to its pre-migration configuration as well:

- Restore `.github/workflows/pages-deploy.yml` from its history to the revision before 18 Aug 2026, or delete it.
- Change `_config.yml` back to:

  ```yml
  url: "https://hackth3art.github.io"
  baseurl: ""
  ```

The old `3xh4ck5.hacktheart.ro` GitHub Pages site was left independent of this cPanel deployment.

## Cache note

The new site uses a PWA cache. After either deployment or rollback, use **Ctrl+Shift+R** once, or clear site data for `hacktheart.ro`, before judging the result.
