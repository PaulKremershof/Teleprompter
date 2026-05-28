# ⚡ Quick Start Guide

Get your teleprompter app running in 5 minutes!

## Local Development (Test First)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit: http://localhost:5173
```

## Deploy to GitHub Pages

### One-Time Setup

```bash
# 1. Update vite.config.ts
# Change: base: '/Teleprompter/'
# To: base: '/your-repo-name/'

# 2. Create GitHub repo and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings → Pages → Source: GitHub Actions
```

### Your App is Live! 🎉

Visit: `https://yourusername.github.io/your-repo-name/`

## Install on iPhone

1. Open in Safari
2. Tap Share → Add to Home Screen
3. Done!

## Making Updates

```bash
# Make changes, then:
git add .
git commit -m "Your changes"
git push
```

Auto-deploys in 2-3 minutes.

## Need More Help?

- Full guide: See `DEPLOYMENT.md`
- Usage tips: See `README.md`
- Issues? Check GitHub Actions tab for logs

---

**That's it! You're ready to go! 🚀**
