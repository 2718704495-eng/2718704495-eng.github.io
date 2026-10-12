import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt', '.svg']);
const forbidden = ['John Doe', 'Jane Doe', 'example.com', 'Lorem ipsum', 'floating-astronaut'];
const requiredAssets = [
  'public/favicon.svg',
  'public/og-card.svg',
  'public/robots.txt',
  'public/site.webmanifest',
  'public/resume/wang-xiaolei-ai-fullstack.pdf',
];
const publicResume = 'public/resume/wang-xiaolei-ai-fullstack.pdf';
const approvedEmail = '2718704495@qq.com';

async function collectTextFiles(directory) {
  const files = [];
  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectTextFiles(path)));
    else if (textExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

export async function auditContent(root) {
  const errors = [];
  const files = await collectTextFiles(join(root, 'src'));

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    for (const marker of forbidden) {
      if (content.toLowerCase().includes(marker.toLowerCase())) {
        errors.push(`${relative(root, file)} 包含模板残留：${marker}`);
      }
    }
  }

  for (const asset of requiredAssets) {
    try {
      await access(join(root, asset));
    } catch {
      errors.push(`缺少发布文件：${asset}`);
    }
  }

  try {
    const data = new Uint8Array(await readFile(join(root, publicResume)));
    const loadingTask = getDocument({ data, disableWorker: true, verbosity: 0 });
    const pdf = await loadingTask.promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
    }
    await loadingTask.destroy();

    const resumeText = pages.join('\n');
    if (/(?<!\d)1[3-9]\d{9}(?!\d)/.test(resumeText)) {
      errors.push(`${publicResume} 包含不应公开的手机号`);
    }
    const emails = resumeText.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? [];
    const unapprovedEmails = [...new Set(emails)].filter((email) => email !== approvedEmail);
    if (!emails.includes(approvedEmail) || unapprovedEmails.length > 0) {
      errors.push(`${publicResume} 的公开邮箱与网站资料不一致`);
    }
  } catch (error) {
    if (!errors.some((message) => message.includes(publicResume))) {
      errors.push(`${publicResume} 无法完成隐私审计：${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  return errors;
}

async function run() {
  const errors = await auditContent(process.cwd());
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exitCode = 1;
    return;
  }
  console.log('内容审计通过：未发现模板残留，发布资源齐全。');
}

if (import.meta.url === pathToFileURL(fileURLToPath(import.meta.url)).href && process.argv[1] === fileURLToPath(import.meta.url)) {
  await run();
}
