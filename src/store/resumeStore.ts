import { create } from "zustand"

interface ResumeState {
  resumes: string[]
  selected: string
  addResume: (name: string) => void
  selectResume: (name: string) => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumes: [],
  selected: "",

  addResume: (name) =>
    set((state) => ({
      resumes: [...state.resumes, name],
    })),

  selectResume: (name) =>
    set(() => ({
      selected: name,
    })),
}))
