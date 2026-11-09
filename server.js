/**
 * @file server.js
 * @description 로컬 정적 웹 서버 & 실시간 참석자 동기화(SSE/API) 내장 서버
 * - 무설치 Node.js 내장 모듈 사용 (100% 무료)
 * - 비디오/오디오 스트리밍 HTTP Range 지원
 * - 기기간(스마트폰 ⇄ PC) 실시간 사진 동기화 Server-Sent Events (SSE) 지원
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');

const DEFAULT_PORT = 3000;
const ROOT_DIR = __dirname;

// 실시간 동기화 상태 저장소 (메모리 및 영속 캐시 파일)
const CERT_CACHE_FILE = path.join(ROOT_DIR, 'cert_participants_data.json');

function loadCertStoreFromFile() {
  try {
    if (fs.existsSync(CERT_CACHE_FILE)) {
      const content = fs.readFileSync(CERT_CACHE_FILE, 'utf8');
      const data = JSON.parse(content);
      if (data && Array.isArray(data.participants)) {
        return {
          participants: data.participants,
          maxSeats: data.maxSeats || 72,
          lastModified: data.lastModified || Date.now()
        };
      }
    }
  } catch (err) {
    console.warn('Cache file read error:', err.message);
  }
  return {
    participants: [],
    maxSeats: 72,
    lastModified: Date.now()
  };
}

function saveCertStoreToFile() {
  try {
    fs.writeFileSync(CERT_CACHE_FILE, JSON.stringify(certStore, null, 2), 'utf8');
  } catch (err) {
    console.warn('Cache file write error:', err.message);
  }
}

const certStore = loadCertStoreFromFile();

// SSE(Server-Sent Events) 연결 클라이언트 풀
const sseClients = new Set();

/**
 * 연결된 모든 브라우저(스마트폰, PC 화면)로 실시간 이벤트 전송
 * @param {string} event
 * @param {any} data
 */
function broadcastSseEvent(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (err) {
      sseClients.delete(client);
    }
  }
}

/**
 * 로컬 IPv4 주소 자동 탐색 (스마트폰 접속용)
 */
function getLocalIpAddress() {
  const ifaces = os.networkInterfaces();
  for (const dev in ifaces) {
    for (const details of ifaces[dev]) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return 'localhost';
}

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
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // =========================================================================
    // [실시간 동기화 API 1] Server-Sent Events (SSE) 스트림 엔드포인트
    // =========================================================================
    if (pathname === '/api/cert/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write('\n');

      sseClients.add(res);

      // 접속 즉시 현재 상태 전송
      res.write(`event: init\ndata: ${JSON.stringify({
        participants: certStore.participants,
        maxSeats: certStore.maxSeats,
        lastModified: certStore.lastModified
      })}\n\n`);

      req.on('close', () => {
        sseClients.delete(res);
      });
      return;
    }

    // =========================================================================
    // [실시간 동기화 API 2] 현재 참가자 및 상태 조회
    // =========================================================================
    if (pathname === '/api/cert/state' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        success: true,
        participants: certStore.participants,
        maxSeats: certStore.maxSeats,
        lastModified: certStore.lastModified,
        localIp: getLocalIpAddress()
      }));
      return;
    }

    // =========================================================================
    // [실시간 동기화 API 3] 신규 참가자(사진 등) 등록
    // =========================================================================
    if (pathname === '/api/cert/participant' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 50 * 1024 * 1024) { // 50MB 제한
          req.destroy();
        }
      });

      req.on('end', () => {
        try {
          const newP = JSON.parse(body);
          if (!newP || !newP.id) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: '유효하지 않은 데이터입니다.' }));
            return;
          }

          // 중복 체크 및 추가
          const existsIndex = certStore.participants.findIndex(p => p.id === newP.id);
          if (existsIndex >= 0) {
            certStore.participants[existsIndex] = newP;
          } else {
            certStore.participants.unshift(newP);
          }
          certStore.lastModified = Date.now();
          saveCertStoreToFile();

          // 모든 연결된 기기(메인 스크린 PC 포함)로 즉각 방송!
          broadcastSseEvent('new_participant', newP);

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, count: certStore.participants.length }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    // =========================================================================
    // [실시간 동기화 API 4] 참가자 초기화 / 리셋
    // =========================================================================
    if (pathname === '/api/cert/reset' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const reqData = body ? JSON.parse(body) : {};
          const mode = reqData.mode || 'EMPTY';
          if (mode === 'EMPTY') {
            certStore.participants = [];
          } else if (Array.isArray(reqData.defaults)) {
            certStore.participants = [...reqData.defaults];
          }
          certStore.lastModified = Date.now();
          saveCertStoreToFile();

          broadcastSseEvent('reset_participants', { mode: mode, participants: certStore.participants });

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, count: certStore.participants.length }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

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
 * 서버 시작 (0.0.0.0 바인딩으로 같은 네트워크의 모바일 기기 접속 완벽 지원)
 * @param {number} port
 */
const startServer = (port) => {
  const server = http.createServer(handleRequest);
  const localIp = getLocalIpAddress();

  server.listen(port, '0.0.0.0', () => {
    console.log(`\n==================================================`);
    console.log(`  🚀 로컬 웹 & 실시간 동기화 서버가 실행되었습니다!`);
    console.log(`  🌐 PC 접속 주소: http://localhost:${port}`);
    console.log(`  📱 스마트폰 접속 주소: http://${localIp}:${port}`);
    console.log(`  ⚡ 실시간 동기화: 무설치 SSE 내장 (100% 무료 로컬 중계)`);
    console.log(`  📁 서빙 루트 경로: ${ROOT_DIR}`);
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
