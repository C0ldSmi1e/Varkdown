// stores/editorStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EditorState {
  content: string;
  setContent: (content: string) => void;
}

const INITIAL_CONTENT = `# Welcome to Markdown + LaTeX Editor

Type your content here.

Math example: $E = mc^2$`;

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      content: INITIAL_CONTENT,
      setContent: (content) => set({ content }),
    }),
    {
      name: "editor-storage",
    }
  )
);