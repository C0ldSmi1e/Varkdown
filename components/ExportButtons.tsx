import React from "react";
import { FileText } from "lucide-react";
import { saveAs } from "file-saver";

interface ExportButtonsProps {
  content: string;
  darkMode: boolean;
}

const ExportButtons = ({ content, darkMode }: ExportButtonsProps) => {
  const handleMarkdownExport = () => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, `${new Date().toISOString()}.md`);
  };

  return (
    <div className="fixed bottom-16 right-10 flex flex-col gap-2">
      <button
        onClick={handleMarkdownExport}
        className={`
            p-2 bg-white dark:bg-solarized-base0 rounded-full shadow-lg
            hover:bg-solarized-base2 dark:hover:bg-solarized-base01
            transition-colors duration-200
        `}
        title="Export as Markdown"
      >
        <FileText className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ExportButtons;