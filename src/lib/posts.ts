import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  coverImage: string | null;
  createdAt: string;
  content: string;
};

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function readPostFile(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    coverImage: data.coverImage ?? null,
    createdAt: data.createdAt ?? "",
    content,
  };
}

export function getAllPosts(): Post[] {
  ensureDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((file) => readPostFile(file.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null);

  return posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

export function createPost(input: {
  slug: string;
  title: string;
  coverImage: string | null;
  content: string;
}) {
  ensureDir();
  const file = matter.stringify(input.content, {
    title: input.title,
    coverImage: input.coverImage,
    createdAt: new Date().toISOString(),
  });
  fs.writeFileSync(path.join(POSTS_DIR, `${input.slug}.md`), file, "utf-8");
}

export function updatePost(
  slug: string,
  input: { title: string; coverImage: string | null; content: string }
) {
  const existing = readPostFile(slug);
  if (!existing) throw new Error("Post not found");

  const file = matter.stringify(input.content, {
    title: input.title,
    coverImage: input.coverImage,
    createdAt: existing.createdAt,
  });
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), file, "utf-8");
}

export function deletePost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
