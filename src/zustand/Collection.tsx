
import { create } from 'zustand';

interface StoreState {

  article: any;
  setArticle: (modal: any) => void;

  subModal: any;
  setSubModal: (modal: any) => void;

  articleDelete: any;
  setArticleDelete: (modal: any) => void;
}

export const storeCollection = create<StoreState>((set) => ({




  article: [],
  setArticle: (x) => set({ article: x }),

  articleDelete: [],
  setArticleDelete: (x) => set({ articleDelete: x }),

  subModal: '',
  setSubModal: (modal) => set({ subModal: modal }),



}));



