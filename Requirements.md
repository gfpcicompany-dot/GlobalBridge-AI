# GlobalBridge AI Platform — Technical Requirements & Architecture Guide

> **Author:** Auto-generated from codebase analysis  
> **Last Updated:** 2026-03-15  
> **Version:** 1.0.0

---

## Table of Contents

1. [Project Overview](#1-project-overview)  
2. [Tech Stack](#2-tech-stack)  
3. [Project Structure](#3-project-structure)  
4. [Database Schema](#4-database-schema)  
5. [Server Architecture](#5-server-architecture)  
6. [Client Architecture](#6-client-architecture)  
7. [AI Integration](#7-ai-integration)  
8. [Authentication & Authorization](#8-authentication--authorization)  
9. [Real-Time Features](#9-real-time-features)  
10. [Internationalization (i18n)](#10-internationalization-i18n)  
11. [Payment Integration (Stripe)](#11-payment-integration-stripe)  
12. [Environment Variables](#12-environment-variables)  
13. [How to Run the Project](#13-how-to-run-the-project)  
14. [Database Setup](#14-database-setup)  
15. [Build & Deploy](#15-build--deploy)  
16. [Remaining Work / What Needs to Be Done](#16-remaining-work--what-needs-to-be-done)  
17. [Final Product Vision](#17-final-product-vision)

---

## 1. Project Overview

**GlobalBridge AI** is an intelligent SaaS platform for managing international trade operations. It acts as a **Smart Executive Operating System** that combines CRM, tender management, supplier sourcing, logistics, payments, auctions, and more — all enhanced with AI capabilities and full Arabic/English bilingual support.

### Core Value Proposition
- **AI-Powered Intelligence** — Every module uses LLM for analysis, translation, scoring, and recommendations
- **Bilingual (Arabic/English)** — Full RTL/LTR support with automatic AI translation
- **Real-Time Operations** — Live auctions with Socket.IO, auto-refreshing data
- **End-to-End Trade** — From finding suppliers to signing contracts to tracking shipments

---

## 2. Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI framework |
| **TypeScript** | 5.9 | Type safety |
| **Vite** | 7.x | Build tool & dev server |
| **Tailwind CSS** | 4.x | Utility-first CSS (with `tw-animate-css`) |
| **Radix UI** | Various | 20+ accessible UI primitives (Dialog, Select, Tabs, etc.) |
| **Recharts** | 2.15 | Charts & data visualization |
| **Framer Motion** | 12.x | Animations |
| **Wouter** | 3.x | Lightweight client-side routing |
| **React Hook Form** | 7.x | Form management |
| **Zod** | 4.x | Schema validation |
| **Sonner** | 2.x | Toast notifications |
| **Lucide React** | 0.453 | Icon library |
| **cmdk** | 1.x | Command palette (Cmd+K) |
| **date-fns** | 4.x | Date utilities |
| **Socket.IO Client** | 4.8 | Real-time WebSocket client |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20+ | Runtime |
| **Express** | 4.21 | HTTP server |
| **tRPC** | 11.6 | Type-safe API layer (end-to-end) |
| **Drizzle ORM** | 0.44 | Type-safe MySQL ORM |
| **MySQL** | 8+ | Primary database |
| **Socket.IO** | 4.8 | Real-time WebSocket server |
| **Stripe** | 20.x | Payment processing |
| **jose** | 6.1 | JWT token handling |
| **AWS S3** | 3.x | Document/file storage |
| **esbuild** | 0.25 | Server bundle for production |
| **tsx** | 4.x | TypeScript execution for dev |

### AI / LLM
| Technology | Purpose |
|---|---|
| **Gemini 2.5 Flash** | Primary LLM model (via Forge API) |
| Custom `invokeLLM()` | Unified LLM client with structured JSON output |

### Dev Tools
| Tool | Purpose |
|---|---|
| **Vitest** | Unit testing framework |
| **Prettier** | Code formatting |
| **Drizzle Kit** | Database migrations |
| **pnpm** | Package manager |

---

## 3. Project Structure

```
globalbridge_ai_platform/
├── client/                     # Frontend (React)
│   ├── index.html              # HTML entry point
│   ├── public/                 # Static assets
│   └── src/
│       ├── App.tsx             # Root component + Router (28 routes)
│       ├── main.tsx            # React entry point + tRPC provider
│       ├── index.css           # Global CSS + Tailwind config + design tokens
│       ├── const.ts            # Client constants + OAuth login URL builder
│       ├── _core/              # Core hooks (useAuth)
│       ├── components/         # Shared components
│       │   ├── ui/             # 53 Radix-based UI primitives (shadcn/ui style)
│       │   ├── GBLayout.tsx    # Main layout: sidebar, header, navigation
│       │   ├── AIChatBox.tsx   # AI chat component
│       │   ├── AISearchBar.tsx # Global AI search with command palette
│       │   ├── Map.tsx         # Google Maps integration
│       │   └── ...
│       ├── contexts/           # React contexts
│       │   ├── LanguageContext.tsx  # AR/EN language + RTL
│       │   └── ThemeContext.tsx     # Dark/light theme
│       ├── hooks/              # Custom hooks (useMobile, useComposition, etc.)
│       ├── lib/                # Utility libraries
│       │   ├── trpc.ts         # tRPC client setup
│       │   ├── i18n.ts         # Translation dictionary
│       │   └── utils.ts        # General utilities
│       └── pages/              # 29 page components (one per route)
│           ├── Dashboard.tsx
│           ├── Emails.tsx
│           ├── Tenders.tsx
│           ├── Suppliers.tsx
│           ├── Products.tsx
│           ├── Orders.tsx
│           ├── Shipments.tsx
│           ├── Contracts.tsx
│           ├── Payments.tsx
│           ├── CRM.tsx
│           ├── Competitors.tsx
│           ├── Marketing.tsx
│           ├── Reports.tsx
│           ├── VoiceCommands.tsx
│           ├── Exchange.tsx
│           ├── Warehouses.tsx
│           ├── TradeFinance.tsx
│           ├── Auctions.tsx
│           ├── GlobalMap.tsx
│           ├── GlobalSearch.tsx
│           ├── Billing.tsx
│           ├── AIAssistant.tsx
│           ├── TenderIntel.tsx
│           ├── Settings.tsx
│           ├── UsersAdmin.tsx
│           ├── Notifications.tsx
│           ├── Home.tsx        # Landing page (unauthenticated)
│           └── NotFound.tsx
│
├── server/                     # Backend (Express + tRPC)
│   ├── _core/                  # Core server infrastructure
│   │   ├── index.ts            # Express server entry point
│   │   ├── context.ts          # tRPC context (user extraction from JWT)
│   │   ├── trpc.ts             # tRPC router + procedures definitions
│   │   ├── cookies.ts          # Cookie management
│   │   ├── env.ts              # Environment variable config
│   │   ├── llm.ts              # LLM client (Gemini 2.5 Flash)
│   │   ├── oauth.ts            # OAuth callback handler
│   │   ├── sdk.ts              # External API SDK
│   │   ├── vite.ts             # Vite dev/static server integration
│   │   ├── map.ts              # Google Maps API integration
│   │   ├── notification.ts     # Owner notification system
│   │   ├── dataApi.ts          # External data API
│   │   ├── imageGeneration.ts  # AI image generation
│   │   ├── voiceTranscription.ts # Voice-to-text
│   │   └── systemRouter.ts     # System health check
│   ├── routers.ts              # ALL tRPC routers (~1268 lines, 20+ modules)
│   ├── db.ts                   # Database connection (MySQL via Drizzle)
│   ├── storage.ts              # S3 file storage
│   ├── aiAssistantRouter.ts    # AI assistant chat router
│   ├── globalSearchRouter.ts   # Global cross-module AI search
│   ├── tenderIntelRouter.ts    # Tender intelligence module
│   ├── priceAlertsRouter.ts    # Price alerts & saved searches
│   ├── stripeRouter.ts         # Stripe payment routes + webhook
│   ├── stripeProducts.ts       # Stripe subscription plans
│   ├── auctionSocket.ts        # Socket.IO auction server
│   ├── schedulerService.ts     # Background job scheduler
│   └── *.test.ts               # Vitest test files
│
├── shared/                     # Shared code (client + server)
│   ├── types.ts                # Re-exports Drizzle schema types
│   ├── const.ts                # Shared constants (cookie name, etc.)
│   └── _core/errors.ts         # Shared error types
│
├── drizzle/                    # Database
│   ├── schema.ts               # Complete Drizzle schema (665 lines, 20+ tables)
│   ├── relations.ts            # Table relationships
│   ├── 0000-0006_*.sql         # 7 migration files
│   └── meta/                   # Drizzle migration metadata
│
├── patches/                    # pnpm patches (wouter fix)
├── seed-exchange.mjs           # Exchange listings seed data (93 real products)
├── seed-suppliers.mjs          # Supplier seed data (18 global platforms)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── drizzle.config.ts
└── .prettierrc
```

---

## 4. Database Schema

The project uses **MySQL** via **Drizzle ORM**. The schema is defined in `drizzle/schema.ts` (665 lines).

### Tables (20+)

| Table | Purpose |
|---|---|
| `users` | User accounts (OAuth, roles, Stripe customer/subscription IDs) |
| `emails` | Smart email management with AI analysis & translation |
| `tenders` | Tender/bid management with AI scoring |
| `suppliers` | Supplier database with verification system |
| `cost_calculations` | Supplier cost analysis |
| `products` | E-commerce product catalog |
| `orders` | Order management (with Stripe payment intent) |
| `shipments` | Logistics & shipment tracking |
| `contracts` | Contract management with AI analysis |
| `payments` | Payment tracking |
| `crm_contacts` | CRM contacts (leads, prospects, customers, partners) |
| `competitors` | Competitor analysis with AI SWOT |
| `voice_commands` | Voice command processing history |
| `reports` | Auto-generated executive reports |
| `notifications` | System notifications |
| `marketing_campaigns` | Marketing campaign management |
| `exchange_listings` | Global trade exchange (buy/sell listings) |
| `exchange_price_history` | Historical price data for exchange |
| `warehouses` | Smart warehouse management |
| `warehouse_inventory` | Warehouse stock tracking |
| `trade_finance` | Trade financing instruments (LC, guarantees, etc.) |
| `auctions` | Real-time auction listings |
| `auction_bids` | Auction bid history |

### Key Design Patterns
- **Multi-tenant**: Every table has `userId` column linking to the owner
- **Bilingual**: Most text fields have Arabic counterparts (e.g., `title`/`titleAr`)
- **AI columns**: `aiAnalysis` (JSON), `aiScore` for AI-generated metadata
- **Soft status**: Enum-based status columns for state machines (e.g., `pending → active → completed`)

---

## 5. Server Architecture

### Entry Point
`server/_core/index.ts` → Starts Express server with:

1. **Stripe webhook** (raw body, before JSON parser)
2. **JSON body parser** (50MB limit for uploads)
3. **OAuth routes** (`/api/oauth/callback`)
4. **tRPC API** (`/api/trpc/*`)
5. **Socket.IO** for real-time auctions  
6. **Background scheduler** (auto-refresh every 6h + daily briefing)
7. **Vite dev server** (development) or **static file serving** (production)

### tRPC Routers
All business logic is in `server/routers.ts` (~1268 lines). The `appRouter` combines:

| Router | Methods | Description |
|---|---|---|
| `auth` | `me`, `logout` | Session management |
| `notifications` | `list`, `markRead` | Notification system |
| `emails` | `list`, `create`, `markRead`, `delete` | AI-analyzed emails |
| `tenders` | `list`, `create`, `update`, `delete` | Tender management |
| `suppliers` | `list`, `create`, `update`, `delete`, `requestVerification`, `approveVerification` | Supplier lifecycle |
| `products` | `list`, `create`, `update`, `delete` | Product catalog |
| `orders` | `list`, `create`, `updateStatus` | Order management |
| `shipments` | `list`, `create`, `updateStatus` | Shipment tracking |
| `contracts` | `list`, `create`, `updateStatus`, `delete` | Contract management |
| `payments` | `list`, `create`, `updateStatus` | Payment processing |
| `crm` | `list`, `create`, `update`, `delete` | CRM contacts |
| `competitors` | `list`, `create`, `delete` | AI competitor analysis |
| `marketing` | `list`, `create`, `updateStatus` | Campaign management |
| `reports` | `list`, `generate` | AI report generation |
| `voice` | `process`, `history` | Voice command processing |
| `dashboard` | `stats`, `recentActivity` | Dashboard KPIs |
| `exchange` | `list`, `create`, `priceComparison`, `delete` | Trade exchange |
| `warehouses` | `list`, `create`, `inventory`, `addInventory`, `delete` | Warehouse ops |
| `tradeFinance` | `list`, `create`, `updateStatus`, `delete` | Trade financing |
| `auctions` | `list`, `getById`, `create`, `placeBid`, `cancel`, `getMyBids` | Real-time auctions |
| `search` | `global` | AI cross-module search |
| `scheduler` | `getSettings`, `setAutoRefresh`, `generateBriefing`, `getDailyBriefing` | Background jobs |
| `settings` | `updateLanguage`, `updateProfile` | User settings |
| `usersAdmin` | `list`, `updateRole` | Admin user management |

### Authorization Model
- `publicProcedure` — No auth needed
- `protectedProcedure` — Requires valid JWT session cookie
- `adminProcedure` — Requires `role === "admin"`

---

## 6. Client Architecture

### Routing
Uses **Wouter** (lightweight ~1.5KB router). All 28 routes are defined in `App.tsx`:

```
/              → Home (landing page, public)
/dashboard     → Executive Dashboard
/emails        → Smart Email Management
/tenders       → Tender Management
/suppliers     → Supplier Database
/products      → Product Catalog
/orders        → Order Management
/shipments     → Shipment Tracking
/contracts     → Contract Management
/payments      → Payment Tracking
/crm           → CRM Contacts
/competitors   → Competitor Analysis
/marketing     → Marketing Campaigns
/reports       → Report Generation
/voice         → Voice Commands
/settings      → User Settings
/admin/users   → Admin User Management
/notifications → Notifications
/exchange      → Global Trade Exchange
/global-search → AI Global Search
/warehouses    → Smart Warehouses
/trade-finance → Trade Finance
/auctions      → Real-Time Auctions
/map           → Interactive Map
/billing       → Subscription & Billing
/ai-assistant  → AI Chat Assistant
/tender-intel  → Tender Intelligence
/404           → Not Found
```

### Layout
`GBLayout.tsx` wraps all authenticated pages with:
- **Sidebar** — Collapsible navigation with grouped modules (Core, Operations, Business Intelligence, AI & Advanced)
- **Header** — Page title, AI search bar, language toggle, user menu
- **Content area** — Scrollable main content

### State Management
- **tRPC + React Query** — Server state (automatic caching, refetching)
- **React Context** — Language/theme (client-only state)
- **Local Storage** — Language preference persistence

### Design System
- **Dark mode by default** (oklch-based color tokens in `index.css`)
- **Glass card effect** (`.glass-card` class)
- **Custom animations** (`.ai-pulse`, `.voice-wave`)
- **Status badges** (`.status-active`, `.status-pending`, etc.)
- **Arabic fonts** — Cairo for Arabic, Inter for English

---

## 7. AI Integration

### LLM Client (`server/_core/llm.ts`)
- **Model**: `gemini-2.5-flash`
- **API**: Forge API (`BUILT_IN_FORGE_API_URL` or fallback `https://forge.manus.im`)
- **Features**: Structured JSON output via `response_format: { type: "json_schema" }`

### Where AI is Used

| Module | AI Feature |
|---|---|
| **Emails** | Auto-summarize, translate to Arabic, sentiment analysis |
| **Tenders** | Score viability (0-100), extract requirements, translate title |
| **Suppliers** | Verification scoring, comparison analysis |
| **Contracts** | Risk analysis, key terms extraction, recommendations |
| **Competitors** | SWOT analysis, threat level assessment |
| **Marketing** | Campaign name/content translation |
| **Voice** | Transcript intent parsing, module routing |
| **Reports** | Auto-generate executive summaries |
| **Exchange** | Listing scoring based on completeness/market demand |
| **Search** | Cross-module AI-powered ranking and insight generation |
| **AI Assistant** | Conversational chat with context awareness |
| **Tender Intel** | Win probability prediction, competition analysis |
| **Daily Briefing** | Auto-generated morning summary (urgent actions, opportunities, market insight) |

---

## 8. Authentication & Authorization

### Flow
1. User clicks "Login" → Redirected to OAuth portal
2. OAuth callback → `POST /api/oauth/callback` → Creates/updates user in MySQL
3. Server sets JWT session cookie (`app_session_id`, 1 year, httpOnly)
4. Client calls `trpc.auth.me` → Returns current user (from JWT)

### Roles
| Role | Access |
|---|---|
| `user` | All standard features |
| `admin` | + User management, verification approval |

---

## 9. Real-Time Features

### Socket.IO (`server/auctionSocket.ts`)
- **Events**: `join-auction`, `new-bid`, `auction-update`
- **Broadcast**: When a bid is placed, all participants in the auction room receive instant updates
- **Auto-close**: System automatically closes expired auctions

### Background Scheduler (`server/schedulerService.ts`)
- **Auto-refresh**: Fetches latest data every 6 hours (configurable)
- **Daily briefing**: Generates AI morning summary at scheduled time

---

## 10. Internationalization (i18n)

### Implementation
- `client/src/contexts/LanguageContext.tsx` — Provides `language`, `isRTL`, `dir`, `t()` function
- `client/src/lib/i18n.ts` — Translation dictionary (key-value pairs for AR/EN)
- **RTL support**: `document.dir` set dynamically, CSS uses `[dir="rtl"]` selectors
- **Fonts**: Cairo (Arabic), Inter (English) — loaded from Google Fonts via CSS
- **Default language**: Arabic (`"ar"`)

### How Modules Handle It
```tsx
const { language, isRTL } = useLanguage();
// Inline bilingual:
label: language === "ar" ? "إجمالي الطلبات" : "Total Orders"
// From DB (AI-translated):
{isRTL ? (item.titleAr || item.title) : (item.title || item.titleAr)}
```

---

## 11. Payment Integration (Stripe)

### Setup
- `server/stripeProducts.ts` — 3 subscription plans (Basic $29, Business $99, Enterprise $299)
- `server/stripeRouter.ts` — Checkout session creation + webhook handler
- `client/src/pages/Billing.tsx` — Plan selection UI + payment history

### Status
⚠️ **Requires Stripe API keys** to activate. Set `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` / `VITE_STRIPE_PUBLIC_KEY` in `.env`.

---

## 12. Environment Variables

Create a `.env` file in the project root:

```env
# ── Database (REQUIRED) ──
DATABASE_URL=mysql://user:password@host:3306/database_name

# ── Authentication (REQUIRED) ──
JWT_SECRET=your_jwt_secret_here
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://your-oauth-server.com
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
OWNER_OPEN_ID=your_owner_open_id

# ── AI / LLM (REQUIRED for AI features) ──
BUILT_IN_FORGE_API_URL=https://your-llm-api.com
BUILT_IN_FORGE_API_KEY=your_api_key_here

# ── Stripe (OPTIONAL — for payments) ──
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# ── AWS S3 (OPTIONAL — for file uploads) ──
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
S3_BUCKET_NAME=...

# ── Google Maps (OPTIONAL — for map features) ──
GOOGLE_MAPS_API_KEY=...
VITE_GOOGLE_MAPS_API_KEY=...
```

---

## 13. How to Run the Project

### Prerequisites
- **Node.js** 20+
- **pnpm** (package manager) — install with `npm install -g pnpm`
- **MySQL** 8+ database

### Installation
```bash
pnpm install
```

### Development Mode

**On Linux/Mac:**
```bash
pnpm run dev
```

**On Windows (PowerShell):**
```powershell
$env:NODE_ENV="development"; npx tsx watch server/_core/index.ts
```

> ⚠️ The default `dev` script uses Unix-style `NODE_ENV=development` which doesn't work on Windows CMD/PowerShell. Either use the PowerShell command above, or install `cross-env`:
> ```bash
> pnpm add -D cross-env
> ```
> Then update `package.json`:
> ```json
> "dev": "cross-env NODE_ENV=development tsx watch server/_core/index.ts"
> ```

### Run Tests
```bash
pnpm test
```

### Type Check
```bash
pnpm run check
```

---

## 14. Database Setup

### 1. Create MySQL database
```sql
CREATE DATABASE globalbridge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Set `DATABASE_URL` in `.env`
```
DATABASE_URL=mysql://root:password@localhost:3306/globalbridge
```

### 3. Run migrations
```bash
pnpm run db:push
```

### 4. Seed data (optional)
```bash
node seed-exchange.mjs     # 93 trade exchange listings (real products from 25+ countries)
node seed-suppliers.mjs    # 18 global e-commerce platform suppliers
```

---

## 15. Build & Deploy

### Production Build
```bash
pnpm run build
```

This runs:
1. `vite build` → Compiles client to `dist/public/`
2. `esbuild` → Bundles server to `dist/index.js`

### Start Production
```bash
pnpm start
# Or: NODE_ENV=production node dist/index.js
```

### Deploy Requirements
- **Node.js** 20+ runtime
- **MySQL** 8+ database
- **Port**: 3000 (configurable via `PORT` env var)
- **Process manager**: PM2 or systemd recommended
- **Reverse proxy**: Nginx recommended for SSL + compression

---

## 16. Remaining Work / What Needs to Be Done

### Critical — Before Publishing

| Task | Details |
|---|---|
| **Fix Windows dev script** | Add `cross-env` or update script for cross-platform compatibility |
| **Configure OAuth** | The app uses an OAuth flow pointing to an external portal. You need to either: (a) set up your own OAuth server, (b) replace with a simpler auth (email/password), or (c) use a service like Auth0/Clerk |
| **Configure LLM API** | Replace Forge API URL with your own OpenAI-compatible API endpoint (the code already uses the OpenAI chat.completions format) |
| **Set up MySQL** | Create database, run migrations, configure `DATABASE_URL` |
| **Create `.env` file** | Set all required environment variables (see section 12) |

### Important — For Production Quality

| Task | Details |
|---|---|
| **Replace OAuth with permanent auth** | Current OAuth setup depends on an external portal. Implement email/password auth or integrate Auth0/Clerk/Firebase Auth |
| **Add proper error boundaries** | Some pages may crash if API calls fail without DB connection |
| **Add loading states** | Not all pages handle loading/empty states gracefully |
| **Add data export** | Allow users to export data as CSV/PDF |
| **Mobile responsiveness** | Some complex pages (Exchange, GlobalSearch) need mobile optimization |
| **Rate limiting** | Add rate limiting to tRPC procedures (especially AI-heavy ones) |
| **Input validation** | Strengthen Zod schemas on server procedures |
| **Add CORS config** | Configure proper CORS for production domain |

### Nice to Have — Premium Features

| Task | Details |
|---|---|
| **Email integration** | Connect to real SMTP/IMAP for actual email sending/receiving |
| **SMS notifications** | Add Twilio for mobile notifications |
| **PDF generation** | Generate contract/report PDFs server-side |
| **Multi-language expansion** | Add French, Turkish, other languages |
| **Audit log** | Track all user actions for compliance |
| **2FA** | Two-factor authentication |
| **File preview** | In-app document viewer |
| **Dashboard charts from history** | Add time-series revenue/order charts based on actual historical data |

---

## 17. Final Product Vision

### What the Final Product Should Look Like

**GlobalBridge AI** should be a production SaaS platform that looks and feels like a **premium business command center**. Think of it as **Salesforce meets Alibaba meets an AI assistant**, specifically designed for international trade professionals.

### User Experience

1. **Landing Page** (`/`) — Marketing page showcasing features, pricing plans, testimonials. Login/signup buttons.

2. **Executive Dashboard** (`/dashboard`) — After login, users see:
   - Real-time KPIs (orders, revenue, contracts, shipments)
   - AI Daily Briefing (urgent actions, opportunities, market insights)
   - Activity distribution chart
   - Recent activity feed
   - Quick action buttons

3. **Sidebar Navigation** — Grouped into:
   - **Core**: Dashboard, Emails, Notifications
   - **Operations**: Tenders, Suppliers, Products, Orders, Shipments, Contracts, Payments
   - **Business Intelligence**: CRM, Competitors, Marketing, Reports, Exchange, Warehouses, Trade Finance
   - **AI & Advanced**: AI Assistant, Global Search, Voice Commands, Auctions, Map, Tender Intel

4. **Every Module Should**:
   - List items in a clean table/card view with search & filters
   - Create new items via modal forms
   - Show AI analysis/insights inline
   - Support Arabic and English seamlessly
   - Show loading skeletons, empty states, and error states

5. **AI Features Visible Everywhere**:
   - ✨ sparkle icons indicate AI-generated content
   - AI search bar accessible via Cmd+K from any page
   - Voice command support
   - AI chat assistant

### Visual Design Standards
- **Dark theme** as default (professional, modern feel)
- **Glassmorphism** effects on cards
- **Smooth animations** (hover effects, transitions)
- **Consistent spacing** and typography
- **Accessible** color contrast ratios
- **Responsive** down to tablet (768px minimum)

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **API response time**: < 500ms (non-AI), < 5s (AI-powered)
- **Real-time bid updates**: < 200ms latency

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                       CLIENT                            │
│  React 19 + TypeScript + Tailwind + Radix UI            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ 29 Pages │  │ GBLayout │  │ AI Search│              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       └──────────────┴──────────────┘                   │
│                      │                                  │
│              tRPC Client + React Query                  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP + WebSocket
┌──────────────────────┴──────────────────────────────────┐
│                       SERVER                            │
│  Express + tRPC + Socket.IO                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Routers  │  │ Auth/JWT │  │ Scheduler│              │
│  │(20+ mods)│  │  OAuth   │  │ (6h auto)│              │
│  └────┬─────┘  └──────────┘  └──────────┘              │
│       │                                                 │
│  ┌────┴─────┐  ┌──────────┐  ┌──────────┐              │
│  │Drizzle   │  │ LLM API  │  │ Stripe   │              │
│  │  ORM     │  │(Gemini)  │  │ Webhooks │              │
│  └────┬─────┘  └──────────┘  └──────────┘              │
└───────┼─────────────────────────────────────────────────┘
        │
┌───────┴─────────┐  ┌──────────┐  ┌──────────┐
│    MySQL 8+     │  │  AWS S3  │  │  Stripe  │
│  (20+ tables)   │  │ (files)  │  │ (payment)│
└─────────────────┘  └──────────┘  └──────────┘
```

---

*This document covers the complete technical requirements and architecture of the GlobalBridge AI Platform. For questions or clarifications, refer to the 01098558668 " SAMEH " .*
