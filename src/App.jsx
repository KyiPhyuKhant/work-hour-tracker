import { useState, useEffect } from 'react'
import EntryForm from './components/EntryForm'
import DataTable from './components/DataTable'
import PayChart from './components/PayChart'
import ExportButton from './components/ExportButton'

const STORAGE_KEY = 'payrate_entries'

export default function App() {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [editingEntry, setEditingEntry] = useState(null)
  const [activeChart, setActiveChart] = useState('salary')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry) => {
    setEntries((prev) =>
      [...prev, { ...entry, id: Date.now() }].sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    )
  }

  const updateEntry = (updated) => {
    setEntries((prev) =>
      prev
        .map((e) => (e.id === updated.id ? updated : e))
        .sort((a, b) => a.date.localeCompare(b.date))
    )
    setEditingEntry(null)
  }

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">💰 Payrate Tracker</h1>
            <p className="text-indigo-200 text-sm mt-0.5">Track salary & hours by date</p>
          </div>
          <ExportButton entries={entries} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Form */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {editingEntry ? '✏️ Edit Entry' : '➕ Add Entry'}
          </h2>
          <EntryForm
            onSubmit={editingEntry ? updateEntry : addEntry}
            editingEntry={editingEntry}
            onCancelEdit={() => setEditingEntry(null)}
          />
        </section>

        {/* Chart */}
        {entries.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-lg font-semibold text-gray-700">📊 Visual Overview</h2>
              <div className="flex gap-2">
                {['salary', 'hours', 'payrate'].map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveChart(key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      activeChart === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {key === 'salary' ? 'Salary' : key === 'hours' ? 'Hours' : 'Pay Rate'}
                  </button>
                ))}
              </div>
            </div>
            <PayChart entries={entries} activeChart={activeChart} />
          </section>
        )}

        {/* Table */}
        {entries.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">📋 Records</h2>
            <DataTable
              entries={entries}
              onEdit={setEditingEntry}
              onDelete={deleteEntry}
            />
          </section>
        )}

        {entries.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <p className="text-5xl mb-3">📭</p>
            <p className="text-lg">No entries yet. Add your first entry above!</p>
          </div>
        )}
      </main>
    </div>
  )
}
