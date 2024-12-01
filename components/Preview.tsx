import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";
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
        code(props) {
          const {
            children,
            className,
            node,
            ...rest
          } = props as SyntaxHighlighterProps;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={darkMode ? dracula : a11yDark}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Preview;