import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark, dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";

interface PreviewProps {
  content: string;
  darkMode: boolean;
}

const Preview: React.FC<PreviewProps> = ({ content, darkMode }) => {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert"
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={darkMode ? dracula : a11yDark}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Preview;