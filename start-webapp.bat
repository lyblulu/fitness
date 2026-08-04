@echo off
cd /d "D:\健身"
start /B node node_modules\vite\bin\vite.js preview --host --port 5173 > nul 2>&1
exit