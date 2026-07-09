// Static site build: stitches shared head/nav/footer partials into each page.
// No framework runtime — output is plain static HTML for Netlify.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

const head = fs.readFileSync(path.join(SRC, 'partials', 'head.html'), 'utf8');
const nav = fs.readFileSync(path.join(SRC, 'partials', 'nav.html'), 'utf8');
const footer = fs.readFileSync(path.join(SRC, 'partials', 'footer.html'), 'utf8');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(path.join(SRC, 'css'), path.join(DIST, 'css'));
copyDir(path.join(SRC, 'js'), path.join(DIST, 'js'));
const imagesDir = path.join(SRC, 'images');
if (fs.existsSync(imagesDir)) copyDir(imagesDir, path.join(DIST, 'images'));

const pagesDir = path.join(SRC, 'pages');
for (const file of fs.readdirSync(pagesDir)) {
  if (!file.endsWith('.html')) continue;
  const raw = fs.readFileSync(path.join(pagesDir, file), 'utf8');

  const titleMatch = raw.match(/<!--\s*TITLE:\s*(.*?)\s*-->/);
  const descMatch = raw.match(/<!--\s*DESCRIPTION:\s*(.*?)\s*-->/);
  const title = titleMatch ? titleMatch[1] : 'Chiaza Anokwu';
  const description = descMatch ? descMatch[1] : '';

  const contentMatch = raw.match(/<!--\s*CONTENT\s*-->([\s\S]*)/);
  const content = contentMatch ? contentMatch[1] : raw;

  const pageHead = head.replace('{{TITLE}}', title).replace('{{DESCRIPTION}}', description);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${pageHead}
</head>
<body>
${nav}
<main id="main">
${content}
</main>
${footer}
<script src="/js/main.js" defer></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(DIST, file), html);
}

console.log('Build complete →', DIST);
