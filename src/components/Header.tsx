import Link from "next/link";

const navItems = [
  { href: "/about", label: "회사소개" },
  { href: "/services", label: "서비스안내" },
  { href: "/guide", label: "업무절차" },
  { href: "/blog", label: "블로그" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의상담" },
];

const mobileNavItems = navItems.filter((item) => item.href !== "/contact");

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-line sticky top-0 z-50">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="font-bold text-xl text-ink">
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
      </div>

      <nav className="md:hidden flex items-center justify-between gap-4 overflow-x-auto px-4 pb-3 text-sm">
        {mobileNavItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-ink hover:text-secondary">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
