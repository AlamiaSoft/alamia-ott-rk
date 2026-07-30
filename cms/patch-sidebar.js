import fs from 'fs';
import path from 'path';

const files = [
  'node_modules/payload-sidebar-plugin/dist/components/index.js',
  'node_modules/payload-sidebar-plugin/dist/rsc/index.js'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace all occurrences of Github with Ghost (which isn't already imported)
    content = content.replace(/\bGithub\b/g, 'Ghost');
    fs.writeFileSync(file, content);
    console.log(`Patched ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
