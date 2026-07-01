# 횡성우림측량 홈페이지 재설계 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all 7 pages of the 횡성우림측량 (Hoengseong Urim Survey) Next.js site with a monotone, minimal design benchmarked against siwolarchi.com, using Pretendard type and subtle Framer Motion scroll animations. Visual/structural redesign only — no Supabase wiring, no real photo assets (placeholders wired to fixed paths).

**Architecture:** App Router pages (`src/app/**/page.tsx`) each compose from a small set of shared components (`src/components/*`). A single `FadeInSection`/`FadeInGrid`/`FadeInItem` set (Framer Motion) provides the scroll-fade behavior everywhere so it's implemented once. Color/type system lives in `tailwind.config.cjs` + `src/app/globals.css`; every component/page consumes those tokens rather than hardcoding hex values.

**Tech Stack:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4 (via `@tailwindcss/postcss`, config in `tailwind.config.cjs`) + Framer Motion (new dependency).

## Global Constraints

- Keep URL structure exactly: `/`, `/about`, `/services`, `/guide`, `/blog` (+ `/blog/[slug]`), `/faq`, `/contact`. Do not add or remove routes.
- Color system is fully monotone — no accent/brand color anywhere. Tokens: `ink` `#111111`, `secondary` `#6B6B6B`, `line` `#E5E5E5`, `hover` `#333333`, `bg-soft` `#FAFAFA`. Background is plain white by default.
- Font is Pretendard everywhere (replaces Noto Sans KR). Load via CDN `@import` in `globals.css` (no new npm font package — matches existing CDN-import pattern already in the file).
- Animation is Framer Motion only, used for subtle scroll fade-ins (`opacity`/`y` transform, `whileInView`, `once: true`). No parallax, no 3D, no page-load-triggered animation except the hero (which fades in once on mount, not on scroll).
- Business info is real and must be copied verbatim, not paraphrased:
  - 업체명: 횡성우림측량
  - 주소: 강원특별자치도 횡성군 태기로 16, 3층 302호
  - 전화: 033-345-1253
  - 서비스 6종: 개발행위허가, 농지전용, 산지전용, 태양광 인허가, 도로점용, 현황측량
  - 소개문 소스: 구글비즈니스 리스팅 ("횡성군 소재 측량사무소입니다. ... 강원 지역 전반 대응 가능합니다.")
- Do not invent facts not given (e.g. exact operating hours, representative name) — leave those as explicit "정보 없음"/입력 대기 placeholders, never fabricate plausible-sounding values.
- Images: none exist yet. Every image slot renders a `bg-soft`/`hover` colored `<div>` with a fixed `backgroundImage: url(...)` pointing at the exact path from the spec, so dropping a real file at that path later "just works" with zero code changes. Never use `next/image` for these (a missing file would 404/break the build in some configs); use plain CSS background-image so a missing file degrades to solid color silently.
- Scope excludes: Supabase wiring (leave `/api/contact` stub as-is), Kakao channel real link (`href="#"` placeholder), real photos/logo files.
- This project has no test runner configured (no jest/vitest in `package.json`). Do not add one for this task — verification is `npm run build` (type-check + build) after each task, plus a manual look at `npm run dev` in the browser for visual tasks. Do not skip the build check even though it isn't a unit test.
- Every new/rewritten file must pass `npm run build` with zero TypeScript or Next.js errors before moving to the next task.

---

### Task 1: Add Framer Motion + shared fade-in components

**Files:**
- Modify: `package.json` (adds `framer-motion` dependency via npm install)
- Create: `src/components/FadeInSection.tsx`

**Interfaces:**
- Produces: `FadeInSection({ children, className? })`, `FadeInGrid({ children, className? })`, `FadeInItem({ children, className? })` — all named exports from `src/components/FadeInSection.tsx`. Every later page/component task that needs scroll fade-in imports from here; do not reimplement.

- [ ] **Step 1: Install the dependency**

