# Deployment Guide

This project is ready to deploy on Vercel.

## Option 1: Vercel Dashboard

1. Push this repo to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Click `Add New...` then `Project`.
4. Import the GitHub repository.
5. Add the environment variable `OPENAI_API_KEY`.
6. Deploy.

## Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

During the setup:

1. Link the project to your Vercel account
2. Keep the default project settings
3. Add `OPENAI_API_KEY`
4. Redeploy if prompted

## After deploy

Test the hosted app with a few different idea types:

- consumer app
- B2B tool
- creator tool
- student productivity idea

Once it feels stable, add the live URL to the main README.
