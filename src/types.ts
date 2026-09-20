export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'programming' | 'tools' | 'cybersecurity';
  description: string;
  iconName?: string;
  level?: string;
}

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CoursePackage {
  id: string;
  slug: string;
  packageNumber: string;
  title: string;
  price: number;
  regularPrice?: number;
  discount?: string;
  description: string;
  technologies: string[];
  whatYouLearn: string[];
  modules: CourseModule[];
  requirements: string[];
  benefits: string[];
  faq: CourseFAQ[];
  badge?: string;
  accent: 'cyan' | 'blue' | 'purple' | 'green';
  enabled: boolean;
  image?: string;
}

export interface CourseBundle {
  title: string;
  regularTotal: number;
  discount: string;
  finalPrice: number;
  savings: string;
  description: string;
  ctaText: string;
  features: string[];
  modules: CourseModule[];
  faq: CourseFAQ[];
}

export interface ServiceTier {
  name: 'STARTER' | 'PROFESSIONAL' | 'PREMIUM';
  price: number;
  popular?: boolean;
  summary: string;
  features: string[];
  idealFor?: string;
  deliveryHighlights?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fiverrGigUrl: string;
  tiers: ServiceTier[];
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  techStack: string[];
  image: string;
  gallery?: string[];
  liveUrl: string;
  githubUrl: string;
  published: boolean;
  featured?: boolean;
}

export interface WalletSettings {
  usdtTrc20Address: string;
  usdtBep20Address: string;
  binancePayId?: string;
  instructions: string;
}

export interface ConversationReply {
  id: string;
  sender: 'admin' | 'customer';
  text: string;
  sentAt: string;
}

export interface PaymentOrder {
  id: string;
  customerName: string;
  email: string;
  telegramContact?: string;
  contactInfo?: string;
  courseId: string;
  courseTitle: string;
  requiredAmount: number;
  amount: number;
  network: 'TRC20' | 'BEP20';
  txid: string;
  screenshotUrl?: string;
  screenshotName?: string;
  message?: string;
  submittedAt: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  contactInfo?: string;
  subject: string;
  message: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: string;
  submittedAt: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  adminNotes?: string;
  replies?: ConversationReply[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  fiverr: string;
  facebook: string;
  telegram: string;
  email: string;
}

export interface SiteSettings {
  name: string;
  role: string;
  headline: string;
  subtitle: string;
  shortDescription: string;
  statusText: string;
  isAvailableForHire: boolean;
  location: string;
  profilePhoto: string;
  seoTitle: string;
  seoDescription: string;
  footerTagline: string;
  footerCopyright: string;
}

export interface AboutSectionData {
  bioParagraphs: string[];
  experienceYears: string;
  philosophy: string;
  focusAreas: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface MasterStoreData {
  siteSettings: SiteSettings;
  about: AboutSectionData;
  heroTechBadges: string[];
  skills: SkillItem[];
  courses: CoursePackage[];
  bundle: CourseBundle;
  services: ServiceCategory[];
  projects: ProjectItem[];
  walletSettings: WalletSettings;
  socialLinks: SocialLinks;
  orders: PaymentOrder[];
  messages: ContactMessage[];
}
