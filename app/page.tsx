import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const projects = [
  { no: "01", title: "InsightSwarm", type: "MULTI-AGENT / 2026", color: "pink", note: "共享存储驱动的信息收集多 Agent 系统，构建可恢复、可审计的协作链路。", href: "https://github.com/rip213153/InsightSwarm" },
  { no: "02", title: "Harness", type: "AGENT HARNESS / 2026", color: "blue", note: "通过上下文工程、结构化记忆与运行契约，让复杂代码任务可靠收敛。", href: "https://github.com/rip213153/Harness-" },
  { no: "03", title: "可靠协作", type: "WRITING / 2026", color: "yellow", note: "从协议、状态、消息、隔离与收敛出发，讨论 Multi-Agent 的工程本质。", href: "/blog/agent-multi-agent-reliable-collaboration" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <main>
      <div className="top-ticker" aria-hidden="true">
        <div>AVAILABLE FOR GOOD IDEAS · PERSONAL SITE · RESUME · WRITING · AVAILABLE FOR GOOD IDEAS · PERSONAL SITE · RESUME · WRITING ·</div>
      </div>

      <header className="site-header page-shell">
        <Link href="/" className="wordmark" aria-label="返回首页">
          <span>ZHANG</span><strong>JIE</strong>
        </Link>
        <nav aria-label="主导航">
          <a href="#work">作品</a>
          <Link href="/resume">简历</Link>
          <Link href="/blog">博客</Link>
        </nav>
        <a className="mini-contact" href="mailto:hello@example.com">LET&apos;S TALK <Arrow /></a>
      </header>

      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> AGENT ENGINEER · BACKEND DEVELOPER</p>
          <h1>
            <span>I BUILD</span>
            <span className="outline-word">USEFUL</span>
            <span>THINGS.</span>
          </h1>
          <p className="hero-intro">我是 <strong>张杰</strong>，一名关注 Agent Harness、Multi-Agent 协作与后端系统的开发者。我希望让不确定的智能拥有可检查、可恢复、也能可靠停止的工程边界。</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/resume">查看我的简历 <Arrow /></Link>
            <Link className="text-link" href="/blog">读我的文章 <Arrow /></Link>
          </div>
        </div>

        <div className="hero-art" aria-label="张杰的 Agent 工程能力与项目指标">
          <div className="runtime-poster">
            <div className="runtime-head"><span>ZHANG JIE / RUNTIME MAP</span><span>2026.07</span></div>
            <div className="runtime-track" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="runtime-core">
              <p>RELIABLE SYSTEMS FOR</p>
              <strong>UNCERTAIN<br />INTELLIGENCE</strong>
            </div>
            <div className="runtime-words" aria-label="Agent 系统的五个关键环节">
              <span>PROTOCOL</span><span>STATE</span><span>MESSAGE</span><span>ISOLATION</span><span>CONVERGENCE</span>
            </div>
            <div className="runtime-metrics">
              <div><strong>68.8%</strong><span>ISSUES REDUCED</span></div>
              <div><strong>10.3→6.2</strong><span>MIN / RESEARCH</span></div>
              <div><strong>100%</strong><span>FIXED REGRESSION</span></div>
            </div>
          </div>
          <div className="sticker sticker-pink">SYSTEMS<br />THAT RECOVER</div>
          <div className="sticker sticker-round">OPEN<br />TO WORK</div>
          <div className="scribble" aria-hidden="true">✦</div>
        </div>
      </section>

      <div className="checker-rule" aria-hidden="true" />

      <section className="work-section page-shell" id="work">
        <div className="section-heading">
          <p className="kicker">SELECTED WORK / 01—03</p>
          <h2>做过的<br /><span>一些好东西</span></h2>
          <p>这里不会堆满所有经历，只留下最能说明你是谁、如何思考以及能把事情做到什么程度的作品。</p>
        </div>

        <div className="project-stack">
          {projects.map((project) => (
            <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined} className={`project-card ${project.color}`} key={project.no}>
              <span className="project-no">{project.no}</span>
              <div>
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span className="project-note">{project.note}</span>
              </div>
              <span className="project-arrow"><Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-band">
        <div className="page-shell about-grid">
          <div className="about-mark" aria-hidden="true">*</div>
          <p className="about-lead">模型负责判断，<br />系统负责可靠。</p>
          <div className="about-copy">
            <p>我关注智能体如何获得身份、状态、边界与终点。相比让更多 Agent 参与，我更关心它们能否围绕同一份事实协作，并在失败之后回到主线。</p>
            <Link href="/resume" className="button button-light">了解我的经历 <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="writing-section page-shell">
        <div className="writing-title">
          <p className="kicker">LATEST WRITING</p>
          <h2>最近在写</h2>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="post-row" key={post.title}>
              <time>{post.date}</time>
              <h3>{post.title}</h3>
              <span className="post-tag">{post.tags[0]}</span>
              <Arrow />
            </Link>
          ))}
        </div>
        <Link href="/blog" className="all-posts">查看全部文章 <Arrow /></Link>
      </section>

      <footer>
        <div className="footer-burst" aria-hidden="true" />
        <div className="page-shell footer-content">
          <p>有个值得一起做的想法？</p>
          <a href="mailto:2151220641@qq.com">2151220641@QQ.COM <Arrow /></a>
          <div className="footer-bottom">
            <span>© 2026 ZHANG JIE</span>
            <span>DESIGNED WITH INTENTION · BUILT WITH NEXT.JS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
