import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useRef } from "react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}

type Align = "left" | "center" | "right";

interface ViewProps {
  node: { attrs: { src: string; alt?: string; width?: number | null; align?: Align | null } };
  updateAttributes: (attrs: object) => void;
  selected: boolean;
}

function ResizableImageView({ node, updateAttributes, selected }: ViewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { src, alt, width, align = "center" } = node.attrs;

  // 정렬에 따른 마진 스타일
  const marginStyle: React.CSSProperties =
    align === "left"
      ? { marginLeft: 0, marginRight: "auto" }
      : align === "right"
      ? { marginLeft: "auto", marginRight: 0 }
      : { marginLeft: "auto", marginRight: "auto" };

  const startResize = (e: React.MouseEvent, dir: "left" | "right") => {
    e.preventDefault();
    const x0 = e.clientX;
    const w0 = imgRef.current?.offsetWidth ?? 400;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - x0;
      const newW = Math.max(80, Math.round(dir === "right" ? w0 + delta : w0 - delta));
      updateAttributes({ width: newW });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const AlignBtn = ({
    value,
    icon,
    label,
  }: {
    value: Align;
    icon: string;
    label: string;
  }) => (
    <button
      type="button"
      title={label}
      onMouseDown={(e) => {
        e.preventDefault();
        updateAttributes({ align: value });
      }}
      className={`px-2 py-0.5 rounded text-xs transition-colors ${
        align === value
          ? "bg-ink text-white"
          : "text-secondary hover:bg-line"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <NodeViewWrapper>
      <div
        className="relative my-3 max-w-full"
        style={{ width: width ? `${width}px` : "100%", ...marginStyle }}
      >
        {/* 선택 시 — 정렬 버튼 플로팅 */}
        {selected && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex gap-0.5 bg-white border border-line rounded-md shadow-md px-1.5 py-1 z-20 select-none">
            <AlignBtn value="left"   icon="◀ 왼쪽"    label="왼쪽 정렬" />
            <AlignBtn value="center" icon="■ 가운데"   label="가운데 정렬" />
            <AlignBtn value="right"  icon="오른쪽 ▶"  label="오른쪽 정렬" />
          </div>
        )}

        <img
          ref={imgRef}
          src={src}
          alt={alt ?? ""}
          className={`block w-full${selected ? " ring-2 ring-ink ring-offset-2" : ""}`}
          draggable={false}
        />

        {/* 선택 시 — 크기 조절 핸들 */}
        {selected && (
          <>
            <div
              title="왼쪽으로 크기 조절"
              onMouseDown={(e) => startResize(e, "left")}
              className="absolute top-1/2 -left-3 -translate-y-1/2 w-3 h-12 bg-ink/70 hover:bg-ink rounded cursor-ew-resize"
            />
            <div
              title="오른쪽으로 크기 조절"
              onMouseDown={(e) => startResize(e, "right")}
              className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-12 bg-ink/70 hover:bg-ink rounded cursor-ew-resize"
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-secondary bg-white border border-line px-2 py-0.5 rounded whitespace-nowrap select-none">
              {width ? `${width}px` : "전체 너비"} · {align === "left" ? "왼쪽" : align === "right" ? "오른쪽" : "가운데"}
            </span>
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}

export const ResizableImage = Node.create({
  name: "image",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src:   { default: null },
      alt:   { default: null },
      title: { default: null },
      width: { default: null },
      align: { default: "center" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (element) => {
          const el = element as HTMLImageElement;
          return {
            src:   el.getAttribute("src"),
            alt:   el.getAttribute("alt"),
            title: el.getAttribute("title"),
            width: el.getAttribute("width") ? parseInt(el.getAttribute("width")!, 10) : null,
            align: el.getAttribute("data-align") ?? "center",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes, { "data-align": HTMLAttributes.align })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands }: { commands: { insertContent: (c: unknown) => boolean } }) => {
          return commands.insertContent({ type: this.name, attrs: options });
        },
    };
  },
});
