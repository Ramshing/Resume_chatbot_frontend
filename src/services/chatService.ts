import api from './api';
import { ChatMessage } from '../types';

import { ChatCandidate } from '../types';

export const chatService = {
  async sendMessage(query: string, sessionId: string, resumeId?: string): Promise<{ answer: string; candidates: ChatCandidate[] }> {
    const payload: any = {
      question: query,
      session_id: sessionId,
      selected_resume_ids: []
    };

    if (resumeId && resumeId !== 'all') {
      payload.selected_resume_ids = [resumeId];
    }

    const { data } = await api.post('/api/chat', payload);
    return { answer: data.answer, candidates: data.candidates || [] };
  }
};
