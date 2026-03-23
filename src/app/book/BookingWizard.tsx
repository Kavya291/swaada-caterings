"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  PartyPopper,
  Users,
  UtensilsCrossed,
  ClipboardList,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────
const cities = [
  "Bengaluru",
  "Mysuru",
  "Mangaluru",
  "Hubballi",
  "Belagavi",
  "Tumakuru",
  "Shivamogga",
  "Davangere",
];

const cityEmojis: Record<string, string> = {
  Bengaluru: "🏙️",
  Mysuru: "🏰",
  Mangaluru: "🌊",
  Hubballi: "🌳",
  Belagavi: "⛰️",
  Tumakuru: "🌾",
  Shivamogga: "🌿",
  Davangere: "🏘️",
};

const karnatakaDistricts = [
  "Bagalkote",
  "Ballari",
  "Bengaluru Rural",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Raichur",
  "Ramanagara",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Yadgir",
];

const occasionList = [
  { label: "Wedding", emoji: "💍" },
  { label: "Engagement", emoji: "💍" },
  { label: "Birthday", emoji: "🎂" },
  { label: "Corporate Event", emoji: "🏢" },
  { label: "Housewarming", emoji: "🏠" },
  { label: "Anniversary", emoji: "🎉" },
  { label: "Religious Function", emoji: "🙏" },
  { label: "Graduation", emoji: "🎓" },
  { label: "Other", emoji: "📋" },
];

const standardPlans = {
  breakfast: [
    {
      id: "br-1",
      name: "Lite Breakfast",
      meal: "Breakfast",
      price: 130,
      emoji: "☕",
      items: ["Idli (2)", "Vada (1)", "Sambar & Chutney", "Filter Coffee"],
    },
    {
      id: "br-2",
      name: "Swaada Special",
      meal: "Breakfast",
      price: 180,
      emoji: "☀️",
      items: [
        "Idli & Vada",
        "Masala Dosa",
        "Kesari Bath",
        "Sambar & 2 Chutneys",
        "Filter Coffee & Tea",
      ],
    },
    {
      id: "br-3",
      name: "Royal Breakfast",
      meal: "Breakfast",
      price: 250,
      emoji: "👑",
      items: [
        "Idli, Vada, Khara Bath",
        "Mini Masala Dosa",
        "Poori Saagu",
        "Sweet Ponngal",
        "Fruit Salad",
        "Coffee, Tea & Juice",
      ],
    },
  ],
  lunch: [
    {
      id: "ln-1",
      name: "Basic Thali",
      meal: "Lunch",
      price: 260,
      emoji: "🍲",
      items: [
        "Steamed Rice",
        "Roti (2)",
        "Dal",
        "Veg Palya",
        "Curd",
        "Pickle & Papad",
      ],
    },
    {
      id: "ln-2",
      name: "Grand Feast",
      meal: "Lunch",
      price: 360,
      emoji: "🍱",
      items: [
        "Rice & Roti",
        "Paneer Veg",
        "Special Palya",
        "Dal Tadka",
        "Sambar & Rasam",
        "Curd, Pickle, Papad",
        "1 Sweet",
      ],
    },
    {
      id: "ln-3",
      name: "Maharaja Lunch",
      meal: "Lunch",
      price: 550,
      emoji: "🏰",
      items: [
        "Soup & 2 Starters",
        "Premium Rice & Pulav",
        "Butter Naan / Kulcha",
        "Paneer & Mix Veg Premium",
        "Special Dal",
        "2 Sweets & Ice Cream",
        "Beeda / Paan",
      ],
    },
  ],
  dinner: [
    {
      id: "dn-1",
      name: "Classic Dinner",
      meal: "Dinner",
      price: 320,
      emoji: "🌙",
      items: ["Fried Rice / Noodles", "Roti & Curry", "Dal", "Salad", "1 Sweet"],
    },
    {
      id: "dn-2",
      name: "Celebration Dinner",
      meal: "Dinner",
      price: 450,
      emoji: "🎉",
      items: [
        "1 Starter",
        "Jeera Rice & Dal Makhani",
        "Butter Naan & Paneer",
        "Veg Pulav",
        "Salad & Raita",
        "Ice Cream",
      ],
    },
    {
      id: "dn-3",
      name: "Royal Gala",
      meal: "Dinner",
      price: 680,
      emoji: "👑",
      items: [
        "2 Starters & Soup",
        "Assorted Breads",
        "Premium Paneer & Veg",
        "Dal Maharani",
        "Hyderabadi Biryani / Pulav",
        "Dessert Counter (3 items)",
      ],
    },
  ],
};

