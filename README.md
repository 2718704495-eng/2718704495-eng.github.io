# 王晓磊个人技术作品集

面向招聘者和技术面试官的单页技术作品集，集中展示 AI Agent、Java 企业级后端、Python 与多端全栈交付经验。项目和经历均按照“业务场景—本人工作—技术方案—结果”组织，不使用无法核实的访问量或性能数字。

线上地址：[https://2718704495-eng.github.io/](https://2718704495-eng.github.io/)

## 本地开发

需要 Node.js 22.12 或更高版本。

```bash
npm install
npm run dev
```

发布前检查：

```bash
npm run test:unit
npm run check
npm run audit
npm run build
npm run test:e2e
```

## 内容维护

个人资料、核心能力、工作经历、项目、AI 工作流和教育信息统一维护在 `src/data/portfolio.ts`。更新并推送到 `main` 后，GitHub Actions 会自动构建并部署 GitHub Pages。

PDF 简历位于 `public/resume/wang-xiaolei-ai-fullstack.pdf`。

## 技术栈

- Astro 7 + TypeScript
- Vitest + Playwright
- GitHub Actions + GitHub Pages

## 模板与许可

页面的初始结构参考了 [floating-astronaut/astro-portfolio-template](https://github.com/floating-astronaut/astro-portfolio-template)，并针对本项目重写内容、组件、视觉系统与测试。上游版权和 MIT 许可保留在 [LICENSE](./LICENSE) 中。
