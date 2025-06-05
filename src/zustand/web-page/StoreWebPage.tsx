import { create } from 'zustand';
import serviceJson from '../../pages/Private/webNavigation/jsons/services.json'

interface StylesState {
  stylesDescription: {
    text: string;
    textCenter: boolean | null;
    textFontWeight: string | null;
    textFontSize: number;
    textColor: string | null;
  };
  setStylesDescription: (styles: Partial<StylesState['stylesDescription']>) => void;
}

interface EditorItem {
  imagen: string;
  titulo: string;
}

interface EditorState {
  editor: EditorItem[];
  setEditor: (editores: EditorItem[]) => void;
  updateEditorItem: (index: number, item: Partial<EditorItem>) => void;

  sections: any[];
  setSections: (x: any) => void;

  containers: any[];
  setContainers: (x: any) => void;


  items: any[];
  setItems: (x: any) => void;


}

export const useWebStore = create<StylesState & EditorState>((set) => ({
  sections: [],
  setSections: (x) => set({ sections: x }),

  containers: [],
  setContainers: (x) => set({ containers: x }),

  items: [{
      image: serviceJson.imagen,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit'
    },
    {
      image: serviceJson.imagen,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit'
    },
    {
      image: serviceJson.imagen,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit'
    }],
  setItems: (x) => set({ items: x }),

  stylesDescription: {
    text: '',
    textCenter: null,
    textFontWeight: null,
    textFontSize: 15,
    textColor: null,
  },
  setStylesDescription: (styles) =>
    set((state) => ({
      stylesDescription: {
        ...state.stylesDescription,
        ...styles,
      },
    })),

  editor: Array.from({ length: 5 }, () => ({ imagen: '', titulo: '' })),

  setEditor: (editores) => set(() => ({ editor: editores })),

  updateEditorItem: (index, item) =>
    set((state) => ({
      editor: state.editor.map((editor, i) =>
        i === index ? { ...editor, ...item } : editor
      ),
    })),
}));
