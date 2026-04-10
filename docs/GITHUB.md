# GitHub Guide For This Project

This is the simplest path to get this project online as a polished GitHub repo.

## 1. Install Git on your Mac

On this machine, `git` is not available yet because Apple Command Line Tools are missing.

Install them with:

```bash
xcode-select --install
```

After the install finishes, confirm:

```bash
git --version
```

## 2. Create a new GitHub repository

On GitHub:

1. Click `New repository`
2. Name it `idea-to-app-agent`
3. Add a short description
4. Keep it `Public` if you want to show it off
5. Do not add a README, `.gitignore`, or license there because this project already has them
6. Click `Create repository`

## 3. Initialize the local repo

From this project folder:

```bash
git init
git add .
git commit -m "Initial commit: Idea-to-App Agent"
```

## 4. Connect the remote repo

Copy the GitHub repo URL and run:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Example:

```bash
git remote add origin https://github.com/yourusername/idea-to-app-agent.git
git push -u origin main
```

## 5. What your GitHub repo should include

- polished README
- clean source code
- setup instructions
- deploy instructions
- license
- screenshot or demo GIF

## 6. After the first push

Add these to make the repo more impressive:

- a screenshot near the top of the README
- the live Vercel link
- a short demo video
- a pinned repo on your GitHub profile

## 7. Safe publishing checklist

Before pushing:

- make sure `.env` is not committed
- rotate any API key that was exposed during testing
- test the app locally one more time
- add billing/credits to your OpenAI API account if needed
