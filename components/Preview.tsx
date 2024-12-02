import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { oneDark, twilight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";

interface PreviewProps {
  content: string;
  darkMode: boolean;
}

const Preview: React.FC<PreviewProps> = ({ content, darkMode }) => {
  return (
    <div className="preview-container overflow-auto h-full font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        className="prose max-w-none dark:prose-invert"
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
                style={darkMode ? oneDark : twilight}
                customStyle={{
                  padding: "1rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  fontFamily: "\"Fira Code\", monospace",
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;

