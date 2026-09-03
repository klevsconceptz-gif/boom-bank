# 🏦 BOOM BANK - COMPLETE WORKSPACE & DEVELOPER GUIDE

Welcome to the **Boom Bank** commercial digital banking platform codebase. This guide details every file, architectural pattern, security protocol, database adapter, Docker containerization setup, and Cloudflare Pages deployment channel.

---

## 📂 1. Directory Structure

```
bank-app/
├── data/
│   └── bank_db.json                 # Persistent database state & ledger seed
├── functions/
│   └── api/
│       └── [[path]].js              # Cloudflare Pages Functions / Workers REST API & fallback AES-256 cipher
├── public/
│   ├── favicon.ico                  # Gold emblem favicon
│   ├── favicon.png                  # High-res 32x32 gold mark
│   ├── favicon.svg                  # Vector gold mark
│   ├── iphone-17-air.png            # High-res iPhone 17 Air display asset
│   ├── logo-mark.png                # Official gold emblem
│   ├── sign-in-gold-button.png      # Background-removed brushed gold "SIGN IN" button
│   ├── robots.txt                   # Crawler rules referencing sitemap
│   └── sitemap.xml                  # Dynamic XML sitemap
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx       # Customer search, balance override & account freeze toggles
│   │   ├── AdminGovernanceDesk.jsx   # Real-time transaction authorization queue
│   │   ├── AiStaffHub.jsx           # AI staff roster (Sentinel, Lexis, Apex, Concierge, Credit)
│   │   ├── BillPayView.jsx          # Utility & local bank payment management
│   │   ├── CardManagementView.jsx   # Virtual Visa debit cards with custom spend limits
│   │   ├── Dashboard.jsx            # Account balances & recent transaction ledger
│   │   ├── DirectDepositModal.jsx   # Pre-filled printable direct deposit authorization form
│   │   ├── DisplayHero.jsx          # Primary brand header with routing number & APY badge
│   │   ├── KycProfileView.jsx       # Identity verification badge & decrypted payload viewer
│   │   ├── KycWizard.jsx            # KYC onboarding (SSN, address, ID scan, W-9, initial deposit)
│   │   ├── LandingPage.jsx          # iPhone 17 Air showcase, gold sign-in button & store badges
│   │   ├── LoginModal.jsx           # Sign-in modal dialog
│   │   ├── MobileDepositView.jsx    # Check photo deposit & endorsement simulator
│   │   ├── Navbar.jsx               # Navigation bar with user context
│   │   ├── NotificationToast.jsx    # Real-time notification banners
│   │   ├── ReceiptModal.jsx         # Printable official transaction receipt
│   │   ├── SecurityVaultView.jsx    # Cryptographic vault & FIPS 140-2 compliance metrics
│   │   ├── Sidebar.jsx              # Customer navigation drawer
│   │   ├── StatementsView.jsx       # PDF/Print monthly statements & 1099-INT summaries
│   │   └── TransfersView.jsx        # ACH, Zelle, FedWire & global 150+ currency SWIFT wires
│   ├── context/
│   │   └── AuthContext.jsx          # React state management & API integration
│   ├── services/
│   │   └── api.js                   # Unified fetch client with fallback endpoints
│   ├── utils/
│   │   └── formatters.js            # Currency ($), date, account & SSN formatters
│   ├── App.jsx                      # Main app shell & router
│   ├── index.css                    # Tailwind CSS v4 styling rules
│   └── main.jsx                     # React DOM root mounting
├── .env.example                     # Cloudflare & API secret key template
├── .node-version                    # Node.js 20 engine specification
├── .nvmrc                           # Node.js 20 version specification
├── db-adapter.js                    # Safe atomic disk persistence (tmp write + renameSync)
├── deploy-cloudflare.js             # Deployment utility script
├── Dockerfile                       # Multi-stage Docker production image
├── docker-compose.yml               # Docker Compose service definition
├── index.html                       # HTML head with Open Graph, Twitter cards & JSON-LD schema
├── package.json                     # NPM dependencies & build scripts
├── README-DEPLOYMENT.md             # Cloudflare Pages deployment documentation
├── server-crypto.js                 # AES-256-GCM cipher & PBKDF2 SHA-512 password hash
├── server.js                        # Node.js Express API backend server
├── start.sh                         # Linux/macOS start script
├── start.bat                        # Windows start script
├── vite.config.js                   # Vite bundler configuration
├── wrangler.toml                    # Cloudflare Workers, Pages, D1 SQL, KV & R2 bindings
└── WORKSPACE-GUIDE.md               # Complete developer workspace guide
```

---

## 🔐 2. Security & Encryption Standards

1. **SSN & Address Payload Encryption (`server-crypto.js`)**:
   - Algorithm: **AES-256-GCM** (Authenticated Galois/Counter Mode).
   - Format: `enc:aes256gcm:<12-byte IV>:<16-byte AuthTag>:<Encrypted Hex Payload>`.
   - Prevents data tampering and verifies ciphertext integrity.

2. **Password Hashing**:
   - Algorithm: **PBKDF2 with SHA-512**.
   - Key Iterations: 10,000 rounds with salt derivation.

3. **Atomic File Persistence (`db-adapter.js`)**:
   - Writes updated JSON database state to a temporary file (`data/bank_db.json.tmp`) and executes `fs.renameSync()` to guarantee zero database corruption during unexpected crashes or power loss.

---

## ⚡ 3. Commands & Scripts

### 🚀 **Local Development Server**
```bash
npm install
npm run dev
# Starts Vite dev server on http://localhost:5173
```

### 🖥️ **Full Stack Production Server (Node.js Express + Embedded Static Assets)**
```bash
npm install
npm run build
node server.js
# Runs full Express server on http://localhost:3000
```

### 🐳 **Docker Container Launch**
```bash
docker-compose up --build -d
# Launches containerized Boom Bank instance on port 3000
```

### ☁️ **Cloudflare Pages Deployment**
```bash
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
# Automated CI/CD triggers on Cloudflare Pages connected repository
```

---

## 👑 4. Executive Admin Credentials
- **Username**: `klev1212`
- **Password**: `Admin@boom`
- **Role**: `ADMIN` (Full backend rights, account freeze toggles, direct balance overrides, governance wire queue approval/rejection).
