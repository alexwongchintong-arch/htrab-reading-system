// 用法：node _build/build.mjs
// 阅读系统（检视 → 主动 → 分析 → 主题 递进）的生成器：
// 读取 products.mjs 的步骤配置，注入 template-jianshi.html，输出 ../index.html。
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const { products } = await import(join(here, 'products.mjs'));

const template = readFileSync(join(here, 'template-jianshi.html'), 'utf8');
const json = JSON.stringify(products[0]).replace(/<\//g, '<\\/');
writeFileSync(join(here, '..', 'index.html'), template.replace('__PRODUCT_JSON__', json));
console.log('已生成 index.html');