interface CustomItem {
  name: string;
  price: number;
  unit: string;
}

interface CustomCategory {
  name: string;
  emoji: string;
  items: CustomItem[];
}

const customCategories: CustomCategory[] = [
  {
    name: "Breakfast Items",
    emoji: "🥣",
    items: [
      { name: "Idli", price: 20, unit: "/plate" },
      { name: "Vada", price: 25, unit: "/plate" },
      { name: "Masala Dosa", price: 35, unit: "/plate" },
      { name: "Plain Dosa", price: 25, unit: "/plate" },
      { name: "Set Dosa", price: 30, unit: "/plate" },
      { name: "Rava Idli", price: 25, unit: "/plate" },
      { name: "Upma", price: 20, unit: "/plate" },
      { name: "Poha", price: 18, unit: "/plate" },
      { name: "Puri Bhaji", price: 30, unit: "/plate" },
      { name: "Khara Bath", price: 20, unit: "/plate" },
      { name: "Kesari Bath", price: 20, unit: "/plate" },
      { name: "Shavige Bath", price: 25, unit: "/plate" },
    ],
  },
  {
    name: "Rice & Breads",
    emoji: "🍱",
    items: [
      { name: "Steamed Rice", price: 25, unit: "/plate" },
      { name: "Jeera Rice", price: 35, unit: "/plate" },
      { name: "Ghee Rice", price: 45, unit: "/plate" },
      { name: "Veg Pulav", price: 50, unit: "/plate" },
      { name: "Bisibelebath", price: 45, unit: "/plate" },
      { name: "Lemon Rice", price: 30, unit: "/plate" },
      { name: "Veg Biryani", price: 90, unit: "/plate" },
      { name: "Chicken Biryani", price: 140, unit: "/plate" },
      { name: "Roti", price: 30, unit: "/plate (3 pcs)" },
      { name: "Akki Rotti", price: 40, unit: "/pc" },
      { name: "Butter Naan", price: 45, unit: "/pc" },
      { name: "Garlic Naan", price: 55, unit: "/pc" },
      { name: "Tandoori Roti", price: 35, unit: "/pc" },
      { name: "Kulcha", price: 50, unit: "/pc" },
      { name: "Poori", price: 15, unit: "/pc" },
    ],
  },
  {
    name: "Curries & Gravies",
    emoji: "🍛",
    items: [
      { name: "Dal Tadka", price: 40, unit: "/plate" },
      { name: "Dal Makhani", price: 55, unit: "/plate" },
      { name: "Paneer Butter Masala", price: 70, unit: "/plate" },
      { name: "Kadai Paneer", price: 75, unit: "/plate" },
      { name: "Palak Paneer", price: 65, unit: "/plate" },
      { name: "Mutter Paneer", price: 60, unit: "/plate" },
      { name: "Mix Veg Curry", price: 45, unit: "/plate" },
      { name: "Veg Jalfrezi", price: 50, unit: "/plate" },
      { name: "Aloo Gobi", price: 40, unit: "/plate" },
      { name: "Malai Kofta", price: 80, unit: "/plate" },
      { name: "Chicken Curry", price: 95, unit: "/plate" },
      { name: "Chicken Butter Masala", price: 110, unit: "/plate" },
      { name: "Mutton Curry", price: 160, unit: "/plate" },
    ],
  },
  {
    name: "Sides & Accompaniments",
    emoji: "🥗",
    items: [
      { name: "Sambar", price: 20, unit: "/plate" },
      { name: "Rasam", price: 15, unit: "/plate" },
      { name: "Veg Palya", price: 25, unit: "/plate" },
      { name: "Majjiige Huli", price: 30, unit: "/plate" },
      { name: "Curd Rice", price: 40, unit: "/plate" },
      { name: "Raita", price: 20, unit: "/plate" },
      { name: "Green Salad", price: 25, unit: "/plate" },
      { name: "Papad (Roasted/Fried)", price: 10, unit: "/pc" },
      { name: "Pickle", price: 5, unit: "/serving" },
      { name: "Kosambari", price: 20, unit: "/plate" },
    ],
  },
  {
    name: "Starters & Snacks",
    emoji: "🍢",
    items: [
      { name: "Gobi 65 / Manchurian", price: 60, unit: "/plate" },
      { name: "Paneer Tikka", price: 85, unit: "/plate" },
      { name: "Veg Spring Rolls", price: 55, unit: "/plate" },
      { name: "Babycorn Manchurian", price: 65, unit: "/plate" },
      { name: "Chicken 65", price: 90, unit: "/plate" },
      { name: "Chicken Tikka", price: 110, unit: "/plate" },
      { name: "Veg Soup", price: 35, unit: "/plate" },
      { name: "Tomato Soup", price: 30, unit: "/plate" },
    ],
  },
  {
    name: "Desserts & Sweets",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun (2)", price: 35, unit: "/plate" },
      { name: "Kasi Halwa", price: 40, unit: "/plate" },
      { name: "Carrot Halwa", price: 45, unit: "/plate" },
      { name: "Payasam (Basundi/Rice)", price: 35, unit: "/plate" },
      { name: "Ice Cream (Single Scoop)", price: 45, unit: "/serving" },
      { name: "Rasgulla", price: 35, unit: "/plate" },
      { name: "Champakali", price: 40, unit: "/pc" },
      { name: "Jalebi", price: 30, unit: "/serving" },
    ],
  },
  {
    name: "Beverages & Refreshments",
    emoji: "🥤",
    items: [
      { name: "Filter Coffee", price: 20, unit: "/serving" },
      { name: "Masala Tea", price: 15, unit: "/serving" },
      { name: "Badam Milk", price: 30, unit: "/serving" },
      { name: "Fresh Lime Juice", price: 25, unit: "/serving" },
      { name: "Buttermilk", price: 20, unit: "/serving" },
      { name: "Mango Juice", price: 35, unit: "/serving" },
      { name: "Fruit Punch", price: 50, unit: "/serving" },
      { name: "Cold Drinks", price: 20, unit: "/serving" },
      { name: "Mineral Water (200ml)", price: 10, unit: "/bottle" },
    ],
  },
];

