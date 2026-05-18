# 💰 Work Hour Tracker

A simple payrate tracker built with **React**, **Vite**, and **Tailwind CSS**.  
Track your salary and working hours by date, visualize trends with charts, and export data to Excel.

> **No database needed** — your data lives in a `.json` file on your computer.

---

## ✨ Features

- 📝 **Add / Edit / Delete** entries with date, hours worked, salary, and an optional note
- 📊 **Visual charts** — toggle between Salary, Hours Worked, and Pay Rate graphs
- 📋 **Records table** with auto-calculated pay rate per hour and summary stats
- 💾 **Save to JSON file** on your disk — works in any browser, including incognito
- 📂 **Load from JSON file** — reload your data anytime
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

---

## 💾 How to Save & Load Data (No Database Needed)

Data is stored in a plain `.json` file on your computer — no server, no database required.

### First time setup
1. Add your entries using the form
2. Click **💾 Save As…** in the header
3. Choose a folder (e.g. `Documents`) and save as `payrate-data.json`
4. Every change from now on **auto-saves** to that file instantly ✅

### Every time you open the app
1. Open the app → click **📂 Open JSON**
2. Pick your saved `payrate-data.json` file
3. All your data loads back immediately ✅

> 💡 This works even in **incognito mode** or after clearing browser data, because the data lives on your disk — not in the browser.

### Manually editing data
You can also open `payrate-data.json` in any text editor (VS Code, Notepad) and edit entries directly. The format is:

```json
[
  {
    "date": "2026-01-09",
    "hours": 16.1,
    "salary": 148.60,
    "note": "optional note",
    "payRate": 9.23,
    "id": 1700000000024
  }
]
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
├── hooks/
│   └── useJsonFile.js       # File save/load logic
├── components/
│   ├── EntryForm.jsx        # Input form
│   ├── DataTable.jsx        # Records table + summary
│   ├── PayChart.jsx         # Visual charts
│   └── ExportButton.jsx     # Excel export
```
