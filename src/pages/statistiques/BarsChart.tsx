import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import type { DataStatsProps } from '../../types';

interface BarsChartProps { dataset: DataStatsProps[]; }

const PALETTE = ['#6366f1','#8b5cf6','#ec4899','#10b981','#f97316','#3b82f6','#14b8a6','#f59e0b','#ef4444','#84cc16'];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border rounded p-2 shadow-sm" style={{ backgroundColor: '#fff', fontSize: 12 }}>
      <strong>{label}</strong>
      <div>Count: <strong>{payload[0].value}</strong></div>
    </div>
  );
}

function BarsChart({ dataset }: BarsChartProps) {
  const { t } = useTranslation();
  const chartData = [...dataset].sort((a, b) => b.value - a.value);

  return (
    <div className="border rounded p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">{t('stats.activity_dist')}</h6>
        <span className="text-muted" style={{ fontSize: 12 }}>{t('stats.ordered_by')}</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize: 11 }} width={35} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, i) => <Cell key={entry.name} fill={PALETTE[i % PALETTE.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarsChart;
