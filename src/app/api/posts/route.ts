import { NextResponse } from "next/server";
import { createPost } from "../../../lib/posts";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.slug || !body?.title || !body?.content) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  try {
    createPost({
      slug: body.slug,
      title: body.title,
      coverImage: body.coverImage || null,
      content: body.content,
    });
    return NextResponse.json({ ok: true, slug: body.slug });
  } catch {
    return NextResponse.json({ ok: false, error: "저장 실패" }, { status: 500 });
  }
}
