import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "./_components/CustomCursor";
import { Preloader } from "./_components/Preloader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atelier Zenith",
  description: "Estudio creativo — elevando la estética.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Preloader />
        <CustomCursor />
        <Navbar />
        {children}
        {/* Matte-paper grain over everything; purely decorative. */}
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.035]" />
      </body>
    </html>
  );
}
