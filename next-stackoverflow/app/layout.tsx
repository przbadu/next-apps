import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ThemeProvider, useTheme } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevFlow- Where Developers Learn, Share and Build Carrer",
  description:
    "A community driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-graident hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>
            <h1 className="h1-bold">This is a heading text</h1>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
