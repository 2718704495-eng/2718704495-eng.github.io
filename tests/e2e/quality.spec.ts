import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const colorScheme of ['dark', 'light'] as const) {
  test(`${colorScheme} 主题没有自动化可检测的 WCAG A/AA 问题`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('页面加载无控制台错误，导航锚点和 PDF 均可访问', async ({ page, request }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/');
  const navLinks = page.getByRole('navigation', { name: '主导航' }).getByRole('link');
  const count = await navLinks.count();
  for (let index = 0; index < count; index += 1) {
    const href = await navLinks.nth(index).getAttribute('href');
    expect(href).toMatch(/^#[a-z-]+$/);
    await expect(page.locator(href!)).toBeAttached();
  }

  const response = await request.get('/resume/wang-xiaolei-ai-fullstack.pdf');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect(consoleErrors).toEqual([]);
});
