import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'bank_db.json');

export function ensureDbInitialized() {
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    console.log('⚡ Initializing Boom Bank database with Admin klev1212 & AI Staff...');
    const defaultData = {
      users: [
        {
          id: "usr_admin_klev1212",
          username: "klev1212",
          password: "Admin@boom",
          role: "ADMIN",
          profile: {
            firstName: "Klev",
            middleName: "Executive",
            lastName: "Administrator",
            dob: "1988-03-25",
            ssn: "XXX-XX-0001",
            encryptedSsnPayload: "enc:aes256gcm:112233445566778899001122:a1b2c3d4e5f678901234567890abcdef:5858582d58582d30303031",
            email: "klev1212@boombank.com",
            phone: "+1 (800) 555-BOOM",
            address: {
              street: "1 Wall Street Financial Center",
              unit: "Floor 50",
              city: "New York",
              state: "NY",
              zip: "10005"
            },
            idType: "Federal Admin Credentials",
            idNumber: "ADM-001212",
            idIssuingState: "US Department of Treasury",
            employmentStatus: "Bank Executive",
            occupation: "Chief System Administrator",
            annualIncome: "$500,000+",
            kycStatus: "VERIFIED",
            kycTier: "SUPER_ADMIN",
            kycVerifiedAt: "2024-01-01T00:00:00Z"
          },
          accounts: [
            {
              id: "acc_adm_01",
              accountType: "Checking",
              accountName: "Boom Treasury Reserve Account",
              accountNumber: "0000001212",
              routingNumber: "021000021",
              balance: 10000000.00,
              availableBalance: 10000000.00,
              apy: "5.50%",
              isPrimary: true,
              status: "Active"
            }
          ],
          cards: [
            {
              id: "crd_adm_01",
              cardType: "Admin Black Card",
              cardNumber: "4000 0000 0000 1212",
              cardHolderName: "KLEV ADMINISTRATOR",
              expDate: "12/30",
              cvv: "999",
              isLocked: false,
              dailyLimit: 100000,
              spentToday: 0.00,
              linkedAccountId: "acc_adm_01"
            }
          ],
          billers: [],
          transactions: [
            {
              id: "tx_adm_01",
              accountId: "acc_adm_01",
              date: "2026-09-01",
              description: "Federal Reserve Treasury System Initialization",
              category: "Capital Reserve",
              type: "Credit",
              amount: 10000000.00,
              status: "Posted",
              merchant: "Federal Reserve System",
              reference: "FED-RES-9900"
            }
          ]
        }
      ],
      aiStaff: [
        {
          id: "agent_sentinel",
          name: "Sentinel-AI",
          role: "Chief Fraud & Anti-Money Laundering (AML) Agent",
          status: "ONLINE",
          avatar: "🛡️",
          specialty: "Transaction Anomaly Detection & OFAC Watchlist Checks",
          tasksProcessedToday: 1420,
          threatsMitigated: 12,
          description: "Continuously scans all transactions, FedNow transfers, and ACH routing requests for suspicious activity and risk scoring."
        },
        {
          id: "agent_lexis",
          name: "Lexis-AI",
          role: "Automated KYC & Identity Verification Agent",
          status: "ONLINE",
          avatar: "⚖️",
          specialty: "SSN Validation, Facial OCR Liveness & W-9 Audit",
          tasksProcessedToday: 890,
          threatsMitigated: 4,
          description: "Cross-references user registration data with Social Security Administration databases and USA PATRIOT Act identity standards."
        },
        {
          id: "agent_apex",
          name: "Apex-AI",
          role: "Treasury Liquidity & FedNow Reserve Manager",
          status: "ONLINE",
          avatar: "📈",
          specialty: "High-Yield Interest APY Calculation & Reserve Ratios",
          tasksProcessedToday: 3410,
          threatsMitigated: 0,
          description: "Manages 4.75% High-Yield APY compounding and ensures Boom Bank reserve liquidity meets Federal Reserve requirements."
        },
        {
          id: "agent_concierge",
          name: "Concierge-AI",
          role: "Virtual Banking Assistant & Customer Success Agent",
          status: "ONLINE",
          avatar: "🤖",
          specialty: "24/7 Account Inquiries, Virtual Cards & Transfer Assistance",
          tasksProcessedToday: 2150,
          threatsMitigated: 0,
          description: "Provides instant interactive assistance for customer inquiries, bill payments, and debit card management."
        },
        {
          id: "agent_credit",
          name: "Credit-AI",
          role: "Credit Risk & Transaction Authorization Analyst",
          status: "ONLINE",
          avatar: "💳",
          specialty: "Daily Spending Limit Evaluation & Merchant Risk Assessment",
          tasksProcessedToday: 1980,
          threatsMitigated: 3,
          description: "Evaluates user creditworthiness, card transaction limits, and generates risk reports for Admin authentication."
        }
      ],
      pendingAuthorizations: []
    };
    
    // Atomic write to prevent partial initialization reads
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(defaultData, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
    console.log('✅ Boom Bank database auto-initialized with atomic write safety!');
  }
}

export function readDB() {
  ensureDbInitialized();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { users: [], aiStaff: [], pendingAuthorizations: [] };
  }
}

export function writeDB(data) {
  ensureDbInitialized();
  try {
    // Atomic write via temp file rename
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('Error writing DB atomically:', err);
    return false;
  }
}