Run: `npm install framer-motion`
Expected: `package.json` gains a `framer-motion` entry under `dependencies`; `npm install` exits 0.

- [ ] **Step 2: Create the fade-in components**

Create `src/components/FadeInSection.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type FadeProps = {
  children: ReactNode;
  className?: string;
};

export function FadeInSection({ children, className }: FadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInGrid({ children, className }: FadeProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children, className }: FadeProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0, no TypeScript errors, no unused-import warnings for this file (it isn't imported anywhere yet, so no import errors are expected — the file only needs to compile standalone).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/components/FadeInSection.tsx
git commit -m "feat: add framer-motion and shared fade-in components"
```

---

### Task 2: Monotone color system + Pretendard font

**Files:**
- Modify: `tailwind.config.cjs` (full file, shown below)
- Modify: `src/app/globals.css` (full file, shown below)

**Interfaces:**
- Produces: Tailwind color utilities `bg-ink`/`text-ink`, `bg-secondary`/`text-secondary`, `border-line`, `bg-hover`/`hover:bg-hover`, `bg-bg-soft`. Font family `font-sans` resolves to Pretendard. Every later component/page task uses these exact class names — no new color tokens should be introduced later.

- [ ] **Step 1: Replace `tailwind.config.cjs`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        secondary: '#6B6B6B',
        line: '#E5E5E5',
        hover: '#333333',
        'bg-soft': '#FAFAFA'
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink:      #111111;
  --secondary: #6B6B6B;
  --line:     #E5E5E5;
  --hover:    #333333;
  --bg:       #FFFFFF;
  --bg-soft:  #FAFAFA;
}

html, body, #__next {
  height: 100%;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Pretendard', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* Utility for english section labels */
.eng-label {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--secondary);
}
```

Note what was deliberately removed vs. the old file: the navy/blue brand variables, the `--success`/`--cta` tokens, and the `prefers-color-scheme: dark` override block (this design has no dark mode — a system-driven dark override would silently invert the intentional monotone palette).

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0. Existing pages will still reference old classes like `bg-navy`/`text-navy`/`bg-bg-soft` at this point (not yet rewritten) — Tailwind v4 silently ignores unknown utility classes rather than erroring, so the build should still succeed; visually the site will look broken/unstyled for `navy`/`blue` classes until later tasks replace them. This is expected and resolved by Task 9 onward.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.cjs src/app/globals.css
git commit -m "feat: switch color system to monotone and font to Pretendard"
```

---

### Task 3: Shared `Button` component

**Files:**
- Create: `src/components/Button.tsx`

**Interfaces:**
- Produces: `Button({ href, children, variant?, className? })` default export. `variant` is `"primary" | "inverted" | "text"`, default `"primary"`. `primary` = dark bg on light sections; `inverted` = white bg on dark sections (hero/CTA band); `text` = underlined, inherits current text color (use on colored backgrounds without fighting text color).

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "inverted" | "text";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-ink text-white px-6 py-3 hover:bg-hover",
  inverted: "bg-white text-ink px-6 py-3 hover:bg-bg-soft",
  text: "border-b border-current pb-1 hover:opacity-70",
};

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`inline-block transition-colors ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Button.tsx
git commit -m "feat: add shared Button component"
```

---

### Task 4: `HeroSection` component

**Files:**
- Create: `src/components/HeroSection.tsx`

**Interfaces:**
- Consumes: `FadeInSection` from `src/components/FadeInSection.tsx` (Task 1).
- Produces: `HeroSection({ engLabel, title, subtitle?, imageSrc, imageAlt, size?, children? })` default export. `size` is `"full" | "compact"`, default `"compact"`. `children` renders below the subtitle (used for CTA buttons on the homepage hero). Every page task (5 through 18) that needs a hero imports this — do not build page-specific heroes.

- [ ] **Step 1: Create the component**

