"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    label: "Wedding Feast",
    caption: "Wedding Catering — Mysuru, 2024",
    gradient: "from-saffron to-amber-500",
    height: "h-64 md:h-80",
  },
  {
    label: "Birthday Celebration",
    caption: "Birthday Party — Bengaluru, 2024",
    gradient: "from-pink-400 to-rose-500",
    height: "h-48 md:h-64",
  },
  {
    label: "Corporate Lunch",
    caption: "Corporate Event — Bengaluru, 2024",
    gradient: "from-blue-400 to-indigo-500",
    height: "h-56 md:h-72",
  },
  {
    label: "Traditional Thali",
    caption: "Festival Catering — Mangaluru, 2024",
    gradient: "from-emerald-400 to-teal-500",
    height: "h-48 md:h-64",
  },
  {
    label: "South Indian Spread",
    caption: "Engagement Lunch — Hubballi, 2024",
    gradient: "from-saffron-dark to-maroon",
    height: "h-64 md:h-80",
  },
  {
    label: "Dessert Station",
    caption: "Wedding Desserts — Mysuru, 2024",
    gradient: "from-purple-400 to-pink-500",
    height: "h-48 md:h-56",
  },
  {
    label: "Live Dosa Counter",
    caption: "Housewarming — Tumakuru, 2024",
    gradient: "from-amber-400 to-orange-500",
    height: "h-56 md:h-72",
  },
  {
    label: "Biryani Station",
    caption: "Wedding Dinner — Belagavi, 2024",
    gradient: "from-red-400 to-rose-600",
    height: "h-48 md:h-64",
  },
  {
    label: "Breakfast Buffet",
    caption: "Corporate Breakfast — Bengaluru, 2024",
    gradient: "from-yellow-300 to-amber-400",
    height: "h-64 md:h-80",
  },
  {
    label: "Outdoor Setup",
    caption: "Garden Party — Mysuru, 2024",
    gradient: "from-lime-400 to-green-500",
    height: "h-48 md:h-56",
  },
  {
    label: "North Indian Spread",
    caption: "Anniversary Dinner — Shivamogga, 2024",
    gradient: "from-orange-400 to-red-500",
    height: "h-56 md:h-72",
  },
  {
    label: "Grand Buffet",
    caption: "Wedding Reception — Davangere, 2024",
    gradient: "from-maroon to-maroon-dark",
    height: "h-64 md:h-80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function GalleryContent() {
  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon-dark to-maroon" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-saffron blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A glimpse of the celebrations we&apos;ve been part of
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="break-inside-avoid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <div
                  className={`${item.height} bg-gradient-to-br ${item.gradient} rounded-2xl overflow-hidden relative group cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-heading font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-sm font-medium">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center mt-12 text-dark-light/60 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real photos coming soon. Contact us to see our past work.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
