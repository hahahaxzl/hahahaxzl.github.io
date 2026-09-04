#!/usr/bin/env node
/**
 * 数学一成绩记录表 —— 本地自动同步服务（方案B）
 *
 * 作用：成绩表在保存时把全量状态 POST 到本服务，本服务写入 grades-data.json
 *       并自动 git commit + push 到 GitHub Pages 仓库，使线上 math-grades.html 永远最新。
 *
 * 启动：node sync-server.js  （建议用 LaunchAgent 登录自启，见 com.hahahaxzl.gradesync.plist）
 * Token：GitHub Personal Access Token（repo+workflow）放在同目录 .sync-token 文件，
 *        该文件已被 .gitignore 忽略，不会上传到 GitHub。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PORT = 8765;
const HOST = '127.0.0.1';
const GIT = '/usr/bin/git';
const REPO_DIR = __dirname;
const DATA_FILE = path.join(REPO_DIR, 'grades-data.json');
const TOKEN_FILE = path.join(REPO_DIR, '.sync-token');
const OWNER = 'hahahaxzl';
const REPO = 'hahahaxzl.github.io';

function getToken() {
  try { return fs.readFileSync(TOKEN_FILE, 'utf8').trim(); } catch { return process.env.SYNC_TOKEN || ''; }
}
function log(...a) { console.log(new Date().toISOString(), '[sync-server]', ...a); }

function pushToGit() {
  const token = getToken();
  if (!token) {
    log('无 token，仅本地保存 grades-data.json，未推送 GitHub（把 token 写入 .sync-token 即可启用自动推送）');
    return;
  }
  const remote = `https://${OWNER}:${token}@github.com/${OWNER}/${REPO}.git`;
  execFile(GIT, ['-C', REPO_DIR, 'add', 'grades-data.json'], (e) => {
    if (e) { log('git add 失败:', e.message); return; }
    const msg = `sync: 自动更新成绩数据 ${new Date().toISOString()}`;
    execFile(GIT, ['-C', REPO_DIR, 'commit', '-m', msg], (e2) => {
      if (e2) { log('git commit:', e2.message); }
      execFile(GIT, ['-C', REPO_DIR, 'push', remote, 'main'], (e3) => {
        if (e3) log('git push 失败:', e3.message);
        else log('git push OK -> https://' + REPO);
      });
    });
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, token: !!getToken() }));
    return;
  }

  if (req.method === 'POST' && req.url === '/sync') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        const obj = JSON.parse(body);
        if (!obj || !Array.isArray(obj.data)) throw new Error('data 字段缺失或非数组');
        fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2));
        log('收到数据，已写入 grades-data.json（共 ' + obj.data.length + ' 条）');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        pushToGit();
      } catch (e) {
        log('解析失败:', e.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

server.listen(PORT, HOST, () => {
  log(`监听 http://${HOST}:${PORT}（仓库目录 ${REPO_DIR}）`);
  log('token 状态: ' + (getToken() ? '已配置' : '未配置（仅本地保存）'));
});
