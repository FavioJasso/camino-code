<div align="center">
  <img src="public/assets/iconText.png" alt="Camino Code Logo" width="400"/>
  
  # Camino Code

  ### Building Systems That Think With You

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-Latest-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

  [Website](https://caminocode.com) • [Case Studies](https://caminocode.com/case-studies) • [Contact](https://caminocode.com/contact)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [SEO & Performance](#seo--performance)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## 🎯 About

**Camino Code** is an Applied AI Systems, Data Science, and Product Engineering organization based in New Jersey. We help businesses build intelligent systems that adapt and grow with them.

### What We Do

- 🤖 **Applied AI Systems** - Develop custom AI solutions tailored to your business needs
- 📊 **Data Science** - Extract powerful insights from your data
- 🔧 **Product Engineering** - Build scalable, modern digital products
- ⚡ **Workflow Automation** - Streamline operations and reduce manual work
- 🚀 **Digital Transformation** - Empower your business for the digital age

---

## ✨ Features

### 🎨 Modern Design
- Sleek, responsive UI with smooth animations
- Interactive 3D elements powered by Three.js
- Custom cursor and scroll animations
- Mobile-first responsive design

### 🚀 Performance Optimized
- Server-side rendering (SSR) with Next.js 15
- Optimized image loading and lazy loading
- Code splitting and tree shaking
- Lighthouse score optimized

### 🔍 SEO Ready
- Dynamic metadata generation
- Structured data (JSON-LD)
- XML sitemap and RSS feed
- Open Graph and Twitter card support
- Optimized robots.txt and manifest.json

### 🎭 User Experience
- Smooth page transitions
- Custom loading states
- Interactive case study galleries
- Contact forms with validation
- Accessibility (WCAG) compliant

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with latest features
- **[JavaScript/JSX](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Modern ES6+ syntax

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[GSAP (GreenSock)](https://greensock.com/gsap/)** - Professional animation library
- **[Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)** - Smooth scrolling

### 3D & Graphics
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for R3F

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **Email Integration** - Contact form functionality

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization

---

## 📁 Project Structure

```text
camino-code/
├── public/                      # Static assets
│   ├── assets/
│   │   ├── images/             # Image assets
│   │   │   ├── case_studies/   # Case study images
│   │   │   └── ...
│   │   └── icons/              # Icons and logos
│   ├── *.glb                   # 3D models
│   ├── favicon.svg
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO robots file
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page
│   │   ├── case-studies/       # Case studies listing
│   │   ├── case-study/         # Individual case studies
│   │   │   ├── daniel-avila/
│   │   │   ├── healthtrack/
│   │   │   ├── techwave/
│   │   │   └── victorias-painting/
│   │   ├── contact/            # Contact page
│   │   ├── services/           # Services page
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── sitemap.js          # Dynamic sitemap
│   │   └── rss.xml/            # RSS feed
│   │
│   ├── components/             # React components
│   │   ├── common/             # Shared components
│   │   ├── AboutUsFounder.jsx
│   │   ├── AboutUsHero.jsx
│   │   ├── CaseStudyDetails.jsx
│   │   ├── ContactFormPages.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── HomeAbout.jsx
│   │   ├── HomeServices.jsx
│   │   ├── ModelViewer.jsx
│   │   ├── NavigationBar.jsx
│   │   ├── Projects.jsx
│   │   ├── SEOHead.jsx
│   │   ├── ServicesDetails.jsx
│   │   ├── SmoothScroll.jsx
│   │   └── Work.jsx
│   │
│   ├── config/                 # Configuration files
│   │   └── seo.js              # SEO configuration
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAnimations.js
│   │   └── useIsMobile.js
│   │
│   └── utils/                  # Utility functions
│       └── animations.js
│
├── .gitignore
├── eslint.config.mjs           # ESLint configuration
├── jsconfig.json               # JavaScript configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
├── SEO-CHECKLIST.md           # SEO guidelines
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/caminocode/camino-code.git
   cd camino-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Commands

All commands are run from the root of the project:

| Command              | Action                                           |
| :------------------- | :----------------------------------------------- |
| `npm install`        | Install dependencies                             |
| `npm run dev`        | Start development server at `localhost:3000`     |
| `npm run build`      | Build production site to `.next/`                |
| `npm start`          | Preview production build locally                 |
| `npm run lint`       | Run ESLint to check code quality                 |
| `npm run lint:fix`   | Run ESLint and auto-fix issues                   |

### Development Workflow

1. **Create a new branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally
   ```bash
   npm run dev
   ```

3. **Lint your code** before committing
   ```bash
   npm run lint
   ```

4. **Build and test** the production version
   ```bash
   npm run build
   npm start
   ```

---

## 📦 Build & Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next/` directory.

### Deployment Options

#### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

#### Other Platforms
- **Netlify**: Configure build command to `npm run build` and publish directory to `.next`
- **AWS Amplify**: Follow the Next.js deployment guide
- **Docker**: Use the provided Dockerfile (if available)

### Environment Variables

Make sure to set up your environment variables in your deployment platform:
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (if using)
- Any other API keys or secrets

---

## 🔍 SEO & Performance

### SEO Features
- ✅ Dynamic meta tags for all pages
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ XML sitemap generation
- ✅ RSS feed for blog/case studies
- ✅ Optimized robots.txt
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Canonical URLs

### Performance Optimizations
- ✅ Server-side rendering (SSR)
- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Font optimization
- ✅ CSS optimization with Tailwind
- ✅ JavaScript minification
- ✅ Automatic static optimization

For detailed SEO guidelines, check [SEO-CHECKLIST.md](./SEO-CHECKLIST.md)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use the GitHub issue tracker
- Describe the issue in detail
- Include steps to reproduce
- Add screenshots if applicable

### Submitting Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Use ESLint to check your code
- Write clear commit messages
- Add comments for complex logic

---

## 👥 Team

### CaminoCode.com Contributors

- **Favio Jasso** - Founder & CEO
- **John Rey Calesa** - Software Engineer
- **Sandro Nahuel Ramirez Tokarsky** - Software Engineer
- **Ayelén Vázquez De La Rosa** - Concept Artist

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Camino Code.

For licensing inquiries, please contact us at [contact@caminocode.com](mailto:contact@caminocode.com)

---

## 📞 Contact

**Camino Code**

- 🌐 Website: [caminocode.com](https://caminocode.com)
- 📧 Email: [contact@caminocode.com](mailto:contact@caminocode.com)
- 📍 Location: New Jersey, USA

---

<div align="center">

### Built with ❤️ by Camino Code

[⬆ Back to Top](#camino-code)

</div>