```tsx
import type { ReactNode } from "react";
import { FadeInSection } from "./FadeInSection";

type HeroSectionProps = {
  engLabel: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  size?: "full" | "compact";
  children?: ReactNode;
};

export default function HeroSection({
  engLabel,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  size = "compact",
  children,
}: HeroSectionProps) {
  const heightClass = size === "full" ? "h-[520px] md:h-[640px]" : "h-[280px] md:h-[320px]";

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden bg-hover`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
        role="img"
        aria-label={imageAlt}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 flex flex-col justify-center h-full">
        <FadeInSection className="text-white max-w-2xl">
          <div className="eng-label !text-white/80">{engLabel}</div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-3">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-white/90">{subtitle}</p>}
          {children}
        </FadeInSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add shared HeroSection component"
```

---

### Task 5: `ServiceCard` component

**Files:**
- Create: `src/components/ServiceCard.tsx`

**Interfaces:**
- Produces: `ServiceCard({ title, description, href, imageSrc })` default export. Used by Task 11 (home) and Task 13 (services).

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

export default function ServiceCard({ title, description, href, imageSrc }: ServiceCardProps) {
  return (
    <Link href={href} className="group block border border-line hover:border-ink transition-colors">
      <div
        className="aspect-square bg-bg-soft bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-secondary">{description}</p>
        <span className="mt-4 inline-block text-sm text-ink border-b border-ink group-hover:text-secondary group-hover:border-secondary">
          자세히 보기
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceCard.tsx
git commit -m "feat: add ServiceCard component"
```

---

### Task 6: `BlogCard` component

**Files:**
- Create: `src/components/BlogCard.tsx`

**Interfaces:**
- Produces: `BlogCard({ slug, title, date, imageSrc })` default export. Used by Task 11 (home) and Task 15 (blog index).

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  date: string;
  imageSrc: string;
};

