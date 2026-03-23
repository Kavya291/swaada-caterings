import type { Metadata } from "next";
import BookingWizard from "@/app/book/BookingWizard";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book your catering with Swaada in just a few steps. Choose your location, menu, and guest count — get an instant estimate!",
};

export default function BookPage() {
  return <BookingWizard />;
}
