const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const rootDir = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function resolvePath(requestPath) {
  const safePath = requestPath === '/' ? '/index.html' : requestPath;
  const resolved = path.normalize(safePath).replace(/^\/+/, '');
  const candidate = path.join(rootDir, resolved);

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  const fallback = path.join(rootDir, 'index-1.html');
  if (safePath === '/index.html' && fs.existsSync(fallback)) {
    return fallback;
  }

  return candidate;
}

const server = http.createServer((req, res) => {
  const requestPath = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
  const filePath = resolvePath(requestPath);

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 - Page not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Kampala Pharmacies is running at http://${hostname}:${port}`);
});
