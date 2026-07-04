import Link from "next/link";
import HeroSection from "../../components/HeroSection";
import BlogCard from "../../components/BlogCard";
import { FadeInGrid, FadeInItem } from "../../components/FadeInSection";
import { supabase } from "../../lib/supabase";

export const revalidate = 60;

async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, cover_image, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div>
      <HeroSection engLabel="RECENT NEWS" title="블로그" imageSrc="/images/hero-main.jpg" imageAlt="블로그" />

      <section className="py-20">
        <div className="container">
          <div className="flex justify-end mb-8">
            <Link
              href="/blog/write"
              className="px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-hover transition-colors"
            >
              + 새 글 작성
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 text-secondary">
              아직 작성된 글이 없습니다.
            </div>
          ) : (
            <FadeInGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((p) => (
                <FadeInItem key={p.id}>
                  <BlogCard
                    slug={p.slug}
                    title={p.title}
                    date={p.created_at.slice(0, 10)}
                    imageSrc={p.cover_image ?? "/images/blog-post-1.jpg"}
                  />
                </FadeInItem>
              ))}
            </FadeInGrid>
          )}
        </div>
      </section>
    </div>
  );
}
