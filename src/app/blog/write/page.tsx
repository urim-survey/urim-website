"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { supabase } from "../../../lib/supabase";

const TipTapEditor = dynamic(() => import("../../../components/TipTapEditor"), {
  ssr: false,
  loading: () => <div className="border border-line rounded-lg min-h-[420px] bg-bg-soft animate-pulse" />,
});

function slugify(text: string) {
  // 영문/숫자만 추출해 URL-safe 기반 생성, 한글 제목은 "post"로 대체
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
  return (base || "post") + "-" + Date.now();
}

export default function WritePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(""); // 업로드 후 저장될 public URL
  const [previewUrl, setPreviewUrl] = useState(""); // 미리보기용 로컬 URL
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 즉시 표시
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const fileName = `cover-${Date.now()}.${ext}`;

    const { data, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError("이미지 업로드 실패: " + uploadError.message);
      setPreviewUrl("");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    setCoverImage(urlData.publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!title.trim()) { setError("제목을 입력해주세요."); return; }
    if (!content || content === "<p></p>") { setError("본문을 입력해주세요."); return; }

    setSaving(true);
    setError("");

    const slug = slugify(title) + "-" + Date.now();

    const { error: dbError } = await supabase.from("posts").insert({
      title: title.trim(),
      content,
      slug,
      cover_image: coverImage || null,
    });

    if (dbError) {
      setError("저장 실패: " + dbError.message);
      setSaving(false);
      return;
    }

    router.push("/blog");
  };

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-ink mb-8">새 글 작성</h1>

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

      {/* 대표 이미지 업로드 */}
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
        <TipTapEditor content="" onChange={setContent} />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="px-6 py-3 bg-ink text-white rounded-lg font-medium hover:bg-hover transition-colors disabled:opacity-50"
        >
          {saving ? "저장 중..." : "발행하기"}
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
