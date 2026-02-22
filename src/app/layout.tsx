import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TimezoneProvider } from "@/contexts/TimezoneContext";
import { DataRefreshProvider } from "@/contexts/DataRefreshContext";

export const metadata: Metadata = {
  title: "World Conflict — Global Conflicts & Geopolitical Monitor",
  description: "Real-time global monitoring of armed conflicts, terrorism, political crises, sanctions and displacement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <DataRefreshProvider>
          <TimezoneProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </TimezoneProvider>
        </DataRefreshProvider>
      </body>
    </html>
  );
}
