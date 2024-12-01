declare module "monaco-vim" {
  import * as Monaco from "monaco-editor";
  
  export function initVimMode(
    editor: Monaco.editor.IStandaloneCodeEditor,
    statusNode: HTMLElement
  ): {
    dispose: () => void;
  };
}