export default function BlogCard({ slug, title, date, imageSrc }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div
        className="aspect-[4/3] bg-bg-soft bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="mt-4">
        <div className="text-xs text-secondary">{date}</div>
        <h3 className="mt-1 font-semibold text-ink group-hover:text-secondary">{title}</h3>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/BlogCard.tsx
git commit -m "feat: add BlogCard component"
```

---

### Task 7: `StepTimeline` component

**Files:**
- Create: `src/components/StepTimeline.tsx`

**Interfaces:**
- Produces: `StepTimeline({ steps })` default export, `steps: { title: string; desc: string }[]`. Used by Task 14 (guide).

- [ ] **Step 1: Create the component**

```tsx
type Step = { title: string; desc: string };

export default function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {steps.map((step, i) => (
        <li key={step.title} className="border-t-2 border-ink pt-6">
          <div className="text-3xl font-bold text-ink">{String(i + 1).padStart(2, "0")}</div>
          <div className="mt-3 font-semibold text-ink">{step.title}</div>
          <div className="mt-2 text-sm text-secondary">{step.desc}</div>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/StepTimeline.tsx
git commit -m "feat: add StepTimeline component"
```

---

### Task 8: `FaqAccordion` component

**Files:**
- Create: `src/components/FaqAccordion.tsx`

**Interfaces:**
- Produces: `FaqAccordion({ faqs })` default export, `faqs: { q: string; a: string }[]`. Used by Task 16 (faq).

- [ ] **Step 1: Create the component**

```tsx
type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-6">
          <summary className="flex items-center justify-between cursor-pointer text-ink font-medium list-none">
            {f.q}
            <span className="text-secondary group-open:rotate-45 transition-transform">+</span>
          </summary>
          <div className="mt-3 text-sm text-secondary">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/FaqAccordion.tsx
git commit -m "feat: add FaqAccordion component"
```

---

### Task 9: Rewrite `Header`

**Files:**
- Modify: `src/components/Header.tsx` (full rewrite)

**Interfaces:**
- Produces: default export `Header()`, a client component (`"use client"`) with internal `open` state for the mobile overlay. No props — consumed as-is by `src/app/layout.tsx` (already imports it, no change needed there).

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/about", label: "회사소개" },
  { href: "/services", label: "서비스안내" },
  { href: "/guide", label: "업무절차" },
  { href: "/blog", label: "블로그" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의상담" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-line sticky top-0 z-50">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="font-bold text-xl text-ink" onClick={() => setOpen(false)}>
          횡성우림측량
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink hover:text-secondary">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href="tel:033-345-1253" className="hidden md:block text-sm font-semibold text-ink">
          033-345-1253
        </a>

        <button
          aria-label="메뉴 열기"
          className="md:hidden text-2xl text-ink"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="container flex items-center justify-between py-5">
            <span className="font-bold text-xl text-ink">횡성우림측량</span>
            <button aria-label="메뉴 닫기" className="text-2xl text-ink" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:033-345-1253" className="text-lg text-secondary">
              033-345-1253
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
```

Note: the old file wrapped `<a>` inside `<Link>` — invalid in Next.js 13+ (`Link` renders its own anchor). This rewrite uses `Link` directly, fixing a latent nested-`<a>` bug at the same time.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "redesign: rewrite Header with monotone style and mobile overlay nav"
```

---

### Task 10: Rewrite `Footer`

**Files:**
- Modify: `src/components/Footer.tsx` (full rewrite)

**Interfaces:**
- Produces: default export `Footer()`. No props — consumed as-is by `src/app/layout.tsx`.

- [ ] **Step 1: Replace the file**

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-line">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <div className="font-bold text-lg text-ink">횡성우림측량</div>
            <div className="text-sm mt-2 text-secondary">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
            <div className="text-sm mt-1 text-secondary">전화: 033-345-1253</div>
            <a href="#" className="inline-block mt-4 text-sm border-b border-ink text-ink">
              카카오톡 상담
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="font-semibold text-ink">서비스</div>
              <ul className="mt-3 text-sm text-secondary space-y-2">
                <li><Link href="/services">서비스안내</Link></li>
                <li><Link href="/guide">업무절차</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink">고객지원</div>
              <ul className="mt-3 text-sm text-secondary space-y-2">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">문의상담</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line text-sm text-secondary">
          © {new Date().getFullYear()} 횡성우림측량. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "redesign: rewrite Footer with monotone style"
```

---

### Task 11: Rewrite home page (`/`)

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `ServiceCard` (Task 5), `BlogCard` (Task 6), `Button` (Task 3), `FadeInSection`/`FadeInGrid`/`FadeInItem` (Task 1).

- [ ] **Step 1: Replace the file**

```tsx
import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import { FadeInSection, FadeInGrid, FadeInItem } from "../components/FadeInSection";

const featuredServices = [
  {
    title: "개발행위허가",
    description: "토지 개발을 위한 인허가 전 과정을 대행합니다.",
    href: "/services#development",
    imageSrc: "/images/service-1.jpg",
  },
  {
    title: "농지전용",
    description: "농지를 대지·잡종지로 전환하는 절차를 지원합니다.",
    href: "/services#farmland",
    imageSrc: "/images/service-2.jpg",
  },
  {
    title: "태양광 인허가",
    description: "태양광 발전소 설치 인허가 및 측량을 일괄 처리합니다.",
    href: "/services#solar",
    imageSrc: "/images/service-4.jpg",
  },
];

const recentPosts = [
  { slug: "post-1", title: "블로그 글 샘플 1", date: "2026-06-01", imageSrc: "/images/blog-post-1.jpg" },
  { slug: "post-2", title: "블로그 글 샘플 2", date: "2026-05-20", imageSrc: "/images/blog-post-2.jpg" },
  { slug: "post-3", title: "블로그 글 샘플 3", date: "2026-04-15", imageSrc: "/images/blog-post-3.jpg" },
];

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection
        engLabel="HOENGSEONG URIM SURVEY"
        title="정확한 측량, 확실한 인허가"
        subtitle="횡성군청 10년 실무경력으로 토지 인허가의 모든 절차를 책임집니다."
        imageSrc="/images/hero-main.jpg"
        imageAlt="횡성우림측량 현장 사진"
        size="full"
      >
        <div className="mt-8 flex gap-4">
          <Button href="/contact" variant="inverted">상담 문의하기</Button>
          <Button href="tel:033-345-1253" variant="text">033-345-1253</Button>
        </div>
      </HeroSection>

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <div className="eng-label">OUR SERVICES</div>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">핵심 서비스</h2>
          </FadeInSection>
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((s) => (
              <FadeInItem key={s.title}>
                <ServiceCard {...s} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      <section className="py-20 bg-bg-soft">
        <div className="container">
          <FadeInSection>
            <div className="eng-label">RECENT NEWS</div>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">최근 소식</h2>
          </FadeInSection>
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((p) => (
              <FadeInItem key={p.slug}>
                <BlogCard {...p} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      <section className="w-full bg-ink text-white py-16">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">상담이 필요하신가요?</h3>
            <p className="mt-2 text-white/80">지금 바로 문의주시면 빠르게 도와드리겠습니다.</p>
          </div>
          <Button href="/contact" variant="inverted">상담 문의</Button>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000/`. Confirm: hero fades in once on load, service cards and blog cards fade in with stagger on scroll, no navy/blue color visible anywhere, phone link `tel:033-345-1253` and "상담 문의하기"/"상담 문의" buttons are legible against the dark hero/CTA backgrounds.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "redesign: rewrite home page with monotone layout and scroll animations"
```

---

### Task 12: Rewrite `/about`

**Files:**
- Modify: `src/app/about/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `FadeInSection` (Task 1).

- [ ] **Step 1: Replace the file**

```tsx
import HeroSection from "../../components/HeroSection";
import { FadeInSection } from "../../components/FadeInSection";

const strengths = [
  {
    title: "10년 실무 경력",
    desc: "횡성군청에서 쌓은 행정 실무 경험을 바탕으로 인허가 절차를 정확하게 처리합니다.",
  },
  {
    title: "강원 지역 전반 대응",
    desc: "횡성·원주·평창·홍천 등 강원 지역 전반의 토지 측량 및 인허가 업무를 지원합니다.",
  },
  {
    title: "토지 인허가 전문",
    desc: "개발행위·농지전용·산지전용·태양광·도로점용·현황측량까지 모든 절차를 담당합니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <HeroSection
        engLabel="ABOUT"
        title="회사소개"
        imageSrc="/images/about-team.jpg"
        imageAlt="횡성우림측량 사무실"
      />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <p className="text-lg text-ink max-w-2xl leading-relaxed">
              횡성군 소재 측량사무소입니다. 개발행위·농지전용·산지전용·태양광·도로점용·현황측량 등
              토지 인허가에 필요한 모든 측량 업무를 담당합니다. 횡성군청 10년 실무 경력을 바탕으로
              행정 절차를 정확하고 신속하게 처리합니다.
            </p>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20 bg-bg-soft">
        <div className="container">
          <div className="eng-label">WHY US</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-10 text-ink">강점</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((s) => (
              <FadeInSection key={s.title}>
                <div className="border-t-2 border-ink pt-6">
                  <div className="font-semibold text-ink">{s.title}</div>
                  <div className="mt-2 text-sm text-secondary">{s.desc}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="eng-label">LOCATION</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 text-ink">오시는 길</h2>
          <div className="text-ink">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
          <div className="mt-1 text-secondary">전화: 033-345-1253</div>
          <div className="mt-6 w-full h-72 bg-bg-soft flex items-center justify-center text-secondary text-sm">
            구글 지도 위치 삽입 예정
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "redesign: rewrite about page with monotone layout"
```

---

### Task 13: Rewrite `/services`

**Files:**
- Modify: `src/app/services/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `ServiceCard` (Task 5), `FadeInSection`/`FadeInGrid`/`FadeInItem` (Task 1).

- [ ] **Step 1: Replace the file**

```tsx
import HeroSection from "../../components/HeroSection";
import ServiceCard from "../../components/ServiceCard";
import { FadeInSection, FadeInGrid, FadeInItem } from "../../components/FadeInSection";

const services = [
  { id: "development", title: "개발행위허가", description: "토지 개발을 위한 인허가 전 과정(현장조사, 설계 협의, 신청 등)을 대행합니다.", imageSrc: "/images/service-1.jpg" },
  { id: "farmland", title: "농지전용", description: "농지를 대지 또는 잡종지로 전환하기 위한 법적 절차를 지원합니다.", imageSrc: "/images/service-2.jpg" },
  { id: "forest", title: "산지전용", description: "산지를 다른 용도로 전환하기 위한 인허가 절차를 대행합니다.", imageSrc: "/images/service-3.jpg" },
  { id: "solar", title: "태양광 인허가", description: "태양광 발전설비 설치를 위한 인허가 및 관련 측량을 일괄 처리합니다.", imageSrc: "/images/service-4.jpg" },
  { id: "road", title: "도로점용", description: "도로 점용을 위한 허가 신청 및 관련 절차를 지원합니다.", imageSrc: "/images/service-5.jpg" },
  { id: "survey", title: "현황측량", description: "토지 현황을 정확히 파악하는 측량 업무를 수행합니다.", imageSrc: "/images/service-6.jpg" },
];

export default function ServicesPage() {
  return (
    <div>
      <HeroSection
        engLabel="OUR SERVICES"
        title="서비스 안내"
        subtitle="횡성우림측량의 핵심 서비스 6종입니다."
        imageSrc="/images/service-1.jpg"
        imageAlt="측량 서비스"
      />

      <section className="py-20">
        <div className="container">
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <FadeInItem key={s.id}>
                <ServiceCard title={s.title} description={s.description} href={`#${s.id}`} imageSrc={s.imageSrc} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-16 ${i % 2 === 1 ? "bg-bg-soft" : ""}`}>
          <div className="container">
            <FadeInSection>
              <h2 className="text-2xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-3 text-secondary max-w-2xl">{s.description}</p>
            </FadeInSection>
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "redesign: rewrite services page with 6-service grid and detail sections"
```

---

### Task 14: Rewrite `/guide`

**Files:**
- Modify: `src/app/guide/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `StepTimeline` (Task 7), `FadeInSection` (Task 1).

- [ ] **Step 1: Replace the file**

```tsx
import HeroSection from "../../components/HeroSection";
import StepTimeline from "../../components/StepTimeline";
import { FadeInSection } from "../../components/FadeInSection";

const steps = [
  { title: "상담", desc: "요구사항 확인 및 초기 상담 (예상 1~3일)" },
  { title: "현장확인", desc: "현장 방문 및 기초 측량 (예상 1~7일)" },
  { title: "서류준비", desc: "신청서 및 관련 서류 준비" },
  { title: "인허가 신청", desc: "관할 기관에 서류 제출 및 대응" },
  { title: "완료", desc: "허가 완료 및 사후관리" },
];

export default function GuidePage() {
  return (
    <div>
      <HeroSection
        engLabel="WORK PROCESS"
        title="업무절차"
        subtitle="의뢰부터 완료까지의 일반적인 절차와 예상 기간을 안내합니다."
        imageSrc="/images/hero-main.jpg"
        imageAlt="업무절차"
      />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <StepTimeline steps={steps} />
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/app/guide/page.tsx
git commit -m "redesign: rewrite guide page with step timeline"
```

---

### Task 15: Rewrite `/blog` and `/blog/[slug]`

**Files:**
- Modify: `src/app/blog/page.tsx` (full rewrite)
- Modify: `src/app/blog/[slug]/page.tsx` (style-only touch-up, keep existing placeholder-content logic)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `BlogCard` (Task 6), `FadeInGrid`/`FadeInItem` (Task 1).

- [ ] **Step 1: Replace `src/app/blog/page.tsx`**

```tsx
import HeroSection from "../../components/HeroSection";
import BlogCard from "../../components/BlogCard";
import { FadeInGrid, FadeInItem } from "../../components/FadeInSection";

const posts = [
  { slug: "post-1", title: "블로그 글 샘플 1", date: "2026-06-01", imageSrc: "/images/blog-post-1.jpg" },
  { slug: "post-2", title: "블로그 글 샘플 2", date: "2026-05-20", imageSrc: "/images/blog-post-2.jpg" },
  { slug: "post-3", title: "블로그 글 샘플 3", date: "2026-04-15", imageSrc: "/images/blog-post-3.jpg" },
];

export default function BlogIndex() {
  return (
    <div>
      <HeroSection engLabel="RECENT NEWS" title="블로그" imageSrc="/images/hero-main.jpg" imageAlt="블로그" />

      <section className="py-20">
        <div className="container">
          <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((p) => (
              <FadeInItem key={p.slug}>
                <BlogCard {...p} />
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Restyle `src/app/blog/[slug]/page.tsx`**

Keep the exact same placeholder data/logic (`notFound()` check, hardcoded `post` object) — only change the JSX classes to the monotone tokens:

```tsx
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export default function PostPage({ params }: Props) {
  const { slug } = params;
  // Placeholder: in future fetch from Supabase or CMS
  const post = { title: '샘플 포스트', date: '2026-06-01', content: '본문 내용이 여기에 표시됩니다.' };

  if (!post) return notFound();

  return (
    <div className="container py-16">
      <div className="text-sm text-secondary">{post.date}</div>
      <h1 className="text-3xl font-bold mt-2 text-ink">{post.title}</h1>
      <div className="mt-6 text-ink leading-relaxed">{post.content}</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx"
git commit -m "redesign: rewrite blog index and restyle post detail page"
```

---

### Task 16: Rewrite `/faq`

**Files:**
- Modify: `src/app/faq/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `FaqAccordion` (Task 8), `FadeInSection` (Task 1).

- [ ] **Step 1: Replace the file**

```tsx
import HeroSection from "../../components/HeroSection";
import FaqAccordion from "../../components/FaqAccordion";
import { FadeInSection } from "../../components/FadeInSection";

const faqs = [
  { q: "측량 비용은 어떻게 되나요?", a: "거리와 면적, 현장 조건에 따라 다릅니다. 문의주시면 견적 드립니다." },
  { q: "인허가 기간은 얼마나 걸리나요?", a: "관할 기관과 서류 준비 상태에 따라 다르며 보통 몇 주에서 몇 달 정도 소요됩니다." },
  { q: "농지전용이 가능한지 어떻게 확인하나요?", a: "현장 확인 후 관련 법령과 지적도를 통해 판단해 드립니다." },
];

export default function FAQPage() {
  return (
    <div>
      <HeroSection engLabel="FAQ" title="자주 묻는 질문" imageSrc="/images/hero-main.jpg" imageAlt="FAQ" />

      <section className="py-20">
        <div className="container">
          <FadeInSection>
            <FaqAccordion faqs={faqs} />
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/app/faq/page.tsx
git commit -m "redesign: rewrite faq page with accordion"
```

---

### Task 17: Restyle `/contact` (keep form logic)

**Files:**
- Modify: `src/app/contact/page.tsx` (JSX/style rewrite only — keep the existing `useState`/`handleSubmit`/`fetch('/api/contact')` logic byte-for-byte in behavior)

**Interfaces:**
- Consumes: `HeroSection` (Task 4), `FadeInSection` (Task 1). Does not touch `src/app/api/contact/route.ts` — Supabase wiring is explicitly out of scope (Global Constraints).

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import { useState } from "react";
import HeroSection from "../../components/HeroSection";
import { FadeInSection } from "../../components/FadeInSection";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "개발행위허가", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    alert('전송되었습니다.');
  };

  return (
    <div>
      <HeroSection engLabel="CONTACT" title="문의상담" imageSrc="/images/hero-main.jpg" imageAlt="문의상담" />

      <section className="py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeInSection>
            <h2 className="text-xl font-semibold text-ink">오시는 길</h2>
            <div className="mt-4 text-ink">강원특별자치도 횡성군 태기로 16, 3층 302호</div>
            <div className="mt-1 text-secondary">전화: 033-345-1253</div>
            <div className="mt-8 w-full h-64 bg-bg-soft flex items-center justify-center text-secondary text-sm">
              구글 지도 위치 삽입 예정
            </div>
          </FadeInSection>

          <FadeInSection>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink">이름</label>
                <input
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">연락처</label>
                <input
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">문의유형</label>
                <select
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>개발행위허가</option>
                  <option>농지전용</option>
                  <option>산지전용</option>
                  <option>태양광 인허가</option>
                  <option>도로점용</option>
                  <option>현황측량</option>
                  <option>기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">내용</label>
                <textarea
                  className="mt-1 w-full border border-line p-3 focus:border-ink outline-none"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="bg-ink text-white px-6 py-3 hover:bg-hover transition-colors">
                문의 보내기
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000/contact`, fill the form, submit, confirm the existing `alert('전송되었습니다.')` still fires (proves form logic untouched) and layout matches the two-column monotone design.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "redesign: restyle contact page, keep existing form logic"
```

---

### Task 18: Metadata, image manifest, and full-site check

**Files:**
- Modify: `src/app/layout.tsx` (metadata text only)
- Modify: `public/images/README.md` (update expected filename list to match paths used above)

**Interfaces:**
- None — this is the final polish/verification task.

- [ ] **Step 1: Update metadata in `src/app/layout.tsx`**

Change only the `metadata` export (leave the rest of the file untouched):

```tsx
export const metadata: Metadata = {
  title: "횡성우림측량",
  description: "횡성 토지측량 및 인허가 전문 - 개발행위·농지전용·산지전용·태양광·도로점용·현황측량",
};
```

- [ ] **Step 2: Replace `public/images/README.md`**

```markdown
Add the following image files for the site to `public/images/`:

- hero-main.jpg (홈/guide/blog/faq/contact 히어로 배경, 1920px 권장)
- about-team.jpg (회사소개 히어로 배경)
- service-1.jpg ~ service-6.jpg (서비스 6종 카드: 개발행위허가/농지전용/산지전용/태양광/도로점용/현황측량 순서)
- blog-post-1.jpg ~ blog-post-3.jpg (블로그 목록 카드 썸네일)

Images should be high-resolution (1920px width recommended for heroes, 800px+ for cards) in JPG/PNG format.
These are placeholders — every page references these exact paths, so dropping a matching file here replaces
the gray placeholder automatically with no code changes needed.
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0, all 7 routes (`/`, `/about`, `/services`, `/guide`, `/blog`, `/blog/[slug]`, `/faq`, `/contact`) listed in the build output as before.

- [ ] **Step 4: Full manual walkthrough**

Run: `npm run dev`. Visit every route (`/`, `/about`, `/services`, `/guide`, `/blog`, `/blog/post-1`, `/faq`, `/contact`) at both desktop and mobile widths (use browser devtools responsive mode). Confirm for each: no navy/blue color visible, Pretendard font loads (check via devtools computed font-family), header/footer identical across pages, mobile hamburger opens/closes the fullscreen nav, scroll fade-ins fire once and don't re-trigger on scroll-back.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx public/images/README.md
git commit -m "redesign: update metadata and image manifest for new asset paths"
```
