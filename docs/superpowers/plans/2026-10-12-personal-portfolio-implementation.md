# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a recruiter-focused personal portfolio for 王晓磊 at `https://2718704495-eng.github.io/`.

**Architecture:** Retain the Astro/TypeScript foundation and accessibility patterns from `floating-astronaut/astro-portfolio-template`, but replace its scroll-film presentation with a lightweight static single-page narrative. Keep all resume facts in typed data modules, render them through focused Astro components, and deploy the generated `dist/` directory with GitHub Actions.

**Tech Stack:** Astro 7, TypeScript 6, CSS, Vitest, Playwright, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-10-12-personal-portfolio-design.md`

## Global Constraints

- Primary audience is recruiters and technical interviewers; every section must be scannable without opening a modal.
- Use deep ink/navy surfaces with cyan and green accents; keep motion subtle and honor `prefers-reduced-motion`.
- Do not add unconfirmed traffic, concurrency, latency, percentage, customer, or revenue claims.
- The first version has no blog, login, database, analytics, contact form, or runtime third-party API.
- Preserve the upstream MIT license and record the source template in `README.md`.
- Public contact data is limited to GitHub and the confirmed resume email; never publish phone, home address, secrets, or tokens.
- The production URL is `https://2718704495-eng.github.io/` and deployment targets the public `2718704495-eng/2718704495-eng.github.io` repository.

## Review Focus

- JavaScript disabled or reduced motion enabled: all sections remain visible and navigable; covered by Task 2 Playwright tests.
- Small mobile viewport: navigation, project cards, timeline, and long technology names do not overflow; covered by Task 3 Playwright tests.
- Missing optional project URL: the card renders without an empty or broken link; covered by Task 1 unit tests.
- Placeholder/demo content from the template: build fails when forbidden strings or example links remain; covered by Task 4 audits.
- GitHub Pages root deployment: generated links and assets use root-safe URLs and the workflow publishes `dist/`; covered by Task 4 build and workflow checks.

---

### Task 1: Import the template foundation and define verified portfolio content

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/env.d.ts`
- Create: `src/data/portfolio.ts`
- Create: `tests/unit/portfolio-content.test.ts`
- Create: `LICENSE`
- Create: `.gitignore`

**Interfaces:**
- Produces: `profile: Profile`, `capabilities: Capability[]`, `experience: Experience[]`, `projects: Project[]`, `workflow: WorkflowStep[]`, `education: Education` from `src/data/portfolio.ts`.
- `Project` contains `name`, `status`, `summary`, `problem`, `work`, `solution`, `outcome`, `technologies`, and optional `href`.
- Later tasks consume these exported objects without embedding resume copy inside components.

- [ ] **Step 1: Write content-contract tests**

Add tests asserting the four named projects exist, two experiences exist, every project has the five narrative fields, optional `href` may be absent, contact data excludes phone/address, and no forbidden placeholder values occur.

- [ ] **Step 2: Run the unit test and verify it fails**

Run: `npm run test:unit -- tests/unit/portfolio-content.test.ts`

Expected: FAIL because `src/data/portfolio.ts` does not exist.

- [ ] **Step 3: Import the minimal Astro template foundation**

Copy the upstream package/config/license files without its `.git`, demo media, analytics, contact form, or scroll-film assets. Keep the upstream MIT notice.

- [ ] **Step 4: Implement the typed content module**

Populate the exact approved profile, capabilities, work history, four projects, AI workflow, education, award, GitHub URL, and email in `src/data/portfolio.ts`.

- [ ] **Step 5: Install dependencies and run the unit test**

Run: `npm install && npm run test:unit -- tests/unit/portfolio-content.test.ts`

Expected: PASS with all portfolio content contracts satisfied.

- [ ] **Step 6: Commit the content foundation**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/env.d.ts src/data/portfolio.ts tests/unit/portfolio-content.test.ts LICENSE .gitignore
git commit -m "feat: add typed portfolio content foundation"
```

### Task 2: Build the accessible visual shell and navigation

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/SiteNav.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`
- Create: `public/favicon.svg`
- Create: `tests/e2e/shell.spec.ts`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: `profile` from Task 1.
- Produces: page landmarks and section anchors `#about`, `#experience`, `#projects`, `#workflow`, and `#contact`.
- `Base.astro` accepts `title`, `description`, and optional Open Graph image.

- [ ] **Step 1: Write shell accessibility tests**

Assert one `main` landmark, a skip link, working anchor navigation, keyboard-visible focus, content visibility with JavaScript disabled, and visible content with reduced motion enabled.

- [ ] **Step 2: Run the shell tests and verify they fail**

Run: `npx playwright test tests/e2e/shell.spec.ts`

Expected: FAIL because the page and preview server are not implemented.

- [ ] **Step 3: Implement the base layout, navigation, footer, and design tokens**

Use semantic landmarks, root-safe asset paths, a floating pill navigation, responsive mobile menu without external UI libraries, and CSS-only decorative grid/glow layers.

- [ ] **Step 4: Implement the first-page skeleton**

Add every required section anchor and placeholder-free headings while leaving section bodies to Task 3.

- [ ] **Step 5: Run shell tests and Astro checks**

Run: `npm run check && npx playwright test tests/e2e/shell.spec.ts`

Expected: PASS.

- [ ] **Step 6: Commit the visual shell**

```bash
git add src/layouts src/components/SiteNav.astro src/components/SiteFooter.astro src/styles src/pages/index.astro public/favicon.svg tests/e2e/shell.spec.ts playwright.config.ts
git commit -m "feat: build accessible portfolio shell"
```

