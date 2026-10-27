import type { Metadata } from "next";
import "./globals.css";
import "./inner.css";
import "./inner2.css";
import "./inner3.css";

export const metadata: Metadata = {
  title: "SHOILY - Your Reliable Style Partner",
  description: "Shoily - premium t-shirts, 100% combed cotton, 240+ GSM.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Exact fonts read from the demo store's own CSS variables (2026-10-24):
            body = Bricolage Grotesque, headings = Quicksand (600), accent script = Protest Riot */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Quicksand:wght@500;600;700&family=Protest+Riot&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
