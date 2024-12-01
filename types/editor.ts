// types/editor.ts
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export interface VimMode {
  dispose: () => void;
  initVimMode: (editor: Monaco.editor.IStandaloneCodeEditor, statusNode: HTMLElement) => VimMode;
}

export interface MonacoVim {
  initVimMode: (editor: Monaco.editor.IStandaloneCodeEditor, statusNode: HTMLElement) => VimMode;
}