export type Profile = {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  availability: string;
  graduation: string;
  github: string;
  email: string;
  resume: string;
};

export type Capability = {
  title: string;
  description: string;
  technologies: string[];
  evidence: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
  outcome: string;
};

export type Project = {
  name: string;
  status: '已完成' | '持续迭代';
  summary: string;
  problem: string;
  work: string;
  solution: string;
  outcome: string;
  technologies: string[];
  href?: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  ranking: string;
  courses: string[];
  award: string;
};

export const profile: Profile = {
  name: '王晓磊',
  title: 'AI 应用 · Java 全栈工程师',
  tagline: '将业务需求转化为可验证、可交付的 AI 与全栈产品。',
  summary:
    '以 Java、Python 为主，具备产业互联网电商与台球赛事系统的全栈交付经历，能够独立完成业务梳理、后端接口、前端页面、多端联调与异常闭环。',
  location: '杭州',
  availability: '离校 · 随时到岗',
  graduation: '2026 届软件工程本科',
  github: 'https://github.com/2718704495-eng',
  email: '2718704495@qq.com',
  resume: '/resume/wang-xiaolei-ai-fullstack.pdf',
};

export const capabilities: Capability[] = [
  {
    title: 'AI Agent 工程',
    description: '从多轮上下文、工具调用到安全护栏，构建可控制、可验证的 AI 应用链路。',
    technologies: ['Prompt', 'RAG', 'Function Calling', 'MCP', 'SSE', '上下文记忆'],
    evidence: '医疗导诊 Agent、微信 AI 聊天助手',
  },
  {
    title: '企业级后端',
    description: '围绕真实业务状态设计接口、事务、缓存和异步处理，关注数据一致性与故障恢复。',
    technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis', 'RabbitMQ'],
    evidence: '合同、电子发票、SAP 物料同步',
  },
  {
    title: '全栈交付',
    description: '覆盖后台、小程序和 AI 服务，能够从需求梳理推进到多端联调与可运行交付。',
    technologies: ['Vue', 'TypeScript', 'UniApp', '微信小程序', 'Python', 'FastAPI'],
    evidence: '台球赛事系统、神州打卡绘',
  },
  {
    title: '工程质量',
    description: '通过业务幂等、索引分页、异步解耦、自动化测试和日志数据核对保护关键链路。',
    technologies: ['幂等', '索引', '缓存', '重试补偿', 'JUnit', 'Pytest'],
    evidence: '比赛结算、电子签章和第三方回调',
  },
];

export const experience: Experience[] = [
  {
    company: '杭州商云宝科技有限公司',
    role: 'AI 全栈开发',
    period: '2026.07 — 2026.09',
    summary: '承担 Java 后端、Vue 管理后台和 UniApp 小程序开发，参与台球门店赛事系统交付。',
    bullets: [
      '打通“创建赛事与绑定台桌—用户扫码入桌—服务端创建对局—小程序记分—后台查询结算”的业务链路。',
      '实现娱乐赛与天梯赛的配置、对阵、局内记分、结果确认、比赛记录、积分和排行榜。',
      '完善赛季、段位和前 32 名巅峰淘汰赛，串联资格筛选、种子分组、胜者晋级与名次结算。',
      '使用业务幂等键、乐观锁和对局状态校验处理重复提交、网络重试与多端同时操作。',
    ],
    outcome: '完成赛事后台、小程序和 Java 后端的跨端闭环，使比赛记录与结算结果能够沿同一业务状态追踪。',
  },
  {
    company: '杭州有信科技有限公司',
    role: 'Java 开发实习生',
    period: '2026.01 — 2026.07',
    summary: '参与产业互联网电商系统，负责合同、电子发票和 SAP 物料同步等核心业务。',
    bullets: [
      '聚合订单、预发货和客户信息，按模板生成合同草稿，支持修改、确认、版本留痕和腾讯电子签章。',
      '参与电子发票申请、财务审核、第三方开票、回调及 PC/小程序展示链路。',
      '通过 SAP JCo 获取物料，使用定时任务和手动刷新写入 MySQL，并以业务键识别重复记录。',
      '使用 Redis、MySQL 索引分页、RabbitMQ、回调幂等、超时重试和补偿任务降低链路波动影响。',
    ],
    outcome: '交付合同、发票和物料同步的完整业务闭环，并通过统一状态、缓存与幂等处理增强可追踪性和可靠性。',
  },
];

