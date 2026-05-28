# 🚀 Deployment Guide - GitHub Pages

This guide will walk you through deploying your Teleprompter app to GitHub Pages for **FREE**.

## Prerequisites

- GitHub account (free)
- Git installed on your computer
- Node.js installed (v18 or higher)

## Step-by-Step Deployment

### 1. Install Dependencies

First, install all required packages:

```bash
cd /Users/pk/Desktop/Teleprompter
npm install
```

This will take 1-2 minutes.

### 2. Test Locally (Optional but Recommended)

Before deploying, test the app locally:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Press `Ctrl+C` to stop the server when done.

### 3. Update Configuration

**IMPORTANT:** Edit `vite.config.ts` and change the `base` path:

```typescript
// Change this line:
base: '/Teleprompter/',

// To match your GitHub repository name:
base: '/your-repo-name/',
```

For example, if your repo is `teleprompter-app`, use:
```typescript
base: '/teleprompter-app/',
```

### 4. Create GitHub Repository

#### Option A: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `Teleprompter` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README (we already have one)
5. Click **Create repository**

#### Option B: Using GitHub CLI
```bash
gh repo create Teleprompter --public --source=. --remote=origin
```

### 5. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Teleprompter PWA"

# Rename branch to main
git branch -M main

# Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/Teleprompter.git

# Push to GitHub
git push -u origin main
```

### 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 7. Deploy!

The deployment happens automatically when you push to the `main` branch.

**First deployment:**
- Go to the **Actions** tab in your repository
- You should see a workflow running called "Deploy to GitHub Pages"
- Wait 2-3 minutes for it to complete
- Once complete, your app is live!

**Your app URL:**
```
https://yourusername.github.io/Teleprompter/
```

Replace `yourusername` with your actual GitHub username.

### 8. Install on iPhone

1. Open Safari on your iPhone
2. Navigate to your app URL
3. Tap the **Share** button (square with arrow)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **"Add"**
6. Done! The app icon appears on your home screen

## Future Updates

To update your app after making changes:

```bash
# Make your changes to the code
git add .
git commit -m "Description of changes"
git push
```

GitHub Actions will automatically rebuild and redeploy your app.

## Troubleshooting

### Build Fails
- Check the **Actions** tab for error details
- Ensure all dependencies are in `package.json`
- Make sure `base` path in `vite.config.ts` matches your repo name

### 404 Error When Visiting App
- Verify GitHub Pages is enabled in Settings → Pages
- Check that `base` path in `vite.config.ts` is correct
- Wait a few minutes - first deployment can take up to 5 minutes

### App Doesn't Update
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check Actions tab to ensure deployment completed
- Try incognito/private browsing mode

### Icons Not Showing
- Replace placeholder icons in `public/` folder with actual PNG images:
  - `pwa-192x192.png` (192x192 pixels)
  - `pwa-512x512.png` (512x512 pixels)
- You can create these using any image editor or online tools

## Custom Domain (Optional)

Want to use your own domain instead of `github.io`?

1. Buy a domain from Namecheap, Google Domains, etc. (~$10-15/year)
2. In your repo: Settings → Pages → Custom domain
3. Enter your domain and click Save
4. Follow GitHub's DNS configuration instructions
5. Wait 24-48 hours for DNS propagation

## Cost Breakdown

- **GitHub Pages hosting:** FREE ✅
- **Domain (optional):** $10-15/year
- **Total minimum cost:** $0 🎉

## Performance Tips

- GitHub Pages uses a global CDN (fast worldwide)
- First load: ~500KB (includes React, icons, fonts)
- Subsequent loads: Instant (cached by PWA)
- Works offline after first visit

## Security & Privacy

- All data stored locally in browser (IndexedDB)
- No server-side storage
- No tracking or analytics
- Scripts never leave your device
- HTTPS enabled by default

## Need Help?

- Check the main README.md for usage instructions
- GitHub Actions logs show detailed error messages
- Test locally first with `npm run dev`

---

**You're all set! 🎉**

Your teleprompter app is now live and accessible from anywhere in the world.
