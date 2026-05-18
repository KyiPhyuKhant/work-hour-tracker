# 💰 Work Hour Tracker

A simple payrate tracker built with **React**, **Vite**, and **Tailwind CSS**.  
Track your salary and working hours by date, visualize trends with charts, and export data to Excel.

---

## ✨ Features

- 📝 **Add / Edit / Delete** entries with date, hours worked, salary, and an optional note
- 📊 **Visual charts** — toggle between Salary, Hours Worked, and Pay Rate graphs
- 📋 **Records table** with auto-calculated pay rate per hour and summary stats
- 💾 **Auto-save** via `localStorage` — data persists on page refresh
- 📥 **Export to Excel** (.xlsx) with one click

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)

### Install & Run

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Recharts](https://recharts.org/) | Charts |
| [xlsx](https://www.npmjs.com/package/xlsx) | Excel export |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Main app layout
├── components/
│   ├── EntryForm.jsx        # Input form
│   ├── DataTable.jsx        # Records table + summary
│   ├── PayChart.jsx         # Visual charts
│   └── ExportButton.jsx     # Excel export
```
