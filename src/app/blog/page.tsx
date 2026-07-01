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
