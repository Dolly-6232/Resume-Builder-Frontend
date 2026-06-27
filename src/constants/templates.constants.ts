import type { TemplateOption } from '../types';

export const RESUME_TEMPLATES: TemplateOption[] = [
  // --- FREE TEMPLATES (7) ---
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean layout with bold headings',
    icon: 'sparkles-outline',
    accent: '#2563EB',
    isPro: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic corporate style',
    icon: 'briefcase-outline',
    accent: '#0F766E',
    isPro: false,
  },
  {
    id: 'fresher',
    name: 'Fresher',
    description: 'Perfect for new graduates',
    icon: 'school-outline',
    accent: '#DB2777',
    isPro: false,
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant design',
    icon: 'leaf-outline',
    accent: '#10B981',
    isPro: false,
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Traditional academic format',
    icon: 'library-outline',
    accent: '#4B5563',
    isPro: false,
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for tech roles',
    icon: 'hardware-chip-outline',
    accent: '#3B82F6',
    isPro: false,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Time-tested standard format',
    icon: 'document-text-outline',
    accent: '#1E293B',
    isPro: false,
  },
  
  // --- PRO TEMPLATES (8) ---
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Maximized for ATS systems',
    icon: 'checkmark-done-outline',
    accent: '#059669',
    isPro: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Senior leadership focused',
    icon: 'ribbon-outline',
    accent: '#B45309',
    isPro: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with personality',
    icon: 'color-palette-outline',
    accent: '#9333EA',
    isPro: true,
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Modern tech startup vibe',
    icon: 'rocket-outline',
    accent: '#F97316',
    isPro: true,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase visual work',
    icon: 'images-outline',
    accent: '#E11D48',
    isPro: true,
  },
  {
    id: 'developer-pro',
    name: 'Dev Pro',
    description: 'Code-inspired layout',
    icon: 'code-slash-outline',
    accent: '#0EA5E9',
    isPro: true,
  },
  {
    id: 'ceo',
    name: 'CEO',
    description: 'Premium leadership design',
    icon: 'star-outline',
    accent: '#D97706',
    isPro: true,
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Highly aesthetic & visual',
    icon: 'brush-outline',
    accent: '#8B5CF6',
    isPro: true,
  },
];

export const getTemplateById = (id: string): TemplateOption | undefined =>
  RESUME_TEMPLATES.find(template => template.id === id);

export const createEmptyResumeContent = () => ({
  summary: '',
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    role: '',
  },
  experience: [],
  education: [],
  skills: [] as string[],
});
