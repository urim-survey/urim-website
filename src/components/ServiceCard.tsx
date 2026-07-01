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
