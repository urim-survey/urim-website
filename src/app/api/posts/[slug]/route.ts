import { NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePost } from "../../../../lib/posts";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Params) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));
  if (!post) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, post });
}

export async function PUT(req: Request, { params }: Params) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const { slug } = await params;
  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.content) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  try {
    updatePost(decodeURIComponent(slug), {
      title: body.title,
      coverImage: body.coverImage || null,
      category: body.category || null,
      content: body.content,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "저장 실패" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const { slug } = await params;
  deletePost(decodeURIComponent(slug));
  return NextResponse.json({ ok: true });
}
