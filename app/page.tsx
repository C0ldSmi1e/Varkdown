"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import ExportButtons from "@/components/ExportButtons";
import ModeSwitcher from "@/components/ModeSwitcher";

const INITIAL_CONTENT = `# Varkdown

Varkdown is an editor for **Markdown** and **LaTeX**, with **Vim** bindings.

## LaTeX

Single line: $a^2 + b^2 = c^2$

Multi-line:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Markdown

# This is a Heading h1
## This is a Heading h2
### This is a Heading h3

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 3
  * Item a
  * Item b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![Example image](https://via.placeholder.com/150)

## Links

[Repository](https://github.com/Daniel777y/Varkdown)

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.
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
    <main className="flex flex-col md:flex-row h-screen max-h-screen bg-solarized-base3 dark:bg-solarized-base03 overflow-hidden">
      <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r border-solarized-base2 dark:border-solarized-base02 overflow-hidden">
        <Editor value={content} onChange={setContent} darkMode={darkMode} />
      </div>
      <div className="w-full md:w-1/2 h-full overflow-hidden">
        <Preview content={content} darkMode={darkMode} />
      </div>
      <ExportButtons content={content} darkMode={darkMode} />
      <ModeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}

