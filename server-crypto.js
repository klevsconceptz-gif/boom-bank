import crypto from 'crypto';

// Master Encryption Secret Key (256-bit key derived via SHA-256)
const MASTER_SECRET = process.env.BOOM_BANK_SECRET || 'BOOM_BANK_AES256_MASTER_SECRET_KEY_2026_FDIC_SECURE!';
const ENCRYPTION_KEY = crypto.createHash('sha256').update(MASTER_SECRET).digest(); // 32 bytes

// 1. AES-256-GCM Encryption
export function encryptAES256(text) {
  if (!text) return text;
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return `enc:aes256gcm:${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// 2. AES-256-GCM Decryption
export function decryptAES256(encryptedText) {
  if (!encryptedText || typeof encryptedText !== 'string' || !encryptedText.startsWith('enc:aes256gcm:')) {
    return encryptedText; // Return original if not encrypted format
  }

  try {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[2], 'hex');
    const authTag = Buffer.from(parts[3], 'hex');
    const encryptedHex = parts[4];

    const decipher = crypto.createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err);
    return '[ENCRYPTED_DATA_DECRYPTION_FAILED]';
  }
}

// 3. Salted Password Hash (PBKDF2 SHA-512)
export function hashPassword(password, salt = 'BOOM_SALT_2026') {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// 4. SHA-256 Database Integrity Checksum
export function computeDbChecksum(dataObj) {
  const jsonStr = JSON.stringify(dataObj);
  return crypto.createHash('sha256').update(jsonStr).digest('hex');
}
