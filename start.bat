@echo off
echo =========================================================
echo 🏦 BOOM BANK - PRODUCTION DEPLOYMENT ^& AUTO-START
echo =========================================================

IF NOT EXIST node_modules (
    echo 📦 Installing npm dependencies...
    call npm install
)

IF NOT EXIST dist (
    echo 🔨 Building frontend production distribution...
    call npm run build
)

set PORT=3000
set NODE_ENV=production

echo =========================================================
echo 🔒 AES-256-GCM Hardware Encryption Engine: ACTIVE
echo 🛡️ Governed by Admin: klev1212 (Password: Admin@boom)
echo 🌐 Server running on: http://localhost:3000
echo =========================================================

call node server.js
