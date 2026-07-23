import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroSection from "../../../../components/HeroSection";
import BlogCard from "../../../../components/BlogCard";
import { FadeInGrid, FadeInItem } from "../../../../components/FadeInSection";
import { getPostsByCategory } from "../../../../lib/posts";
import { CATEGORIES, getCategoryLabel, isValidCategory } from "../../../../lib/categories";

export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  if (!label) return {};

  return {
    title: `${label} 사례`,
    description: `횡성우림측량의 ${label} 업무사례를 소개합니다.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isValidCategory(category)) return notFound();

  const label = getCategoryLabel(category);
  const posts = getPostsByCategory(category);

  return (
    <div>
      <HeroSection
        engLabel="CATEGORY"
        title={`${label} 사례`}
        imageSrc="/images/hero-main.jpg"
        imageAlt={label ?? ""}
      />

      <section className="py-20">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-secondary">
              아직 등록된 {label} 사례가 없습니다.
            </div>
          ) : (
            <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((p) => (
                <FadeInItem key={p.slug}>
                  <BlogCard
                    slug={p.slug}
                    title={p.title}
                    date={p.createdAt.slice(0, 10)}
                    imageSrc={p.coverImage ?? "/images/blog-post-1.jpg"}
                  />
                </FadeInItem>
              ))}
            </FadeInGrid>
          )}

          <div className="flex justify-center mt-16">
            <Link
              href="/blog"
              className="px-5 py-2.5 border border-line text-secondary text-sm rounded-lg hover:border-ink hover:text-ink transition-colors"
            >
              전체 글 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
