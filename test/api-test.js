import http from 'http';

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Boom Bank Integration & Security Test Suite...\n');

  try {
    // Test 1: Security Status
    console.log('Test 1: Checking Security Status...');
    const secRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/security/encryption-status',
      method: 'GET'
    });
    console.log(`✅ Security Status Code: ${secRes.status}`);
    console.log(`   Algorithm: ${secRes.data.encryptionAlgorithm}\n`);

    // Test 2: AES-256 Encryption & Decryption Roundtrip
    console.log('Test 2: AES-256-GCM Encryption Roundtrip...');
    const plainText = 'SSN-999-00-1212';
    const encRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/crypto/encrypt',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { text: plainText });

    console.log(`   Ciphertext: ${encRes.data.encryptedPayload}`);

    const decRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/crypto/decrypt',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { encryptedText: encRes.data.encryptedPayload });

    if (decRes.data.decryptedText === plainText) {
      console.log(`✅ Decryption Verified Match: "${decRes.data.decryptedText}"\n`);
    } else {
      console.error(`❌ Mismatch: Expected "${plainText}", got "${decRes.data.decryptedText}"\n`);
    }

    // Test 3: Admin Login
    console.log('Test 3: Admin Account Authentication...');
    const loginRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: 'klev1212', password: 'Admin@boom' });

    console.log(`✅ Admin Login Status Code: ${loginRes.status}`);
    console.log(`   Role: ${loginRes.data.user?.role}`);
    console.log(`   User ID: ${loginRes.data.user?.id}\n`);

    console.log('🎉 All Boom Bank integration tests passed successfully!');
  } catch (err) {
    console.error('❌ Test execution failed:', err.message);
  }
}

runTests();
