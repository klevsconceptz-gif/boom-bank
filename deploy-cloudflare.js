import { execSync } from 'child_process';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '134607aed133845a62bac879ed8d1a9b';
const EMAIL = process.env.CLOUDFLARE_EMAIL || 'klevsconceptz@gmail.com';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const API_KEY = process.env.CLOUDFLARE_API_KEY;

console.log('========================================================');
console.log(`☁️ BOOM BANK - CLOUDFLARE DEPLOYMENT UTILITY`);
console.log(`Account Email: ${EMAIL}`);
console.log(`Account ID:    ${ACCOUNT_ID}`);
console.log('========================================================');

if (!API_TOKEN && !API_KEY) {
  console.log('⚠️  To complete automated deployment, provide your Cloudflare Global API Key or API Token:');
  console.log(`export CLOUDFLARE_EMAIL="${EMAIL}"`);
  console.log(`export CLOUDFLARE_ACCOUNT_ID="${ACCOUNT_ID}"`);
  console.log('export CLOUDFLARE_API_KEY="<your_global_api_key>"');
  console.log('npx wrangler pages deploy dist --project-name=boom-bank\n');
} else {
  try {
    console.log('🚀 Deploying production build (dist/) to Cloudflare Pages...');
    execSync(`npx wrangler pages deploy dist --project-name=boom-bank --commit-dirty=true`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID,
        CLOUDFLARE_EMAIL: EMAIL,
        ...(API_TOKEN ? { CLOUDFLARE_API_TOKEN: API_TOKEN } : {}),
        ...(API_KEY ? { CLOUDFLARE_API_KEY: API_KEY } : {})
      }
    });
    console.log('✅ Successfully published to Cloudflare Pages!');
  } catch (err) {
    console.error('❌ Deployment error:', err.message);
  }
}
