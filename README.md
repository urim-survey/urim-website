This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Notes (우림측량)

This repository contains the 우림측량 website scaffold implemented with Next.js + TypeScript + Tailwind.

### Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

### Images / Assets

Place brand images in `public/images/` using the filenames below (placeholders expected):

- `hero-main.jpg` — 홈 히어로 배경
- `service-dev.jpg` — 개발행위허가 섹션
- `service-farm.jpg` — 농지전용 섹션
- `service-solar.jpg` — 태양광 섹션
- `about-office.jpg` — 회사소개 배너
- `process-bg.jpg` — 업무절차 배너
- `cta-band.jpg` — 하단 CTA 배경

### Supabase (문의폼 / 블로그)

The site includes a placeholder API at `/api/contact`. To persist submissions to Supabase, create a Supabase project and add the keys to environment variables, then replace the API implementation to call Supabase.

Environment variables (example):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Deploy

Deploy to Vercel by connecting the repository and setting the above environment variables for production.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
