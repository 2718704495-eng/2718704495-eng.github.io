# 个人技术作品集实施计划

> 执行要求：实施时使用 superpowers:executing-plans，按照下面的复选框逐项完成和验证。

**目标：** 为王晓磊制作一套面向招聘者的个人技术作品集，并发布到 https://2718704495-eng.github.io/ 。

**实现方式：** 以 floating-astronaut/astro-portfolio-template 的 Astro、TypeScript、无障碍和 SEO 基础为起点，去掉原模板较重的视频滚动效果，改成轻量、清晰的单页作品集。简历数据集中保存在类型化配置中，各页面模块读取这些数据进行展示，最后由 GitHub Actions 自动构建并发布到 GitHub Pages。

**主要技术：** Astro 7、TypeScript 6、CSS、Vitest、Playwright、GitHub Actions、GitHub Pages

**设计规格：** docs/superpowers/specs/2026-10-12-personal-portfolio-design.md

## 全局要求

- 网站主要给招聘者和技术面试官看，重要信息不放在弹窗或隐藏页面中。
- 使用深墨蓝背景与青蓝、绿色强调色，动画保持克制，并支持“减少动态效果”。
- 不编造访问量、并发量、响应时间、提升百分比、客户数量或收入数据。
- 第一版不做博客、登录、数据库、访问统计和联系表单。
- 保留原模板的 MIT 开源许可，并在 README 中注明模板来源。
- 公开联系方式只保留 GitHub 和简历中的邮箱，不公开电话、住址、密钥或令牌。
- 最终仓库为公开仓库 2718704495-eng/2718704495-eng.github.io。

## 重点检查项目

- 禁用 JavaScript 或开启“减少动画”后，所有简历内容仍然可见。
- 手机屏幕下导航、项目卡片、时间线和较长技术名称不能超出页面。
- 没有 GitHub 地址的项目不显示空按钮或错误链接。
- 页面中不能残留原模板姓名、示例项目、example.com 等演示内容。
- GitHub Pages 构建完成后，首页、图片和 PDF 简历都能通过根路径正常访问。

---

## 第一阶段：建立项目并整理简历数据

### 要做什么

1. 引入 Astro 项目基础、TypeScript 配置、测试配置和 MIT 许可证。
2. 删除原模板的视频、演示项目、统计代码和联系表单。
3. 建立统一的简历数据文件，保存个人信息、能力、经历、项目、AI 工作流和教育信息。
4. 先写数据检查，防止项目漏字段或混入演示内容。

### 主要文件

- package.json：项目依赖和运行命令。
- astro.config.mjs：Astro 与网站地址配置。
- src/data/portfolio.ts：全部简历与项目数据。
- tests/unit/portfolio-content.test.ts：简历数据检查。
- LICENSE：保留上游模板的 MIT 许可。

### 数据结构

portfolio.ts 将导出：

- profile：姓名、定位、简介、GitHub、邮箱和求职状态。
- capabilities：四项核心能力。
- experience：两段工作/实习经历。
- projects：四个重点项目。
- workflow：六步 AI 原生开发流程。
- education：学校、专业、排名和获奖信息。

每个项目都必须包含：项目名称、状态、简介、业务问题、本人工作、解决方案、项目结果、技术栈和可选项目链接。

### 验证方式

- [ ] 先写测试，确认没有数据文件时测试会失败。
- [ ] 完成数据文件后运行：
  - npm install
  - npm run test:unit -- tests/unit/portfolio-content.test.ts
- [ ] 预期结果：四个项目、两段经历和全部必要字段检查通过。
- [ ] 完成后提交一次 Git 记录。

---

## 第二阶段：搭建页面外观、导航和基础结构

### 要做什么

1. 制作网页基础布局、悬浮导航和页脚。
2. 建立颜色、字号、间距、圆角和动画变量。
3. 添加“跳到正文”、键盘焦点和移动端导航。
4. 创建首页的全部导航位置：个人介绍、工作经历、项目、AI 工作流和联系区域。

### 主要文件

- src/layouts/Base.astro：HTML、SEO 和页面公共外壳。
- src/components/SiteNav.astro：桌面与手机导航。
- src/components/SiteFooter.astro：页脚。
- src/styles/tokens.css：颜色和尺寸变量。
- src/styles/global.css：全站样式和响应式布局。
- src/pages/index.astro：首页入口。
- tests/e2e/shell.spec.ts：导航、键盘和无脚本测试。

### 页面效果

- 深墨蓝背景，局部青蓝和绿色光晕。
- 顶部悬浮胶囊导航。
- 轻量网格作为背景装饰。
- 内容滚动时轻微淡入，不使用视频或粒子动画。
- 手机端自动变为紧凑导航，正文保持单列阅读。

### 验证方式

- [ ] 先写导航和无障碍测试，确认页面未实现时测试失败。
- [ ] 完成页面外壳后运行：
  - npm run check
  - npx playwright test tests/e2e/shell.spec.ts
