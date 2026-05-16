"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, ChevronUp, Phone, MessageCircle, X } from "lucide-react";
import { menuCards, MenuCard } from "@/lib/menuData";
import { generateMenuPDF } from "@/lib/generateMenuPDF";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

// ── Menu Card Component ──────────────────────────────
function MenuCardTile({ card, index }: { card: MenuCard; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      generateMenuPDF(card);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setTimeout(() => setDownloading(false), 1500);
    }
  };

  // Color map for gradient backgrounds
  const gradientMap: Record<string, string> = {
    andhra: "from-red-700 to-orange-600",
    birthday: "from-purple-700 to-pink-600",
    brahmin: "from-green-700 to-teal-600",
    breakfast: "from-amber-600 to-yellow-500",
    karnataka: "from-yellow-600 to-amber-500",
    marriage: "from-red-800 to-rose-600",
    "north-south": "from-blue-700 to-indigo-600",
    "north-indian": "from-orange-700 to-red-600",
    seemantham: "from-teal-700 to-green-600",
    "full-contract": "from-maroon to-red-900",
  };

  const gradient = gradientMap[card.id] || "from-saffron to-maroon";

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* Card Header */}
      <div className={`relative bg-gradient-to-br ${gradient} p-6 text-white`}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 translate-y-6 -translate-x-6" />

        {/* Brand badge */}
        <div className="relative z-10 flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
              {card.emoji}
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium">Swaada Caterings</p>
              <p className="text-white/50 text-xs">Every Occasion, Perfectly Served</p>
            </div>
          </div>
          <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            {card.menus.length} {card.menus.length === 1 ? "Menu" : "Menus"}
          </span>
        </div>

        <h3 className="relative z-10 text-xl font-bold mb-1">{card.title}</h3>
        <p className="relative z-10 text-white/80 text-sm leading-relaxed">{card.description}</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Quick preview of first menu items */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-dark-light/50 uppercase tracking-wider mb-2">
            Highlights
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.menus[0].items.slice(0, 4).map((item, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-saffron/10 text-saffron-dark rounded-full"
              >
                {item.split("/")[0].trim().split(":")[0].trim()}
              </span>
            ))}
            {card.menus[0].items.length > 4 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                +{card.menus[0].items.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${downloading
              ? "bg-green-100 text-green-600"
              : "bg-saffron text-white hover:bg-saffron-dark shadow-md hover:shadow-lg"
              }`}
          >
            <Download size={15} />
            {downloading ? "Generating PDF..." : "Open / Download PDF"}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-2.5 rounded-xl border-2 border-saffron/20 text-saffron hover:bg-saffron/10 transition-all"
            title="View menu details"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Menu Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-saffron/10"
          >
            <div className="p-4 space-y-4 bg-cream-warm">
              {card.menus.map((menu, mi) => (
                <div key={mi}>
                  <h4 className="text-sm font-bold text-maroon mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold">
                      {mi + 1}
                    </span>
                    {menu.name}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {menu.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-1.5 text-xs text-dark-light/80">
                        <span className="text-saffron mt-0.5 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {mi < card.menus.length - 1 && (
                    <div className="mt-3 border-b border-saffron/10" />
                  )}
                </div>
              ))}

              {/* Includes */}
              <div className="pt-2 border-t border-saffron/10">
                <p className="text-xs font-bold text-maroon mb-2">✅ What We Provide</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {card.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-dark-light/80">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Item-level Menu Browser ──────────────────────────
const itemCategories = [
  {
    name: "Breakfast Items",
    emoji: "🥣",
    items: [
      { name: "Idli", price: "₹20/plate" },
      { name: "Vada", price: "₹25/plate" },
      { name: "Masala Dosa", price: "₹35/plate" },
      { name: "Upma", price: "₹20/plate" },
      { name: "Poha", price: "₹18/plate" },
      { name: "Puri Bhaji", price: "₹30/plate" },
      { name: "Kesari Bath", price: "₹20/plate" },
      { name: "Khara Bath", price: "₹20/plate" },
    ],
  },
  {
    name: "Rice & Breads",
    emoji: "🍱",
    items: [
      { name: "Steamed Rice", price: "₹25/plate" },
      { name: "Jeera Rice", price: "₹35/plate" },
      { name: "Veg Biryani", price: "₹90/plate" },
      { name: "Roti (3 pcs)", price: "₹30/plate" },
      { name: "Butter Naan", price: "₹45/pc" },
      { name: "Poori", price: "₹15/pc" },
      { name: "Ghee Rice", price: "₹45/plate" },
      { name: "Bisibelebath", price: "₹45/plate" },
    ],
  },
  {
    name: "Curries & Gravies",
    emoji: "🍛",
    items: [
      { name: "Dal Tadka", price: "₹40/plate" },
      { name: "Dal Makhani", price: "₹55/plate" },
      { name: "Paneer Butter Masala", price: "₹70/plate" },
      { name: "Palak Paneer", price: "₹65/plate" },
      { name: "Mix Veg Curry", price: "₹45/plate" },
      { name: "Chole Masala", price: "₹50/plate" },
      { name: "Chicken Curry", price: "₹95/plate" },
      { name: "Mutton Curry", price: "₹160/plate" },
    ],
  },
  {
    name: "Sides",
    emoji: "🥗",
    items: [
      { name: "Sambar", price: "₹20/plate" },
      { name: "Rasam", price: "₹15/plate" },
      { name: "Curd", price: "₹15/plate" },
      { name: "Raita", price: "₹20/plate" },
      { name: "Salad", price: "₹25/plate" },
      { name: "Papad", price: "₹10/plate" },
      { name: "Pickle", price: "₹8/plate" },
      { name: "Kosambari", price: "₹20/plate" },
    ],
  },
  {
    name: "Starters",
    emoji: "🍢",
    items: [
      { name: "Gobi 65", price: "₹60/plate" },
      { name: "Paneer Tikka", price: "₹85/plate" },
      { name: "Veg Spring Rolls", price: "₹55/plate" },
      { name: "Baby Corn Manchurian", price: "₹65/plate" },
      { name: "Chicken 65", price: "₹90/plate" },
      { name: "Veg Soup", price: "₹35/plate" },
      { name: "Tomato Soup", price: "₹30/plate" },
      { name: "Mini Samosa", price: "₹40/plate" },
    ],
  },
  {
    name: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun", price: "₹35/plate" },
      { name: "Halwa", price: "₹40/plate" },
      { name: "Payasam", price: "₹35/plate" },
      { name: "Ice Cream", price: "₹45/serving" },
      { name: "Rasgulla", price: "₹35/plate" },
      { name: "Jalebi", price: "₹30/serving" },
      { name: "Mysore Pak", price: "₹40/pc" },
      { name: "Ladoo", price: "₹25/pc" },
    ],
  },
  {
    name: "Beverages",
    emoji: "🥤",
    items: [
      { name: "Filter Coffee", price: "₹20/serving" },
      { name: "Tea", price: "₹15/serving" },
      { name: "Fresh Lime Juice", price: "₹25/serving" },
      { name: "Buttermilk", price: "₹20/serving" },
      { name: "Mango Juice", price: "₹35/serving" },
      { name: "Badam Milk", price: "₹30/serving" },
      { name: "Fruit Punch", price: "₹50/serving" },
      { name: "Mineral Water", price: "₹10/bottle" },
    ],
  },
];

// ── Main Menu Content ────────────────────────────────
export default function MenuContent() {
  const [activeTab, setActiveTab] = useState<"cards" | "items">("cards");
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron via-saffron-dark to-maroon" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4 border border-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🍽️ Premium Catering Menus
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Our Premium Menu
          </motion.h1>
          <motion.p
            className="text-lg text-white/80 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From traditional Karnataka cuisine to North Indian favorites — download our menu cards or browse individual items.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/book"
              className="px-8 py-3 bg-white text-maroon font-semibold rounded-full hover:bg-saffron-light transition-all shadow-lg"
            >
              Customize Your Menu →
            </Link>
            <a
              href="https://wa.me/918105758067"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-saffron/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            <button
              onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "cards"
                ? "bg-saffron text-white shadow-md"
                : "text-dark-light hover:text-saffron hover:bg-saffron/5"
                }`}
            >
              📋 Menu Cards
              <span className="text-xs opacity-70">(Download PDF)</span>
            </button>
            <button
              onClick={() => setActiveTab("items")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "items"
                ? "bg-saffron text-white shadow-md"
                : "text-dark-light hover:text-saffron hover:bg-saffron/5"
                }`}
            >
              🍽️ Browse Items
              <span className="text-xs opacity-70">(A-la-carte)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Cards Section */}
      {activeTab === "cards" && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
                Our Premium Menu Cards
              </h2>
              <p className="text-dark-light/60 max-w-xl mx-auto">
                Click any card to preview the full menu, or download the PDF to share with your family.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {menuCards.map((card, i) => (
                <MenuCardTile key={card.id} card={card} index={i} />
              ))}
            </motion.div>

            {/* Info Banner */}
            <motion.div
              className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-saffron/10 to-maroon/10 border border-saffron/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">
                    Need a Custom Menu?
                  </h3>
                  <p className="text-dark-light/70 text-sm max-w-md">
                    Our menu cards are just a starting point. We can customize any menu to fit your tradition, budget, and dietary requirements.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a
                    href="tel:8105758067"
                    className="flex items-center gap-2 px-6 py-3 bg-maroon text-white font-semibold rounded-full hover:bg-maroon-dark transition-all shadow-md"
                  >
                    <Phone size={16} />
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/918105758067"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-whatsapp text-white font-semibold rounded-full hover:bg-whatsapp/90 transition-all shadow-md"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Browse Items Section */}
      {activeTab === "items" && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
                A-la-Carte Menu
              </h2>
              <p className="text-dark-light/60 max-w-xl mx-auto">
                Browse individual items and build your own custom menu. Prices are per plate/serving.
              </p>
            </motion.div>

            {itemCategories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: ci * 0.05 }}
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark flex items-center gap-3 mb-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-white border border-saffron/10 hover:border-saffron/30 hover:shadow-md transition-all"
                    >
                      <span className="text-sm font-medium text-dark">{item.name}</span>
                      <span className="text-sm font-bold text-saffron whitespace-nowrap ml-3">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                {ci < itemCategories.length - 1 && (
                  <div className="mt-8 border-b border-saffron/10" />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-maroon">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-white/70 mb-6">
            Mix and match any items, add special requests, and we&apos;ll create the perfect spread for your celebration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="px-8 py-3 bg-saffron text-white font-semibold rounded-full hover:bg-saffron-dark transition-all shadow-lg"
            >
              Start Building Your Menu →
            </Link>
            <a
              href="https://wa.me/918105758067"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp floating hint */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-saffron/20"
          >
            <button
              onClick={() => setShowWhatsApp(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <p className="text-sm font-semibold text-dark mb-1">Need help choosing?</p>
            <p className="text-xs text-dark-light/70 mb-3">
              Chat with us on WhatsApp and we&apos;ll help you pick the perfect menu!
            </p>
            <a
              href="https://wa.me/918105758067"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-whatsapp text-white text-sm font-semibold rounded-xl"
            >
              <MessageCircle size={16} />
              Chat Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
