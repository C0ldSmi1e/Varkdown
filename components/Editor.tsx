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
  const vimModeRef = useRef<VimMode | null>(null);

  const loadThemes = async (monaco: typeof Monaco) => {
    if (themesLoadedRef.current) return;

    try {
      const [darkThemeData, lightThemeData] = await Promise.all([
        fetch("/themes/Solarized-dark.json").then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }),
        fetch("/themes/Solarized-light.json").then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      ]);

      monaco.editor.defineTheme("dark", darkThemeData);
      monaco.editor.defineTheme("light", lightThemeData);
      themesLoadedRef.current = true;
    } catch (error) {
      console.error("Failed to load themes:", error);
      // Fallback to default themes
      monaco.editor.setTheme(darkMode ? "vs-dark" : "vs");
    }
  };

  const updateTheme = useCallback(() => {
    if (monacoRef.current && editorRef.current) {
      const theme = themesLoadedRef.current ? (darkMode ? "dark" : "light") : (darkMode ? "vs-dark" : "vs");
      monacoRef.current.editor.setTheme(theme);
    }
  }, [darkMode]);

  useEffect(() => {
    updateTheme();
  }, [darkMode, updateTheme]);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (vimModeRef.current) {
        vimModeRef.current.dispose();
      }
    };
  }, []);

  const initializeVimMode = (editor: Monaco.editor.IStandaloneCodeEditor) => {
    if (!window.require) {
      console.error("AMD loader not found");
      return;
    }

    try {
      window.require.config({
        paths: {
          "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim"
        }
      });

      window.require(["monaco-vim"], function(monacoVim: MonacoVim) {
        if (statusNodeRef.current && !vimModeRef.current) {
          vimModeRef.current = monacoVim.initVimMode(editor, statusNodeRef.current);
        }
      });
    } catch (error) {
      console.error("Failed to initialize Vim mode:", error);
    }
  };

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    await loadThemes(monaco);
    updateTheme();

    editor.focus();
    initializeVimMode(editor);
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