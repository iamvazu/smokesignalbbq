# Smoke Signal BBQ 🍖🔥

**Authentic American BBQ in Bangalore since 2011.**

This repository contains the source code for the Smoke Signal BBQ website, a modern, responsive web application built to showcase the restaurant's menu, signature sauces, and story.

![Smoke Signal BBQ Banner](public/logo_final.png)

## 📖 About

Smoke Signal BBQ brings the authentic taste of Texas-style BBQ to Bangalore. Known for slow-smoked brisket, fall-off-the-bone ribs, and handcrafted small-batch sauces, this website serves as the digital storefront for the brand.

The site features a premium dark-themed design with vibrant fire-red accents, smooth animations, and a focus on visual storytelling.

## ✨ Features

-   **Hero Section:** Immersive landing with smoke effects and brand storytelling.
-   **Sauce Showcase:** highlighted section for signature bottled sauces with direct purchasing links.
-   **Menu Grid:** Interactive menu display with hover effects and detailed descriptions.
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
-   **Animations:** Smooth reveal animations and micro-interactions using Framer Motion.
-   **WhatsApp Integration:** Direct "Order Now" functionality linking to WhatsApp for seamless ordering.

## 🛠️ Tech Stack

-   **Frontend:** [React](https://reactjs.org/) (with TypeScript)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/smoke-signal-bbq.git
    cd smoke-signal-bbq
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:3000`.

## 📁 Project Structure

```
smoke-signal-bbq/
├── public/              # Static assets (images, logos)
├── src/
│   ├── components/      # Reusable UI components (Hero, Navbar, MenuGrid, etc.)
│   ├── types/           # TypeScript interfaces
│   ├── constants.ts     # Data (Menu items, Sauce list, Contact info)
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── index.html           # HTML entry point with Tailwind & Fonts
├── tailwind.config.js   # Tailwind configuration (Custom colors & fonts)
└── vite.config.ts       # Vite configuration
```

## 🎨 Design System

-   **Primary Color:** Fire Red (`#EF4444`)
-   **Backgrounds:** Charcoal (`#0B0B0B`), Burnt Brown (`#2B1B12`)
-   **Fonts:**
    -   *Headings:* Rye (Serif display font)
    -   *Body:* Montserrat (Sans-serif)

## 📄 License

This project is proprietary to Smoke Signal BBQ. All rights reserved.
