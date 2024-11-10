import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "JamPlan",
  description: "Plan. Meet. Jam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <div className="p-3 m--3">
          {children}
        </div>
      </body>
    </html>
  );
}
