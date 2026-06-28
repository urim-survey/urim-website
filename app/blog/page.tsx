import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "../lib/supabase";

export const metadata: Metadata = {
  title: "블로그 | 우림측량",
  description:
    "우림측량의 업무 사례, 업계 소식, 토지 인허가 정보를 확인하세요.",
};

type BlogPost = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  content: string;
  published_at: string;
  created_at: string;
};

const categoryColors: Record<string, string> = {
  업무사례: "bg-blue-100 text-blue-800",
  업계소식: "bg-green-100 text-green-800",
  공지사항: "bg-red-100 text-red-800",
  홍보: "bg-yellow-100 text-yellow-800",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").slice(0, 120);
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <section className="bg-[#003087] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">블로그</h1>
          <p className="text-blue-200 text-lg">
            업무 사례와 토지 인허가 정보를 공유합니다
          </p>
        </div>
      </section>

      {/* 블로그 목록 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                아직 게시글이 없습니다
              </h2>
              <p className="text-gray-500">
                곧 유익한 내용을 업로드할 예정입니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  {/* 썸네일 */}
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-[#003087] to-[#0057b8] flex items-center justify-center">
                      <span className="text-white text-4xl opacity-30">🏗️</span>
                    </div>
                  )}

                  <div className="p-5">
                    {/* 카테고리 + 날짜 */}
                    <div className="flex items-center gap-2 mb-3">
                      {post.category && (
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}
                        >
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h2 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* 미리보기 */}
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                      {stripHtml(post.content)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            인허가에 대해 직접 상담받고 싶으신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:033-345-1253"
              className="inline-flex items-center justify-center gap-2 bg-[#003087] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#0057b8] transition-colors"
            >
              033-345-1253 전화 상담
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#003087] text-[#003087] font-bold px-8 py-3 rounded-lg hover:bg-[#003087] hover:text-white transition-colors"
            >
              온라인 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
