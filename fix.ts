import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src/components');

const replacements = [
  { regex: /\bbg-white\b/g, replacement: 'bg-card' },
  { regex: /\btext-gray-900\b/g, replacement: 'text-primary' },
  { regex: /\btext-gray-800\b/g, replacement: 'text-primary' },
  { regex: /\btext-gray-700\b/g, replacement: 'text-secondary' },
  { regex: /\btext-gray-600\b/g, replacement: 'text-secondary' },
  { regex: /\btext-gray-500\b/g, replacement: 'text-secondary' },
  { regex: /\btext-gray-400\b/g, replacement: 'text-secondary' },
  { regex: /\bborder-gray-200\b/g, replacement: 'border-subtle' },
  { regex: /\bborder-gray-100\b/g, replacement: 'border-subtle' },
  { regex: /\bborder-gray-300\b/g, replacement: 'border-subtle' },
  { regex: /\bhover:bg-gray-50\b/g, replacement: 'hover:bg-subtle' },
  { regex: /\bhover:bg-gray-100\b/g, replacement: 'hover:bg-subtle' },
  { regex: /\bbg-gray-50\b/g, replacement: 'bg-base' },
  { regex: /\bbg-gray-100\b/g, replacement: 'bg-base' },
  { regex: /\btext-blue-600\b/g, replacement: 'text-brand' },
  { regex: /\btext-blue-500\b/g, replacement: 'text-brand' },
  { regex: /\bhover:text-blue-700\b/g, replacement: 'hover:text-brand' },
  { regex: /\bbg-blue-50\b/g, replacement: 'bg-brand/10' },
  { regex: /\bbg-blue-100\b/g, replacement: 'bg-brand/20' },
  { regex: /\bbg-blue-600\b/g, replacement: 'bg-brand' },
  { regex: /\bbg-blue-500\b/g, replacement: 'bg-brand' },
  { regex: /\bhover:bg-blue-700\b/g, replacement: 'hover:bg-brand/90' },
  { regex: /\btext-green-600\b/g, replacement: 'text-bullish' },
  { regex: /\btext-green-500\b/g, replacement: 'text-bullish' },
  { regex: /\bbg-green-100\b/g, replacement: 'bg-bullish/20' },
  { regex: /\bbg-green-50\b/g, replacement: 'bg-bullish/10' },
  { regex: /\btext-red-600\b/g, replacement: 'text-bearish' },
  { regex: /\btext-emerald-500\b/g, replacement: 'text-bullish' },
  { regex: /\btext-emerald-600\b/g, replacement: 'text-bullish' },
  { regex: /\btext-emerald-700\b/g, replacement: 'text-bullish' },
  { regex: /\bbg-emerald-100\b/g, replacement: 'bg-bullish/20' },
  { regex: /\bbg-emerald-50\b/g, replacement: 'bg-bullish/10' },
  { regex: /\bborder-emerald-200\b/g, replacement: 'border-bullish/30' },
  { regex: /\bbg-emerald-100\/50\b/g, replacement: 'bg-bullish/10' },
  { regex: /\bbg-emerald-900\/30\b/g, replacement: 'bg-bullish/20' },
  { regex: /\bborder-emerald-800\/50\b/g, replacement: 'border-bullish/30' },
  { regex: /\bfrom-emerald-500\b/g, replacement: 'from-bullish' },
  { regex: /\bto-red-500\b/g, replacement: 'to-bearish' },
  { regex: /\bfrom-emerald-400\b/g, replacement: 'from-bullish' },
  { regex: /\bto-red-400\b/g, replacement: 'to-bearish' },
  { regex: /\bbg-emerald-500\b/g, replacement: 'bg-bullish' },
  { regex: /\bbg-emerald-400\b/g, replacement: 'bg-bullish' },
  { regex: /\bbg-red-500\b/g, replacement: 'bg-bearish' },
  { regex: /\bbg-red-400\b/g, replacement: 'bg-bearish' },
  { regex: /\btext-red-600\b/g, replacement: 'text-bearish' },
  { regex: /\btext-red-700\b/g, replacement: 'text-bearish' },
  { regex: /\bbg-red-100\b/g, replacement: 'bg-bearish/20' },
  { regex: /\bbg-red-50\b/g, replacement: 'bg-bearish/10' },
  { regex: /\bborder-red-200\b/g, replacement: 'border-bearish/30' },
  { regex: /\bbg-red-500\/5\b/g, replacement: 'bg-bearish/5' },
  { regex: /\bborder-gray-400\b/g, replacement: 'border-subtle' },
  { regex: /\bborder-gray-300\b/g, replacement: 'border-subtle' },
  { regex: /\bborder-gray-200\b/g, replacement: 'border-subtle' },
  { regex: /\bborder-gray-900\b/g, replacement: 'border-subtle' },
  { regex: /\bbg-gray-200\b/g, replacement: 'bg-subtle' },
  { regex: /\bbg-gray-300\b/g, replacement: 'bg-subtle' },
  { regex: /\bbg-gray-400\b/g, replacement: 'bg-subtle' },
  { regex: /\bbg-gray-800\b/g, replacement: 'bg-card' },
  { regex: /\bbg-gray-900\b/g, replacement: 'bg-card' },
  { regex: /\btext-gray-200\b/g, replacement: 'text-secondary' },
  { regex: /\btext-gray-400\b/g, replacement: 'text-secondary' },
  { regex: /\bhover:bg-gray-200\b/g, replacement: 'hover:bg-subtle' },
  { regex: /\bhover:bg-gray-800\b/g, replacement: 'hover:bg-card' },
  { regex: /\bdecoration-gray-300\b/g, replacement: 'decoration-subtle' },
  { regex: /\bshadow-gray-200\b/g, replacement: 'shadow-subtle' },
  { regex: /\btext-black\b/g, replacement: 'text-primary' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log('Done');
