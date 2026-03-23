"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const categories = [
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
    ],
  },
  {
    name: "Rice & Breads",
    emoji: "🍱",
    items: [
      { name: "Steamed Rice", price: "₹25/plate" },
      { name: "Jeera Rice", price: "₹35/plate" },
      { name: "Biryani", price: "₹90/plate" },
      { name: "Roti (3 pcs)", price: "₹30/plate" },
      { name: "Butter Naan (2 pcs)", price: "₹40/plate" },
      { name: "Poori (3 pcs)", price: "₹45/plate" },
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
      { name: "Chicken Curry", price: "₹85/plate" },
      { name: "Mutton Curry", price: "₹120/plate" },
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
    ],
  },
  {
    name: "Starters",
    emoji: "🍢",
    items: [
      { name: "Gobi 65", price: "₹55/plate" },
      { name: "Paneer Tikka", price: "₹70/plate" },
      { name: "Veg Spring Rolls", price: "₹50/plate" },
      { name: "Chicken 65", price: "₹80/plate" },
      { name: "Veg Soup", price: "₹30/plate" },
    ],
  },
  {
    name: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun", price: "₹30/plate" },
      { name: "Halwa", price: "₹25/plate" },
      { name: "Payasam", price: "₹30/plate" },
      { name: "Ice Cream", price: "₹45/plate" },
      { name: "Rasgulla", price: "₹30/plate" },
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
      { name: "Milkshake", price: "₹50/serving" },
    ],
  },
];

export default function MenuContent() {
  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron via-saffron-dark to-maroon" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            className="text-lg text-white/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From traditional Karnataka cuisine to North Indian favorites — fresh, flavorful, and made with love.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/book"
              className="inline-flex px-8 py-3 bg-white text-maroon font-semibold rounded-full hover:bg-saffron-light transition-all shadow-lg"
            >
              Customize Your Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  {cat.name}
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    variants={fadeUp}
                    custom={ii + 1}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-saffron/10 hover:border-saffron/30 hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-dark">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold text-saffron whitespace-nowrap ml-3">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
              {ci < categories.length - 1 && (
                <div className="mt-10 border-b border-saffron/10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-maroon">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Want a Custom Menu?
          </h2>
          <p className="text-white/70 mb-6">
            Mix and match any items from our menu, add special requests, and
            we&apos;ll create the perfect spread for your event.
          </p>
          <Link
            href="/book"
            className="inline-flex px-8 py-3 bg-saffron text-white font-semibold rounded-full hover:bg-saffron-dark transition-all shadow-lg"
          >
            Start Building Your Menu →
          </Link>
        </div>
      </section>
    </div>
  );
}
