import { create } from 'zustand';

interface EditorInstance {
  [key: string]: any;
}

interface EditorState {
  dataContainer: { [typeName: string]: EditorInstance };
  setDataContainer: (typeName: string, newData: EditorInstance) => void;
  getData: (typeName: string) => EditorInstance;
}

export const editorContainerStore = create<EditorState>((set, get) => ({
  dataContainer: {},
  setDataContainer: (typeName, newData) =>
    set((state) => ({
      dataContainer: {
        ...state.dataContainer,
        [typeName]: newData,
      },
    })),
  getData: (typeName) => get().dataContainer[typeName] || {},
}));

