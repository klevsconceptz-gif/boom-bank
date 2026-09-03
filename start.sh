#!/usr/bin/env bash
set -e

echo "========================================================="
echo "🏦 BOOM BANK - PRODUCTION DEPLOYMENT & AUTO-START"
echo "========================================================="

# 1. Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js (v18 or higher)."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# 2. Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# 3. Build Vite Production Bundle if dist is missing
if [ ! -d "dist" ]; then
    echo "🔨 Building frontend production distribution..."
    npm run build
fi

# 4. Set environment variables defaults
export PORT=${PORT:-3000}
export NODE_ENV=${NODE_ENV:-production}

echo "========================================================="
echo "🔒 AES-256-GCM Hardware Encryption Engine: ACTIVE"
echo "🛡️ Governed by Admin: klev1212 (Password: Admin@boom)"
echo "🌐 Server running on: http://0.0.0.0:${PORT}"
echo "========================================================="

# 5. Launch Boom Bank Production Server
exec node server.js
