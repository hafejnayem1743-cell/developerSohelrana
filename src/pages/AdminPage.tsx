import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  LayoutDashboard,
  Inbox,
  BookOpen,
  CreditCard,
  Briefcase,
  FolderGit2,
  Cpu,
  User,
  Settings,
  Wallet,
  Share2,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Trash2,
  Edit3,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Copy,
  Mail,
  FileText,
  DollarSign,
  Sparkles,
  Send,
  MessageSquare,
  Key,
  Filter,
  Check,
  Download,
  Save,
  UserCheck,
} from 'lucide-react';
import { CoursePackage, PaymentOrder, ProjectItem, ServiceCategory, SkillItem, ContactMessage, ConversationReply } from '../types';

export const AdminPage: React.FC = () => {
  const {
    data,
    isAdminLoggedIn,
    hasAdminCredential,
    setupAdminPassword,
    isLocalOnlyMode,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    updateSiteSettings,
    updateAboutSection,
    updateWalletSettings,
    updateSocialLinks,
    saveCourse,
    deleteCourse,
    updateBundle,
    saveServiceCategory,
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    updateOrderStatus,
    deleteOrder,
    updateMessageStatus,
    deleteMessage,
    addMessageReply,
    resetStoreToDefaults,
  } = useApp();

  // Login Form State
  const [passwordInput, setPasswordInput] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupPasswordConfirm, setSetupPasswordConfirm] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Section
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'inbox'
    | 'courses'
    | 'payments'
    | 'services'
    | 'projects'
    | 'skills'
    | 'about'
    | 'settings'
    | 'wallet'
    | 'social'
  >('dashboard');

  // Filter states
  const [inboxFilter, setInboxFilter] = useState<'all' | 'Unread' | 'Read' | 'Replied' | 'Archived'>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | 'Pending' | 'Verified' | 'Rejected'>('all');

  // Messaging & Reply state
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Wallet notification state
  const [walletSavedNotice, setWalletSavedNotice] = useState(false);

  // Password management state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal inspection states
  const [inspectingOrder, setInspectingOrder] = useState<PaymentOrder | null>(null);
  const [inspectingOrderNote, setInspectingOrderNote] = useState('');
  const [inspectingMessage, setInspectingMessage] = useState<ContactMessage | null>(null);

  // Edit/Add modal states
  const [editingCourse, setEditingCourse] = useState<CoursePackage | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  // --- LOCAL ADMIN GATE ---
  if (!isAdminLoggedIn) {
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoggingIn(true);
      setLoginError(false);
      const success = await loginAdmin(passwordInput);
      setLoginError(!success);
      setIsLoggingIn(false);
    };

    const handleSetupSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSetupError('');
      if (setupPassword.trim().length < 8) {
        setSetupError('Use at least 8 characters for the local admin password.');
        return;
      }
      if (setupPassword !== setupPasswordConfirm) {
        setSetupError('The password confirmation does not match.');
        return;
      }
      const created = await setupAdminPassword(setupPassword);
      if (!created) {
        setSetupError('The local admin credential could not be created in this browser.');
      }
    };

    return (
      <div className="min-h-screen bg-[#050811] text-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl rgb-border backdrop-blur-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Workstation Admin</h1>
            <p className="text-slate-400 text-xs font-mono mt-2">Local browser admin console</p>
          </div>

          <div className="p-3.5 mb-6 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xs leading-relaxed">
            This project has no server-side authentication. The password below protects only this browser&apos;s local admin data and is <strong>not production-grade authentication</strong>.
          </div>

          {!hasAdminCredential ? (
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div>
                <label className="form-label" htmlFor="admin-setup-password">Create Local Admin Password *</label>
                <input id="admin-setup-password" type="password" minLength={8} required value={setupPassword} onChange={(e) => setSetupPassword(e.target.value)} className="form-input" autoComplete="new-password" />
              </div>
              <div>
                <label className="form-label" htmlFor="admin-setup-password-confirm">Confirm Password *</label>
                <input id="admin-setup-password-confirm" type="password" minLength={8} required value={setupPasswordConfirm} onChange={(e) => setSetupPasswordConfirm(e.target.value)} className="form-input" autoComplete="new-password" />
              </div>
              {setupError && <div role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-200 text-xs font-mono">{setupError}</div>}
              <button type="submit" id="admin-create-password-btn" className="premium-button w-full py-3.5 text-xs"><Key className="w-4 h-4" /> Create Local Credential</button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-200 text-xs font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Incorrect local admin password.
                </div>
              )}
              <div>
                <label className="form-label" htmlFor="admin-login-password">Local Admin Password *</label>
                <input id="admin-login-password" type="password" required value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }} placeholder="Enter your local admin password" className="form-input" autoComplete="current-password" />
              </div>
              <button type="submit" disabled={isLoggingIn} id="admin-login-btn" className="premium-button w-full py-3.5 text-xs disabled:opacity-50">
                <Lock className="w-4 h-4" /> {isLoggingIn ? 'Authenticating...' : 'Open Admin Console'}
              </button>
            </form>
          )}

          <p className="mt-6 pt-6 border-t border-white/[0.08] text-[11px] font-mono text-slate-500 text-center">
            {isLocalOnlyMode ? 'Local data only • no server credentials are embedded in the client.' : 'Server authentication required.'}
          </p>
        </div>
      </div>
    );
  }

  // --- STATISTICS COMPUTATIONS ---
  const totalMessages = data.messages.length;
  const unreadMessages = data.messages.filter((m) => m.status === 'Unread').length;
  const totalOrders = data.orders.length;
  const pendingPayments = data.orders.filter((o) => o.status === 'Pending').length;
  const verifiedPayments = data.orders.filter((o) => o.status === 'Verified').length;
  const totalProjects = data.projects.length;
  const totalCourses = data.courses.length;
  const totalServices = data.services.length;

  return (
    <div className="min-h-screen bg-[#050811] text-slate-200">
      {/* Admin Top Header */}
      <header className="border-b border-white/[0.08] bg-[#070B16] sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
            SR
          </div>
          <div>
            <div className="font-['Outfit'] font-black text-sm text-white tracking-wider">
              SOHEL RANA ADMIN DASHBOARD / ড্যাশবোর্ড
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Local browser data console
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('/', '_blank')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Admin 2-Column Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 border-r border-white/[0.08] bg-[#060914] p-4 shrink-0">
          <nav className="space-y-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard / ড্যাশবোর্ড</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Inbox / মেসেজ</span>
              </div>
              {unreadMessages > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">
                  {unreadMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'payments'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Orders / পেমেন্ট রিকোয়েস্ট</span>
              </div>
              {pendingPayments > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-bold text-[10px]">
                  {pendingPayments}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses / কোর্স ব্যবস্থাপনা</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services / সার্ভিস</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Skills / স্কিল</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About / জীবনবৃত্তান্ত</span>
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'wallet'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet Settings / ওয়ালেট সেটিংস</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings / সেটিংস</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'social'
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact & Social / কন্টাক্ট ও লিংক</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
                  System Overview
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Live metrics for public submissions, orders, and content assets.
                </p>
              </div>

              {/* 8 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Total Messages</span>
                  <div className="font-['Outfit'] font-black text-3xl text-white mt-1">{totalMessages}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block">Unread Messages</span>
                  <div className="font-['Outfit'] font-black text-3xl text-cyan-300 mt-1">{unreadMessages}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Course Orders</span>
                  <div className="font-['Outfit'] font-black text-3xl text-white mt-1">{totalOrders}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-yellow-500/30">
                  <span className="text-[10px] font-mono uppercase text-yellow-400 block">Pending Payments</span>
                  <div className="font-['Outfit'] font-black text-3xl text-yellow-300 mt-1">{pendingPayments}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block">Verified Payments</span>
                  <div className="font-['Outfit'] font-black text-3xl text-emerald-300 mt-1">{verifiedPayments}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Courses</span>
                  <div className="font-['Outfit'] font-black text-3xl text-white mt-1">{totalCourses}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Services</span>
                  <div className="font-['Outfit'] font-black text-3xl text-white mt-1">{totalServices}</div>
                </div>
              </div>

              {/* Recent Orders & Messages Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Outfit'] font-bold text-base text-white">Recent Purchases</h3>
                    <button
                      onClick={() => setActiveTab('payments')}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.orders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <div className="text-slate-400 text-[11px]">{ord.courseTitle} (${ord.amount})</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.status === 'Verified'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : ord.status === 'Rejected'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inbox Messages */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Outfit'] font-bold text-base text-white">Recent Inquiries</h3>
                    <button
                      onClick={() => setActiveTab('inbox')}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      Open Inbox →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.messages.slice(0, 3).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <div className="font-bold text-white">{msg.name}</div>
                          <div className="text-slate-400 text-[11px] truncate max-w-xs">{msg.subject}</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            msg.status === 'Unread'
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-['Outfit'] font-black text-2xl text-white">
                    Public Inquiries & Inbox / মেসেজ ও ইনবক্স
                  </h2>
                  <p className="text-slate-400 text-xs font-mono">
                    All dispatches submitted through the public /contact form. Manage threads and reply directly.
                  </p>
                </div>

                {/* Status Filter Chips */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
                  {(['all', 'Unread', 'Read', 'Replied', 'Archived'] as const).map((filterVal) => {
                    const count =
                      filterVal === 'all'
                        ? data.messages.length
                        : data.messages.filter((m) => m.status === filterVal).length;
                    const labels: Record<string, string> = {
                      all: 'All / সব',
                      Unread: 'New / নতুন',
                      Read: 'Read / পড়া',
                      Replied: 'Replied / উত্তর',
                      Archived: 'Archived',
                    };
                    return (
                      <button
                        key={filterVal}
                        onClick={() => setInboxFilter(filterVal)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          inboxFilter === filterVal
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{labels[filterVal]}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Messages Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-white/10 bg-slate-900/60 text-slate-400 uppercase">
                    <tr>
                      <th className="p-3.5">ID</th>
                      <th className="p-3.5">Sender / প্রেরক</th>
                      <th className="p-3.5">Contact / টেলিগ্রাম</th>
                      <th className="p-3.5">Subject / বিষয়</th>
                      <th className="p-3.5">Attachment</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {data.messages
                      .filter((m) => inboxFilter === 'all' || m.status === inboxFilter)
                      .map((msg) => (
                        <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 text-cyan-300 font-bold">{msg.id}</td>
                          <td className="p-3.5">
                            <div className="text-white font-bold">{msg.name}</div>
                            <div className="text-slate-400 text-[11px]">{msg.email}</div>
                          </td>
                          <td className="p-3.5">
                            {msg.contactInfo ? (
                              <span className="text-cyan-400 font-semibold">{msg.contactInfo}</span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-300 max-w-xs truncate">
                            <div>{msg.subject}</div>
                            {msg.replies && msg.replies.length > 0 && (
                              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                                <MessageSquare className="w-3 h-3" />
                                <span>{msg.replies.length} replies on thread</span>
                              </div>
                            )}
                          </td>
                          <td className="p-3.5">
                            {msg.attachmentName ? (
                              <span className="text-[11px] text-cyan-400 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[120px]">{msg.attachmentName}</span>
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                            {new Date(msg.submittedAt).toLocaleDateString()}{' '}
                            <span className="text-[10px] text-slate-500">
                              {new Date(msg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={msg.status}
                              onChange={(e) => updateMessageStatus(msg.id, e.target.value as any)}
                              className={`bg-slate-900 border rounded px-2 py-1 text-xs font-semibold ${
                                msg.status === 'Unread'
                                  ? 'border-cyan-500/40 text-cyan-300'
                                  : msg.status === 'Replied'
                                  ? 'border-emerald-500/40 text-emerald-300'
                                  : msg.status === 'Archived'
                                  ? 'border-slate-700 text-slate-400'
                                  : 'border-white/10 text-white'
                              }`}
                            >
                              <option value="Unread">Unread / নতুন</option>
                              <option value="Read">Read / পড়া হয়েছে</option>
                              <option value="Replied">Replied / উত্তর দেওয়া</option>
                              <option value="Archived">Archived / সংরক্ষিত</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setInspectingMessage(msg);
                                setReplyText('');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                              title="Open Messaging Console"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Console</span>
                            </button>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {data.messages.filter((m) => inboxFilter === 'all' || m.status === inboxFilter).length === 0 && (
                  <div className="p-10 text-center text-slate-500 font-mono text-xs">
                    No inquiries found for this filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS / ORDERS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-['Outfit'] font-black text-2xl text-white">
                    Course Payments & Orders / কোর্স পেমেন্ট ও অর্ডার
                  </h2>
                  <p className="text-slate-400 text-xs font-mono">
                    Review payment requests submitted via TRC20 and BEP20. Verification here is an admin status only; no blockchain verification is automated.
                  </p>
                </div>

                {/* Orders Filter Chips */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
                  {(['all', 'Pending', 'Verified', 'Rejected'] as const).map((filterVal) => {
                    const count =
                      filterVal === 'all'
                        ? data.orders.length
                        : data.orders.filter((o) => o.status === filterVal).length;
                    const labels: Record<string, string> = {
                      all: 'All / সব',
                      Pending: 'Pending / অপেক্ষমান',
                      Verified: 'Verified / যাচাইকৃত',
                      Rejected: 'Rejected / বাতিল',
                    };
                    return (
                      <button
                        key={filterVal}
                        onClick={() => setOrderFilter(filterVal)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          orderFilter === filterVal
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{labels[filterVal]}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-white/10 bg-slate-900/60 text-slate-400 uppercase">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Student / শিক্ষার্থী</th>
                      <th className="p-3.5">Course / কোর্স</th>
                      <th className="p-3.5">Required</th>
                      <th className="p-3.5">Submitted</th>
                      <th className="p-3.5">Network</th>
                      <th className="p-3.5">TXID Hash</th>
                      <th className="p-3.5">Receipt</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {data.orders
                      .filter((o) => orderFilter === 'all' || o.status === orderFilter)
                      .map((ord) => (
                        <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 font-bold text-cyan-300">{ord.id}</td>
                          <td className="p-3.5">
                            <div className="text-white font-bold">{ord.customerName}</div>
                            <div className="text-slate-400 text-[11px]">{ord.email}</div>
                            {(ord.contactInfo || ord.telegramContact) && (
                              <div className="text-cyan-400 text-[10px]">
                                {ord.contactInfo || ord.telegramContact}
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-300 max-w-[160px] truncate">{ord.courseTitle}</td>
                          <td className="p-3.5 font-bold text-cyan-300">${ord.requiredAmount}</td>
                          <td className="p-3.5 font-bold text-white">${ord.amount}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded font-semibold text-[11px] border ${
                                ord.network === 'TRC20'
                                  ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                                  : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              }`}
                            >
                              {ord.network}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-slate-400 max-w-[120px]">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">{ord.txid}</span>
                              <button
                                onClick={() => navigator.clipboard.writeText(ord.txid)}
                                title="Copy TXID"
                                className="text-slate-500 hover:text-cyan-400 p-0.5 cursor-pointer"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="p-3.5">
                            {ord.screenshotUrl ? (
                              <button
                                onClick={() => {
                                  setInspectingOrder(ord);
                                  setInspectingOrderNote(ord.adminNotes || '');
                                }}
                                className="text-xs text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview</span>
                              </button>
                            ) : (
                              <span className="text-slate-600">None</span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                            {new Date(ord.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                              className={`rounded px-2 py-1 text-xs font-bold border ${
                                ord.status === 'Verified'
                                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                                  : ord.status === 'Rejected'
                                  ? 'bg-red-950/80 border-red-500/40 text-red-300'
                                  : 'bg-yellow-950/80 border-yellow-500/40 text-yellow-300'
                              }`}
                            >
                              <option value="Pending">Pending / অপেক্ষমান</option>
                              <option value="Verified">Verified / যাচাইকৃত</option>
                              <option value="Rejected">Rejected / বাতিল</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                            {ord.status !== 'Verified' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'Verified')}
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                                title="Mark Verified"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {ord.status !== 'Rejected' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'Rejected')}
                                className="p-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 transition-colors"
                                title="Mark Rejected"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setInspectingOrder(ord);
                                setInspectingOrderNote(ord.adminNotes || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Inspect Details & Add Note"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteOrder(ord.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {data.orders.filter((o) => orderFilter === 'all' || o.status === orderFilter).length === 0 && (
                  <div className="p-10 text-center text-slate-500 font-mono text-xs">
                    No payment orders found for this filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-['Outfit'] font-black text-2xl text-white">
                    Course Management / কোর্স ব্যবস্থাপনা
                  </h2>
                  <p className="text-slate-400 text-xs font-mono">
                    Control course curriculum, pricing, technologies, and the Complete Developer Bundle. / কারিকুলাম, ফি ও অফার নিয়ন্ত্রণ করুন।
                  </p>
                </div>
              </div>

              {/* Bundle Pricing Controls */}
              <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Outfit'] font-bold text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{data.bundle.title} Controls / বান্ডেল অফার কনফিগারেশন</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">Highlight Bundle Offer</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-slate-400 block mb-1">Final Price ($) / চূড়ান্ত মূল্য ($)</label>
                    <input
                      type="number"
                      value={data.bundle.finalPrice}
                      onChange={(e) =>
                        updateBundle({ finalPrice: Number(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Regular Total ($) / নিয়মিত মূল্য ($)</label>
                    <input
                      type="number"
                      value={data.bundle.regularTotal}
                      onChange={(e) =>
                        updateBundle({ regularTotal: Number(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Discount Text / ছাড়ের বিবরণ</label>
                    <input
                      type="text"
                      value={data.bundle.discount}
                      onChange={(e) => updateBundle({ discount: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Savings Amount / সাশ্রয়ের পরিমাণ</label>
                    <input
                      type="text"
                      value={data.bundle.savings}
                      onChange={(e) => updateBundle({ savings: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Course List */}
              <div className="space-y-4">
                {data.courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400">{course.packageNumber}</span>
                        <h4 className="font-['Outfit'] font-bold text-lg text-white">{course.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 font-['Plus_Jakarta_Sans'] max-w-xl line-clamp-2 mt-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                        <span className="text-white font-bold">Price: ${course.price}</span>
                        <span className="text-slate-500">Slug: /courses/{course.slug}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <label className="text-xs font-mono text-slate-400">Price / ফি ($):</label>
                        <input
                          type="number"
                          value={course.price}
                          onChange={(e) =>
                            saveCourse({ ...course, price: Number(e.target.value) || 0 })
                          }
                          className="w-20 px-2 py-1 rounded bg-slate-900 border border-white/10 text-cyan-300 font-bold text-xs"
                        />
                      </div>

                      <button
                        onClick={() =>
                          saveCourse({ ...course, enabled: !course.enabled })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                          course.enabled
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {course.enabled ? 'Enabled / সক্রিয়' : 'Disabled / নিষ্ক্রিয়'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  Freelance Service Packages / ফ্রিল্যান্সিং সার্ভিস প্যাকেজ
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Control Portfolio Website and Custom Website packages, pricing, and Fiverr links. / পোর্টফোলিও ও কাস্টম ওয়েব ডেভেলপমেন্ট প্যাকেজ ও প্রাইসিং।
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.services.map((svc) => (
                  <div key={svc.id} className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4">
                    <h3 className="font-['Outfit'] font-bold text-xl text-white">{svc.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">{svc.subtitle}</p>

                    <div>
                      <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                        Fiverr Gig Link / ফাইভার গিগ লিংক
                      </label>
                      <input
                        type="text"
                        value={svc.fiverrGigUrl}
                        onChange={(e) =>
                          saveServiceCategory({ ...svc, fiverrGigUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-white"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                        Package Tiers & Pricing / প্যাকেজ টিয়ার ও মূল্য নির্ধারণ:
                      </span>
                      {svc.tiers.map((tier, tIdx) => (
                        <div
                          key={tier.name}
                          className="p-3 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between text-xs font-mono"
                        >
                          <span className="text-white font-bold">{tier.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">$</span>
                            <input
                              type="number"
                              value={tier.price}
                              onChange={(e) => {
                                const newTiers = [...svc.tiers];
                                newTiers[tIdx] = {
                                  ...tier,
                                  price: Number(e.target.value) || 0,
                                };
                                saveServiceCategory({ ...svc, tiers: newTiers });
                              }}
                              className="w-20 px-2 py-1 rounded bg-slate-950 border border-white/10 text-white font-bold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-['Outfit'] font-black text-2xl text-white">
                    Project Portfolio Management / প্রজেক্ট পোর্টফোলিও ব্যবস্থাপনা
                  </h2>
                  <p className="text-slate-400 text-xs font-mono">
                    Publish, unpublish, or add new showcase projects to /projects. / নতুন প্রজেক্ট যুক্ত করুন এবং পাবলিশ স্ট্যাটাস পরিবর্তন করুন।
                  </p>
                </div>
                <button
                  onClick={() => setEditingProject({ id: `proj-${Date.now()}`, title: '', slug: '', description: '', longDescription: '', category: 'Full-Stack', techStack: [], image: '', gallery: [], liveUrl: '', githubUrl: '', published: false })}
                  className="premium-button px-4 py-2 text-xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-cyan-300">{proj.category}</span>
                        <button
                          onClick={() => saveProject({ ...proj, published: !proj.published })}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            proj.published
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {proj.published ? 'Published / প্রকাশিত' : 'Draft / ড্রাফট'}
                        </button>
                      </div>

                      <h4 className="font-['Outfit'] font-bold text-lg text-white mb-1.5">{proj.title}</h4>
                      <p className="text-xs text-slate-400 font-['Plus_Jakarta_Sans'] line-clamp-2 mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="text-[11px] font-mono text-slate-500">
                        {proj.techStack.slice(0, 3).join(', ')}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingProject(proj)} className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300" title="Edit Project">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteProject(proj.id)} className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400" title="Delete Project">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SKILLS MANAGEMENT */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  Skills & Technologies / স্কিল ও প্রযুক্তি ব্যবস্থাপনা
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Control all categorized skills displayed on the /skills page. / পোর্টফোলিওতে প্রদর্শিত টেকনিক্যাল স্কিলসমূহ আপডেট করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{skill.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase">{skill.category}</div>
                    </div>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT & BIO */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  About & Bio Content / বায়ো ও পরিচিতি কনটেন্ট
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Modify the developer narrative, experience, and philosophy. / কাজের অভিজ্ঞতা ও ডেভেলপমেন্ট দর্শন আপডেট করুন।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Experience Years / কাজের অভিজ্ঞতা (বছর)
                  </label>
                  <input
                    type="text"
                    value={data.about.experienceYears}
                    onChange={(e) => updateAboutSection({ experienceYears: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Philosophy / কাজের দর্শন ও মূলমন্ত্র
                  </label>
                  <textarea
                    rows={3}
                    value={data.about.philosophy}
                    onChange={(e) => updateAboutSection({ philosophy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: WALLET SETTINGS */}
          {activeTab === 'wallet' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  USDT Wallet Settings / ওয়ালেট সেটিংস
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Configure your receiving cryptocurrency addresses. These instantly update the live /payment page and QR codes.
                </p>
              </div>

              {walletSavedNotice && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Wallet settings updated successfully! Live /payment page immediately uses the new addresses.</span>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-5 text-xs font-mono">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-bold uppercase">
                      USDT TRC20 Address (Tron Network) *
                    </label>
                    <span className="text-[10px] text-cyan-400 font-mono">Default: TH9rhUmn...9EK</span>
                  </div>
                  <input
                    type="text"
                    value={data.walletSettings.usdtTrc20Address}
                    onChange={(e) =>
                      updateWalletSettings({ usdtTrc20Address: e.target.value.trim() })
                    }
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-cyan-300 font-mono font-bold focus:border-cyan-500 outline-none"
                    placeholder="TH9rhUmnZoCfv7wFB7aG8xt9J7rZrrT9EK"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-bold uppercase">
                      USDT BEP20 Address (BNB Smart Chain Network) *
                    </label>
                    <span className="text-[10px] text-purple-400 font-mono">Default: 0xa6c1c...5c2</span>
                  </div>
                  <input
                    type="text"
                    value={data.walletSettings.usdtBep20Address}
                    onChange={(e) =>
                      updateWalletSettings({ usdtBep20Address: e.target.value.trim() })
                    }
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-purple-300 font-mono font-bold focus:border-purple-500 outline-none"
                    placeholder="0xa6c1c397df155614cfe1b16d7b1efefe681fa5c2"
                  />
                </div>

                <div>
                  <label className="text-slate-300 uppercase block mb-1.5">
                    Payment Instructions / পেমেন্ট নির্দেশনা
                  </label>
                  <textarea
                    rows={3}
                    value={data.walletSettings.instructions}
                    onChange={(e) =>
                      updateWalletSettings({ instructions: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none font-['Plus_Jakarta_Sans'] text-xs"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      setWalletSavedNotice(true);
                      setTimeout(() => setWalletSavedNotice(false), 4000);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes / পরিবর্তন সেভ করুন</span>
                  </button>

                  <button
                    onClick={() => {
                      updateWalletSettings({
                        usdtTrc20Address: 'TH9rhUmnZoCfv7wFB7aG8xt9J7rZrrT9EK',
                        usdtBep20Address: '0xa6c1c397df155614cfe1b16d7b1efefe681fa5c2',
                      });
                      setWalletSavedNotice(true);
                      setTimeout(() => setWalletSavedNotice(false), 4000);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-mono transition-all cursor-pointer text-center"
                  >
                    Reset to Default Addresses / ডিফল্ট ফিরিয়ে আনুন
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  Central Site & Security Settings / সাইট ও সিকিউরিটি সেটিংস
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Modify hero branding, profile photo, and update your administrator credentials.
                </p>
              </div>

              {/* BRANDING SECTION */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4 text-xs font-mono">
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
                  <UserCheck className="w-4 h-4" />
                  <span>Branding & Bio Profile / ব্র্যান্ডিং ও প্রোফাইল</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 uppercase block mb-1">
                      Full Brand Name / ব্র্যান্ড নাম
                    </label>
                    <input
                      type="text"
                      value={data.siteSettings.name}
                      onChange={(e) => updateSiteSettings({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 uppercase block mb-1">
                      Role Title / পেশাদার পদবি
                    </label>
                    <input
                      type="text"
                      value={data.siteSettings.role}
                      onChange={(e) => updateSiteSettings({ role: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Headline Subtitle / হেডলাইন সাবটাইটেল
                  </label>
                  <input
                    type="text"
                    value={data.siteSettings.subtitle}
                    onChange={(e) => updateSiteSettings({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Hero Short Description / সংক্ষিপ্ত পরিচিতি
                  </label>
                  <textarea
                    rows={2}
                    value={data.siteSettings.shortDescription}
                    onChange={(e) => updateSiteSettings({ shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none font-['Plus_Jakarta_Sans']"
                  />
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Status Text / বর্তমান স্ট্যাটাস
                  </label>
                  <input
                    type="text"
                    value={data.siteSettings.statusText}
                    onChange={(e) => updateSiteSettings({ statusText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    Profile Photo URL / প্রোফাইল ছবি লিংক
                  </label>
                  <input
                    type="text"
                    value={data.siteSettings.profilePhoto}
                    onChange={(e) => updateSiteSettings({ profilePhoto: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* SECURITY & PASSWORD CHANGE SECTION */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 text-xs font-mono">
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Security & Password / পাসওয়ার্ড পরিবর্তন</span>
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Local admin credentials are salted and derived with browser PBKDF2. This remains browser-only and is not a replacement for server authentication.
                </p>

                {passwordNotice && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      passwordNotice.type === 'success'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/15 border-red-500/30 text-red-300'
                    }`}
                  >
                    {passwordNotice.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{passwordNotice.text}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 uppercase block mb-1">Current Password / বর্তমান পাসওয়ার্ড *</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 uppercase block mb-1">New Password / নতুন পাসওয়ার্ড *</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 uppercase block mb-1">Confirm New Password *</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!currentPassword || !newPassword) {
                        setPasswordNotice({ type: 'error', text: 'Please fill in all password fields.' });
                        return;
                      }
                      if (newPassword.length < 8) {
                        setPasswordNotice({ type: 'error', text: 'New password must be at least 8 characters.' });
                        return;
                      }
                      if (newPassword !== confirmPassword) {
                        setPasswordNotice({ type: 'error', text: 'New password and confirmation do not match.' });
                        return;
                      }

                      const success = await updateAdminPassword(currentPassword, newPassword);
                      if (success) {
                        setPasswordNotice({
                          type: 'success',
                          text: 'Admin password updated securely! / পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে।',
                        });
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      } else {
                        setPasswordNotice({
                          type: 'error',
                          text: 'Current password is incorrect. / বর্তমান পাসওয়ার্ড ভুল হয়েছে।',
                        });
                      }
                    }}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Update Password / পাসওয়ার্ড আপডেট করুন</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SOCIAL LINKS */}
          {/* TAB 8: CONTACT CHANNELS & SOCIAL LINKS */}
          {activeTab === 'social' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="font-['Outfit'] font-black text-2xl text-white">
                  Contact Channels & Links / কন্টাক্ট চ্যানেল ও লিংক
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Configure official contact channels (Email & Telegram) used on the public Contact page, plus secondary developer profiles. / এখান থেকে ইমেইল ও টেলিগ্রাম পরিবর্তন করলে তা সরাসরি পাবলিক Contact পেজে আপডেট হবে।
                </p>
              </div>

              {/* HIGHLIGHTED SECTION: DIRECT CONTACT PAGE CHANNELS */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-[0_0_25px_rgba(0,240,255,0.08)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-['Outfit'] font-bold text-base text-white">
                        Public Contact Channels / পাবলিক কন্টাক্ট তথ্য
                      </h3>
                      <p className="text-[11px] font-mono text-cyan-300">
                        Directly linked to /contact page / সরাসরি Contact পেজে যুক্ত
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Synced
                  </span>
                </div>

                {/* 1. Official Email */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-cyan-300 uppercase font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Official Contact Email / অফিসিয়াল ইমেইল</span>
                    </label>
                    {data.socialLinks.email && (
                      <a
                        href={`mailto:${data.socialLinks.email}`}
                        className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>Test Email Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="email"
                    placeholder="e.g. contact@sohelrana.dev"
                    value={data.socialLinks.email}
                    onChange={(e) => updateSocialLinks({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] font-mono text-slate-400">
                    This email is displayed in Workstation Coordinates and the Direct Email button on the Contact page.
                  </p>
                </div>

                {/* 2. Telegram Direct Channel */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-sky-300 uppercase font-bold flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-sky-400" />
                      <span>Telegram Handle / URL / টেলিগ্রাম ইউজারনেম বা লিংক</span>
                    </label>
                    {data.socialLinks.telegram && (
                      <a
                        href={
                          data.socialLinks.telegram.startsWith('http')
                            ? data.socialLinks.telegram
                            : `https://t.me/${data.socialLinks.telegram.replace('@', '').trim()}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        <span>Open Telegram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. https://t.me/sohelrana_dev or @sohelrana_dev"
                    value={data.socialLinks.telegram}
                    onChange={(e) => updateSocialLinks({ telegram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-sky-500/30 text-white font-mono text-xs focus:border-sky-400 focus:outline-none transition-colors"
                  />
                  <p className="text-[11px] font-mono text-slate-400">
                    Supports full URL (https://t.me/...) or handle (@username). Displayed as Telegram Direct Chat on the Contact page.
                  </p>
                </div>
              </div>

              {/* SECONDARY PROFILES: GITHUB & LINKEDIN (FOOTER) */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4 text-xs font-mono">
                <h3 className="font-['Outfit'] font-bold text-sm text-white">
                  Secondary Profiles (Footer Links) / অন্যান্য প্রোফাইল
                </h3>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    GitHub Profile / গিটহাব প্রোফাইল
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.github}
                    onChange={(e) => updateSocialLinks({ github: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 uppercase block mb-1">
                    LinkedIn Profile / লিঙ্কডইন প্রোফাইল
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.linkedin}
                    onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D1A] border border-cyan-500/40 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="font-display font-black text-xl text-white">{data.projects.some((p) => p.id === editingProject.id) ? 'Edit Project' : 'Add Project'}</h3>
                <p className="text-slate-500 text-xs font-mono mt-1">Only publish project information and URLs that are real.</p>
              </div>
              <button type="button" onClick={() => setEditingProject(null)} className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="form-label">Title *</label><input className="form-input" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} /></div>
              <div><label className="form-label">Slug *</label><input className="form-input" value={editingProject.slug} onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} /></div>
              <div><label className="form-label">Category *</label><input className="form-input" value={editingProject.category} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} /></div>
              <div><label className="form-label">Image URL</label><input className="form-input" value={editingProject.image} onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })} /></div>
              <div className="sm:col-span-2"><label className="form-label">Description *</label><textarea rows={3} className="form-input" value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} /></div>
              <div className="sm:col-span-2"><label className="form-label">Long Description</label><textarea rows={4} className="form-input" value={editingProject.longDescription || ''} onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })} /></div>
              <div className="sm:col-span-2"><label className="form-label">Technologies (comma separated)</label><input className="form-input" value={editingProject.techStack.join(', ')} onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value.split(',').map((v) => v.trim()).filter(Boolean) })} /></div>
              <div className="sm:col-span-2"><label className="form-label">Gallery URLs (comma separated)</label><input className="form-input" value={(editingProject.gallery || []).join(', ')} onChange={(e) => setEditingProject({ ...editingProject, gallery: e.target.value.split(',').map((v) => v.trim()).filter(Boolean) })} /></div>
              <div><label className="form-label">Live URL</label><input className="form-input" type="url" value={editingProject.liveUrl} onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })} /></div>
              <div><label className="form-label">GitHub URL</label><input className="form-input" type="url" value={editingProject.githubUrl} onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })} /></div>
              <label className="sm:col-span-2 flex items-center gap-3 text-xs font-mono text-slate-300 cursor-pointer"><input type="checkbox" checked={editingProject.published} onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })} /> Publish this project publicly</label>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-white/10">
              <button type="button" onClick={() => setEditingProject(null)} className="premium-button premium-button-muted px-4 py-2 text-xs">Cancel</button>
              <button type="button" disabled={!editingProject.title.trim() || !editingProject.slug.trim() || !editingProject.description.trim()} onClick={() => { saveProject(editingProject); setEditingProject(null); }} className="premium-button px-4 py-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed"><Save className="w-3.5 h-3.5" /> Save Project</button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION MODAL FOR ORDER / PAYMENT */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#090D1A] border border-cyan-500/40 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <CreditCard className="w-4 h-4" />
                </span>
                <h3 className="font-['Outfit'] font-bold text-lg text-white">
                  Order Verification / অর্ডার বিস্তারিত ({inspectingOrder.id})
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                  inspectingOrder.status === 'Verified'
                    ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                    : inspectingOrder.status === 'Rejected'
                    ? 'bg-red-950 border-red-500/40 text-red-300'
                    : 'bg-yellow-950 border-yellow-500/40 text-yellow-300'
                }`}
              >
                {inspectingOrder.status}
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-mono text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10">
                <div>
                  <span className="text-slate-500 block text-[11px]">Student Name / শিক্ষার্থী:</span>
                  <span className="font-bold text-white text-sm">{inspectingOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Student Email:</span>
                  <span className="text-cyan-300 font-bold">{inspectingOrder.email}</span>
                </div>
                {(inspectingOrder.contactInfo || inspectingOrder.telegramContact) && (
                  <div>
                    <span className="text-slate-500 block text-[11px]">Telegram / WhatsApp:</span>
                    <span className="text-cyan-400 font-bold">
                      {inspectingOrder.contactInfo || inspectingOrder.telegramContact}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block text-[11px]">Submitted At:</span>
                  <span className="text-slate-300">{new Date(inspectingOrder.submittedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Course / কোর্স:</span>
                  <span className="text-white font-bold">{inspectingOrder.courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Required amount:</span>
                  <span className="text-cyan-300 font-bold">${inspectingOrder.requiredAmount} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Submitted amount & Network:</span>
                  <span className="text-emerald-400 font-bold">
                    ${inspectingOrder.amount} USDT via {inspectingOrder.network}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Transaction Hash (TXID):</span>
                  <div className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-white/10">
                    <span className="text-cyan-400 select-all break-all font-mono text-[11px]">
                      {inspectingOrder.txid}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(inspectingOrder.txid)}
                      className="text-slate-400 hover:text-cyan-300 p-1 cursor-pointer shrink-0"
                      title="Copy TXID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {inspectingOrder.screenshotUrl && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <span className="text-slate-400 block mb-2 font-bold">
                    Receipt Screenshot / পেমেন্ট স্ক্রিনশট:
                  </span>
                  <div className="rounded-xl overflow-hidden border border-white/10 max-h-72 bg-slate-950 flex justify-center p-2">
                    <img
                      src={inspectingOrder.screenshotUrl}
                      alt="Receipt"
                      className="max-h-72 object-contain rounded cursor-pointer"
                      onClick={() => window.open(inspectingOrder.screenshotUrl, '_blank')}
                      title="Click to view full image in new tab"
                    />
                  </div>
                </div>
              )}

              {/* Admin Notes Section */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                <label className="text-slate-400 block font-bold">
                  Verification Notes / অভ্যন্তরীণ নোট:
                </label>
                <textarea
                  rows={2}
                  value={inspectingOrderNote}
                  onChange={(e) => setInspectingOrderNote(e.target.value)}
                  placeholder="Add a factual internal review note; no automatic blockchain verification is available."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white outline-none focus:border-cyan-500 font-['Plus_Jakarta_Sans'] text-xs"
                />
                <button
                  onClick={() => {
                    updateOrderStatus(inspectingOrder.id, inspectingOrder.status, inspectingOrderNote);
                    setInspectingOrder({ ...inspectingOrder, adminNotes: inspectingOrderNote });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-cyan-500/30 cursor-pointer"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Note / নোট সংরক্ষণ</span>
                </button>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                {inspectingOrder.status !== 'Verified' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(inspectingOrder.id, 'Verified', inspectingOrderNote);
                      setInspectingOrder({ ...inspectingOrder, status: 'Verified', adminNotes: inspectingOrderNote });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve / অনুমোদন</span>
                  </button>
                )}
                {inspectingOrder.status !== 'Rejected' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(inspectingOrder.id, 'Rejected', inspectingOrderNote);
                      setInspectingOrder({ ...inspectingOrder, status: 'Rejected', adminNotes: inspectingOrderNote });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject / বাতিল</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setInspectingOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono text-white cursor-pointer"
              >
                Close / বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION MODAL FOR INBOX MESSAGE (LIVE MESSAGING CONSOLE) */}
      {inspectingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#090D1A] border border-cyan-500/40 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <h3 className="font-['Outfit'] font-bold text-lg text-white">
                  Inquiry Console / মেসেজিং কনসোল ({inspectingMessage.id})
                </h3>
              </div>
              <select
                value={inspectingMessage.status}
                onChange={(e) => {
                  const newStatus = e.target.value as any;
                  updateMessageStatus(inspectingMessage.id, newStatus);
                  setInspectingMessage({ ...inspectingMessage, status: newStatus });
                }}
                className="bg-slate-900 border border-white/10 rounded px-2.5 py-1 text-xs font-mono text-white outline-none"
              >
                <option value="Unread">Unread / নতুন</option>
                <option value="Read">Read / পড়া হয়েছে</option>
                <option value="Replied">Replied / উত্তর দেওয়া</option>
                <option value="Archived">Archived / সংরক্ষিত</option>
              </select>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10">
                <div>
                  <span className="text-slate-500 block text-[11px]">From / প্রেরক:</span>
                  <span className="text-white font-bold">{inspectingMessage.name}</span>
                  <div className="text-cyan-300 text-[11px]">{inspectingMessage.email}</div>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Telegram / WhatsApp:</span>
                  <span className="text-cyan-400 font-bold">
                    {inspectingMessage.contactInfo || 'Not provided'}
                  </span>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    {new Date(inspectingMessage.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Subject & Original Inquiry */}
              <div className="space-y-1.5">
                <span className="text-slate-500 block">Subject / বিষয়:</span>
                <div className="font-bold text-white text-sm bg-slate-900/40 p-2.5 rounded-lg border border-white/10">
                  {inspectingMessage.subject}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-500 block">Client Message / মূল বার্তা:</span>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-slate-200 whitespace-pre-wrap font-['Plus_Jakarta_Sans'] text-xs leading-relaxed">
                  {inspectingMessage.message}
                </div>
              </div>

              {/* Attachment if present */}
              {inspectingMessage.attachmentName && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <FileText className="w-4 h-4 shrink-0" />
                    <div>
                      <span className="font-bold">{inspectingMessage.attachmentName}</span>
                      {inspectingMessage.attachmentSize && (
                        <span className="text-slate-400 text-[10px] ml-2">
                          ({inspectingMessage.attachmentSize})
                        </span>
                      )}
                    </div>
                  </div>
                  {inspectingMessage.attachmentUrl && (
                    <a
                      href={inspectingMessage.attachmentUrl}
                      download={inspectingMessage.attachmentName}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-bold"
                    >
                      Download
                    </a>
                  )}
                </div>
              )}

              {/* Conversation Thread / Replies */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Thread History / পূর্ববর্তী উত্তরসমূহ ({inspectingMessage.replies?.length || 0})</span>
                  </span>
                </div>

                {inspectingMessage.replies && inspectingMessage.replies.length > 0 ? (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {inspectingMessage.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-cyan-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                            {rep.sender === 'admin' ? 'Sohel Rana (Admin)' : inspectingMessage.name}
                          </span>
                          <span className="text-slate-500">
                            {new Date(rep.sentAt).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-slate-200 font-['Plus_Jakarta_Sans'] text-xs whitespace-pre-wrap">
                          {rep.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-slate-500 text-center text-[11px]">
                    No replies sent yet. Compose your response below.
                  </div>
                )}
              </div>

              {/* Direct Reply Composer Console */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
                <label className="text-cyan-300 font-bold uppercase tracking-wider text-[11px] block">
                  Compose Direct Reply / উত্তর তৈরি করুন:
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Hi ${inspectingMessage.name}, thank you for reaching out regarding...`}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-500 font-['Plus_Jakarta_Sans'] text-xs"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (!replyText.trim()) return;
                      addMessageReply(inspectingMessage.id, replyText.trim());
                      const newReplyItem: ConversationReply = {
                        id: `rep_${Date.now()}`,
                        sender: 'admin',
                        text: replyText.trim(),
                        sentAt: new Date().toISOString(),
                      };
                      setInspectingMessage({
                        ...inspectingMessage,
                        status: 'Replied',
                        replies: [...(inspectingMessage.replies || []), newReplyItem],
                      });
                      setReplyText('');
                    }}
                    disabled={!replyText.trim()}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply / উত্তর পাঠান</span>
                  </button>

                  <a
                    href={`mailto:${inspectingMessage.email}?subject=Re: ${encodeURIComponent(
                      inspectingMessage.subject
                    )}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Open Email Client</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setInspectingMessage(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono text-white cursor-pointer"
              >
                Close Console / বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
