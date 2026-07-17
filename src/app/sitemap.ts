import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
import { SITE_URL } from "../lib/site";

const staticPaths = ["", "about", "services", "guide", "blog", "faq", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
  }));

  return [...staticEntries, ...postEntries];
}
