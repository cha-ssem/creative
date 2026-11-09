@echo off
chcp 65001 > nul
title AI Cinematic Storyboard - Local Web Server

echo ================================================================
echo   🎬 생성형 AI로 달라진 CEO의 하루 - 로컬 웹 서버 실행기
echo ================================================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo Node.js를 먼저 설치해주세요: https://nodejs.org/
    pause
    exit /b
)

echo [1/2] 로컬 웹 서버(server.js)를 시작합니다...
echo [2/2] 기본 브라우저를 실행합니다... (http://localhost:3000)
echo.

start http://localhost:3000
node server.js

pause

