import Link from "next/link";

const projects = [
  {
    years: "2026.05—06",
    role: "InsightSwarm",
    subtitle: "去中心化、共享存储驱动的信息收集多 Agent 协作系统",
    href: "https://github.com/rip213153/InsightSwarm",
    points: [
      "基于 CDP 与隔离 Python 环境实现 BrowserAgent，并加入 Human-in-the-loop 审批。",
      "为任务提供独立 workspace、lease、heartbeat、checkpoint 与 WAL 原子操作，支持异常恢复。",
      "最多 4 个 Researcher 并行协作，单任务耗时由 10.3 分钟降至 6.2 分钟。",
      "构建 Eval 数据飞轮，将问题数由 23035 降至 10045，降低 68.8%。",
    ],
  },
  {
    years: "2026.03—04",
    role: "Harness",
    subtitle: "面向复杂仓库代码任务的 Agent Harness",
    href: "https://github.com/rip213153/Harness-",
    points: [
      "设计六层上下文结构与渐进式披露 Skills，长文本 Prompt 平均压缩 15.6%，峰值 32.2%。",
      "通过结构化记忆、Checkpoint 和三类运行工件保障长链路任务可恢复。",
      "构建 12 任务 benchmark；当前 run-level 诊断覆盖率 58.8%，固定回归任务保持 100% 通过率。",
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="inner-page">
      <header className="inner-nav page-shell"><Link href="/">← 返回首页</Link><Link href="/blog">博客 ↗</Link></header>
      <section className="resume-hero page-shell">
        <p className="kicker">RESUME / CURRICULUM VITAE</p>
        <h1>张杰，<br /><span>Agent 与后端开发者。</span></h1>
        <p>信息与计算科学本科在读，关注 Agent Harness、Multi-Agent 协作和可靠后端系统。我希望把模型的不确定性限制在工程系统能够承担、诊断和恢复的范围内。</p>
        <div className="resume-contact"><a href="mailto:2151220641@qq.com">2151220641@qq.com ↗</a><a href="https://github.com/rip213153" target="_blank" rel="noreferrer">GitHub @rip213153 ↗</a></div>
      </section>
      <section className="resume-grid page-shell">
        <aside><h2>教育</h2><p>EDUCATION</p></aside>
        <div className="education-card"><time>2023.09—2027.06</time><h3>东北林业大学</h3><p>教育部直属 211 · 信息与计算科学 · 本科在读</p></div>
        <aside><h2>能力</h2><p>CAPABILITIES</p></aside>
        <div className="capability-list">
          <article><h3>Agent 与 AI 工程</h3><p>Workflow、Agent Patterns、Harness Engineering、Context Engineering、Prompt Engineering、Tool Call、RAG、MCP、Skills 与 Multi-Agent 协作。</p></article>
          <article><h3>后端开发</h3><p>Python、Java、FastAPI、Spring Boot、异步编程、接口设计、工具链封装、自动化流水线与高并发服务优化。</p></article>
          <article><h3>工程基础</h3><p>数据结构、计算机网络、设计模式、Git、Docker、Kubernetes、测试与覆盖率工具。</p></article>
        </div>
        <aside><h2>项目</h2><p>SELECTED PROJECTS</p></aside>
        <div className="resume-projects">{projects.map((project) => <article key={project.role}><time>{project.years}</time><div><div className="resume-project-title"><div><h3>{project.role}</h3><p>{project.subtitle}</p></div><a href={project.href} target="_blank" rel="noreferrer">GitHub ↗</a></div><ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
      </section>
    </main>
  );
}
