import Link from "next/link";

const experience = [
  {
    years: "2026.07—NOW",
    role: "Agent 开发实习生",
    company: "上海数能嘉业科技有限公司",
    detail: "参与 Agent Runtime 改造与 RAG 相关开发。",
  },
];

const projects = [
  {
    years: "2026.05—06",
    role: "InsightSwarm",
    subtitle: "去中心化、共享存储驱动的信息收集多 Agent 协作系统",
    href: "https://github.com/rip213153/InsightSwarm",
    points: [
      "基于 CDP 与隔离 Python 环境实现 BrowserAgent，从动态页面采集约 17k 字可见文本；在登录、支付、提交等高风险操作前引入 Human-in-the-loop 审批。",
      "为每个 task 提供独立 workspace、900s lease、300s heartbeat、异常释放与 technical failure 落库，支持从 checkpoint / lease 状态恢复。",
      "以 SQLite WAL 承担事务、lease 与崩溃恢复；事务提交后按 role 唤醒 Worker，并以低频 polling 兜底 lost wakeup，将空轮询压力降至约 2Hz。",
      "支持最多 4 个 Researcher 并行消费研究任务，同一任务耗时由 10.3min 降至 6.2min；搜索结果按 URL 去重并记录共识，失败时自动降级到 fallback 链路。",
      "将无 tool call、JSON/schema 解析失败、重复 read/recompute、tool failure、provider 超时/限流等 bad case 收敛为统一运行时契约，区分 retry / blocked / technical_failed / needs_repair。",
      "构建稳定交付、质量判断、成本消耗三维 Eval 数据飞轮，将部分 Token 消耗由 32035 降至 10045，降低 68.8%；同一问题 Token 消耗由早期数十万降至 34168。",
    ],
  },
  {
    years: "2026.03—04",
    role: "Harness",
    subtitle: "面向复杂仓库代码任务的 Agent Harness",
    href: "https://github.com/rip213153/Harness-",
    points: [
      "设计六层 Prompt 分层结构与渐进式披露 Skills 机制，引入事件分级裁剪、工具结果压缩和任务摘要；12 组上下文配置实验中，长文本 Prompt 平均压缩 15.6%，峰值 32.2%。",
      "针对 Agent 多轮调用中的状态丢失，实现结构化记忆、Checkpoint 恢复机制和三类运行工件，保证任务可恢复；对工具、Skills、sandbox 进行存在性与合法性校验。",
      "构建包含自动验证器的 12 任务 benchmark，追踪上下文压力比、压缩触发层、历史裁剪、技能加载率、预算拒绝原因和 Skills sticky；当前 run-level 诊断覆盖率 58.8%，固定回归任务保持 100% 通过率。",
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
        <aside><h2>工作</h2><p>EXPERIENCE</p></aside>
        <div className="experience-list">{experience.map((item) => <article key={item.company}><time>{item.years}</time><div><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p>{item.detail}</p></div></article>)}</div>

        <aside><h2>教育</h2><p>EDUCATION</p></aside>
        <div className="education-card"><time>2023.09—2027.06</time><h3>东北林业大学</h3><p>教育部直属 211 · 信息与计算科学 · 本科在读</p></div>

        <aside><h2>能力</h2><p>CAPABILITIES</p></aside>
        <div className="capability-list">
          <article><h3>Agent 与 AI 工程</h3><p>Workflow、Agent Patterns、Harness Engineering、Context Engineering、Prompt Engineering、Tool Call、RAG、MCP、Skills 与 Multi-Agent 协作。</p></article>
          <article><h3>后端开发</h3><p>Spring Boot、MySQL 索引与事务机制、Redis 缓存问题排查、Kafka、FastAPI；熟悉 Java / Python，具备接口封装、异步编程和工具链开发经验。</p></article>
          <article><h3>工程基础</h3><p>数据结构、计算机网络、设计模式、Git、Docker、Kubernetes，以及 Claude Code、Codex、Figma 等 AI 工具的工程化使用。</p></article>
        </div>

        <aside><h2>项目</h2><p>SELECTED PROJECTS</p></aside>
        <div className="resume-projects">{projects.map((project) => <article key={project.role}><time>{project.years}</time><div><div className="resume-project-title"><div><h3>{project.role}</h3><p>{project.subtitle}</p></div><a href={project.href} target="_blank" rel="noreferrer">GitHub ↗</a></div><ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
      </section>
    </main>
  );
}
