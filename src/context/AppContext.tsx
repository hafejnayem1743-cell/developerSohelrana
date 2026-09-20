import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  MasterStoreData,
  CoursePackage,
  CourseBundle,
  ProjectItem,
  ServiceCategory,
  SkillItem,
  WalletSettings,
  SiteSettings,
  SocialLinks,
  PaymentOrder,
  ContactMessage,
  ConversationReply,
} from '../types';
import { initialMasterData } from '../data/initialData';

export type RGBTheme = 'aurora' | 'cyan' | 'purple' | 'green';

interface AppContextType {
  data: MasterStoreData;
  rgbTheme: RGBTheme;
  setRgbTheme: (theme: RGBTheme) => void;
  isLocalOnlyMode: boolean;
  submitOrder: (order: Omit<PaymentOrder, 'id' | 'submittedAt' | 'status'>) => Promise<string>;
  submitContactMessage: (
    message: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>
  ) => Promise<string>;

  // Local-only admin gate. This is intentionally not represented as production authentication.
  isAdminLoggedIn: boolean;
  hasAdminCredential: boolean;
  setupAdminPassword: (password: string) => Promise<boolean>;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  updateAdminPassword: (currentPassword: string, newPassword: string) => Promise<boolean>;

  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateAboutSection: (about: Partial<MasterStoreData['about']>) => void;
  updateWalletSettings: (wallet: Partial<WalletSettings>) => void;
  updateSocialLinks: (social: Partial<SocialLinks>) => void;

  saveCourse: (course: CoursePackage) => void;
  deleteCourse: (id: string) => void;
  updateBundle: (bundle: Partial<CourseBundle>) => void;

  saveServiceCategory: (service: ServiceCategory) => void;

  saveProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;

  saveSkill: (skill: SkillItem) => void;
  deleteSkill: (id: string) => void;

  updateOrderStatus: (orderId: string, status: PaymentOrder['status'], notes?: string) => void;
  deleteOrder: (orderId: string) => void;

  updateMessageStatus: (messageId: string, status: ContactMessage['status'], notes?: string) => void;
  deleteMessage: (messageId: string) => void;
  addMessageReply: (messageId: string, replyText: string) => void;

  resetStoreToDefaults: () => void;
}

const STORAGE_KEY = 'sohel_rana_master_store_v2026';
const AUTH_KEY = 'sohel_rana_admin_auth_v2026';
const CREDENTIAL_HASH_KEY = 'sohel_rana_admin_credential_hash_v2026';
const CREDENTIAL_SALT_KEY = 'sohel_rana_admin_credential_salt_v2026';
const CREDENTIAL_VERSION_KEY = 'sohel_rana_admin_credential_version_v2026';
const CURRENT_CREDENTIAL_VERSION = '4';
const DEFAULT_ADMIN_HASH = '7b54bfb4dcd81d3a68088bc61d73031c82277a5f88e923fe9a695df636f76c8e';
const DEFAULT_ADMIN_SALT = '8f3c1a7d5b2946e1c0f9a2b7d4e6f815';
const isLocalOnlyMode = true;
const PBKDF2_ITERATIONS = 150_000;

const toHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

const hashPassphrase = async (input: string, saltHex: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(input.trim()),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return toHex(new Uint8Array(derived));
};

const createSalt = () => {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return toHex(salt);
};

const ensureDefaultAdminCredential = () => {
  try {
    const version = localStorage.getItem(CREDENTIAL_VERSION_KEY);
    if (version !== CURRENT_CREDENTIAL_VERSION) {
      localStorage.setItem(CREDENTIAL_SALT_KEY, DEFAULT_ADMIN_SALT);
      localStorage.setItem(CREDENTIAL_HASH_KEY, DEFAULT_ADMIN_HASH);
      localStorage.setItem(CREDENTIAL_VERSION_KEY, CURRENT_CREDENTIAL_VERSION);
      localStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // Storage errors are handled by the normal credential checks below.
  }
};

const getStoredCredential = () => {
  try {
    return {
      hash: localStorage.getItem(CREDENTIAL_HASH_KEY),
      salt: localStorage.getItem(CREDENTIAL_SALT_KEY),
    };
  } catch {
    return { hash: null, salt: null };
  }
};

const persistData = (next: MasterStoreData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    throw new Error(
      'This browser could not save the application data locally. No server-side storage is configured.'
    );
  }
};

