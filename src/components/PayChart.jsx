import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const CHART_CONFIG = {
  salary: {
    dataKey: 'salary',
    label: 'Salary (₩)',
    color: '#4f46e5',
    type: 'bar',
    tickFormatter: (v) => `₩${(v / 1000).toFixed(0)}k`,
  },
  hours: {
    dataKey: 'hours',
    label: 'Hours Worked',
    color: '#0ea5e9',
    type: 'bar',
    tickFormatter: (v) => `${v}h`,
  },
  payrate: {
    dataKey: 'payRate',
    label: 'Pay Rate (₩/hr)',
    color: '#10b981',
    type: 'line',
    tickFormatter: (v) => `₩${(v / 1000).toFixed(0)}k`,
  },
}

const CustomTooltip = ({ active, payload, label, activeChart }) => {
  if (!active || !payload?.length) return null
  const cfg = CHART_CONFIG[activeChart]
  const value = payload[0]?.value
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p style={{ color: cfg.color }} className="font-bold">
        {activeChart === 'hours' ? `${value} hrs` : `₩${value?.toLocaleString()}`}
      </p>
    </div>
  )
}

export default function PayChart({ entries, activeChart }) {
  const cfg = CHART_CONFIG[activeChart]

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={entries} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={cfg.tickFormatter}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip activeChart={activeChart} />} />
        <Legend />
        {cfg.type === 'bar' ? (
          <Bar
            dataKey={cfg.dataKey}
            name={cfg.label}
            fill={cfg.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={60}
          />
        ) : (
          <Line
            type="monotone"
            dataKey={cfg.dataKey}
            name={cfg.label}
            stroke={cfg.color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: cfg.color }}
            activeDot={{ r: 6 }}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
