import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { siteConfig } from "@/data/site";
import { CartProvider } from "@/providers/cart-provider";

const headingFont = localFont({
  src: "../../public/fonts/jualsale/jualsale.ttf",
  variable: "--font-heading",
});

const bodyFont = localFont({
  src: "../../public/fonts/rushon-ground/Rushon Ground.ttf",
  variable: "--font-body",
});

const accentFont = localFont({
  src: "../../public/fonts/super-kidpop/Super Kidpop.ttf",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dejatuhuella.local"),
  title: {
    default: `${siteConfig.name} | Ropa urbana y sneakers`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${headingFont.variable} ${bodyFont.variable} ${accentFont.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