const createRecordId = (prefix: string) => `${prefix}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  ensureDefaultAdminCredential();

  const [data, setData] = useState<MasterStoreData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<MasterStoreData>;
        const migratedOrders = Array.isArray(parsed.orders)
          ? parsed.orders.map((order) => ({
              ...order,
              requiredAmount: Number(order.requiredAmount ?? order.amount ?? 0),
            }))
          : initialMasterData.orders;
        return { ...initialMasterData, ...parsed, orders: migratedOrders };
      }
    } catch {
      // Fall back to the immutable in-bundle defaults when local storage is unreadable.
    }
    return initialMasterData;
  });

  const [rgbTheme, setRgbTheme] = useState<RGBTheme>('aurora');
  const [hasAdminCredential, setHasAdminCredential] = useState<boolean>(() => {
    const credential = getStoredCredential();
    return Boolean(credential.hash && credential.salt);
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
    } catch {
      return false;
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Public UI continues to work, but submissions explicitly surface persistence failures.
    }
  }, [data]);

  const setupAdminPassword = async (password: string) => {
    if (!isLocalOnlyMode || password.trim().length < 8) return false;
    try {
      const salt = createSalt();
      const hash = await hashPassphrase(password, salt);
      localStorage.setItem(CREDENTIAL_SALT_KEY, salt);
      localStorage.setItem(CREDENTIAL_HASH_KEY, hash);
      setHasAdminCredential(true);
      return true;
    } catch {
      return false;
    }
  };

  const loginAdmin = async (password: string) => {
    if (!isLocalOnlyMode) return false;
    try {
      const credential = getStoredCredential();
      if (!credential.hash || !credential.salt) return false;
      const inputHash = await hashPassphrase(password, credential.salt);
      if (inputHash !== credential.hash) return false;
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      return true;
    } catch {
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore storage cleanup failures.
    }
  };

  const updateAdminPassword = async (currentPassword: string, newPassword: string) => {
    if (!isLocalOnlyMode || newPassword.trim().length < 8) return false;
    try {
      const credential = getStoredCredential();
      if (!credential.hash || !credential.salt) return false;
      const currentHash = await hashPassphrase(currentPassword, credential.salt);
      if (currentHash !== credential.hash) return false;
      const newSalt = createSalt();
      const newHash = await hashPassphrase(newPassword, newSalt);
      localStorage.setItem(CREDENTIAL_SALT_KEY, newSalt);
      localStorage.setItem(CREDENTIAL_HASH_KEY, newHash);
      return true;
    } catch {
      return false;
    }
  };

  const submitOrder = async (
    orderData: Omit<PaymentOrder, 'id' | 'submittedAt' | 'status'>
  ): Promise<string> => {
    const newOrder: PaymentOrder = {
      ...orderData,
      id: createRecordId('ORD'),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    const next = { ...data, orders: [newOrder, ...data.orders] };
    persistData(next);
    setData(next);
    return newOrder.id;
  };

  const submitContactMessage = async (
    msgData: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>
  ): Promise<string> => {
    const newMessage: ContactMessage = {
      ...msgData,
      id: createRecordId('MSG'),
      submittedAt: new Date().toISOString(),
      status: 'Unread',
      replies: [],
    };
    const next = { ...data, messages: [newMessage, ...data.messages] };
    persistData(next);
    setData(next);
    return newMessage.id;
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) =>
    setData((prev) => ({ ...prev, siteSettings: { ...prev.siteSettings, ...settings } }));
  const updateAboutSection = (aboutUpdates: Partial<MasterStoreData['about']>) =>
    setData((prev) => ({ ...prev, about: { ...prev.about, ...aboutUpdates } }));
  const updateWalletSettings = (walletUpdates: Partial<WalletSettings>) =>
    setData((prev) => ({ ...prev, walletSettings: { ...prev.walletSettings, ...walletUpdates } }));
  const updateSocialLinks = (socialUpdates: Partial<SocialLinks>) =>
    setData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, ...socialUpdates } }));

  const saveCourse = (course: CoursePackage) =>
    setData((prev) => ({
      ...prev,
      courses: prev.courses.some((c) => c.id === course.id)
        ? prev.courses.map((c) => (c.id === course.id ? course : c))
        : [...prev.courses, course],
    }));
  const deleteCourse = (id: string) => setData((prev) => ({ ...prev, courses: prev.courses.filter((c) => c.id !== id) }));
  const updateBundle = (bundleUpdates: Partial<CourseBundle>) =>
    setData((prev) => ({ ...prev, bundle: { ...prev.bundle, ...bundleUpdates } }));

  const saveServiceCategory = (service: ServiceCategory) =>
    setData((prev) => ({ ...prev, services: prev.services.map((s) => (s.id === service.id ? service : s)) }));

  const saveProject = (project: ProjectItem) =>
    setData((prev) => ({
      ...prev,
      projects: prev.projects.some((p) => p.id === project.id)
        ? prev.projects.map((p) => (p.id === project.id ? project : p))
        : [project, ...prev.projects],
    }));
  const deleteProject = (id: string) => setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));

  const saveSkill = (skill: SkillItem) =>
    setData((prev) => ({
      ...prev,
      skills: prev.skills.some((s) => s.id === skill.id)
        ? prev.skills.map((s) => (s.id === skill.id ? skill : s))
        : [...prev.skills, skill],
    }));
  const deleteSkill = (id: string) => setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));

  const updateOrderStatus = (orderId: string, status: PaymentOrder['status'], notes?: string) =>
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, ...(notes !== undefined ? { adminNotes: notes } : {}) }
          : order
      ),
    }));
  const deleteOrder = (orderId: string) => setData((prev) => ({ ...prev, orders: prev.orders.filter((order) => order.id !== orderId) }));

  const updateMessageStatus = (messageId: string, status: ContactMessage['status'], notes?: string) =>
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((message) =>
        message.id === messageId
          ? { ...message, status, ...(notes !== undefined ? { adminNotes: notes } : {}) }
          : message
      ),
    }));
  const deleteMessage = (messageId: string) =>
    setData((prev) => ({ ...prev, messages: prev.messages.filter((message) => message.id !== messageId) }));
  const addMessageReply = (messageId: string, replyText: string) => {
    if (!replyText.trim()) return;
    const reply: ConversationReply = {
      id: createRecordId('REP'),
      sender: 'admin',
      text: replyText.trim(),
      sentAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((message) =>
        message.id === messageId
          ? { ...message, status: 'Replied', replies: [...(message.replies || []), reply] }
          : message
      ),
    }));
  };

  const resetStoreToDefaults = () => {
    setData(initialMasterData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage cleanup failures.
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        rgbTheme,
        setRgbTheme,
        isLocalOnlyMode,
        submitOrder,
        submitContactMessage,
        isAdminLoggedIn,
        hasAdminCredential,
        setupAdminPassword,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