export const projects: Project[] = [
  {
    name: '医疗智能导诊 Agent',
    status: '持续迭代',
    summary: '面向就医前咨询的辅助导诊原型，通过多轮追问完成风险分级与科室推荐。',
    problem: '用户通常只能描述零散症状，需要在不替代医生诊断的前提下收集关键信息并给出安全建议。',
    work: '独立完成 Agent 工作流、医疗知识检索、会话状态和流式接口设计。',
    solution:
      '使用 FastAPI、LangGraph 和 Pydantic 编排症状采集、追问、风险分级和科室推荐；以 FAISS 构建 RAG，Redis 保存摘要与追问状态，并设置最大步数、超时、急症分支和人工就医兜底。',
    outcome: '形成从多轮追问到风险分级、科室推荐和就医建议的闭环，并通过结构化输出和合成评测控制幻觉风险。',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'RAG', 'FAISS', 'Redis', 'SSE'],
  },
  {
    name: '神州打卡绘微信小程序',
    status: '持续迭代',
    summary: '将全国分层地图、景点手册、真实定位、打卡徽章与 AI 景点讲解整合到微信小程序。',
    problem: '需要在位置可信、并发打卡不重复和三维资源可控的前提下，提供流畅的地图探索体验。',
    work: '独立完成需求澄清、接口契约、小程序、Python 后端、数据模型、测试和部署资源链路。',
    solution:
      '使用 FastAPI、SQLAlchemy 和 MySQL 实现登录、位置校验与打卡；以行锁、事务和唯一约束处理并发；AI 生成结构化讲解，Blender 处理 GLB，阿里云私有 OSS 提供短期访问地址。',
    outcome: '完成地图探索、景点讲解、可信打卡和三维展示的一体化闭环，并覆盖鉴权、并发、降级和资源下载测试。',
    technologies: ['微信小程序', 'FastAPI', 'MySQL', 'AI 讲解', 'Blender', '阿里云 OSS'],
    href: 'https://github.com/2718704495-eng/shenzhou-checkin',
  },
  {
    name: '微信 AI 聊天助手',
    status: '已完成',
    summary: '本地优先的桌面端 AI 助手，连接微信可见消息、上下文记忆、模型调用和受控回传。',
    problem: '桌面自动化容易发生错会话、重复发送和敏感信息泄露，需要让每次副作用都有证据和权限边界。',
    work: '独立完成 TypeScript 策略层、Swift 原生桥接、OCR 读取、MCP 工具和加密记忆。',
    solution:
      '以 macOS Accessibility 与 Vision OCR 读取消息，将历史读取、当前会话和真实发送拆为不同 MCP 工具，并通过候选会话锁定、草稿核验、一次性提交能力、发送读回和权限分级控制风险。',
    outcome: '打通 OCR、LLM 上下文、MCP 工具调用和受控发送，通过幂等提交与加密记忆降低误发、重复发送和泄露风险。',
    technologies: ['TypeScript', 'Swift', 'Vision OCR', 'MCP', 'Keychain', 'Vitest'],
    href: 'https://github.com/2718704495-eng/wechat-ai-assistant-public',
  },
  {
    name: '文博元宇宙数字人交互系统',
    status: '已完成',
    summary: '面向文博讲解场景的数字人交互系统，获得服务外包创新创业大赛省级三等奖。',
    problem: '需要把用户语音或文字问题转化为可理解的讲解内容，并由数字人自然反馈。',
    work: '负责交互链路设计与实现，连接输入、后端 AI、文本转语音和数字人回答。',
    solution: '设计“语音/文字输入—AI 生成介绍—TTS 文本转语音—数字人回答”的完整调用链，并协同完成联调。',
    outcome: '完成可演示的文博数字人智能问答闭环，项目获得省级三等奖。',
    technologies: ['AI 问答', 'TTS', '语音交互', '接口联调'],
  },
];

export const workflow: WorkflowStep[] = [
  { title: '需求澄清', description: '先梳理用户、场景、边界和真正要解决的问题。' },
  { title: '约束与验收', description: '明确输入输出、异常分支、权限和可验证的完成标准。' },
  { title: 'AI 拆解与编码', description: '使用 Prompt、Skill 和项目上下文拆分任务并辅助实现。' },
  { title: '人工审查', description: '检查模型输出、业务状态、接口契约和数据处理是否合理。' },
  { title: '证据验证', description: '通过日志、数据库、自动化测试和构建结果定位并确认问题。' },
  { title: '回归补全', description: '复现缺陷、补充测试和降级方案，避免同类问题再次出现。' },
];

export const education: Education = {
  school: '浙江工业大学之江学院',
  degree: '软件工程 · 本科',
  period: '2022 — 2026',
  ranking: '专业排名前 10%',
  courses: ['数据结构', '软件工程', '操作系统', 'Java', 'Python'],
  award: '服务外包创新创业大赛省级三等奖',
};
