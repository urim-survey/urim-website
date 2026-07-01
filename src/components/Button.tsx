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
