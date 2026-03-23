"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Clock,
  UtensilsCrossed,
  Heart,
  Building2,
  Home,
  PartyPopper,
  Sparkles,
  Star,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── HERO ───────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron via-saffron-dark to-maroon" />
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-maroon/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            🍽️ Premium Catering Across Karnataka
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Swaada Caterings
          <br />
          <span className="text-saffron-light">&amp; Services</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Every Occasion, Perfectly Served
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/book"
            className="px-8 py-4 bg-white text-maroon font-bold rounded-full text-lg hover:bg-saffron-light hover:scale-105 transition-all shadow-xl"
          >
            Book Now →
          </Link>
          <Link
            href="/menu"
            className="px-8 py-4 border-2 border-white/40 text-white font-medium rounded-full text-lg hover:bg-white/10 transition-all"
          >
            View Our Menu
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── WHY SWAADA ─────────────────────────────────────
const features = [
  {
    icon: ShieldCheck,
    title: "Hygienic Cooking",
    desc: "Clean, fresh ingredients prepared in sanitized kitchens by trained staff.",
  },
  {
    icon: Users,
    title: "100+ Guests Served",
    desc: "From intimate gatherings to grand celebrations — we scale effortlessly.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Your event starts on schedule. Punctuality is our promise.",
  },
  {
    icon: UtensilsCrossed,
    title: "Custom Menus",
    desc: "Tailor every dish to match your taste, budget, and dietary needs.",
  },
];

function WhySwaada() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2">
            Why Swaada?
          </h2>
          <p className="text-dark-light/70 mt-3 max-w-xl mx-auto">
            We bring passion, precision, and the finest flavors to every plate
            we serve.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="group p-6 rounded-2xl bg-cream-warm border border-saffron/10 hover:border-saffron/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-saffron/10 flex items-center justify-center mb-4 group-hover:bg-saffron/20 transition-colors">
                <f.icon className="w-7 h-7 text-saffron" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-dark mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-dark-light/70 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── OCCASIONS ──────────────────────────────────────
const occasions = [
  { icon: Heart, label: "Wedding", emoji: "💍" },
  { icon: PartyPopper, label: "Birthday", emoji: "🎂" },
  { icon: Building2, label: "Corporate", emoji: "🏢" },
  { icon: Home, label: "Housewarming", emoji: "🏠" },
  { icon: Sparkles, label: "Festival", emoji: "🎉" },
];

function Occasions() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Every Celebration
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2">
            We Cater for Every Occasion
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {occasions.map((o, i) => (
            <motion.div
              key={o.label}
              variants={fadeUp}
              custom={i}
              className="group flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-white border border-saffron/10 hover:border-saffron hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform">
                {o.emoji}
              </span>
              <span className="text-sm md:text-base font-semibold text-dark group-hover:text-saffron transition-colors">
                {o.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PACKAGES ──────────────────────────────────────
const packages = [
  {
    name: "Lite Breakfast",
    meal: "Breakfast",
    price: "₹130",
    emoji: "☕",
    gradient: "from-amber-400 to-orange-500",
    items: [
      "Idli (2), Vada (1)",
      "Sambar & Chutney",
      "Filter Coffee",
      "Hot & Fresh",
    ],
  },
  {
    name: "Grand Feast",
    meal: "Lunch",
    price: "₹360",
    emoji: "🍱",
    gradient: "from-saffron to-saffron-dark",
    items: [
      "Rice & Roti",
      "Paneer & Veg Curry",
      "Dal Tadka",
      "Sambar, Rasam, Curd",
    ],
    popular: true,
  },
  {
    name: "Royal Gala",
    meal: "Dinner",
    price: "₹680",
    emoji: "👑",
    gradient: "from-maroon to-maroon-dark",
    items: [
      "2 Starters & Soup",
      "Assorted Breads",
      "Premium Paneer & Veg",
      "Biryani & Desserts",
    ],
  },
];

function Packages() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Our Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2">
            Standard Meal Plans
          </h2>
          <p className="text-dark-light/70 mt-3 max-w-xl mx-auto">
            Choose from our curated packages or build your own custom menu.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.meal}
              variants={fadeUp}
              custom={i}
              className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                pkg.popular
                  ? "border-saffron shadow-lg scale-[1.02]"
                  : "border-gray-100 hover:border-saffron/30"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-saffron text-white text-xs font-bold rounded-full z-10">
                  Popular
                </div>
              )}
              <div
                className={`p-6 bg-gradient-to-br ${pkg.gradient} text-white`}
              >
                <span className="text-3xl">{pkg.emoji}</span>
                <h3 className="text-xl font-heading font-bold mt-2">
                  {pkg.name}
                </h3>
                <p className="text-white/80 text-sm">{pkg.meal}</p>
                <div className="mt-3">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-white/70 text-sm"> / plate</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-2.5 mb-6">
                  {pkg.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-dark-light"
                    >
                      <span className="text-saffron mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-saffron/10 text-saffron font-semibold hover:bg-saffron hover:text-white transition-all"
                >
                  Explore
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    review:
      "Swaada catered our daughter's wedding for 800 guests. The food was absolutely divine — every guest complimented the paneer dishes and the desserts. Truly outstanding service!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Mysuru",
    review:
      "We've used Swaada for three corporate events now. They're always on time, the food quality is consistent, and they handle everything so professionally. Highly recommend!",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    location: "Mangaluru",
    review:
      "Our housewarming function was made so special because of the incredible food by Swaada. The traditional Karnataka thali was cooked perfectly. Will definitely use them again!",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-cream-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              className="p-6 rounded-2xl bg-white border border-saffron/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className="fill-saffron text-saffron"
                  />
                ))}
              </div>
              <p className="text-dark-light/80 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-maroon flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">{t.name}</p>
                  <p className="text-xs text-dark-light/60">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ─────────────────────────────────────
function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-maroon to-maroon-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-saffron blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-saffron blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
            variants={fadeUp}
            custom={0}
          >
            Planning an Event?
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-10"
            variants={fadeUp}
            custom={1}
          >
            Get a Quote in <span className="text-saffron font-bold">30 Minutes</span>
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            custom={2}
          >
            <a
              href="https://wa.me/918105758067"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-whatsapp text-white font-bold rounded-full text-lg hover:bg-whatsapp/90 hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle size={22} />
              WhatsApp Us
            </a>
            <Link
              href="/book"
              className="px-8 py-4 bg-saffron text-white font-bold rounded-full text-lg hover:bg-saffron-dark hover:scale-105 transition-all shadow-xl"
            >
              Book Now →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ──────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySwaada />
      <Occasions />
      <Packages />
      <Testimonials />
      <CTABanner />
    </>
  );
}
