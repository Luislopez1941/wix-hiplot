import { create } from 'zustand';



interface EditorState {

  dataEditContainer: any[];
  setDataEditContainer: (x: any) => void;

  currentSlide: any;
  setCurrentSlide: (x: any) => void;
}

export const useEditorBannerStore = create<EditorState>((set) => ({
  dataEditContainer: [],
  setDataEditContainer: (x) => set({ dataEditContainer: x }),

  currentSlide: 0,
  setCurrentSlide: (x) => set({ currentSlide: x }),
}));

