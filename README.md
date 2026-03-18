# Postiz — Premium Social Media Marketing Platform

Postiz is a state-of-the-art Social Media Marketing and Management platform designed with a focus on high-end aesthetics, seamless user experience, and robust functional workflows. It empowers marketing teams to streamline their campaign creation, media management, and approval processes in a single, beautiful interface.

![Project Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## ✨ Features

- **Premium Design System**: Built with modern web aesthetics including glassmorphism, smooth gradients, and micro-animations for a high-end "Apple-like" feel.
- **Dynamic Campaign Builder**: A tabbed interface for managing different stages of a campaign:
  - **Media Uploads**: Integrated workflow for cloud-based asset management via Cloudflare R2.
  - **Marketing Logic**: Comprehensive form controls for scheduling, tone selection, target audience definition, and more.
- **Interactive Review & Approval**: Integrated Google Sheets connectivity with one-click copy functionality and status toggles.
- **Global Reach (i18n)**: Full internationalization support with localized experiences for English, Arabic (RTL support), Chinese, and more.
- **Intelligent Navigation**: Responsive navbar with language switching, theme toggling (Dark/Light), and ultra-smooth scrolling.
- **Responsive Layout**: Pixel-perfect layout across mobile, tablet, and desktop devices.

## 🚀 Tech Stack

- **Core**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Tabs, Popover, Switch, Calendar, etc.)
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG Flag Icons
- **i18n**: [i18next](https://www.i18next.com/) & `react-i18next`
- **Animations**: Tailwind-animate & CSS Keyframes

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/postiz.git
   ```
2. Navigate to the project directory:
   ```bash
   cd postiz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with Turbopack for lightning-fast builds:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/             # Next.js Pages & Layouts
├── components/      
│   ├── ui/          # Reusable Shadcn UI primitives
│   ├── footer.tsx   # Premium interactive footer
│   ├── navbar.tsx   # Core navigation system
│   └── marketing-campaign-form.tsx # Main feature component
├── hooks/           # Custom React hooks
├── i18n.ts          # Localization configuration
└── lib/             # Utility functions
```

## 🌐 Roadmap

- [x] Refactored Marketing Form with Tabbed Navigation
- [x] Integrated Shadcn DatePickers and Switches
- [x] Premium Navbar with Language/Theme support
- [ ] Analytics Dashboard Integration
- [ ] Direct Social Media API Post Scheduling
- [ ] Team Collaboration Real-time Chat

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the Postiz Team.
