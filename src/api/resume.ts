import { apiClient } from './client';
import type { Resume, ResumeContent, ResumePayload } from '../types';

const mapExperienceToBackend = (experience: ResumeContent['experience'] = []) =>
  experience.map(item => ({
    company: item.company,
    position: item.role,
    startDate: '',
    endDate: item.duration,
    current: false,
    description: item.description,
  }));

const mapEducationToBackend = (education: ResumeContent['education'] = []) =>
  education.map(item => ({
    institution: item.school,
    degree: item.degree,
    fieldOfStudy: '',
    startDate: '',
    endDate: item.year,
    grade: '',
    description: '',
  }));

const mapExperienceFromBackend = (experience: any[] = []) =>
  experience.map(item => ({
    company: item.company || '',
    role: item.position || '',
    duration: item.endDate || item.startDate || '',
    description: item.description || '',
  }));

const mapEducationFromBackend = (education: any[] = []) =>
  education.map(item => ({
    school: item.institution || '',
    degree: item.degree || '',
    year: item.endDate || item.startDate || '',
  }));

export const toBackendPayload = (payload: ResumePayload) => ({
  templateId: payload.template,
  personalInfo: {
    fullName: payload.content.personal?.fullName || payload.title,
    email: payload.content.personal?.email || '',
    phone: payload.content.personal?.phone || '',
    address: payload.content.personal?.location || '',
    jobTitle: payload.content.personal?.role || '',
  },
  summary: payload.content.summary || '',
  experience: mapExperienceToBackend(payload.content.experience),
  education: mapEducationToBackend(payload.content.education),
  skills: (payload.content.skills || []).map(name => ({ name, level: '' })),
  technicalSkills: payload.content.skills || [],
});

export const normalizeResume = (resume: any): Resume => ({
  id: resume?.id || resume?._id,
  title: resume?.personalInfo?.fullName || resume?.title || 'Untitled resume',
  template: resume?.templateId || resume?.template || 'modern',
  atsScore: resume?.atsScore,
  content: {
    summary: resume?.summary || '',
    personal: {
      fullName: resume?.personalInfo?.fullName || '',
      email: resume?.personalInfo?.email || '',
      phone: resume?.personalInfo?.phone || '',
      location: resume?.personalInfo?.address || '',
      role: resume?.personalInfo?.jobTitle || '',
    },
    experience: mapExperienceFromBackend(resume?.experience),
    education: mapEducationFromBackend(resume?.education),
    skills:
      resume?.technicalSkills ||
      resume?.skills?.map((skill: { name: string }) => skill.name).filter(Boolean) ||
      [],
  },
  createdAt: resume?.createdAt,
  updatedAt: resume?.updatedAt,
});

const normalizeResumeList = (data: any): Resume[] => {
  const list = Array.isArray(data)
    ? data
    : data?.resumes || data?.data?.resumes || data?.data || [];

  return Array.isArray(list) ? list.map(normalizeResume) : [];
};

export const resumeApi = {
  async getResumes(): Promise<Resume[]> {
    const response = await apiClient.get('/resumes');
    return normalizeResumeList(response.data);
  },

  async getResume(id: string): Promise<Resume> {
    const response = await apiClient.get(`/resumes/${id}`);
    return normalizeResume(response.data?.resume || response.data?.data || response.data);
  },

  async createResume(payload: ResumePayload): Promise<Resume> {
    const response = await apiClient.post('/resumes', toBackendPayload(payload));
    return normalizeResume(response.data?.resume || response.data?.data || response.data);
  },

  async updateResume(payload: ResumePayload & { id: string }): Promise<Resume> {
    const response = await apiClient.put(`/resumes/${payload.id}`, toBackendPayload(payload));
    return normalizeResume(response.data?.resume || response.data?.data || response.data);
  },

  async deleteResume(id: string): Promise<void> {
    await apiClient.delete(`/resumes/${id}`);
  },

  async duplicateResume(id: string): Promise<Resume> {
    const response = await apiClient.post(`/resumes/duplicate/${id}`);
    return normalizeResume(response.data?.resume || response.data?.data || response.data);
  },
};
