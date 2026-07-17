"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
}

function DeleteModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-lg font-bold text-ink mb-2 text-center">글 삭제</h2>
        <p className="text-sm text-secondary text-center mb-6">
          이 글을 삭제하면 복구할 수 없습니다.<br />정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            삭제하기
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-line text-secondary rounded-lg font-medium hover:border-ink hover:text-ink transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PostActions({ slug }: Props) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false); // sessionStorage 확인 완료 여부
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("blog_auth") === "1") {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("삭제 실패");
      setDeleting(false);
      return;
    }
    router.push("/blog");
    router.refresh();
  };

  // 확인 전이거나 비인증 상태: 아무것도 렌더링하지 않음
  if (!ready || !authed) return null;

  return (
    <>
      <div className="flex justify-center gap-3 mt-5">
        <button
          onClick={() => router.push(`/blog/${encodeURIComponent(slug)}/edit`)}
          className="px-4 py-1.5 text-xs border border-line text-secondary rounded-md hover:border-ink hover:text-ink transition-colors"
        >
          수정
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-1.5 text-xs border border-line text-secondary rounded-md hover:border-red-400 hover:text-red-500 transition-colors"
        >
          삭제
        </button>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <p className="text-secondary text-sm">삭제 중...</p>
        </div>
      )}
    </>
  );
}
