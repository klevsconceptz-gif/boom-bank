import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('apex_bank_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState(null);
  const [toast, setToast] = useState(null);
  const [demoUsers, setDemoUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_bank_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apex_bank_user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const loadDemoUsers = async () => {
    try {
      const data = await api.fetchDemoUsers();
      setDemoUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching demo users:', err);
    }
  };

  useEffect(() => {
    loadDemoUsers();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.loginUser(email, password);
      setUser(res.user);
      if (res.user.role === 'ADMIN') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }
      showToast(`Welcome back, ${res.user.profile.firstName}!`);
      return res.user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setActiveTab('dashboard');
    showToast('You have been securely logged out.', 'info');
  };

  const registerKYC = async (kycFormData) => {
    setLoading(true);
    try {
      const res = await api.registerKycUser(kycFormData);
      setUser(res.user);
      setActiveTab('dashboard');
      showToast('KYC Verification Successful! Account numbers generated.', 'success');
      return res.user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (transferData) => {
    setLoading(true);
    try {
      const res = await api.processTransfer({ ...transferData, userId: user.id });
      setUser(res.user);
      showToast(res.message || 'Transfer completed successfully!');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (depositData) => {
    setLoading(true);
    try {
      const res = await api.processDeposit({ ...depositData, userId: user.id });
      setUser(res.user);
      showToast(res.message || 'Check deposited successfully!');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleBillPay = async (billData) => {
    setLoading(true);
    try {
      const res = await api.processBillPay({ ...billData, userId: user.id });
      setUser(res.user);
      showToast(res.message || 'Bill payment sent!');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCard = async (cardId) => {
    setLoading(true);
    try {
      const res = await api.toggleCardLock(user.id, cardId);
      setUser(res.user);
      showToast(res.message);
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVirtualCard = async (cardData) => {
    setLoading(true);
    try {
      const res = await api.createVirtualCard({ ...cardData, userId: user.id });
      setUser(res.user);
      showToast(res.message);
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVirtualCard = async (cardId) => {
    setLoading(true);
    try {
      const res = await api.deleteVirtualCard(user.id, cardId);
      setUser(res.user);
      showToast(res.message, 'info');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const openReceipt = (transaction) => {
    setSelectedReceiptTx(transaction);
    setActiveModal('receipt');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedReceiptTx,
        setSelectedReceiptTx,
        openReceipt,
        toast,
        showToast,
        demoUsers,
        loadDemoUsers,
        loading,
        login,
        logout,
        registerKYC,
        handleTransfer,
        handleDeposit,
        handleBillPay,
        handleToggleCard,
        handleCreateVirtualCard,
        handleDeleteVirtualCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
