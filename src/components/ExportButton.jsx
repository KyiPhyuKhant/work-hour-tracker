import * as XLSX from 'xlsx'

export default function ExportButton({ entries }) {
  const handleExport = () => {
    if (entries.length === 0) {
      alert('No data to export!')
      return
    }

    const rows = entries.map((e) => ({
      Date: e.date,
      'Hours Worked': e.hours,
      Salary: e.salary,
      'Pay Rate (per hr)': e.payRate,
      Note: e.note || '',
    }))

    // Summary row
    const totalHours = entries.reduce((s, e) => s + e.hours, 0)
    const totalSalary = entries.reduce((s, e) => s + e.salary, 0)
    const avgPayRate = (entries.reduce((s, e) => s + e.payRate, 0) / entries.length).toFixed(2)

    rows.push({})
    rows.push({
      Date: 'TOTAL / AVG',
      'Hours Worked': totalHours,
      Salary: totalSalary,
      'Pay Rate (per hr)': Number(avgPayRate),
      Note: '',
    })

    const ws = XLSX.utils.json_to_sheet(rows)

    // Column widths
    ws['!cols'] = [
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 18 },
      { wch: 20 },
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Payrate Tracker')

    const now = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(wb, `payrate_tracker_${now}.xlsx`)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-indigo-50 transition shadow-sm"
    >
      <span>📥</span> Export Excel
    </button>
  )
}
