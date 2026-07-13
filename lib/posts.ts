import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
};

export type TocItem = { id: string; text: string; level: number };
export type Post = PostMeta & { html: string; toc: TocItem[] };

const postsDirectory = path.join(process.cwd(), "content", "blog");

function parseSource(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Blog post is missing frontmatter");

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator > -1) data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  const meta: PostMeta = {
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    slug: data.slug,
  };

  return { meta, markdown: match[2] };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const html: string[] = [];
  const toc: TocItem[] = [];
  let list: "ul" | "ol" | null = null;
  let inCode = false;
  let codeLines: string[] = [];
  let skippedTitle = false;

  const closeList = () => {
    if (list) html.push(`</${list}>`);
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      closeList();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }
    if (!line.trim()) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      if (level === 1 && !skippedTitle) {
        skippedTitle = true;
        continue;
      }
      const id = `section-${toc.length + 1}`;
      toc.push({ id, text: heading[2], level });
      html.push(`<h${level} id="${id}">${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const nextList = unordered ? "ul" : "ol";
      if (list !== nextList) {
        closeList();
        list = nextList;
        html.push(`<${list}>`);
      }
      html.push(`<li>${inlineMarkdown((unordered || ordered)![1])}</li>`);
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  return { html: html.join("\n"), toc };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseSource(fs.readFileSync(path.join(postsDirectory, file), "utf8")).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) return null;
  for (const file of fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"))) {
    const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
    const { meta, markdown } = parseSource(source);
    if (meta.slug === slug) {
      const rendered = markdownToHtml(markdown);
      return { ...meta, ...rendered };
    }
  }
  return null;
}
