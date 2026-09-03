# 🏦 BOOM BANK - CLOUDFLARE & ENTERPRISE DEPLOYMENT GUIDE

This package is configured for Cloudflare account **`klevsconceptz@gmail.com`** (Account ID: `134607aed133845a62bac879ed8d1a9b`).

---

### ☁️ Cloudflare Pages Direct Deployment

#### Option 1: Using Global API Key / Token (CLI)
Get your Global API Key at **[https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)** (under "Global API Key" ➔ View), then run:

```bash
export CLOUDFLARE_EMAIL="klevsconceptz@gmail.com"
export CLOUDFLARE_ACCOUNT_ID="134607aed133845a62bac879ed8d1a9b"
export CLOUDFLARE_API_KEY="<your_global_api_key>"

# Deploy dist distribution to Cloudflare Pages
npx wrangler pages deploy dist --project-name=boom-bank
```

#### Option 2: Cloudflare Web Dashboard Upload (1 Click)
1. Go to: **[https://dash.cloudflare.com/134607aed133845a62bac879ed8d1a9b/workers-and-pages](https://dash.cloudflare.com/134607aed133845a62bac879ed8d1a9b/workers-and-pages)**.
2. Click **Create Application** ➔ **Pages** ➔ **Upload Assets**.
3. Set Project Name to `boom-bank`.
4. Upload the **`dist`** folder from `boom-bank-deployment.zip`.
5. Click **Deploy Site**.

---

### 🚀 Local / Self-Hosted Auto-Run

- **Linux / macOS**: `./start.sh`
- **Windows**: `start.bat`
- **Docker**: `docker-compose up --build -d`

---

### 🔑 Administrator Credentials

- **Username**: `klev1212`
- **Password**: `Admin@boom`
- **Role**: Executive Administrator
