"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Moon, Sun } from "lucide-react";

const INITIAL_CONTENT = `
# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://placehold.co/600x400/EEE/31343C)

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

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

\${djfaks}


asdfsadf
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
    <main className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
        <Editor value={content} onChange={setContent} darkMode={darkMode} />
      </div>
      <div className="w-full md:w-1/2 p-4 overflow-y-auto max-h-screen">
        <Preview content={content} />
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-8 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </main>
  );
}

