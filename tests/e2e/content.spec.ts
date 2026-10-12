import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('首屏清楚呈现职业定位和三个主要入口', async ({ page }) => {
  const hero = page.locator('#about');
  await expect(page.getByRole('heading', { level: 1, name: '王晓磊' })).toBeVisible();
  await expect(page.getByText('AI 应用 · Java 全栈工程师', { exact: true })).toBeVisible();
  await expect(page.getByText('将业务需求转化为可验证、可交付的 AI 与全栈产品。')).toBeVisible();
  await expect(hero.getByRole('link', { name: '查看项目' })).toHaveAttribute('href', '#projects');
  await expect(hero.getByRole('link', { name: '下载简历' })).toHaveAttribute(
    'href',
    '/resume/wang-xiaolei-ai-fullstack.pdf',
  );
  await expect(hero.getByRole('link', { name: '访问 GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/2718704495-eng',
  );
});

test('核心能力、工作经历和项目数量完整', async ({ page }) => {
  await expect(page.locator('[data-capability]')).toHaveCount(4);
  await expect(page.locator('[data-experience]')).toHaveCount(2);
  await expect(page.locator('[data-project]')).toHaveCount(4);
  await expect(page.locator('[data-workflow-step]')).toHaveCount(6);
});

test('项目卡片展示业务闭环且仅在有地址时提供项目链接', async ({ page }) => {
  const firstProject = page.locator('[data-project]').first();
  for (const label of ['业务场景', '我负责', '技术方案', '形成结果']) {
    await expect(firstProject.getByText(label, { exact: true })).toBeVisible();
  }

  await expect(page.getByRole('heading', { name: '医疗智能导诊 Agent' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '神州打卡绘微信小程序' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '微信 AI 聊天助手' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '文博元宇宙数字人交互系统' })).toBeVisible();
  await expect(page.locator('[data-project-link]')).toHaveCount(2);
});

test('教育荣誉和联系入口可见', async ({ page }) => {
  await expect(page.getByText('浙江工业大学之江学院')).toBeVisible();
  await expect(page.getByText('专业排名前 10%')).toBeVisible();
  await expect(page.getByText('服务外包创新创业大赛省级三等奖', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: '发送邮件' })).toHaveAttribute(
    'href',
    'mailto:2718704495@qq.com',
  );
});
