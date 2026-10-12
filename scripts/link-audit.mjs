import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const sourceExtensions = new Set(['.astro', '.html', '.ts']);

async function collectSourceFiles(directory) {
  const files = [];
  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectSourceFiles(path)));
    else if (sourceExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

export async function auditLinks(root) {
  const errors = [];
  const files = await collectSourceFiles(join(root, 'src'));
  const invalidPatterns = [
    { pattern: /href\s*=\s*["']\s*["']/gi, label: '空链接' },
    { pattern: /href\s*=\s*["']#["']/gi, label: '占位链接' },
    { pattern: /href\s*=\s*\{\s*["']\s*["']\s*\}/gi, label: '空表达式链接' },
  ];

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    for (const { pattern, label } of invalidPatterns) {
      for (const match of content.matchAll(pattern)) {
        errors.push(`${relative(root, file)} 包含${label}：${match[0]}`);
      }
    }
  }
  return errors;
}

async function run() {
  const errors = await auditLinks(process.cwd());
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exitCode = 1;
    return;
  }
  console.log('链接审计通过：未发现空链接或占位链接。');
}

if (import.meta.url === pathToFileURL(fileURLToPath(import.meta.url)).href && process.argv[1] === fileURLToPath(import.meta.url)) {
  await run();
}
