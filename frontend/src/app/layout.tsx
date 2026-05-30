import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real-Time Issue Tracker",
  description: "Operational issue tracking dashboard with event-driven backend services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-black">
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-sapphire-950">
          {children}
        </div>
      </body>
    </html>
  );
}
