import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { auditContent } from '../../scripts/content-audit.mjs';
import { auditLinks } from '../../scripts/link-audit.mjs';

const temporaryDirectories: string[] = [];

async function createFixture() {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-audit-'));
  temporaryDirectories.push(root);
  await mkdir(join(root, 'src'), { recursive: true });
  await mkdir(join(root, 'public', 'resume'), { recursive: true });
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true })));
});

describe('发布内容审计', () => {
  it('当前公开 PDF 只包含获准联系方式', async () => {
    const errors = await auditContent(process.cwd());
    expect(errors).toEqual([]);
  });

  it('识别模板残留和缺失的 PDF 简历', async () => {
    const root = await createFixture();
    await writeFile(join(root, 'src', 'page.astro'), '<p>John Doe at example.com</p>');

    const errors = await auditContent(root);

    expect(errors.join('\n')).toContain('John Doe');
    expect(errors.join('\n')).toContain('example.com');
    expect(errors.join('\n')).toContain('wang-xiaolei-ai-fullstack.pdf');
  });

  it('识别空链接和占位链接', async () => {
    const root = await createFixture();
    await writeFile(join(root, 'src', 'page.astro'), '<a href="">empty</a><a href="#">placeholder</a>');

    const errors = await auditLinks(root);

    expect(errors).toHaveLength(2);
  });
});
