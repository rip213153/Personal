import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="post-page">
      <header className="inner-nav page-shell"><Link href="/blog">← 返回博客</Link><Link href="/resume">简历 ↗</Link></header>
      <section className="post-hero page-shell">
        <div className="post-meta-line"><time>{post.date}</time><span>{post.tags.join(" / ")}</span><span>张杰</span></div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </section>
      <div className="post-layout page-shell">
        <aside className="post-toc" aria-label="文章目录">
          <p>IN THIS ARTICLE</p>
          <nav>{post.toc.filter((item) => item.level === 2).map((item, index) => <a href={`#${item.id}`} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span>{item.text}</a>)}</nav>
        </aside>
        <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <footer className="post-footer"><div className="page-shell"><p>写到这里，但思考还没有结束。</p><Link href="/blog">继续阅读其他文章 ↗</Link></div></footer>
    </main>
  );
}