// ─── TYPES ──────────────────────────────────────────
interface FormData {
  location: string;
  occasion: string;
  guests: number;
  planType: "standard" | "custom";
  selectedStandard: string[];
  selectedCustom: string[];
  name: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  email: string;
  eventDate: string;
  notes: string;
}

const steps = [
  { label: "Location", icon: MapPin },
  { label: "Occasion", icon: PartyPopper },
  { label: "Guests", icon: Users },
  { label: "Meal Plan", icon: UtensilsCrossed },
  { label: "Summary", icon: ClipboardList },
  { label: "Details", icon: UserCheck },
];

// ─── FORMAT HELPERS ────────────────────────────────
function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

function getGuestMessage(n: number): string {
  if (n >= 1000) return "A mega event! Our team will personally plan this with you.";
  if (n >= 501) return "A grand event — we've got you covered!";
  if (n >= 201) return "A wonderful mid-sized celebration!";
  return "Perfect for an intimate gathering!";
}

// ─── MAIN COMPONENT ─────────────────────────────────
export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    location: "",
    occasion: "",
    guests: 200,
    planType: "standard",
    selectedStandard: [],
    selectedCustom: [],
    name: "",
    phone: "",
    whatsapp: "",
    sameAsPhone: true,
    email: "",
    eventDate: "",
    notes: "",
  });

  const update = (partial: Partial<FormData>) =>
    setForm((prev) => ({ ...prev, ...partial }));

  // Calculate prices
  const standardTotal = useMemo(() => {
    let total = 0;
    const allOptions = [...standardPlans.breakfast, ...standardPlans.lunch, ...standardPlans.dinner];
    allOptions.forEach(p => {
      if (form.selectedStandard.includes(p.id)) total += p.price;
    });
    return total;
  }, [form.selectedStandard]);

  const customPerPlate = useMemo(() => {
    return customCategories.reduce((sum, cat) => {
      return (
        sum +
        cat.items
          .filter((item) => form.selectedCustom.includes(item.name))
          .reduce((s, item) => s + item.price, 0)
      );
    }, 0);
  }, [form.selectedCustom]);

  const totalEstimate = useMemo(() => {
    if (form.planType === "standard") return standardTotal * form.guests;
    return customPerPlate * form.guests;
  }, [form.planType, standardTotal, customPerPlate, form.guests]);

  const perPlate = form.planType === "standard" ? standardTotal : customPerPlate;

  const planSummary = useMemo(() => {
    if (form.planType === "standard") {
      const allOptions = [...standardPlans.breakfast, ...standardPlans.lunch, ...standardPlans.dinner];
      return allOptions
        .filter((p) => form.selectedStandard.includes(p.id))
        .map((p) => p.name)
        .join(" + ");
    }
    return `Custom (${form.selectedCustom.length} items)`;
  }, [form.planType, form.selectedStandard, form.selectedCustom]);

  // Validation
  const canNext = useMemo(() => {
    switch (step) {
      case 0:
        return form.location !== "";
      case 1:
        return form.occasion !== "";
      case 2:
        return form.guests >= 100;
      case 3:
        return form.planType === "standard"
          ? form.selectedStandard.length > 0
          : form.selectedCustom.length > 0;
      case 4:
        return true;
      case 5:
        return (
          form.name.trim() !== "" &&
          /^[6-9]\d{9}$/.test(form.phone) &&
          form.eventDate !== "" &&
          new Date(form.eventDate) >=
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );
      default:
        return false;
    }
  }, [step, form]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Swaada Caterings! Here are my event details:\n📍 Location: ${form.location}\n🎉 Occasion: ${form.occasion}\n👥 Guests: ${form.guests}\n🍽️ Plan: ${planSummary}\n📅 Event Date: ${form.eventDate}\n💰 Estimated Total: ${formatINR(totalEstimate)}\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📝 Notes: ${form.notes || "None"}`
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-warm pt-20 px-4">
        <motion.div
          className="max-w-lg w-full text-center p-8 md:p-12 rounded-3xl bg-white shadow-2xl border border-saffron/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-3">
            Inquiry Submitted!
          </h2>
          <p className="text-dark-light/70 mb-8">
            Thank you, {form.name}. To get a quote instantly, please send your details to our WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/918105758067?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp text-white font-bold text-lg rounded-full hover:bg-whatsapp/90 hover:scale-105 transition-all shadow-lg"
            >
              🚀 Send to WhatsApp Now
            </a>
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 text-dark-light hover:text-saffron transition-all"
            >
              Go back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-warm pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between relative">
            {/* Line behind */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-saffron transition-all duration-500 hidden sm:block"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s, i) => (
              <div
                key={s.label}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < step
                    ? "bg-saffron text-white"
                    : i === step
                      ? "bg-saffron text-white ring-4 ring-saffron/20"
                      : "bg-gray-200 text-gray-400"
                    }`}
                >
                  {i < step ? (
                    <Check size={18} />
                  ) : (
                    <s.icon size={18} />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium hidden sm:block ${i <= step ? "text-saffron" : "text-gray-400"
                    }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* Mobile step label */}
          <p className="sm:hidden text-center text-sm font-medium text-saffron mt-4">
            Step {step + 1} of {steps.length}: {steps[step].label}
          </p>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && <StepLocation form={form} update={update} />}
            {step === 1 && <StepOccasion form={form} update={update} />}
            {step === 2 && <StepGuests form={form} update={update} />}
            {step === 3 && (
              <StepMealPlan
                form={form}
                update={update}
                standardTotal={standardTotal}
                customPerPlate={customPerPlate}
              />
            )}
            {step === 4 && (
              <StepSummary
                form={form}
                planSummary={planSummary}
                perPlate={perPlate}
                totalEstimate={totalEstimate}
              />
            )}
            {step === 5 && <StepDetails form={form} update={update} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-5 py-3 text-dark-light hover:text-saffron transition-colors font-medium"
            >
              <ChevronLeft size={18} /> Back
            </button>
          ) : (
            <div />
          )}
          {step < 5 ? (
            <button
              onClick={() => canNext && setStep(step + 1)}
              disabled={!canNext}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${canNext
                ? "bg-saffron text-white hover:bg-saffron-dark shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => canNext && handleSubmit()}
              disabled={!canNext}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${canNext
                ? "bg-saffron text-white hover:bg-saffron-dark shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Submit Booking <Check size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STEP 1: LOCATION ────────────────────────────────
function StepLocation({
  form,
  update,
}: {
  form: FormData;
  update: (p: Partial<FormData>) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        Where is your event?
      </h2>
      <p className="text-dark-light/60 mb-6">Select a city in Karnataka</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => update({ location: city })}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-md ${form.location === city
              ? "border-saffron bg-saffron/5 shadow-md"
              : "border-gray-100 hover:border-saffron/30"
              }`}
          >
            {form.location === city && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-saffron rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
            <span className="text-2xl">{cityEmojis[city]}</span>
            <span className="text-sm font-medium text-dark">{city}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-dark-light mb-2">
          Other city in Karnataka
        </label>
        <div className="relative">
          <select
            value={cities.includes(form.location) ? "" : form.location}
            onChange={(e) => update({ location: e.target.value })}
            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border-2 border-gray-100 bg-white text-dark focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
          >
            <option value="">Select another city...</option>
            {karnatakaDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: OCCASION ────────────────────────────────
function StepOccasion({
  form,
  update,
}: {
  form: FormData;
  update: (p: Partial<FormData>) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        What&apos;s the occasion?
      </h2>
      <p className="text-dark-light/60 mb-6">Choose the type of event</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {occasionList.map((o) => (
          <button
            key={o.label}
            onClick={() => update({ occasion: o.label })}
            className={`relative p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 hover:shadow-md ${form.occasion === o.label
              ? "border-saffron bg-saffron/5 shadow-md"
              : "border-gray-100 hover:border-saffron/30"
              }`}
          >
            {form.occasion === o.label && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-saffron rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
            <span className="text-3xl">{o.emoji}</span>
            <span className="text-sm font-medium text-dark">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── STEP 3: GUESTS ─────────────────────────────────
function StepGuests({
  form,
  update,
}: {
  form: FormData;
  update: (p: Partial<FormData>) => void;
}) {
  const adjust = (delta: number) => {
    const next = Math.max(0, Math.min(2000, form.guests + delta));
    update({ guests: next });
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        How many guests are you expecting?
      </h2>
      <p className="text-dark-light/60 mb-8">Minimum 100 guests</p>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => adjust(-50)}
          className="w-12 h-12 rounded-full bg-saffron/10 hover:bg-saffron/20 flex items-center justify-center text-saffron transition-colors"
        >
          <Minus size={20} />
        </button>
        <input
          type="number"
          value={form.guests}
          onChange={(e) =>
            update({ guests: Math.min(2000, Math.max(0, parseInt(e.target.value) || 0)) })
          }
          className="w-32 text-center text-4xl font-bold text-dark border-b-3 border-saffron outline-none bg-transparent"
        />
        <button
          onClick={() => adjust(50)}
          className="w-12 h-12 rounded-full bg-saffron/10 hover:bg-saffron/20 flex items-center justify-center text-saffron transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={2000}
        step={50}
        value={form.guests}
        onChange={(e) => update({ guests: parseInt(e.target.value) })}
        className="w-full mb-4"
      />
      <div className="flex justify-between text-xs text-dark-light/50 mb-6">
        <span>0</span>
        <span>500</span>
        <span>1000</span>
        <span>1500</span>
        <span>2000</span>
      </div>

      {form.guests < 100 && form.guests > 0 ? (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          We cater for a minimum of 100 guests. For smaller events, please
          contact us directly.
        </div>
      ) : form.guests >= 100 ? (
        <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/20 text-saffron-dark text-sm font-medium text-center">
          {getGuestMessage(form.guests)}
        </div>
      ) : null}
    </div>
  );
}

// ─── STEP 4: MEAL PLAN ──────────────────────────────
function StepMealPlan({
  form,
  update,
  standardTotal,
  customPerPlate,
}: {
  form: FormData;
  update: (p: Partial<FormData>) => void;
  standardTotal: number;
  customPerPlate: number;
}) {
  const [expanded, setExpanded] = useState<string[]>(["Breakfast Items"]);

  const toggleCustom = (name: string) => {
    const next = form.selectedCustom.includes(name)
      ? form.selectedCustom.filter((x) => x !== name)
      : [...form.selectedCustom, name];
    update({ selectedCustom: next });
  };

  const toggleExpand = (cat: string) => {
    setExpanded((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        Choose your meal plan
      </h2>
      <p className="text-dark-light/60 mb-6">
        Pick a standard plan or build your own
      </p>

      {/* Tabs */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
        <button
          onClick={() => update({ planType: "standard" })}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${form.planType === "standard"
            ? "bg-saffron text-white shadow-md"
            : "text-dark-light hover:text-saffron"
            }`}
        >
          Standard Plans
        </button>
        <button
          onClick={() => update({ planType: "custom" })}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${form.planType === "custom"
            ? "bg-saffron text-white shadow-md"
            : "text-dark-light hover:text-saffron"
            }`}
        >
          Build Your Own
        </button>
      </div>

      {form.planType === "standard" ? (
        <>
          <div className="space-y-8">
            <PlanCategory
              title="Breakfast Options"
              plans={standardPlans.breakfast}
              selected={form.selectedStandard}
              onToggle={(id) => {
                // Only allow one breakfast plan
                const currentOther = form.selectedStandard.filter(x => !x.startsWith('br-'));
                const next = form.selectedStandard.includes(id) ? currentOther : [...currentOther, id];
                update({ selectedStandard: next });
              }}
            />
            <PlanCategory
              title="Lunch Options"
              plans={standardPlans.lunch}
              selected={form.selectedStandard}
              onToggle={(id) => {
                const currentOther = form.selectedStandard.filter(x => !x.startsWith('ln-'));
                const next = form.selectedStandard.includes(id) ? currentOther : [...currentOther, id];
                update({ selectedStandard: next });
              }}
            />
            <PlanCategory
              title="Dinner Options"
              plans={standardPlans.dinner}
              selected={form.selectedStandard}
              onToggle={(id) => {
                const currentOther = form.selectedStandard.filter(x => !x.startsWith('dn-'));
                const next = form.selectedStandard.includes(id) ? currentOther : [...currentOther, id];
                update({ selectedStandard: next });
              }}
            />

            <div className="p-6 rounded-2xl bg-cream border border-saffron/20 text-center">
              <h4 className="font-heading font-bold text-dark mb-2">Need something else?</h4>
              <p className="text-sm text-dark-light mb-4">
                Our standard plans are just the beginning. We can customize any menu to fit your needs, budget, and tradition.
              </p>
              <a
                href="tel:8105758067"
                className="inline-flex items-center gap-2 text-saffron font-bold hover:underline"
              >
                📱 Call us at 8105758067 to discuss
              </a>
            </div>

            {form.selectedStandard.length > 0 && (
              <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-sm text-dark">
                  <strong>Current Estimate:</strong> {form.guests} guests
                </div>
                <div className="text-lg font-bold text-saffron">
                  Per Plate: {formatINR(standardTotal)} | Total: {formatINR(standardTotal * form.guests)}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-[50vh] overflow-y-auto pr-2">
            {customCategories.map((cat) => {
              const isExpanded = expanded.includes(cat.name);
              return (
                <div
                  key={cat.name}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpand(cat.name)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-saffron/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="font-semibold text-dark text-sm">
                        {cat.name}
                      </span>
                      <span className="text-xs text-dark-light/50">
                        ({cat.items.filter((i) => form.selectedCustom.includes(i.name)).length}/{cat.items.length})
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-1">
                          {cat.items.map((item) => {
                            const checked = form.selectedCustom.includes(
                              item.name
                            );
                            return (
                              <label
                                key={item.name}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${checked
                                  ? "bg-saffron/5 border border-saffron/20"
                                  : "hover:bg-gray-50 border border-transparent"
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleCustom(item.name)}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 ${checked
                                    ? "bg-saffron border-saffron"
                                    : "border-gray-300"
                                    }`}
                                >
                                  {checked && (
                                    <Check size={13} className="text-white" />
                                  )}
                                </div>
                                <span className="flex-1 text-sm text-dark">
                                  {item.name}
                                </span>
                                <span className="text-sm font-semibold text-saffron whitespace-nowrap">
                                  {formatINR(item.price)}
                                  <span className="text-xs font-normal text-dark-light/50">
                                    {item.unit}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Sticky calculator */}
          <div className="sticky bottom-0 p-4 rounded-xl bg-maroon text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-sm space-y-1">
              <p>
                Items selected:{" "}
                <strong>{form.selectedCustom.length}</strong> | Per plate:{" "}
                <strong>{formatINR(customPerPlate)}</strong>
              </p>
              <p>
                Guests: <strong>{form.guests}</strong> | Estimated Total:{" "}
                <strong>{formatINR(customPerPlate * form.guests)}</strong>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── STEP 5: SUMMARY ─────────────────────────────────
function StepSummary({
  form,
  planSummary,
  perPlate,
  totalEstimate,
}: {
  form: FormData;
  planSummary: string;
  perPlate: number;
  totalEstimate: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        Here&apos;s your event summary
      </h2>
      <p className="text-dark-light/60 mb-6">Review before proceeding</p>

      <div className="space-y-4 mb-6">
        <SummaryRow emoji="📍" label="Location" value={form.location} />
        <SummaryRow emoji="🎉" label="Occasion" value={form.occasion} />
        <SummaryRow
          emoji="👥"
          label="Number of Guests"
          value={form.guests.toString()}
        />
        <SummaryRow emoji="🍽️" label="Plan Selected" value={planSummary} />
        <SummaryRow emoji="💵" label="Per Plate" value={formatINR(perPlate)} />
        <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/20">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-dark font-medium">
              <span>💰</span> Estimated Total
            </span>
            <span className="text-2xl font-bold text-saffron">
              {formatINR(totalEstimate)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-dark-light/50 italic">
        This is an estimate. GST and logistics charges may apply. Final pricing
        confirmed after our team reviews.
      </p>
    </div>
  );
}

function SummaryRow({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
      <span className="flex items-center gap-2 text-sm text-dark-light">
        <span>{emoji}</span> {label}
      </span>
      <span className="text-sm font-semibold text-dark">{value}</span>
    </div>
  );
}

// ─── STEP 6: CUSTOMER DETAILS ────────────────────────
function StepDetails({
  form,
  update,
}: {
  form: FormData;
  update: (p: Partial<FormData>) => void;
}) {
  const minDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-saffron/10">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">
        Almost there! Tell us about yourself
      </h2>
      <p className="text-dark-light/60 mb-6">
        We&apos;ll reach out to confirm your booking
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Enter your full name"
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
              value={form.phone}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                update({
                  phone: v,
                  whatsapp: form.sameAsPhone ? v : form.whatsapp,
                });
              }}
              placeholder="10-digit phone number"
              className="w-full px-4 py-3 rounded-r-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
            />
          </div>
          {form.phone.length > 0 && !/^[6-9]\d{9}$/.test(form.phone) && (
            <p className="text-red-500 text-xs mt-1">
              Enter a valid 10-digit Indian phone number
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={form.sameAsPhone}
              onChange={(e) => {
                const checked = e.target.checked;
                update({
                  sameAsPhone: checked,
                  whatsapp: checked ? form.phone : "",
                });
              }}
              className="accent-saffron w-4 h-4"
            />
            <span className="text-sm text-dark-light">
              WhatsApp number same as phone
            </span>
          </label>
          {!form.sameAsPhone && (
            <div className="flex">
              <span className="px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-100 rounded-l-xl text-sm text-dark-light">
                +91
              </span>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) =>
                  update({
                    whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                placeholder="WhatsApp number"
                className="w-full px-4 py-3 rounded-r-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Email (optional)
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Event Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.eventDate}
            min={minDate}
            onChange={(e) => update({ eventDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all"
          />
          {form.eventDate &&
            new Date(form.eventDate) <
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
              <p className="text-red-500 text-xs mt-1">
                Event date must be at least 7 days from today
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Additional Notes (optional)
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Any dietary requirements, special requests, or things we should know?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-saffron focus:ring-2 focus:ring-saffron/20 outline-none transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// ─── HELPERS ────────────────────────────────────────
interface Plan {
  id: string;
  name: string;
  meal: string;
  price: number;
  emoji: string;
  items: string[];
}

function PlanCategory({
  title,
  plans,
  selected,
  onToggle,
}: {
  title: string;
  plans: Plan[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-bold text-dark pl-2 border-l-4 border-saffron">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = selected.includes(plan.id);
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onToggle(plan.id)}
              className={`relative text-left p-5 rounded-xl border-2 transition-all ${isSelected
                ? "border-saffron bg-saffron/5"
                : "border-gray-100 hover:border-saffron/30"
                }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-saffron rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <span className="text-2xl">{plan.emoji}</span>
              <h4 className="text-base font-bold text-dark mt-2">{plan.name}</h4>
              <p className="text-lg font-bold text-saffron mt-1">
                {formatINR(plan.price)}
                <span className="text-xs font-normal text-dark-light/50">
                  {" "}
                  /plate
                </span>
              </p>
              <ul className="mt-3 space-y-1">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs text-dark-light/60 flex items-center gap-1"
                  >
                    <span className="text-saffron">•</span> {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}


