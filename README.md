# Idea-to-App Agent

Turn a rough startup thought into a sharper product concept, realistic MVP scope, recommended stack, build roadmap, and launch-ready homepage copy.

## Why this project is worth showing off

This is a strong first portfolio project because it demonstrates more than a prompt box. It shows product thinking, structured AI output, modern front-end design, and a clear path from idea to launch.

What it generates:

- refined product summary
- target user
- why-now angle
- MVP feature list
- recommended tech stack
- 7-day build plan
- landing page headline
- call to action

## Demo

Add these once you publish:

- Live app: `coming soon`
- Demo video: `coming soon`
- Screenshot: add `/docs/screenshot.png`

## Built with

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- OpenAI Responses API
- Structured Outputs
- Vercel-ready deployment config

## Product thinking

The core idea behind this app is simple: beginner founders and builders often have vague ideas, but not clear next steps. This tool compresses the messy early stage into something more actionable and easier to build.

## Local development

1. Install Node.js 20+
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Add `OPENAI_API_KEY`
5. Run `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)

Detailed setup guide:

- [docs/SETUP.md](docs/SETUP.md)

## Deployment

The project is ready for Vercel once the repo is pushed to GitHub.

Deployment steps:

- [docs/DEPLOY.md](docs/DEPLOY.md)
- [docs/GITHUB.md](docs/GITHUB.md)

## Project structure

```text
.
├── api/
│   └── generate.js
├── docs/
│   ├── DEPLOY.md
│   ├── SETUP.md
│   └── SHOWCASE.md
├── app.js
├── index.html
├── server.js
├── styles.css
├── package.json
└── vercel.json
```

## What I learned building this

- how to turn one strong AI workflow into a usable product
- how to design for clarity instead of feature bloat
- how to use JSON schema output so the UI stays predictable
- how to make a small app feel polished with typography, spacing, and motion

## Next improvements

- copy buttons for every generated section
- saved history
- multiple output modes like founder, developer, and investor
- follow-up refinement chat
- export to Markdown or Notion

## Notes

- `.env` is ignored and should never be committed
- if you exposed an API key during setup, rotate it before publishing
- API billing for OpenAI Platform is separate from ChatGPT Plus or Pro

## License

MIT. See [LICENSE](LICENSE).
