# Swaada Caterings & Services

Premium Catering Website built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**.

## 🌟 Features

- **Dynamic Homepage**: High-impact hero section and animated value propositions.
- **Smart Booking Wizard**: Multi-step flow for event details, guest count slider, and real-price calculation.
- **Custom Menu Builder**: Select specific items and see real-time price-per-plate updates.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **WhatsApp Integration**: Direct "Instant Quote" buttons and automated booking summaries.
- **SEO Ready**: Custom metadata for all pages (About, Menu, Gallery, Contact, Book Now).
- **Premium Aesthetics**: Saffron & Maroon brand theme with smooth micro-animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (Wizard state logic)

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production
```bash
npm run build
npm start
```

## 🌍 Deployment (Vercel)

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Swaada Website"
   ```
2. **Push to GitHub**: Create a new repository on GitHub and push your code there.
3. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com).
   - Click **Add New** > **Project**.
   - Select your GitHub repository.
   - Click **Deploy**.

## 📞 Support & Customization

To change the contact number or prices:
- **WhatsApp Number**: Update the logic in `src/components/WhatsAppButton.tsx` and `src/app/book/BookingWizard.tsx`.
- **Menu Prices**: Edit the data structures in `src/app/book/BookingWizard.tsx` or `src/app/menu/MenuContent.tsx`.

---
Made with ❤️ for Swaada Caterings
