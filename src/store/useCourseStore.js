import { create } from 'zustand'

const useCouseStore = create((set) => ({
  activeCourse: null,
  activeVideo: null,
  isLoading: false,
  setIsLoading: (f) => set({ isLoading: f}),
  setActiveCourse: (course) => set({ activeCourse: course }),
  setActiveVideo: (video) => set({ activeVideo: video }),
}))

export default useCouseStore;