import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: '小屏手机', width: 375, height: 812 },
  { name: '平板', width: 768, height: 1024 },
  { name: '桌面', width: 1440, height: 900 },
  { name: '手机横屏', width: 844, height: 390 },
]) {
  test(`${viewport.name}尺寸没有横向溢出或内容遮挡`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const dimensions = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));

    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.locator('[data-project]').last()).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });
}

test('放大到 200% 字号后核心内容仍能回流', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });

  const dimensions = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));

  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  const navLinks = page.getByRole('navigation', { name: '主导航' }).getByRole('link');
  for (let index = 0; index < (await navLinks.count()); index += 1) {
    await navLinks.nth(index).focus();
    const box = await navLinks.nth(index).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  }
  await expect(page.getByRole('heading', { name: '重点项目' })).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
});
