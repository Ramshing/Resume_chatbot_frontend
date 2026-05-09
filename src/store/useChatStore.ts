import { create } from 'zustand';
import { ChatMessage } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sessionId: string;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
}

const generateSessionId = () => Math.random().toString(36).substring(2, 15);

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  sessionId: generateSessionId(),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearChat: () => set({ messages: [], sessionId: generateSessionId() }),
}));