- [ ] 预期结果：主内容区域、跳转链接、键盘焦点、禁用 JavaScript 和减少动画检查全部通过。
- [ ] 完成后提交一次 Git 记录。

---

## 第三阶段：完成全部简历与项目内容

### 要做什么

1. 制作首屏个人介绍和三个按钮：查看项目、下载简历、GitHub。
2. 制作四张核心能力卡片。
3. 用时间线展示两段工作经历。
4. 用项目卡片展示四个项目及其完整业务闭环。
5. 展示六步 AI 原生开发流程。
6. 展示教育、获奖、GitHub、邮箱和简历下载。

### 主要文件

- src/components/Hero.astro：首屏介绍。
- src/components/CapabilityGrid.astro：核心能力。
- src/components/ExperienceTimeline.astro：工作时间线。
- src/components/ProjectGrid.astro：项目卡片。
- src/components/WorkflowSteps.astro：AI 工作流。
- src/components/EducationCard.astro：教育与荣誉。
- tests/e2e/content.spec.ts：内容检查。
- tests/e2e/responsive.spec.ts：电脑和手机布局检查。

### 网站中展示的项目

1. 医疗智能导诊 Agent。
2. 神州打卡绘微信小程序。
3. 微信 AI 聊天助手。
4. 文博元宇宙数字人交互系统。

每个项目按照以下顺序展示：

业务场景 → 我负责什么 → 技术与解决方案 → 形成的结果 → 技术标签 → GitHub/演示链接

### 验证方式

- [ ] 检查首屏文案、四项能力、两段经历、四个项目、六步工作流和教育信息。
- [ ] 检查 390×844 手机尺寸和 1440×900 桌面尺寸没有横向滚动或文字遮挡。
- [ ] 运行：
  - npm run test:unit
  - npm run check
  - npx playwright test tests/e2e/content.spec.ts tests/e2e/responsive.spec.ts
- [ ] 预期结果：内容、链接和响应式布局检查全部通过。
- [ ] 完成后提交一次 Git 记录。

---

## 第四阶段：加入 PDF 简历、SEO 和自动部署

### 要做什么

1. 把桌面上的最新版简历 /Users/wxl/Desktop/王晓磊-AI应用-全栈工程师.pdf 放进网站供下载。
2. 添加网站标题、描述、分享卡片、Person 结构化数据、favicon、sitemap 和 robots。
3. 添加演示内容与错误链接扫描脚本。
4. 添加 GitHub Pages 自动部署工作流。
5. 编写中文 README，说明网站、开发命令和模板来源。

### 主要文件

- public/resume/wang-xiaolei-ai-fullstack.pdf：可下载简历。
- public/robots.txt、public/site.webmanifest、public/og-card.svg：网站元数据。
- scripts/content-audit.mjs：检查演示文案和必需文件。
- scripts/link-audit.mjs：检查链接。
- .github/workflows/pages.yml：GitHub Pages 自动部署。
- README.md：项目说明。

### 自动部署流程

每次向 main 分支推送代码时，GitHub Actions 将自动执行：

安装依赖 → 单元测试 → Astro 类型检查 → 内容检查 → 生产构建 → 上传 dist → 发布 GitHub Pages

### 验证方式

- [ ] 先写审计测试，确保残留模板文案、空链接或缺少 PDF 时会失败。
- [ ] 完成后运行完整发布前检查：
  - npm run test:unit
  - npm run check
  - npm run build
  - npm run audit
  - npx playwright test
- [ ] 预期结果：全部命令通过，dist/index.html 和 PDF 简历均存在。
- [ ] 完成后提交一次 Git 记录。

---

## 第五阶段：检查效果并发布到 GitHub

### 要做什么

1. 在本地打开生产版本，检查桌面端和手机端真实效果。
2. 检查键盘操作、导航跳转、GitHub 链接、简历下载、长文字和减少动画模式。
3. 对整个项目做一次只读审查，检查事实、隐私、无障碍、链接、部署配置和测试缺口。
4. 修复检查中发现的严重问题，再执行完整验证。
5. 创建公开 GitHub 仓库并推送代码。
6. 启用 GitHub Pages，等待自动部署并检查线上站点。

### 最终验证命令

- npm run test:unit
- npm run check
- npm run build
- npm run audit
- npx playwright test
- git diff --check
- git status --short

### GitHub 发布命令

- gh repo create 2718704495-eng.github.io --public --source=. --remote=origin --push

### 最终交付内容

- [ ] GitHub 仓库：https://github.com/2718704495-eng/2718704495-eng.github.io
- [ ] 个人网站：https://2718704495-eng.github.io/
- [ ] 可下载的 PDF 简历。
- [ ] 通过的构建、内容、移动端和交互测试结果。
- [ ] 后续修改简历时，只需要更新统一数据文件并推送，网站会自动发布。

## 第一版暂时不做

- 博客、后台管理、数据库、用户登录和访问统计。
- 联系表单和需要密钥的第三方服务。
- 自动读取 GitHub 提交数、Star 数或访问量。
- 未经确认的性能数字、客户数据、商业机密和个人敏感信息。
