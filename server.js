import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

async function resolvePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const candidates = [join(root, relative), join(root, 'public', relative)];
  for (const candidate of candidates) {
    const normalized = normalize(candidate);
    if (!normalized.startsWith(root)) continue;
    try {
      const fileStat = await stat(normalized);
      if (fileStat.isFile()) return normalized;
    } catch {
      // Try the next safe candidate.
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const filePath = await resolvePath(req.url || '/');
  if (!filePath) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      'content-type': mime[extname(filePath)] || 'application/octet-stream',
      'cache-control': 'no-cache'
    });
    res.end(body);
  } catch {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Unable to read file');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`AgentForge listening on 0.0.0.0:${port}`);
});
