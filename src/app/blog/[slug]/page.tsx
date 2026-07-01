import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export default function PostPage({ params }: Props) {
  const { slug } = params;
  // Placeholder: in future fetch from Supabase or CMS
  const post = { title: '샘플 포스트', date: '2026-06-01', content: '본문 내용이 여기에 표시됩니다.' };

  if (!post) return notFound();

  return (
    <div className="container py-16">
      <div className="text-sm text-secondary">{post.date}</div>
      <h1 className="text-3xl font-bold mt-2 text-ink">{post.title}</h1>
      <div className="mt-6 text-ink leading-relaxed">{post.content}</div>
    </div>
  );
}
