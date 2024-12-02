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
    // get timestamp (month/day/year hour:minute:second)
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    saveAs(blob, `${timestamp}.md`);
  };

  return (
    <div className="fixed bottom-16 right-6 flex flex-col gap-2">
      <button
        onClick={handleMarkdownExport}
        className={`
            p-2 bg-white dark:bg-solarized-base0 rounded-full shadow-lg
            hover:bg-solarized-base2 dark:hover:bg-solarized-base01
            text-black dark:text-white
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