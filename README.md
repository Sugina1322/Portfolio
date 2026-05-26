# Jean Cristian Mangaser Portfolio

Interactive personal portfolio built with Next.js, React, TypeScript, GSAP, Three.js, and custom CSS.

## Overview

This site presents my work across SAP security administration, ABAP fundamentals, cybersecurity, and product development. It includes an interactive terminal-style entry, animated sections, project cards, skill displays, an archive timeline, and a QR-based contact section.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- GSAP
- Three.js
- Lenis

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Project Structure

- `app/` - Next.js app routes and metadata.
- `src/components/CyberNoirPortfolio.tsx` - Main portfolio experience.
- `src/data/portfolio.ts` - Portfolio copy, links, projects, skills, and experience data.
- `src/styles.css` - Main custom visual system and responsive styling.
- `src/tailwind.css` - Tailwind entry file and small utilities.
- `public/` - Favicon and touch icon assets.

## Deployment Note

Set `NEXT_PUBLIC_SITE_URL` to the final production domain so canonical links and social previews resolve correctly.
