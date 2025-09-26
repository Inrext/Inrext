import "./globals.css";
import React from "react";
import { ThemeProvider } from "./content/ThemeContext";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./whatsappbutton/page";

export const metadata = {
  title: "Inrext",
  description: "Real Estate Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=DM+Serif+Display:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Italianno&display=swap"
          rel="stylesheet"
        />
        {/* Head is now empty; fonts and favicon are in _document.js */}
      </head>
      <body className="antialiased bg-blue-50 min-h-screen">
        <ThemeProvider>
          {/* Navbar and Footer must be client components */}
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}