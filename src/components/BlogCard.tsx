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
