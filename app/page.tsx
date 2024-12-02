"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ExportButtons from "@/components/ExportButtons";
import ModeSwitcher from "@/components/ModeSwitcher";

const INITIAL_CONTENT = `
# Varkdown

Varkdown is an editor for **Markdown** and **LaTeX**, with **Vim** bindings.

## Markdown

[Repository](https://github.com/Daniel777y/Varkdown)

## LaTeX

Single line: $a^2 + b^2 = c^2$

Multi-line:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
`;

export default function EditorPage() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-solarized-base3 dark:bg-solarized-base03 overflow-hidden">
      <div className="w-full md:w-1/2 py-4 border-b md:border-b-0 md:border-r border-solarized-base2 dark:border-solarized-base02">
        <Editor value={content} onChange={setContent} darkMode={darkMode} />
      </div>
      <div className="w-full md:w-1/2 py-4 overflow-y-auto max-h-screen">
        <Preview content={content} darkMode={darkMode} />
      </div>
      <ExportButtons content={content} darkMode={darkMode} />
      <ModeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}