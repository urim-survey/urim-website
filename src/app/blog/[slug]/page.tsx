import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import PostActions from "./PostActions";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

function getOtherPosts(currentSlug: string) {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);
}

function htmlToText(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const post = getPostBySlug(decodeURIComponent(rawSlug));
  if (!post) return {};

  const description = htmlToText(post.content).slice(0, 150);

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.createdAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const post = getPostBySlug(slug);
  const otherPosts = getOtherPosts(slug);

  if (!post) return notFound();

  return (
    <div>
      {/* ── 제목 · 날짜 (상단 가운데 정렬) ── */}
      <div className="container max-w-3xl pt-14 pb-10 text-center">
        <p className="text-sm text-secondary mb-3 tracking-wide">
          {post.createdAt.slice(0, 10)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight">
          {post.title}
        </h1>
      </div>

      {/* ── 관리자 수정·삭제 버튼 (인증 시에만 표시) ── */}
      <PostActions slug={post.slug} />

      {/* ── 썸네일 (뿌옇게) ── */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-[420px] overflow-hidden">
          {/* 살짝 blur + 확대(scale-105)로 blur 경계 흰 테두리 방지 */}
          <Image
            src={post.coverImage}
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
                  key={p.slug}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="group block"
                >
                  {/* 썸네일 */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-soft mb-3">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage}
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
                    {p.createdAt.slice(0, 10)}
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
