# 🌿 Mindful — Mental Wellness Web App  
A modern, responsive mental wellness application built using **Next.js 14**, **TypeScript**, **Recharts**, and **Tailwind CSS**.  
Mindful helps users track their mood, write daily journal entries, and visualize emotional patterns with clean charts and insights.

---

## ✨ Features

### 🧠 Mood Tracking
- Beautiful emoji-based mood selector  
- Daily reflections  
- Weekly mood trend charts (using Recharts)  
- Dynamic affirmations generated automatically  

### 📓 Personal Journal
- Create, view, and delete journal entries  
- Data stored locally using `localStorage`  
- Clean UI with previews, timestamps, and card layout  
- Sticky sidebar for quick note-taking

### 📊 Dashboard & Visualization
- Bar chart visualization of mood history  
- Responsive and interactive chart components  
- Smooth, modern UI with reusable components

### 🌈 Modern UI Components
Built with:
- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**
- **Recharts**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14 (App Router)** | Routing, server/client components |
| **TypeScript** | Type safety |
| **Recharts** | Charts and data visualization |
| **Lucide Icons** | Clean SVG icons |
| **localStorage** | Persistent client-side data store |
| **TailwindCSS** | Styling |

---

## 📁 Project Structure

```bash
mindful/
├── app/
│   ├── dashboard/
│   ├── journal/
│   ├── mood-tracker/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── textarea.tsx
├── public/
├── styles/
└── README.md
