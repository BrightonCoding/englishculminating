import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "How I Learned to Be Human | Brighton Ng",
  description: "A personal artifact exploring love, loss, and healing through immigration, burnout, and connection. An AP English Culminating Project.",
  keywords: ["personal essay", "photo essay", "immigration", "healing", "love", "Brighton Ng"],
  authors: [{ name: "Brighton Ng" }],
  openGraph: {
    title: "How I Learned to Be Human",
    description: "A Personal Artifact by Brighton Ng",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
