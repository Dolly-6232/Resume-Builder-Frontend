export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium?: boolean;
  subscriptionType?: 'free' | 'monthly' | 'yearly';
}

export interface Resume {
  id: string;
  title: string;
  template: string;
  content: ResumeContent;
  atsScore?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeContent {
  summary?: string;
  personal?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    role?: string;
  };
  experience?: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills?: string[];
}

export interface ResumePayload {
  id?: string;
  title: string;
  template: string;
  content: ResumeContent;
}

export interface AuthResponse {
  token: string;
  user: User | null;
}

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  isPro?: boolean;
}

