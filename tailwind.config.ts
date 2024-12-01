import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["\"Fira Code\"", "monospace"],
      },
      colors: {
        solarized: {
          base03: "#002b36",
          base02: "#073642",
          base01: "#586e75",
          base00: "#657b83",
          base0: "#839496",
          base1: "#93a1a1",
          base2: "#eee8d5",
          base3: "#fdf6e3",
          yellow: "#b58900",
          orange: "#cb4b16",
          red: "#dc322f",
          magenta: "#d33682",
          violet: "#6c71c4",
          blue: "#268bd2",
          cyan: "#2aa198",
          green: "#859900",
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.solarized.base00"),
            "--tw-prose-headings": theme("colors.solarized.base01"),
            "--tw-prose-links": theme("colors.solarized.blue"),
            "--tw-prose-bold": theme("colors.solarized.base01"),
            "--tw-prose-counters": theme("colors.solarized.base1"),
            "--tw-prose-bullets": theme("colors.solarized.base1"),
            "--tw-prose-hr": theme("colors.solarized.base2"),
            "--tw-prose-quotes": theme("colors.solarized.base01"),
            "--tw-prose-quote-borders": theme("colors.solarized.base2"),
            "--tw-prose-captions": theme("colors.solarized.base1"),
            "--tw-prose-code": theme("colors.solarized.base01"),
            "--tw-prose-pre-code": theme("colors.solarized.base0"),
            "--tw-prose-pre-bg": theme("colors.solarized.base03"),
            "--tw-prose-th-borders": theme("colors.solarized.base2"),
            "--tw-prose-td-borders": theme("colors.solarized.base2"),
            fontSize: "1.2rem",
            lineHeight: "1.75",
            fontFamily: theme("fontFamily.sans"),
            "code, pre": {
              fontFamily: theme("fontFamily.mono"),
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.solarized.base0"),
            "--tw-prose-headings": theme("colors.solarized.base1"),
            "--tw-prose-links": theme("colors.solarized.blue"),
            "--tw-prose-bold": theme("colors.solarized.base1"),
            "--tw-prose-counters": theme("colors.solarized.base00"),
            "--tw-prose-bullets": theme("colors.solarized.base00"),
            "--tw-prose-hr": theme("colors.solarized.base02"),
            "--tw-prose-quotes": theme("colors.solarized.base1"),
            "--tw-prose-quote-borders": theme("colors.solarized.base02"),
            "--tw-prose-captions": theme("colors.solarized.base00"),
            "--tw-prose-code": theme("colors.solarized.base1"),
            "--tw-prose-pre-code": theme("colors.solarized.base0"),
            "--tw-prose-pre-bg": theme("colors.solarized.base03"),
            "--tw-prose-th-borders": theme("colors.solarized.base02"),
            "--tw-prose-td-borders": theme("colors.solarized.base02"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

