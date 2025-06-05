import { create } from 'zustand';

interface EditorInstance {
  [key: string]: any;
}

interface EditorState {
  data: { [typeName: string]: EditorInstance };
  setData: (typeName: string, newData: EditorInstance) => void;
  getData: (typeName: string) => EditorInstance;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  data: {},
  setData: (typeName, newData) =>
    set((state) => ({
      data: {
        ...state.data,
        [typeName]: newData,
      },
    })),
  getData: (typeName) => get().data[typeName] || {},
}));

