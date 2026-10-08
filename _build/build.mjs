// 用法：node _build/build.mjs
// 将 products.mjs 中四个产品的配置注入各自模板，生成四个相互独立的单文件应用。
// 产品一使用独立模板 template-jianshi.html（书单工作台），其余产品共用 template.html（线性向导）。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const { products } = await import(join(here, 'products.mjs'));

const templateFiles = { jianshi: 'template-jianshi.html' };
const outDirs = { jianshi: '01-检视阅读', zhudong: '02-主动阅读', fenxi: '03-分析阅读', zhuti: '04-主题阅读' };

for (const p of products) {
  if (!outDirs[p.pid]) throw new Error('未知产品 pid: ' + p.pid);
  const tplName = templateFiles[p.pid] || 'template.html';
  const template = readFileSync(join(here, tplName), 'utf8');
  const json = JSON.stringify(p).replace(/<\//g, '<\\/');
  const html = template.replace('__PRODUCT_JSON__', json);
  const dir = join(here, '..', outDirs[p.pid]);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  console.log('已生成', outDirs[p.pid] + '/index.html', '（模板 ' + tplName + '）');
}
console.log('全部完成。');
