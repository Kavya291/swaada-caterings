"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Sparkles, ChefHat, Heart } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const values = [
  {
    icon: Award,
    title: "Quality Ingredients",
    desc: "We source only the freshest vegetables, spices, and premium ingredients from trusted local suppliers across Karnataka.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Our culinary experts bring decades of expertise, specializing in both traditional Karnataka cuisine and pan-Indian flavors.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "We know timing is everything at events. Our logistics team ensures hot, fresh food arrives exactly when you need it.",
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron to-maroon" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Swaada
          </motion.h1>
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Swaada Caterings & Services: Every Occasion, Perfectly Served
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              className="text-saffron font-semibold text-sm uppercase tracking-wider"
              variants={fadeUp}
              custom={0}
            >
              Our Story
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-6"
              variants={fadeUp}
              custom={1}
            >
              Rooted in Karnataka, Serving with Love
            </motion.h2>
            <motion.p
              className="text-dark-light/70 leading-relaxed mb-4"
              variants={fadeUp}
              custom={2}
            >
              Swaada Caterings & Services was born from a simple belief: every celebration 
              deserves food that&apos;s made with heart. Rooted in the heart of Karnataka, 
              we work with a passion for authentic Indian cuisine and a commitment to making 
              every event truly special. From the aroma of freshly ground spices to the warmth 
              of home-cooked flavors, every dish we prepare tells a story of tradition and love.
            </motion.p>
            <motion.p
              className="text-dark-light/70 leading-relaxed"
              variants={fadeUp}
              custom={3}
            >
              Today, we proudly serve all over Karnataka — from intimate family 
              gatherings of 100 guests to grand celebrations of 2000+. Our team of experienced 
              chefs, trained service staff, and dedicated event coordinators work together to 
              ensure every meal is a memorable experience. Whether it&apos;s a traditional 
              Karnataka wedding feast or a contemporary corporate gala, Swaada brings the 
              perfect blend of flavor, presentation, and service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                custom={i + 1}
                className="p-6 rounded-2xl bg-cream-warm border border-saffron/10 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-saffron/10 flex items-center justify-center mb-4">
                  <v.icon className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-dark-light/70 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Team */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center p-8 md:p-12 rounded-3xl bg-cream-warm border border-saffron/10 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-saffron font-semibold text-sm uppercase tracking-wider">
              Executive Team
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-6">
              Team Swaada
            </h2>
            <p className="text-lg text-dark-light leading-relaxed mb-8">
              Our strength lies in our collaborative spirit. From our master chefs to our 
              diligent service staff, every member of Team Swaada is committed to culinary 
              excellence and hospitality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <p className="text-sm text-dark-light/50 uppercase tracking-widest mb-1">Contact One</p>
                <a href="tel:8105758067" className="text-2xl font-bold text-maroon hover:text-saffron transition-colors">
                  8105758067
                </a>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block" />
              <div className="text-center">
                <p className="text-sm text-dark-light/50 uppercase tracking-widest mb-1">Contact Two</p>
                <a href="tel:7892861158" className="text-2xl font-bold text-maroon hover:text-saffron transition-colors">
                  7892861158
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-saffron to-maroon">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-white/80 mb-6">
            Let us handle the food while you enjoy the celebration.
          </p>
          <Link
            href="/book"
            className="inline-flex px-8 py-3 bg-white text-maroon font-semibold rounded-full hover:bg-saffron-light transition-all shadow-lg"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  );
}
