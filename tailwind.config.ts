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
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.blue.600"),
            "--tw-prose-bold": theme("colors.gray.900"),
            "--tw-prose-counters": theme("colors.gray.500"),
            "--tw-prose-bullets": theme("colors.gray.300"),
            "--tw-prose-hr": theme("colors.gray.200"),
            "--tw-prose-quotes": theme("colors.gray.900"),
            "--tw-prose-quote-borders": theme("colors.gray.200"),
            "--tw-prose-captions": theme("colors.gray.500"),
            "--tw-prose-code": theme("colors.gray.900"),
            "--tw-prose-pre-code": theme("colors.gray.100"),
            "--tw-prose-pre-bg": theme("colors.gray.900"),
            "--tw-prose-th-borders": theme("colors.gray.300"),
            "--tw-prose-td-borders": theme("colors.gray.200"),
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.gray.100"),
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-bold": theme("colors.gray.100"),
            "--tw-prose-counters": theme("colors.gray.400"),
            "--tw-prose-bullets": theme("colors.gray.600"),
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quotes": theme("colors.gray.100"),
            "--tw-prose-quote-borders": theme("colors.gray.700"),
            "--tw-prose-captions": theme("colors.gray.400"),
            "--tw-prose-code": theme("colors.gray.100"),
            "--tw-prose-pre-code": theme("colors.gray.300"),
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.600"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

