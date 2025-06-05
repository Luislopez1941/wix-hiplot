import { create } from 'zustand';


interface EditorState {


  items: any[];
  setItems: (x: any) => void;
  
}

export const servicesStore = create<EditorState>((set) => ({
  items: [],
  setItems: (x) => set({ items: x }),


 
}));
