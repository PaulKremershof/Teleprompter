# Teleprompter Pro 📱

A professional, feature-rich teleprompter Progressive Web App (PWA) optimized for iPhone 17 and all modern devices.

## ✨ Features

### Core Functionality
- **Auto-scroll** with adjustable speed (10-300 pixels/second)
- **Manual controls** with play/pause, speed adjustment, and reset
- **Text editing** directly in the prompter view
- **Script library** with search and organization
- **Keyboard shortcuts** (Space = play/pause, Arrow keys = speed)

### Display Options
- **Adjustable font size** (12-72px)
- **Multiple font families** (Sans Serif, Serif, Monospace, Arial, Helvetica, Georgia, Times New Roman)
- **Custom colors** for text and background
- **Mirror mode** for teleprompter rigs
- **Full-screen mode** with auto-hiding controls

### Storage
- **Local storage** using IndexedDB (works offline)
- **No cloud required** - all data stays on your device
- **Import/export** scripts (coming soon)

### PWA Features
- **Install to home screen** - acts like a native app
- **Offline support** - works without internet
- **Responsive design** - adapts to any screen size
- **Touch-optimized** for mobile devices

## 🚀 Quick Start

### Option 1: Use the Live App (Easiest)
Once deployed, visit: `https://yourusername.github.io/Teleprompter`

### Option 2: Run Locally

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to `http://localhost:5173`

## 📦 Deployment to GitHub Pages

### First-Time Setup

1. **Update `vite.config.ts`:**
   - Change `base: '/Teleprompter/'` to `base: '/your-repo-name/'`
   - Use your actual GitHub repository name

2. **Create GitHub repository:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/Teleprompter.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

4. **Deploy:**
   - Push to main branch triggers automatic deployment
   - Wait 2-3 minutes for the build to complete
   - Visit `https://yourusername.github.io/Teleprompter`

### Manual Deployment (Alternative)

```bash
npm run build
npm run deploy
```

This builds the app and deploys to the `gh-pages` branch.

## 🎯 Usage Guide

### Creating a Script
1. Click **"New Script"** on the home screen
2. Enter a title and optional content
3. Click **"Create"**

### Using the Prompter
1. Select a script from the library
2. Click the **Play button** to start auto-scrolling
3. Adjust speed with **+/- buttons** or **arrow keys**
4. Tap the screen to show/hide controls
5. Click **Settings** to customize appearance

### Keyboard Shortcuts
- **Space** - Play/Pause
- **Arrow Up** - Increase speed
- **Arrow Down** - Decrease speed

### Installing as PWA (iPhone)
1. Open the app in Safari
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. The app icon appears on your home screen

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **IndexedDB (idb)** - Local storage
- **Vite PWA Plugin** - Progressive Web App features

## 📱 Browser Support

- ✅ Safari (iOS 14+)
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox
- ✅ Edge
- ✅ Samsung Internet

## 🎨 Customization

### Changing Colors
Edit the color scheme in `src/components/ScriptLibrary.tsx` and `src/components/Prompter.tsx`

### Adding Fonts
Modify the font options in `src/components/Prompter.tsx` settings section

### Adjusting Speed Range
Change min/max values in `src/components/Prompter.tsx`:
```typescript
setScrollSpeed(Math.max(scrollSpeed - 10, 10))  // Min: 10
setScrollSpeed(Math.min(scrollSpeed + 10, 300)) // Max: 300
```

## 🔧 Development

### Project Structure
```
Teleprompter/
├── src/
│   ├── components/
│   │   ├── ScriptLibrary.tsx  # Script management UI
│   │   └── Prompter.tsx       # Teleprompter view
│   ├── utils/
│   │   └── storage.ts         # IndexedDB operations
│   ├── types.ts               # TypeScript types
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── .github/workflows/         # GitHub Actions
└── package.json
```

### Build for Production
```bash
npm run build
```

Output goes to `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📄 License

MIT License - feel free to use this project however you like!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Acknowledgments

Built with modern web technologies for a smooth, native-like experience on all devices.

---

**Made with ❤️ for content creators, presenters, and public speakers**
