import { create } from 'zustand'

const useCouseStore = create((set) => ({
  activeCourse: null,
  isLoading: false,
  setIsLoading: (f) => set({ isLoading: f}),
  setActiveCourse: (course) => set({ activeCourse: course }),
}))

export default useCouseStore;