# WarungAI · AI Business Assistant for Malaysian SMEs

> Built for GDGKL x GDG Cloud KL "Build with AI" Hackathon powered by Google Gemini & Google DeepMind

---

**Digital Economy & SME(s)** AI Tools for SMEs · Customer Automation · Localized Marketing

---

## 🎯 The Problem
Over **1.2 million warung and SME food stalls** operate in Malaysia. **80% have zero digital tools.**

A typical warung owner faces:
- Can't reply WhatsApp customers fast enough
- Doesn't know which dish is most profitable
- No idea how to write a Raya promo post
- Can't afford to hire marketing or admin help
- Most AI tools are English-only unusable for them

---

## 💡 The Solution
**WarungAI** is a Gemini-powered business assistant built specifically for Malaysian warung and SME owners. It speaks **BM, English, and Manglish** just like them.

### Features
- 🤖 **AI Chat Assistant** — Ask anything about running your warung
- 📢 **Promo Generator** — WhatsApp & Facebook captions in seconds
- 💬 **Customer Reply** — Paste a complaint, get a polite reply instantly
- 📊 **Sales Dashboard** — Daily revenue, top items, weekly trends

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| AI | Google Gemini 2.0 Flash |
| Charts | Recharts |
| Routing | React Router DOM |
| Deployment | Docker + Google Cloud Run |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOURUSERNAME/warung-ai.git
cd warung-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your Gemini API key to .env

# Start development server
npm run dev
