// API Client Service for Boom Bank

const API_BASE = '/api';

export async function fetchDemoUsers() {
  const res = await fetch(`${API_BASE}/auth/demo-users`);
  if (!res.ok) throw new Error('Failed to fetch demo users');
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function registerKycUser(kycData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kycData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration & KYC verification failed');
  return data;
}

export async function processTransfer(transferData) {
  const res = await fetch(`${API_BASE}/transfers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transferData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Transfer failed');
  return data;
}

export async function processDeposit(depositData) {
  const res = await fetch(`${API_BASE}/deposits/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(depositData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Check deposit failed');
  return data;
}

export async function processBillPay(billData) {
  const res = await fetch(`${API_BASE}/bills/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(billData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Bill payment failed');
  return data;
}

export async function toggleCardLock(userId, cardId) {
  const res = await fetch(`${API_BASE}/cards/toggle-lock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cardId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Card update failed');
  return data;
}

export async function createVirtualCard(cardData) {
  const res = await fetch(`${API_BASE}/cards/virtual/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Virtual card creation failed');
  return data;
}

export async function deleteVirtualCard(userId, cardId) {
  const res = await fetch(`${API_BASE}/cards/virtual/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, cardId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Virtual card deletion failed');
  return data;
}
