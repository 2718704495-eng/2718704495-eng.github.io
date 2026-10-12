import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.ts', '.txt', '.svg']);
const forbidden = ['John Doe', 'Jane Doe', 'example.com', 'Lorem ipsum', 'floating-astronaut'];
const requiredAssets = [
  'public/favicon.svg',
  'public/og-card.svg',
  'public/robots.txt',
  'public/site.webmanifest',
  'public/resume/wang-xiaolei-ai-fullstack.pdf',
];

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
