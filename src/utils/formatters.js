// Utility formatters for US Banking Application

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

export const maskAccountNumber = (accountNumber, isVisible = false) => {
  if (!accountNumber) return '';
  if (isVisible) return accountNumber;
  const str = String(accountNumber);
  if (str.length <= 4) return str;
  return '•••• ' + str.slice(-4);
};

export const maskSSN = (ssn, isVisible = false) => {
  if (!ssn) return '';
  if (isVisible) return ssn;
  const str = String(ssn).replace(/\D/g, '');
  if (str.length === 9) {
    return `•••-••-${str.slice(-4)}`;
  }
  return ssn.startsWith('XXX-XX-') ? ssn : '•••-••-••••';
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};
