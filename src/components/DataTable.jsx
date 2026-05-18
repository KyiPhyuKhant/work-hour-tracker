const fmt = (n) => n.toLocaleString()

export default function DataTable({ entries, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
            <th className="pb-2 pr-4">Date</th>
            <th className="pb-2 pr-4">Hours</th>
            <th className="pb-2 pr-4">Salary</th>
            <th className="pb-2 pr-4">Pay Rate / hr</th>
            <th className="pb-2 pr-4">Note</th>
            <th className="pb-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {entries.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50 transition">
              <td className="py-2 pr-4 font-medium text-gray-800">{e.date}</td>
              <td className="py-2 pr-4 text-gray-700">{e.hours}</td>
              <td className="py-2 pr-4 text-green-700 font-semibold">₩{fmt(e.salary)}</td>
              <td className="py-2 pr-4 text-indigo-600 font-semibold">₩{fmt(e.payRate)}</td>
              <td className="py-2 pr-4 text-gray-500 italic">{e.note || '—'}</td>
              <td className="py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(e)}
                  className="text-indigo-500 hover:text-indigo-700 text-xs px-2 py-1 rounded hover:bg-indigo-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary row */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
        <Stat label="Total Entries" value={entries.length} />
        <Stat
          label="Total Hours"
          value={entries.reduce((s, e) => s + e.hours, 0).toFixed(1)}
        />
        <Stat
          label="Total Salary"
          value={`₩${fmt(entries.reduce((s, e) => s + e.salary, 0))}`}
        />
        <Stat
          label="Avg Pay Rate"
          value={`₩${fmt(
            Math.round(
              entries.reduce((s, e) => s + e.payRate, 0) / entries.length
            )
          )}/hr`}
        />
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-gray-800 font-bold text-base">{value}</p>
    </div>
  )
}
