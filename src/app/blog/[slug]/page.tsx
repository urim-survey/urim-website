import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../../lib/supabase";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getOtherPosts(currentSlug: string) {
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, cover_image, created_at")
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function PostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [post, otherPosts] = await Promise.all([
    getPost(slug),
    getOtherPosts(slug),
  ]);

  if (!post) return notFound();

  return (
    <div>
      {/* ── 제목 · 날짜 (상단 가운데 정렬) ── */}
      <div className="container max-w-3xl pt-14 pb-10 text-center">
        <p className="text-sm text-secondary mb-3 tracking-wide">
          {post.created_at.slice(0, 10)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight">
          {post.title}
        </h1>
      </div>

      {/* ── 썸네일 (뿌옇게) ── */}
      {post.cover_image && (
        <div className="relative w-full h-64 md:h-[420px] overflow-hidden">
          {/* 살짝 blur + 확대(scale-105)로 blur 경계 흰 테두리 방지 */}
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover scale-[1.02] blur-[1px]"
            priority
          />
          {/* 뿌연 안개 오버레이 */}
          <div className="absolute inset-0 bg-white/20" />
        </div>
      )}

      {/* ── 본문 ── */}
      <div className="container max-w-3xl py-16">
        <div
          className="prose prose-sm max-w-none text-ink leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── 다른 글 보기 ── */}
        {otherPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-line">
            <h2 className="text-base font-semibold text-ink mb-8 tracking-tight">
              다른 글 보기
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="group block"
                >
                  {/* 썸네일 */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-soft mb-3">
                    {p.cover_image ? (
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-line" />
                    )}
                  </div>
                  {/* 날짜 · 제목 */}
                  <p className="text-xs text-secondary mb-1">
                    {p.created_at.slice(0, 10)}
                  </p>
                  <h3 className="text-sm font-semibold text-ink group-hover:text-secondary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>

            {/* 블로그 목록으로 돌아가기 */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-block px-6 py-2.5 border border-line text-secondary text-sm rounded-lg hover:border-ink hover:text-ink transition-colors"
              >
                목록으로
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