### Task 3: Render the complete recruiter narrative

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/CapabilityGrid.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/ProjectGrid.astro`
- Create: `src/components/WorkflowSteps.astro`
- Create: `src/components/EducationCard.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Create: `tests/e2e/content.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes all Task 1 data exports and Task 2 anchors/tokens.
- Produces visible recruiter-facing sections; `ProjectGrid.astro` omits the link control when `project.href` is undefined.

- [ ] **Step 1: Write content and responsive tests**

Assert the approved hero copy, four capability cards, two experience entries, four project names, six AI workflow steps, education/award text, valid GitHub link, resume link, and no horizontal overflow at 390×844 and 1440×900.

- [ ] **Step 2: Run the content tests and verify they fail**

Run: `npx playwright test tests/e2e/content.spec.ts tests/e2e/responsive.spec.ts`

Expected: FAIL because the content components do not exist.

- [ ] **Step 3: Implement Hero and capability components**

Render the approved positioning, availability chips, calls to action, and four evidence-oriented capability cards.

- [ ] **Step 4: Implement experience and project components**

Render work as a vertical timeline and projects as cards with business scenario, responsibility, solution, outcome, technology tags, and conditional links.

- [ ] **Step 5: Implement workflow, education, and contact sections**

Render the six-step AI workflow, school/award information, GitHub, email, and resume download without a contact form.

- [ ] **Step 6: Run content, responsive, unit, and Astro checks**

Run: `npm run test:unit && npm run check && npx playwright test tests/e2e/content.spec.ts tests/e2e/responsive.spec.ts`

Expected: PASS.

- [ ] **Step 7: Commit the completed page narrative**

```bash
git add src/components src/pages/index.astro src/styles/global.css tests/e2e/content.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: add resume and project narrative"
```

### Task 4: Add resume download, SEO, audits, and GitHub Pages automation

**Files:**
- Create: `public/resume/wang-xiaolei-ai-fullstack.pdf`
- Create: `public/robots.txt`
- Create: `public/site.webmanifest`
- Create: `public/og-card.svg`
- Create: `scripts/content-audit.mjs`
- Create: `scripts/link-audit.mjs`
- Create: `.github/workflows/pages.yml`
- Create: `README.md`
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Modify: `src/layouts/Base.astro`
- Create: `tests/unit/audit.test.ts`

**Interfaces:**
- Consumes the generated page and confirmed source PDF `/Users/wxl/Desktop/王晓磊-AI应用-全栈工程师.pdf`.
- Produces `npm run audit`, `npm run build`, and a Pages workflow that uploads `dist/`.

- [ ] **Step 1: Write audit tests**

Assert the audit rejects template names, `example.com`, placeholder project titles, empty internal links, missing resume asset, and missing root `index.html` in the production build.

- [ ] **Step 2: Run audit tests and verify they fail**

Run: `npm run test:unit -- tests/unit/audit.test.ts`

Expected: FAIL because audit scripts and public assets do not exist.

- [ ] **Step 3: Add the confirmed PDF and metadata assets**

Copy the source PDF to the public resume path; add the manifest, robots file, favicon/OG metadata, canonical URL, Person JSON-LD, and descriptive social card.

- [ ] **Step 4: Implement content/link audits**

Create deterministic scripts that scan source/generated files and exit non-zero on forbidden placeholders, empty links, missing required files, or absent root entry output.

- [ ] **Step 5: Add GitHub Pages workflow and project documentation**

Configure Actions for Node 22, `npm ci`, unit tests, Astro check, audits, production build, Pages artifact upload, and deployment on `main`. Document local commands, content locations, template attribution, and deployment URL.

- [ ] **Step 6: Run the complete pre-deployment gate**

Run: `npm run test:unit && npm run check && npm run build && npm run audit && npx playwright test`

Expected: all commands PASS and `dist/index.html` plus the resume PDF exist.

- [ ] **Step 7: Commit the production and deployment layer**

```bash
git add public scripts .github/workflows/pages.yml README.md package.json astro.config.mjs src/layouts/Base.astro tests/unit/audit.test.ts
git commit -m "feat: prepare portfolio for GitHub Pages"
```

### Task 5: Visual QA, independent review, and public deployment

**Files:**
- Modify: only files required to address verified QA or review findings

**Interfaces:**
- Consumes the verified static build from Task 4.
- Produces the public repository and confirmed Pages URL.

- [ ] **Step 1: Run local visual QA**

Open the local production preview in Safari-compatible browser automation; inspect desktop and mobile screenshots, keyboard navigation, anchor scrolling, resume download, GitHub links, text clipping, and reduced motion.

- [ ] **Step 2: Fix and re-run only evidence-backed issues**

Apply minimal corrections, then repeat the affected automated and visual checks.

- [ ] **Step 3: Run independent read-only review**

Review the full branch for factual drift, accessibility regressions, mobile overflow, broken links/assets, leaked secrets, deployment misconfiguration, and missing tests. Resolve all serious in-scope findings.

- [ ] **Step 4: Run the final verification gate**

Run: `npm run test:unit && npm run check && npm run build && npm run audit && npx playwright test && git diff --check && git status --short`

Expected: all checks PASS; working tree clean after the final commit.

- [ ] **Step 5: Create and push the public GitHub repository**

Run: `gh repo create 2718704495-eng.github.io --public --source=. --remote=origin --push`

Expected: repository `2718704495-eng/2718704495-eng.github.io` exists and `main` is pushed.

- [ ] **Step 6: Enable Pages through GitHub Actions and verify deployment**

Set the Pages build source to GitHub Actions, wait for the `pages.yml` workflow, inspect failed job logs if needed, and verify the final URL `https://2718704495-eng.github.io/` returns the built homepage.

- [ ] **Step 7: Record the deployment result**

Add the final public URL to `README.md` if it differs, commit/push that correction, and report the repository, site URL, checks run, and any deferred non-blocking improvements.
