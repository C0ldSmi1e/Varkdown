import type { Metadata } from "next";
// import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Varkdown - A Markdown + LaTeX editor with VIM",
  description: "A Markdown + LaTeX editor with VIM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" async />
      </head>
      */}
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}

