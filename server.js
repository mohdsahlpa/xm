// Zero-dependency local CLI server for XM
// Supports both path-based (/1) and query parameter (?id=1) requests
// Always returns pure text/plain responses.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;
  const targetQueryId = reqUrl.searchParams.get('id');

  // Set pure plain text headers for all responses
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Determine requested program ID (either from ?id=... or from path /<id>)
  let targetId = targetQueryId || null;

  if (!targetId && pathname && pathname !== '/' && pathname !== '/xm' && pathname !== '/xm/') {
    // Strip leading /xm if present, and trim slashes
    const cleanPath = pathname.replace(/^\/xm\/?/, '').replace(/^\//, '');
    if (cleanPath && !cleanPath.includes('..')) {
      targetId = cleanPath.replace(/\.c$/, '');
    }
  }

  // Case 1: If an ID was requested (e.g. ?id=1 or /1 or /1.c)
  if (targetId) {
    const filename = targetId.endsWith('.c') ? targetId : `${targetId}.c`;
    const candidates = [
      path.join(BASE_DIR, targetId),
      path.join(BASE_DIR, 'programs', targetId),
      path.join(BASE_DIR, filename),
      path.join(BASE_DIR, 'programs', filename)
    ];

    let foundFile = null;
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        foundFile = c;
        break;
      }
    }

    if (foundFile) {
      const content = fs.readFileSync(foundFile, 'utf8');
      res.statusCode = 200;
      return res.end(content);
    } else {
      res.statusCode = 404;
      return res.end(`Error: Program '${targetId}' not found.\nUse 'curl http://localhost:${PORT}/' to list available programs.\n`);
    }
  }

  // Case 2: Root request -> Return the plain text help & syntax guide
  const indexPath = path.join(BASE_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    const text = fs.readFileSync(indexPath, 'utf8');
    res.statusCode = 200;
    return res.end(text);
  }

  res.statusCode = 200;
  res.end('XM - C Program Repository\nNo programs available.\n');
});

server.listen(PORT, () => {
  console.log(`XM Plain-Text Server running at http://localhost:${PORT}`);
  console.log(`- curl "http://localhost:${PORT}/?id=1"`);
  console.log(`- curl "http://localhost:${PORT}/1"`);
});
