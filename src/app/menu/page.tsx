import type { Metadata } from "next";
import MenuContent from "@/app/menu/MenuContent";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Explore our wide range of Indian dishes — from traditional Karnataka cuisine to North Indian favorites. Customize your catering menu with Swaada.",
};

export default function MenuPage() {
  return <MenuContent />;
}
