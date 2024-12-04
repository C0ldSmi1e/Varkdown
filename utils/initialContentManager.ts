import localStorageHandler from "@/lib/localStorageHandler";

const INITIAL_CONTENT = `# Varkdown

[Varkdown](https://www.varkdown.com) is an editor for **Markdown** and **LaTeX**, with **Vim** bindings.

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

This is a [link](https://github.com/Daniel777y/Varkdown) to the repository of Varkdown.

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

This is \`inline code\`.
`;

const initialContentManager = {
  getInitialContent: () => {
    const content = localStorageHandler.getItem("content");
    console.log(content);
    return content ? content : INITIAL_CONTENT;
  },
  setInitialContent: (content: string) => {
    localStorageHandler.setItem("content", content);
  },
};

export default initialContentManager;
