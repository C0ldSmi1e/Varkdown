"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ExportButtons from "@/components/ExportButtons";
import ModeSwitcher from "@/components/ModeSwitcher";
import initialContentManager from "@/utils/initialContentManager";

export default function EditorPage() {
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const initialContent = initialContentManager.getInitialContent();
    setContent(initialContent);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initialContentManager.setInitialContent(content);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const onContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <main className="flex flex-col md:flex-row h-screen max-h-screen bg-solarized-base3 dark:bg-solarized-base03 overflow-hidden">
      <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r border-solarized-base2 dark:border-solarized-base02 overflow-hidden">
        <Editor value={content} onContentChange={onContentChange} darkMode={darkMode} />
      </div>
      <div className="w-full md:w-1/2 h-full overflow-hidden">
        <Preview content={content} darkMode={darkMode} />
      </div>
      <ExportButtons content={content} darkMode={darkMode} />
      <ModeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}

