
import { create } from 'zustand';

interface StoreState {

  article: any;
  setArticle: (modal: any) => void;

  subModal: any;
  setSubModal: (modal: any) => void;


}

export const storeCollection = create<StoreState>((set) => ({
 



  article: '',
  setArticle: (x) => set({ article: x }),

  subModal: '',
  setSubModal: (modal) => set({ subModal: modal }),



}));



