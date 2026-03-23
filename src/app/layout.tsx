import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Swaada Caterings & Services | Every Occasion, Perfectly Served",
    template: "%s | Swaada Caterings & Services",
  },
  description:
    "Premium catering services across Karnataka. From weddings to corporate events, Swaada Caterings delivers exquisite Indian cuisine for 100+ guests. Book now!",
  keywords: [
    "catering",
    "Karnataka",
    "wedding catering",
    "Indian food",
    "Bengaluru catering",
    "event catering",
    "Swaada",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Swaada Caterings & Services",
    title: "Swaada Caterings & Services | Every Occasion, Perfectly Served",
    description:
      "Premium catering services across Karnataka for weddings, birthdays, corporate events and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-cream text-dark font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
