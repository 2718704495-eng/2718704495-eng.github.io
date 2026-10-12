import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('首屏以编辑式视觉建立记忆点并保留核心行动入口', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  const hero = page.locator('#about');
  const heroArt = hero.locator('[data-hero-art]');

  await expect(hero.getByRole('heading', { level: 1, name: '王晓磊' })).toBeInViewport();
  await expect(hero.getByRole('link', { name: '查看代表项目' })).toBeInViewport();
  await expect(heroArt).toBeInViewport();
  await expect(heroArt).toHaveAttribute('aria-label', 'Java、Python 与 AI 全栈能力视觉摘要');
});

test('桌面端首屏视觉会响应指针位置', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      configurable: true,
      value: 8,
    });
  });
  await page.reload();
  await page.setViewportSize({ width: 1440, height: 900 });
  const heroArt = page.locator('[data-hero-art]');
  const box = await heroArt.boundingBox();
  expect(box).not.toBeNull();
  const before = await heroArt.evaluate((element) => ({
    x: (element as HTMLElement).style.getPropertyValue('--pointer-x'),
    y: (element as HTMLElement).style.getPropertyValue('--pointer-y'),
  }));

  await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height * 0.3);

  await expect
    .poll(() =>
      heroArt.evaluate((element) => ({
        x: (element as HTMLElement).style.getPropertyValue('--pointer-x'),
        y: (element as HTMLElement).style.getPropertyValue('--pointer-y'),
      })),
    )
    .not.toEqual(before);
});

test('项目采用有主次层级的案例叙事而不是等权卡片墙', async ({ page }) => {
  const projects = page.locator('[data-project]');

  await expect(projects).toHaveCount(4);
  await expect(projects.first()).toHaveAttribute('data-featured', 'true');
  await expect(projects.first().getByText('业务场景', { exact: true })).toBeVisible();
  await expect(projects.first().getByText('形成结果', { exact: true })).toBeVisible();
  await expect(projects.nth(1)).toHaveAttribute('data-tone', 'lime');
});

test('滚动揭示在减少动态效果时直接展示最终状态', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const reveal = page.locator('[data-reveal]').first();
  await expect(reveal).toBeVisible();
  await expect(reveal).toHaveCSS('opacity', '1');
  await expect(reveal).toHaveCSS('transform', 'none');
});

test('浏览器缺少 IntersectionObserver 时内容仍然可读', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('/');

  const reveal = page.locator('[data-reveal]').first();
  await expect(reveal).toBeVisible();
  await expect(reveal).toHaveCSS('opacity', '1');
  await expect(reveal).toHaveCSS('transform', 'none');
});
