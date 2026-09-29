@echo off
chcp 65001 > nul
title AI BGM Studio - Background Music Extractor & Continuation

echo ================================================================
echo   🎵 AI 클립 배경음악 추출 및 연장 스튜디오 (Runwai Editorial)
echo ================================================================
echo.

cd /d "%~dp0"

REM 1. 가상환경 확인 및 활성화
if exist ".venv\Scripts\activate.bat" (
    echo [1/2] 가상환경(.venv)을 활성화합니다...
    call .venv\Scripts\activate.bat
) else (
    echo [1/2] 로컬 Python 환경을 사용합니다...
)

REM 2. app.py 실행
echo [2/2] AI BGM Studio 웹 서버를 실행합니다...
echo.
echo * 브라우저가 자동으로 열립니다. (주소: http://127.0.0.1:7860)
echo * 종료하려면 이 창에서 [Ctrl + C]를 누르세요.
echo ----------------------------------------------------------------
echo.

python app.py

pause
