import { useRef, useEffect, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { MonacoVim, VimMode } from "@/types/editor";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

const SCROLLBAR_OPTIONS: Monaco.editor.IEditorScrollbarOptions = {
  useShadows: false,
} as const;

const EDITOR_OPTIONS: Monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  fontSize: 18,
  lineHeight: 24,
  wordWrap: "on",
  wrappingStrategy: "advanced",
  lineNumbers: "on",
  renderLineHighlight: "all",
  scrollBeyondLastLine: false,
  folding: false,
  automaticLayout: true,
  tabSize: 2,
  tabCompletion: "on",
  padding: { top: 16, bottom: 16 },
  fontFamily: "'Fira Code', monospace",
  fontLigatures: true,
  scrollbar: SCROLLBAR_OPTIONS,
} as const;


declare global {
  interface Window {
    require: {
      config: (config: { paths: Record<string, string> }) => void;
      (deps: string[], callback: (monacoVim: MonacoVim) => void): void;
    };
  }
}

export default function MonacoEditor({ value, onChange, darkMode }: EditorProps) {
  const statusNodeRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const themesLoadedRef = useRef<boolean>(false);

  const loadThemes = async (monaco: typeof Monaco) => {
    if (themesLoadedRef.current) return;

    const [darkThemeData, lightThemeData] = await Promise.all([
      fetch("/themes/solarized-dark.json").then(data => data.json()),
      fetch("/themes/solarized-light.json").then(data => data.json())
    ]);

    monaco.editor.defineTheme("dark", darkThemeData);
    monaco.editor.defineTheme("light", lightThemeData);
    themesLoadedRef.current = true;
  };

  const updateTheme = useCallback(() => {
    if (monacoRef.current && editorRef.current && themesLoadedRef.current) {
      monacoRef.current.editor.setTheme(darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  useEffect(() => {
    updateTheme();
  }, [darkMode, updateTheme]);

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    await loadThemes(monaco);
    updateTheme();

    window.require.config({
      paths: {
        "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim"
      }
    });

    window.require(["monaco-vim"], function(monacoVim: MonacoVim) {
      if (statusNodeRef.current) {
        const vim: VimMode = monacoVim.initVimMode(editor, statusNodeRef.current);
        
        // Cleanup on component unmount
        return () => vim.dispose();
      }
    });
  };

  return (
    <div className="relative h-full overflow-hidden">
      <Editor
        height="92vh"
        defaultLanguage="markdown"
        value={value}
        onChange={(value) => onChange(value ?? "")}
        onMount={handleEditorDidMount}
        options={EDITOR_OPTIONS}
        theme={darkMode ? "dark" : "light"}
      />
      <div 
        ref={statusNodeRef}
        className="absolute bottom-0 left-0 p-2 text-sm bg-solarized-base2 dark:bg-solarized-base02 text-solarized-base00 dark:text-solarized-base0 rounded-tr-md"
        aria-live="polite"
      />
    </div>
  );
}
