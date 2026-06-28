import AdminBlogClient from "./AdminBlogClient";
import { getPosts } from "./actions";

export const metadata = {
  title: "블로그 관리 | 우림측량",
  robots: "noindex, nofollow",
};

export default async function AdminBlogPage() {
  const posts = await getPosts();
  return <AdminBlogClient initialPosts={posts} />;
}
