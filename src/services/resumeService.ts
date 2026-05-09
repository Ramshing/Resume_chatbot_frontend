import api from './api';
import { Resume, DashboardStats } from '../types';

export const resumeService = {
  async getAll(params?: any): Promise<Resume[]> {
    const { data } = await api.get('/api/resumes', { params });
    // Handle both { success: true, data: [...] } and [...] formats
    return Array.isArray(data) ? data : (data?.data || []);
  },

  async upload(file: File): Promise<Resume> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/api/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get('/resumes/stats');
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/resumes/${id}`);
  }
};
