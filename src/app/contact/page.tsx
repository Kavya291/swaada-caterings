import type { Metadata } from "next";
import ContactContent from "@/app/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Swaada Caterings & Services. Call, WhatsApp, or fill out our form — we respond within 30 minutes!",
};

export default function ContactPage() {
  return <ContactContent />;
}
