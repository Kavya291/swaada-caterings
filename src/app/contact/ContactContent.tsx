"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon to-maroon-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-saffron blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We&apos;d love to hear from you! Get a quote within 30 minutes.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                    <Check size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-dark-light/70">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setContactForm({ name: "", phone: "", message: "" });
                    }}
                    className="mt-4 text-saffron font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-dark mb-6">
                    Send us a message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-100 rounded-l-xl text-sm text-dark-light">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                            })
                          }
                          placeholder="Your phone number"
                          className="w-full px-4 py-3 rounded-r-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                        placeholder="Tell us about your event or question..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-saffron text-white font-semibold rounded-xl hover:bg-saffron-dark transition-all shadow-md"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                variants={fadeUp}
                custom={1}
                className="bg-white rounded-2xl p-6 shadow-sm border border-saffron/10"
              >
                <h3 className="text-lg font-heading font-bold text-dark mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="space-y-4 p-3 rounded-xl bg-saffron/5">
                    <p className="text-xs text-dark-light/60">Call us</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+918105758067"
                        className="flex items-center gap-3 text-sm font-semibold text-dark hover:text-saffron transition-colors"
                      >
                        <Phone size={14} className="text-saffron" />
                        8105758067
                      </a>
                      <a
                        href="tel:+917892861158"
                        className="flex items-center gap-3 text-sm font-semibold text-dark hover:text-saffron transition-colors"
                      >
                        <Phone size={14} className="text-saffron" />
                        7892861158
                      </a>
                    </div>
                  </div>
                  <a
                    href="mailto:hello.swaadacaterings@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-saffron/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-light/60">Email us</p>
                      <p className="text-sm font-semibold text-dark">
                        hello.swaadacaterings@gmail.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-light/60">We serve</p>
                      <p className="text-sm font-semibold text-dark">
                        All 30 districts of Karnataka
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/918105758067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-whatsapp text-white font-semibold rounded-xl hover:bg-whatsapp/90 transition-all"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-saffron/10"
              >
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">
                      Google Maps
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Serving all across Karnataka
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
