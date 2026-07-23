"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CATEGORIES } from "../../../../lib/categories";

const TipTapEditor = dynamic(() => import("../../../../components/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="border border-line rounded-lg min-h-[420px] bg-bg-soft animate-pulse" />,
});

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      sessionStorage.setItem("blog_auth", "1");
      onAuth();
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-ink mb-6 text-center">관리자 확인</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoFocus
            className="w-full px-4 py-3 border border-line rounded-lg text-ink placeholder:text-secondary focus:outline-none focus:border-ink"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full py-3 bg-ink text-white rounded-lg font-medium hover:bg-hover transition-colors disabled:opacity-50"
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function EditForm() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("blog_auth") === "1") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  // 인증 후 기존 글 데이터 불러오기
  useEffect(() => {
    if (!authed) return;
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
      const result = await res.json();
      if (!res.ok || !result.ok) {
        router.push("/blog");
        return;
      }
      const data = result.post;
      setTitle(data.title);
      setCategory(data.category ?? "");
      setContent(data.content);
      if (data.coverImage) {
        setCoverImage(data.coverImage);
        setPreviewUrl(data.coverImage);
      }
      setLoading(false);
    };
    fetchPost();
  }, [authed, slug, router]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/posts/upload-image", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (!res.ok || !result.ok) {
      setError("이미지 업로드 실패");
      setPreviewUrl(coverImage);
      setUploading(false);
      return;
    }

    setCoverImage(result.path);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!title.trim()) { setError("제목을 입력해주세요."); return; }
    if (!content || content === "<p></p>") { setError("본문을 입력해주세요."); return; }
    setSaving(true);
    setError("");

    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        content,
        coverImage: coverImage || null,
        category: category || null,
      }),
    });

    if (!res.ok) {
      setError("저장 실패");
      setSaving(false);
      return;
    }

    router.push(`/blog/${encodeURIComponent(slug)}`);
    router.refresh();
  };

  if (checking) return null;
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  if (loading) return (
    <div className="container py-20 text-center text-secondary text-sm">글 정보를 불러오는 중...</div>
  );

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-ink mb-8">글 수정</h1>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 제목 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="글 제목을 입력하세요"
          className="w-full px-4 py-3 border border-line rounded-lg text-ink placeholder:text-secondary focus:outline-none focus:border-ink"
        />
      </div>

      {/* 카테고리 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary mb-1">
          카테고리 <span className="text-xs">(선택)</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-line rounded-lg text-ink focus:outline-none focus:border-ink bg-white"
        >
          <option value="">선택 안 함</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* 대표 이미지 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary mb-1">
          대표 이미지 <span className="text-xs">(선택)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        {previewUrl ? (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-line">
              <Image src={previewUrl} alt="대표 이미지 미리보기" fill className="object-cover" />
              {uploading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-secondary">
                  업로드 중...
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-ink hover:underline font-medium"
              >
                이미지 변경
              </button>
              <button
                type="button"
                onClick={() => { setPreviewUrl(""); setCoverImage(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="text-xs text-secondary hover:text-ink underline"
              >
                이미지 제거
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-line rounded-lg flex flex-col items-center justify-center gap-2 text-secondary hover:border-ink hover:text-ink transition-colors"
          >
            <span className="text-2xl">+</span>
            <span className="text-sm">클릭해서 이미지 선택</span>
            <span className="text-xs">JPG, PNG, WEBP 지원</span>
          </button>
        )}
      </div>

      {/* 에디터 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-secondary mb-1">본문</label>
        {content !== "" && (
          <TipTapEditor content={content} onChange={setContent} />
        )}
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="px-6 py-3 bg-ink text-white rounded-lg font-medium hover:bg-hover transition-colors disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 border border-line text-secondary rounded-lg font-medium hover:border-ink hover:text-ink transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
}
