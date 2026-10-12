import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: '手机', width: 390, height: 844 },
  { name: '桌面', width: 1440, height: 900 },
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
