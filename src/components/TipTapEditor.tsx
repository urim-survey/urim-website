"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { ResizableImage } from "./ResizableImage";
import { supabase } from "../lib/supabase";

// ─── FontSize custom extension ────────────────────────────────────────────────
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el: HTMLElement) => el.style.fontSize || null,
            renderHTML: (attrs: Record<string, string | null>) => {
              if (!attrs.fontSize) return {};
              return { style: `font-size: ${attrs.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }: { chain: () => { setMark: (name: string, attrs: object) => { run: () => boolean } } }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }: { chain: () => { setMark: (name: string, attrs: object) => { removeEmptyTextStyle: () => { run: () => boolean } } } }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});
// ─────────────────────────────────────────────────────────────────────────────

const FONTS = [
  { label: "Pretendard (기본)", value: "Pretendard" },
  { label: "노토 산스 KR", value: "Noto Sans KR" },
  { label: "노토 세리프 KR", value: "Noto Serif KR" },
  { label: "나눔고딕", value: "Nanum Gothic" },
  { label: "나눔명조", value: "Nanum Myeongjo" },
  { label: "나눔고딕 코딩", value: "Nanum Gothic Coding" },
  { label: "나눔손글씨 붓", value: "Nanum Brush Script" },
  { label: "나눔손글씨 펜", value: "Nanum Pen Script" },
  { label: "블랙한산스", value: "Black Han Sans" },
  { label: "도현", value: "Do Hyeon" },
  { label: "구기", value: "Gugi" },
  { label: "하이멜로디", value: "Hi Melody" },
  { label: "주아", value: "Jua" },
  { label: "키랑해랑", value: "Kirang Haerang" },
  { label: "스타일리시", value: "Stylish" },
  { label: "해바라기", value: "Sunflower" },
  { label: "독도", value: "Dokdo" },
  { label: "동해 독도", value: "East Sea Dokdo" },
  { label: "귀여운글씨체", value: "Cute Font" },
  { label: "고딕 A1", value: "Gothic A1" },
  { label: "IBM Plex 산스 KR", value: "IBM Plex Sans KR" },
  { label: "함렛", value: "Hahmlet" },
  { label: "가난한이야기", value: "Poor Story" },
  { label: "송명", value: "Song Myung" },
  { label: "Georgia (영문)", value: "Georgia" },
  { label: "Arial (영문)", value: "Arial" },
  { label: "Courier New (영문)", value: "Courier New" },
];

const FONT_SIZES = [
  "8px", "9px", "10px", "11px", "12px", "14px", "16px", "18px",
  "20px", "22px", "24px", "28px", "32px", "36px", "40px", "48px",
  "56px", "64px", "72px",
];

const COLORS = ["#111111", "#e53e3e", "#2b6cb0", "#276749", "#b7791f", "#6b46c1", "#6B6B6B"];

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function TipTapEditor({ content, onChange }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ResizableImage,
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] p-5 focus:outline-none prose prose-sm max-w-none text-ink leading-relaxed",
      },
    },
  });

  if (!editor) return null;

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setImageUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `body-${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("이미지 업로드 실패: " + error.message);
      setImageUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    setImageUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const addImage = () => imageInputRef.current?.click();

  const setLink = () => {
    const url = window.prompt("링크 URL을 입력하세요");
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  const ToolBtn = ({
    onClick,
    active,
    title,
    children,
    disabled,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`px-2 py-1 rounded text-sm transition-colors ${
        active
          ? "bg-ink text-white"
          : "text-secondary hover:bg-bg-soft hover:text-ink"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-line rounded-lg overflow-hidden">
      {/* ── 툴바 ── */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-line bg-bg-soft">

        {/* 제목 단계 */}
        <select
          className="text-sm border border-line rounded px-2 py-1 bg-white text-ink"
          onChange={(e) => {
            const v = e.target.value;
            if (v === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: Number(v) as 1 | 2 | 3 }).run();
          }}
          defaultValue="p"
        >
          <option value="p">본문</option>
          <option value="1">제목 1</option>
          <option value="2">제목 2</option>
          <option value="3">제목 3</option>
        </select>

        {/* 폰트 패밀리 */}
        <select
          className="text-sm border border-line rounded px-2 py-1 bg-white text-ink max-w-[130px]"
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          defaultValue="Pretendard"
        >
          {FONTS.map((f) => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>

        {/* 폰트 크기 */}
        <select
          className="text-sm border border-line rounded px-2 py-1 bg-white text-ink w-[76px]"
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value;
            if (v) editor.chain().focus().setFontSize(v).run();
            else editor.chain().focus().unsetFontSize().run();
          }}
        >
          <option value="">크기</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>{s.replace("px", "")}</option>
          ))}
        </select>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 텍스트 스타일 */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="굵게"><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="기울이기"><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="밑줄"><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="취소선"><s>S</s></ToolBtn>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 정렬 */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="왼쪽 정렬">◀</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="가운데 정렬">■</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="오른쪽 정렬">▶</ToolBtn>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 목록 */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="글머리 목록">• 목록</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="번호 목록">1. 목록</ToolBtn>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 글자색 */}
        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={`색상: ${c}`}
              onClick={() => editor.chain().focus().setColor(c).run()}
              className="w-5 h-5 rounded-full border border-line hover:scale-110 transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
          <input
            type="color"
            title="직접 색상 선택"
            className="w-6 h-6 rounded border border-line cursor-pointer"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </div>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 이미지 / 링크 */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageFileChange}
        />
        <ToolBtn onClick={addImage} title="이미지 삽입" disabled={imageUploading}>
          {imageUploading ? "업로드 중..." : "🖼 이미지"}
        </ToolBtn>
        <ToolBtn onClick={setLink} active={editor.isActive("link")} title="링크 삽입">🔗 링크</ToolBtn>

        <div className="w-px h-5 bg-line mx-1" />

        {/* 인용 / 코드 */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="인용구">" 인용</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="코드블록">{`<>`} 코드</ToolBtn>
      </div>

      {/* 에디터 본문 */}
      <EditorContent editor={editor} />
    </div>
  );
}
