# Local Setup

This guide is for someone opening the repo for the first time and wanting the app running quickly.

## 1. Install prerequisites

- Install Node.js 20 or newer from [nodejs.org](https://nodejs.org/)
- Confirm the install:

```bash
node -v
npm -v
```

## 2. Install dependencies

From the project folder:

```bash
npm install
```

## 3. Add environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then add your OpenAI API key:

```env
OPENAI_API_KEY=your_real_key_here
```

## 4. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. Test the product

Paste a rough app idea like:

```text
A mobile app that helps freelancers turn client notes into polished proposals and scoped deliverables.
```

You should see:

- a refined product summary
- target user
- why-now angle
- MVP feature list
- recommended stack
- 7-day build plan
- landing page headline
- call to action

## Common issues

`429 insufficient_quota`

- Your API key works, but your OpenAI API billing needs credits or a higher usage limit.

`OPENAI_API_KEY is missing`

- Make sure `.env` exists in the project root.
- Restart the dev server after editing `.env`.

`node: command not found`

- Reinstall Node.js and open a fresh terminal window.
