import { useState, useEffect } from 'react'

const emptyForm = { date: '', hours: '', salary: '', note: '' }

export default function EntryForm({ onSubmit, editingEntry, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingEntry) {
      setForm({
        date: editingEntry.date,
        hours: String(editingEntry.hours),
        salary: String(editingEntry.salary),
        note: editingEntry.note || '',
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [editingEntry])

  const validate = () => {
    const e = {}
    if (!form.date) e.date = 'Date is required'
    if (!form.hours || isNaN(form.hours) || Number(form.hours) <= 0)
      e.hours = 'Enter valid hours (> 0)'
    if (!form.salary || isNaN(form.salary) || Number(form.salary) <= 0)
      e.salary = 'Enter valid salary (> 0)'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const entry = {
      ...(editingEntry ? { id: editingEntry.id } : {}),
      date: form.date,
      hours: Number(form.hours),
      salary: Number(form.salary),
      note: form.note.trim(),
      payRate: Number((Number(form.salary) / Number(form.hours)).toFixed(2)),
    }
    onSubmit(entry)
    setForm(emptyForm)
    setErrors({})
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {field('Date', 'date', 'date')}
      {field('Hours Worked', 'hours', 'number', 'e.g. 8')}
      {field('Salary / Pay', 'salary', 'number', 'e.g. 120000')}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Note (optional)</label>
        <input
          type="text"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          placeholder="e.g. overtime"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-4 flex gap-3 justify-end">
        {editingEntry && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          {editingEntry ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
    </form>
  )
}
