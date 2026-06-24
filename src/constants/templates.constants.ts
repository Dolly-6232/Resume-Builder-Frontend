import type { TemplateOption } from '../types';

export const RESUME_TEMPLATES: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean layout with bold headings',
    icon: 'sparkles-outline',
    accent: '#2563EB',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic corporate style',
    icon: 'briefcase-outline',
    accent: '#0F766E',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with personality',
    icon: 'color-palette-outline',
    accent: '#9333EA',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Senior leadership focused',
    icon: 'ribbon-outline',
    accent: '#B45309',
  },
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Optimized for applicant tracking',
    icon: 'checkmark-done-outline',
    accent: '#059669',
  },
  {
    id: 'fresher',
    name: 'Fresher',
    description: 'Perfect for new graduates',
    icon: 'school-outline',
    accent: '#DB2777',
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
