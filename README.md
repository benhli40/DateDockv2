# 🗓️ DateDock

**DateDock v2** is a lightweight, beautifully-designed weekly scheduler built with pure HTML, CSS, and Vanilla JavaScript. It helps you plan your week, reflect daily, and dock your mind with calm, focused intention.

---

## ✨ Features

- ✅ **Seven-day calendar view** with editable task lists
- ✅ **Checkbox support** — tasks stay completed on reload
- ✅ **Auto-highlight for today’s column**
- ✅ **Daily alert** — tells you what’s on your plate
- ✅ **“Week at a Glance” summary**
- ✅ **Launch modal** shows your upcoming week before you begin
- ✅ **Daily quote for focus & inspiration**
- ✅ **LocalStorage-powered task saving**
- ✅ **Theme system** with `light`, `dark`, and `calm` modes (auto-detects system preference)
- ✅ **Keyboard support** — press Enter to quickly add tasks
- ✅ **Responsive design** for mobile and desktop

---

## 🚀 How It Works

- Tasks are stored in your browser via `localStorage`
- Themes are saved per user and applied on reload
- Drag and drop is supported for rearranging tasks (optional module)
- No dependencies — fast, smooth, and minimalist

---

## 📸 Preview

![DateDock Preview](preview.png)

> _(Optional screenshot or animated GIF goes here!)_

---

## 📁 Folder Structure

datedock/ ├── index.html ├── css/ │ └── style.css ├── js/ │ ├── main.js # Entry point │ ├── calendar.js # Renders the weekly grid │ ├── tasks.js # Task logic (add/delete/checkbox/save) │ ├── storage.js # Handles localStorage persistence │ ├── dragdrop.js # (Optional) Drag-and-drop behavior │ └── script.js # Daily alert, theme toggle, quotes, UI polish ├── data/ │ └── days.json # Fallback seed tasks └── README.md


---

## 📦 Setup

No build tools, no frameworks — just open `index.html` in your browser.

To reset your tasks:  
Click **Clear Week**, or clear browser `localStorage`.

---

## 🧠 Philosophy

> “Don’t overbook. Just dock.”

DateDock isn’t about cramming your calendar — it’s about clarity. It opens with a glance at your week, a quote to inspire you, and a prompt for what matters today. Minimal tools, maximum focus.

---

## ✍️ Creator

Built by [Benjamin Lisle](mailto:benhli40@gmail.com)  
Designed with love, clarity, and clean code ✨

---

## 📘 License

MIT — use it, fork it, evolve it.
