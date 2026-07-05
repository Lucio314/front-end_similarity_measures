import { useTranslation } from 'react-i18next';
import type { ResultsPatternProps } from '../../types';
import PatternRepr from '../../components/PatternRepr';

interface SearchedPatternProps {
  pattern: ResultsPatternProps;
  method: string;
  colorMap?: Record<string, string>;
}

function SearchedPattern({ pattern, method, colorMap = {} }: SearchedPatternProps) {
  const { t } = useTranslation();
  return (
    <div
      className="border rounded p-4 mb-3"
      style={{ borderColor: '#9c86ec', backgroundColor: '#f8f7ff' }}
    >
      <h6 className="fw-bold mb-3 text-uppercase" style={{ color: '#4f46e5', fontSize: 11, letterSpacing: 1 }}>
        {t('results.searched_pattern')}
      </h6>

      {/* Activités du motif */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        {pattern.activities.map((a, i) => (
          <div key={i} className="d-flex align-items-center gap-2">
            <PatternRepr
              name={a.name}
              duration={a.duration}
              color={colorMap[a.name] ?? '#9c86ec'}
            />
            {i < pattern.activities.length - 1 && (
              <span className="text-secondary fw-bold">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Méta-infos */}
      <div className="d-flex flex-wrap gap-3" style={{ fontSize: 13 }}>
        <span>
          <span className="fw-semibold">{t('results.method_label')} :</span>{' '}
          <span className="badge" style={{ backgroundColor: '#4f46e5', fontSize: 12, fontWeight: 500 }}>
            {method}
          </span>
        </span>
        <span className="text-muted">|</span>
        <span>
          <span className="fw-semibold">{t('results.length_label')} :</span> {pattern.length}
        </span>
        <span className="text-muted">|</span>
        <span>
          <span className="fw-semibold">{t('results.duration_label')} :</span> {pattern.total_durations} {t('results.min')}
        </span>
      </div>
    </div>
  );
}

export default SearchedPattern;
