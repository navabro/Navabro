# 🚀 Navaneeth — 3D Portfolio

A modern, production-ready **3D portfolio website** built with **React + Vite + Three.js**.  
Features interactive particle animations, glassmorphism UI, smooth scroll animations via Framer Motion,
and a fully responsive dark-themed layout.

---

## ✨ Features

- 🌌 **Interactive 3D Hero Scene** — particle field + floating wireframe geometries powered by `@react-three/fiber`
- 🖱️ **Mouse-tracking camera** — the 3D scene reacts to cursor movement
- 💎 **Glassmorphism UI** — frosted-glass cards with neon accent borders
- 🎞️ **Framer Motion animations** — scroll-triggered fade-ins, staggered card entries
- ⚡ **Loading screen** — animated spinner that fades out after 3D scene init
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🌙 **Dark theme** — deep navy/black background with purple + cyan neon accents
- 📬 **Contact form** — wired for easy EmailJS integration

---

## 🗂️ Project Structure

```
NAVABRO/
├── index.html                  # Root HTML — Google Fonts, meta tags
├── vite.config.js              # Vite + React plugin + Three.js pre-bundle
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component — layout + loading state
    ├── index.css               # Global styles, design tokens, all component CSS
    └── components/
        ├── Loader.jsx          # Full-screen loading animation
        ├── Navbar.jsx          # Fixed top nav with scroll detection
        ├── Hero.jsx            # Hero section — wraps 3D canvas + text overlay
        ├── HeroScene.jsx       # Three.js scene (particles, geometries, camera rig)
        ├── About.jsx           # About section with stat cards
        ├── Skills.jsx          # Skills grid with animated progress bars
        ├── Projects.jsx        # Project cards with tags and links
        ├── Contact.jsx         # Contact form + social links
        └── Footer.jsx          # Footer
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | v18 or higher |
| npm | v9 or higher (comes with Node) |

Check your versions:
```bash
node -v
npm -v
```

---

## 📦 Installation

**1. Clone or download the project:**
```bash
git clone https://github.com/navaneeth/portfolio.git
cd portfolio
```

Or if you already have the files, just open a terminal in the `NAVABRO` folder.

---

**2. Install all dependencies:**
```bash
npm install
```

This installs:
- `react` & `react-dom` — UI framework
- `vite` + `@vitejs/plugin-react` — lightning-fast build tool
- `three` — 3D graphics library
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — Helper components for R3F (Points, PointMaterial, etc.)
- `framer-motion` — Animation library for scroll effects
- `@emailjs/browser` — (optional) for contact form email sending
- `lucide-react` — Icon library

---

## 🚀 Running Locally

```bash
npm run dev
```

The site will start at **[http://localhost:5173](http://localhost:5173)**

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. To preview the production build locally:

```bash
npm run preview
```

---

## ✏️ Customization Guide

### 1. Update Your Personal Info

**`src/components/Hero.jsx`** — Change name, tagline, badge text:
```jsx
<div className="hero__badge">VIT Chennai · AI/ML Student</div>
<h1 className="hero__name"><span>Navaneeth</span></h1>
<p className="hero__tagline">...</p>
```

---

### 2. Update About Section

**`src/components/About.jsx`** — Edit `stats` array and paragraphs:
```jsx
const stats = [
  { num: '2nd', label: 'Year @ VIT' },
  { num: '3+',  label: 'Projects Built' },
  ...
]
```

---

### 3. Update Skills

**`src/components/Skills.jsx`** — Edit the `skills` array:
```jsx
const skills = [
  { name: 'Python', icon: '🐍', level: 90 },
  // level is 0–100 (fills the progress bar)
]
```

---

### 4. Update Projects

**`src/components/Projects.jsx`** — Edit the `projects` array:
```jsx
const projects = [
  {
    title: 'SpamShield AI',
    desc: '...',
    tags: ['Python', 'FastAPI'],
    accent: '#7c3aed',       // card top border + hover glow color
    github: 'https://github.com/...',
    demo: 'https://...',
  },
]
```

---

### 5. Update Contact / Social Links

**`src/components/Contact.jsx`** — Edit the `socials` array:
```jsx
const socials = [
  { icon: '🐙', name: 'GitHub', handle: '@navaneeth', href: 'https://github.com/navaneeth' },
  { icon: '💼', name: 'LinkedIn', handle: '...', href: 'https://linkedin.com/in/...' },
  { icon: '✉️', name: 'Email', handle: 'you@email.com', href: 'mailto:you@email.com' },
]
```

---

### 6. Wire Up the Contact Form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create a **service**, **template**, and get your **public key**
3. In `Contact.jsx`, replace the fake submit handler:

```jsx
import emailjs from '@emailjs/browser'

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  } catch {
    setStatus('error')
  }
  setLoading(false)
}
```

---

### 7. Change Colors / Theme

All design tokens are in **`src/index.css`** under `:root`:

```css
:root {
  --bg: #050810;           /* page background */
  --neon: #7c3aed;         /* primary neon (purple) */
  --neon2: #06b6d4;        /* secondary neon (cyan) */
  --neon3: #f59e0b;        /* tertiary neon (amber) */
  --text: #e2e8f0;
  --text-muted: #64748b;
}
```

---

### 8. Tweak the 3D Scene

**`src/components/HeroScene.jsx`**

| Property | Effect |
|----------|--------|
| `count` in `ParticleField` | Number of particles (default 3500) |
| `size={0.025}` in `PointMaterial` | Particle dot size |
| `color="#7c3aed"` | Particle color |
| `camera={{ fov: 65 }}` | Field of view |
| Geometry types (`icosahedronGeometry`, etc.) | Floating shape types |

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — zero config needed.

---

### Netlify

```bash
npm run build
# Drag and drop the /dist folder at netlify.com/drop
```

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://navaneeth.github.io/portfolio"
```

Then run:
```bash
npm run deploy
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Black/blank 3D canvas | Make sure `three` & `@react-three/fiber` are installed |
| `Cannot find module 'react'` | Run `npm install react react-dom` |
| Port 5173 blocked | Run `npm run dev -- --port 3000` |
| Build fails | Delete `node_modules` & `package-lock.json`, then `npm install` |
| Framer Motion not animating | Ensure you're using `useInView` with `once: true` |

---

## 📄 License

MIT — free to use, modify, and deploy.

---

> Built with ❤️ by **Navaneeth** · VIT Chennai · 2026
