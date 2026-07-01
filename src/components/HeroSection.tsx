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
