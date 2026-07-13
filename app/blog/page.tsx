import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const articles = getAllPosts();
  return (
    <main className="inner-page blog-page">
      <header className="inner-nav page-shell"><Link href="/">← 返回首页</Link><Link href="/resume">简历 ↗</Link></header>
      <section className="blog-hero page-shell"><p className="kicker">NOTES / ESSAYS / FIELD RECORDS</p><h1>写下来，<br /><span>让想法继续生长。</span></h1></section>
      <section className="article-index page-shell">
        {articles.map((article, index) => <article key={article.slug}>
          <span className="article-number">{String(index + 1).padStart(2, "0")}</span><div><div className="article-meta"><time>{article.date}</time><span>{article.tags[0]}</span></div><h2>{article.title}</h2><p>{article.description}</p><Link href={`/blog/${article.slug}`}>阅读文章 ↗</Link></div>
        </article>)}
      </section>
    </main>
  );
}
