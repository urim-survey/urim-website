"use server";

import { createServiceClient } from "../../lib/supabase";
import { revalidatePath } from "next/cache";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}

export async function createPost(data: {
  title: string;
  category: string;
  thumbnail_url: string;
  content: string;
  published_at: string;
}) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").insert([data]);
  if (error) return { success: false, message: error.message };
  revalidatePath("/blog");
  return { success: true };
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    category: string;
    thumbnail_url: string;
    content: string;
    published_at: string;
  }
) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/blog");
  return { success: true };
}

export async function deletePost(id: string) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/blog");
  return { success: true };
}

export async function getPosts() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}
