import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { MonacoVim, VimMode } from "@/types/editor";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

const EDITOR_OPTIONS: Monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 18,
  wordWrap: "off",
  wrappingStrategy: "advanced",
  lineNumbers: "on",
  renderLineHighlight: "all",
  scrollBeyondLastLine: false,
  folding: true,
  automaticLayout: true,
  tabSize: 2,
  tabCompletion: "on",
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

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    fetch("/themes/solarized-dark.json")
      .then(data => data.json())
      .then(data => {
        monaco.editor.defineTheme("dark", data);
      });

    fetch("/themes/solarized-light.json")
      .then(data => data.json())
      .then(data => {
        monaco.editor.defineTheme("light", data);
      });

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
    <div className="relative h-full">
      <Editor
        height="92vh"
        defaultLanguage="markdown"
        value={value}
        onChange={(value) => onChange(value ?? "")}
        onMount={handleEditorDidMount}
        options={{
          ...EDITOR_OPTIONS,
        }}
      />
      <div 
        ref={statusNodeRef}
        className="absolute bottom-0 left-0 p-1 text-sm"
        aria-live="polite"
      />
    </div>
  );
}