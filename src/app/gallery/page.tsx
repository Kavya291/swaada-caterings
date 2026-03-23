import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See our past catering events — weddings, birthdays, corporate functions, and more across Karnataka.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
