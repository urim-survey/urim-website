"use client";

import { useState } from "react";
import {
  verifyAdminPassword,
  createPost,
  updatePost,
  deletePost,
} from "./actions";

type Post = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  content: string;
  published_at: string;
  created_at: string;
};

type FormState = {
  title: string;
  category: string;
  thumbnail_url: string;
  content: string;
  published_at: string;
};

const categories = ["업무사례", "업계소식", "공지사항", "홍보"];

const emptyForm: FormState = {
  title: "",
  category: "업무사례",
  thumbnail_url: "",
  content: "",
  published_at: new Date().toISOString().split("T")[0],
};

export default function AdminBlogClient({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [authError, setAuthError] = useState("");

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    const ok = await verifyAdminPassword(pw);
    if (ok) {
      setAuthed(true);
    } else {
      setAuthError("비밀번호가 틀렸습니다.");
    }
  }

  function handleEdit(post: Post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      category: post.category,
      thumbnail_url: post.thumbnail_url ?? "",
      content: post.content,
      published_at: post.published_at?.split("T")[0] ?? new Date().toISOString().split("T")[0],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNew() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback("");

    if (editingId) {
      const result = await updatePost(editingId, form);
      if (result.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingId ? { ...p, ...form } : p
          )
        );
        setFeedback("수정되었습니다.");
      } else {
        setFeedback("오류: " + (result as { message?: string }).message);
      }
    } else {
      const result = await createPost(form);
      if (result.success) {
        setFeedback("등록되었습니다. 목록을 새로고침 해주세요.");
      } else {
        setFeedback("오류: " + (result as { message?: string }).message);
      }
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const result = await deletePost(id);
    if (result.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setFeedback("삭제되었습니다.");
    } else {
      setFeedback("삭제 오류: " + (result as { message?: string }).message);
    }
  }

  // 로그인 화면
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#003087] mb-6 text-center">
            관리자 로그인
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="관리자 비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087]"
            />
            {authError && (
              <p className="text-red-600 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#0057b8] transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#003087] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">블로그 관리</h1>
        <button
          onClick={handleNew}
          className="bg-white text-[#003087] font-bold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
        >
          + 새 글 작성
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {feedback && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            {feedback}
          </div>
        )}

        {/* 글 작성/수정 폼 */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-[#003087] mb-6">
              {editingId ? "글 수정" : "새 글 작성"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  제목 *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                  placeholder="글 제목"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    카테고리
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    발행일
                  </label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) =>
                      setForm({ ...form, published_at: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  썸네일 이미지 URL
                  <span className="text-gray-400 font-normal ml-1 text-xs">
                    (선택)
                  </span>
                </label>
                <input
                  type="url"
                  value={form.thumbnail_url}
                  onChange={(e) =>
                    setForm({ ...form, thumbnail_url: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  본문 *
                </label>
                <textarea
                  required
                  rows={12}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#003087] resize-y font-mono text-sm"
                  placeholder="본문을 입력하세요..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#003087] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#0057b8] transition-colors disabled:opacity-60"
                >
                  {saving ? "저장 중..." : editingId ? "수정 완료" : "등록하기"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 글 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">
              전체 글 ({posts.length}개)
            </h2>
          </div>
          {posts.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              등록된 글이 없습니다.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="px-6 py-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.published_at?.split("T")[0]}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 truncate">
                      {post.title}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
