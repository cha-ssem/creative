/**
 * @file server.js
 * @description 로컬 정적 웹 서버 (Node.js 내장 모듈 사용 - 무설치 실행)
 * 비디오/오디오 스트리밍을 위한 HTTP Range 헤더 지원 및 한글 파일명 완벽 대응
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DEFAULT_PORT = 3000;
const ROOT_DIR = __dirname;

/**
 * 지원 파일 확장자별 MIME 타입 맵
 */
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.srt': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

/**
 * HTTP 요청 핸들러
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const handleRequest = (req, res) => {
  try {
    const parsedUrl = url.parse(req.url);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // 기본 파일 설정
    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    }

    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(ROOT_DIR, safePath);

    // 상위 디렉터리 경로 순회 방지
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden: 접근 권한이 없습니다.');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`404 Not Found: 파일을 찾을 수 없습니다. (${pathname})`);
        return;
      }

      // 디렉터리 접근 시 내부 index.html 확인
      if (stats.isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
          serveFile(req, res, indexPath, fs.statSync(indexPath));
        } else {
          res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('403 Forbidden: 디렉터리 목록 조회가 비활성화되어 있습니다.');
        }
        return;
      }

      serveFile(req, res, filePath, stats);
    });
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`500 Server Error: ${err.message}`);
  }
};

/**
 * 정적 파일 및 미디어 스트리밍(Range) 서빙 함수
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {string} filePath
 * @param {fs.Stats} stats
 */
const serveFile = (req, res, filePath, stats) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const rangeHeader = req.headers.range;

  // 비디오/오디오 스트리밍을 위한 Range 요청 처리
  if (rangeHeader && (contentType.startsWith('video/') || contentType.startsWith('audio/'))) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

    if (start >= stats.size || end >= stats.size) {
      res.writeHead(416, {
        'Content-Range': `bytes */${stats.size}`,
        'Content-Type': contentType
      });
      res.end();
      return;
    }

    const chunkSize = (end - start) + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*'
    });

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
};

/**
 * 서버 시작 (포트 충돌 시 자동 다음 포트 시도)
 * @param {number} port
 */
const startServer = (port) => {
  const server = http.createServer(handleRequest);

  server.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`  🚀 로컬 웹 서버가 성공적으로 실행되었습니다!`);
    console.log(`  🌐 웹페이지 주소: http://localhost:${port}`);
    console.log(`  📁 서빙 루트 경로: ${ROOT_DIR}`);
    console.log(`  종료하려면 터미널에서 [Ctrl + C]를 누르세요.`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[포트 충돌] ${port}번 포트가 사용 중입니다. ${port + 1}번 포트로 재시도합니다...`);
      startServer(port + 1);
    } else {
      console.error('서버 오류 발생:', err);
    }
  });
};

const portToUse = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
startServer(portToUse);

