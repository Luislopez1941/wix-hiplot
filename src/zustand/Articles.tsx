
import { create } from 'zustand';



interface StoreState {
  articlesInGlobal: any
  articlesFamilies: any[];
  articlesByOne: any[];

  articles: any;
  setArticles: (modal: any) => void;

  modalArticle: any;
  setModalArticle: (modal: any) => void;

  subModal: any;
  setSubModal: (modal: any) => void;

  modalLoading: any;
  setModalLoading: (modal: any) => void;

  warinings: any;
  setWarinings: (warining: any) => void;

  //Articles
  articleByOne: any;
  setArticleByOne: (article: any) => void;


  imagesArticles: any
  setImagesArticles: (x: any) => void;

  deteleImagesArticles: any
  setDeleteImagesArticles: (x: any) => void;

  articleToUpdate: any;
  setArticleToUpdate: (article: any) => void;
}


export const storeArticles = create<StoreState>((set) => ({

  articles: [],
  setArticles: (x) => set({ articles: x }),

  articlesInGlobal: [],

  modalArticle: '',
  setModalArticle: (modal) => set({ modalArticle: modal }),

  subModal: '',
  setSubModal: (modal) => set({ subModal: modal }),

  modalLoading: false,
  setModalLoading: (modal) => set({ modalLoading: modal }),

  warinings: '',
  setWarinings: (warining) => set({ warinings: warining }),

  articlesFamilies: [],

  articlesByOne: [],

  //Articles
  articleByOne: [],
  setArticleByOne: (article) => set({ articleByOne: article }),


  imagesArticles: [],
  setImagesArticles: (x) => set({ imagesArticles: x }),


  deteleImagesArticles: [],
  setDeleteImagesArticles: (x) => set({ deteleImagesArticles: x }),


  articleToUpdate: null,
  setArticleToUpdate: (article) => set({ articleToUpdate: article }),





}));



