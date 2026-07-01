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
