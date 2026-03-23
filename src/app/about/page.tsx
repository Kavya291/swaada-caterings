import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Swaada Caterings & Services — our Karnataka roots, commitment to quality food, and the team behind every perfect event.",
};

export default function AboutPage() {
  return <AboutContent />;
}
