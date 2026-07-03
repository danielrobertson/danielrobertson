# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Personal portfolio/landing page for Daniel Robertson. Single-page site with a bio, career timeline, social links, and resume PDF download.

## Commands

- `npm run dev` — start Astro dev server
- `npm run build` — typecheck (`astro check`) then build
- `npm run preview` — build then serve locally via Wrangler
- `npm run deploy` — build then deploy to Cloudflare Pages (via Wrangler)

## Stack

- **Astro 4** with the React integration for interactive components
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, not PostCSS)
- **shadcn/ui** (base-nova style) for UI primitives; config in `components.json`
- **Motion** (Framer Motion successor) for animations
- **Outfit Variable** as the body font (imported in `Layout.astro`), **Geist Variable** registered in `globals.css` as `--font-sans`
- Deployed to **Cloudflare Pages** (static assets via `wrangler.json`)

## Architecture

- `src/pages/index.astro` — single page, imports Layout and all sections
- `src/layouts/Layout.astro` — HTML shell, fonts, global styles, theme init script, dot background
- `src/components/` — mix of `.astro` (server-rendered) and `.tsx` (React, hydrated via `client:load` or `client:visible`)
- `src/components/ui/` — shadcn components (button, word-rotate, dot-pattern)
- `src/styles/globals.css` — Tailwind v4 config, shadcn theme tokens (oklch), dark mode via `.dark` class
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `@/*` path alias maps to `./src/*` (tsconfig)

## Dark Mode

Uses class-based toggling (`.dark` on `<html>`). Theme is persisted to `localStorage` and applied inline before render to prevent flash. The `@custom-variant dark` in globals.css enables Tailwind's `dark:` variant via the `.dark` class.

## Animations

Stagger-entry animations use CSS (`@keyframes enter` + `.stagger` / `.stagger-N` classes in Layout.astro), respecting `prefers-reduced-motion`. React component animations use the `motion` library.
