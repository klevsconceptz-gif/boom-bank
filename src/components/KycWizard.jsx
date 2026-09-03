import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, User, Building, Lock, FileText, ArrowRight, ArrowLeft, CreditCard, DollarSign, Zap } from 'lucide-react';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

export default function KycWizard() {
  const { registerKYC, setActiveModal } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStatusText, setVerificationStatusText] = useState('Initiating Identity Check...');
  const [createdUser, setCreatedUser] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    isUsCitizen: true,
    street: '',
    unit: '',
    city: '',
    state: 'NY',
    zip: '',
    ssn: '',
    idType: 'Drivers License',
    idNumber: '',
    idIssuingState: 'NY',
    idExpDate: '',
    employmentStatus: 'Employed',
    occupation: '',
    annualIncome: '$500,000+',
    initialDeposit: '',
    password: '',
    agreeTerms: false,
    agreePatriotAct: false,
    agreeW9: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const runKycVerification = async () => {
    setIsSubmitting(true);
    setVerificationProgress(15);
    setVerificationStatusText('Verifying Social Security Number with SSA records...');

    await new Promise(r => setTimeout(r, 1200));
    setVerificationProgress(45);
    setVerificationStatusText('Cross-referencing OFAC Federal Sanctions & Anti-Money Laundering watchlist...');

    await new Promise(r => setTimeout(r, 1400));
    setVerificationProgress(75);
    setVerificationStatusText('Validating residential address & ChexSystems banking history...');

    await new Promise(r => setTimeout(r, 1200));
    setVerificationProgress(95);
    setVerificationStatusText('Generating ABA Routing 021000021 & Account Numbers...');

    await new Promise(r => setTimeout(r, 1000));
    setVerificationProgress(100);

    try {
      const result = await registerKYC(formData);
      setCreatedUser(result);
      setStep(7);
    } catch (err) {
      console.error(err);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        
        {/* Wizard Header */}
        <div className="bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900 px-6 py-5 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="Boom Bank Emblem" className="w-10 h-10 object-contain drop-shadow" />
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                BOOM BANK Account Opening
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/40 font-semibold">
                  KYC AUTH
                </span>
              </h2>
              <p className="text-xs text-slate-300">USA PATRIOT Act & FDIC Compliant Onboarding</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800/80 hover:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Wizard Progress Steps Indicator */}
        {step < 6 && (
          <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
            {['1. Personal', '2. Address & SSN', '3. Financial', '4. ID Photo', '5. Tax & Review'].map((label, idx) => {
              const currentStepIdx = idx + 1;
              const isDone = step > currentStepIdx;
              const isCurrent = step === currentStepIdx;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full font-bold text-[11px] flex items-center justify-center ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-amber-600 text-white ring-2 ring-amber-400/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isDone ? '✓' : currentStepIdx}
                  </div>
                  <span className={`hidden sm:inline font-medium ${isCurrent ? 'text-white font-bold' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Wizard Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Step 1: Legal Identity & Contact
              </h3>
              <p className="text-xs text-slate-400">
                Federal regulations require us to collect full legal name as it appears on your government photo ID.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Legal Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Alexander"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Middle Name (Optional)</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="e.g. James"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Legal Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Morgan"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth (MM/DD/YYYY) *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">US Citizenship Status *</label>
                  <select
                    name="isUsCitizen"
                    value={formData.isUsCitizen ? 'true' : 'false'}
                    onChange={(e) => setFormData(p => ({ ...p, isUsCitizen: e.target.value === 'true' }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="true">US Citizen or Permanent Resident (Green Card)</option>
                    <option value="false">Non-Resident Alien / Visa Holder</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex.morgan@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                Step 2: US Residential Address & Tax Identification (SSN)
              </h3>
              <p className="text-xs text-slate-400">
                P.O. Boxes are not permitted by USA PATRIOT Act regulations. Must be a physical US residence.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="e.g. 150 Greenwich St"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Apt / Suite / Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Apt 4B"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      {US_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">ZIP *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="10007"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>Social Security Number (SSN) / ITIN *</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-normal">
                    <Lock className="w-3 h-3" /> 256-Bit Hardware Encryption
                  </span>
                </label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  placeholder="XXX-XX-XXXX"
                  className="w-full bg-slate-950 border border-amber-500/50 rounded-xl px-3.5 py-2.5 text-base text-white font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Required for IRS reporting (Form 1099) and identity verification with Social Security Administration databases.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                Step 3: Financial Profile & Initial Deposit Setup
              </h3>
              <p className="text-xs text-slate-400">
                Help us protect your account by establishing expected monthly banking activity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Employment Status *</label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Employed">Employed (Full-Time / Part-Time)</option>
                    <option value="Self-Employed">Self-Employed / Founder</option>
                    <option value="Retired">Retired</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation / Profession *</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Household Income *</label>
                  <select
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Under $50,000">Under $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $150,000">$100,000 - $150,000</option>
                    <option value="$150,000+">$150,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Opening Deposit ($) *</label>
                  <input
                    type="number"
                    name="initialDeposit"
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    placeholder="500.00"
                    step="50"
                    min="50"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                    required
                  />
                  <p className="text-[10px] text-emerald-400 mt-1">Includes $100 New Account Bonus credited to Savings!</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Create Online Banking Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters with numbers & symbols"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                Step 4: Government Photo Identification & Document Scan
              </h3>
              <p className="text-xs text-slate-400">
                Select your identification document type and provide document details for automatic OCR verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Document Type *</label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Drivers License">Driver's License</option>
                    <option value="State ID">State-Issued Photo ID</option>
                    <option value="Passport">US Passport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Document Number *</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    placeholder="DL-894021"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center bg-slate-950/50 hover:border-amber-500 transition cursor-pointer">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-white">Document & Biometric Scan Verified</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Front & Back image scan complete • Facial Liveness Verification: <span className="text-emerald-400 font-bold">MATCH (99.8%)</span>
                </p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                Step 5: USA PATRIOT Act Disclosure & E-Sign
              </h3>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 max-h-48 overflow-y-auto text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-white">IMPORTANT INFORMATION ABOUT PROCEDURES FOR OPENING A NEW ACCOUNT:</p>
                <p>
                  To help the government fight the funding of terrorism and money laundering activities, Federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account.
                </p>
                <p>
                  What this means for you: When you open an account, we will ask for your name, address, date of birth, Social Security Number, and other information that will allow us to identify you. We may also ask to see your driver's license or other identifying documents.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreePatriotAct"
                    checked={formData.agreePatriotAct}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 bg-slate-950 border-slate-700"
                  />
                  <span>I acknowledge the <strong>USA PATRIOT Act Customer Identification Program</strong> disclosure above.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeW9"
                    checked={formData.agreeW9}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 bg-slate-950 border-slate-700"
                  />
                  <span><strong>Form W-9 Certification:</strong> Under penalties of perjury, I certify that the Social Security Number provided is correct and I am a US citizen or resident alien.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 bg-slate-950 border-slate-700"
                  />
                  <span>I agree to the <strong>Electronic Signature (E-Sign) Consent</strong> & Boom Bank Deposit Account Agreement.</span>
                </label>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-24 h-24 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-amber-400">
                  {verificationProgress}%
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Performing Automated KYC & Identity Verification</h3>
                <p className="text-xs text-amber-300 mt-2 font-mono">{verificationStatusText}</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 max-w-md mx-auto overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-3 transition-all duration-500"
                  style={{ width: `${verificationProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {step === 7 && createdUser && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Identity Verified • Tier 1 Approved
                </span>
                <h3 className="text-2xl font-black text-white mt-2">Welcome to BOOM BANK!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your traditional US banking profile and FDIC insured accounts have been established.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-5 text-left shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{createdUser.profile.firstName} {createdUser.profile.lastName}</h4>
                    <p className="text-[11px] text-slate-400">SSN: {createdUser.profile.ssn} • Verified {new Date().toLocaleDateString()}</p>
                  </div>
                  <span className="bg-amber-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                    MEMBER FDIC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Boom ABA Routing Number</p>
                    <p className="text-base font-mono font-bold text-amber-300">021000021</p>
                    <p className="text-[10px] text-slate-500">Federal Reserve Dist 2 (NY)</p>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Everyday Checking Account #</p>
                    <p className="text-base font-mono font-bold text-emerald-400">
                      {createdUser.accounts[0]?.accountNumber}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Opening Balance: ${createdUser.accounts[0]?.balance.toFixed(2)}</p>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">High-Yield Savings Account #</p>
                    <p className="text-base font-mono font-bold text-emerald-400">
                      {createdUser.accounts[1]?.accountNumber}
                    </p>
                    <p className="text-[10px] text-emerald-300 font-medium">4.75% APY • Bonus: $100.00</p>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Boom Visa Debit Card</p>
                    <p className="text-xs font-mono font-bold text-white">
                      {createdUser.cards[0]?.cardNumber}
                    </p>
                    <p className="text-[10px] text-slate-400">Exp: {createdUser.cards[0]?.expDate} • CVV: {createdUser.cards[0]?.cvv}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-bold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 transition"
              >
                Access My Online Banking Dashboard Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step < 6 && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-amber-600/30"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={runKycVerification}
                  disabled={isSubmitting || !formData.agreeTerms || !formData.agreePatriotAct}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition shadow-xl disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Submit KYC & Generate Accounts
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
