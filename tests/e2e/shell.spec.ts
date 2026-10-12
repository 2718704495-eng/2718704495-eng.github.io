import { expect, test } from '@playwright/test';

test('为键盘用户提供清晰的主内容入口和站内导航', async ({ page }) => {
  await page.goto('/');

  const skipLink = page.getByRole('link', { name: '跳到正文' });
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();

  await expect(page.getByRole('main')).toHaveAttribute('id', 'main-content');
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();

  for (const href of ['#about', '#experience', '#projects', '#workflow', '#contact']) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
    await expect(page.locator(href)).toBeAttached();
  }
});

test('站内导航可以到达对应区域', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '项目', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
});

test.describe('渐进增强', () => {
  test.use({ javaScriptEnabled: false });

  test('禁用 JavaScript 后核心区块仍然可见', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '核心能力' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '工作经历' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '重点项目' })).toBeVisible();
  });
});

test('减少动态效果时页面内容保持可见', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
});
