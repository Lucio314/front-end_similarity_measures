import { useTranslation } from 'react-i18next';
import type { ResultsSummaryProps } from '../../types';

interface ResultsInformationsProps {
  summary: ResultsSummaryProps;
}

function scoreColor(s: number): string {
  if (s >= 0.8) return '#198754';
  if (s >= 0.5) return '#fd7e14';
  return '#dc3545';
}

function ResultsInformations({ summary }: ResultsInformationsProps) {
  const { t } = useTranslation();
  const pct = (summary.best_score * 100).toFixed(0);
  const color = scoreColor(summary.best_score);

  return (
    <div className="row g-3 mb-4">

      {/* Nb résultats */}
      <div className="col-md-4">
        <div
          className="border rounded p-3 text-center h-100"
          style={{ borderColor: '#9c86ec', backgroundColor: '#f8f7ff' }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5', lineHeight: 1.1 }}>
            {summary.total_results}
          </div>
          <div className="mt-1" style={{ fontSize: 13, color: '#555' }}>
            {t('results.results_found')}
          </div>
        </div>
      </div>

      {/* Meilleure similarité */}
      <div className="col-md-4">
        <div
          className="border rounded p-3 text-center h-100"
          style={{ borderColor: color, backgroundColor: color + '11' }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color, lineHeight: 1.1 }}>
            {pct}%
          </div>
          <div className="mt-1" style={{ fontSize: 13, color: '#555' }}>
            {t('results.best_score')}
          </div>
        </div>
      </div>

      {/* Durée moyenne */}
      <div className="col-md-4">
        <div
          className="border rounded p-3 text-center h-100"
          style={{ borderColor: '#9c86ec', backgroundColor: '#f8f7ff' }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5', lineHeight: 1.1 }}>
            {summary.avg_duration}
          </div>
          <div className="mt-1" style={{ fontSize: 13, color: '#555' }}>
            {t('results.avg_duration')}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ResultsInformations;
