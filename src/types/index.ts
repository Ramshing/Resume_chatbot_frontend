export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'recruiter';
}

export interface Resume {
  id: string;
  candidate_name: string;
  email: string;
  phone: string;
  skills: string[];
  experience_years: number;
  education: string[];
  summary: string;
  file_url: string;
  score?: number;
  created_at: string;
}

export interface ChatCandidate {
  resume_id: string;
  candidate_name: string;
  summary: string;
  score: number;
  decision: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  candidates?: ChatCandidate[];
}

export interface DashboardStats {
  total_resumes: number;
  top_skills: { name: string; count: number }[];
  experience_distribution: { range: string; count: number }[];
  recent_uploads: Resume[];
}
