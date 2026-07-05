import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SeqRepr from '../../components/SeqRepr';
import SequenceRepr from '../../components/SequenceRepr';
import SequenceReprLine from '../../components/SequenceReprLine';
import type { ResultsOneResultProps } from '../../types';

interface ResultsSeqProps {
  sequence: ResultsOneResultProps;
  colorMap?: Record<string, string>;
}

const RANK_COLORS: Record<number, string> = {
  1: '#f59e0b',
  2: '#94a3b8',
  3: '#b87333',
};

const RANK_LABELS: Record<number, string> = {
  1: '#1',
  2: '#2',
  3: '#3',
};

function scoreColor(s: number): string {
  if (s >= 0.8) return '#198754';
  if (s >= 0.5) return '#fd7e14';
  return '#dc3545';
}

const MAX_PREVIEW = 8;

function ResultsSeq({ sequence, colorMap = {} }: ResultsSeqProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { rank, score, sequence: seq } = sequence;
  const pct = (score * 100).toFixed(1);
  const rankColor = RANK_COLORS[rank] ?? '#9c86ec';
  const sColor = scoreColor(score);
  const previewActivities = seq.activities.slice(0, MAX_PREVIEW);
  const overflow = seq.activities.length - MAX_PREVIEW;

  return (
    <div
      className="border rounded mb-3"
      style={{ borderColor: rankColor, backgroundColor: '#fff', overflow: 'hidden' }}
    >
      {/* Barre colorée du rang en haut */}
      <div style={{ height: 4, backgroundColor: rankColor }} />

      <div className="p-3">
        {/* En-tête : rang + id + score */}
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            {/* Badge rang */}
            <div
              className="rounded d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{
                width: 36,
                height: 36,
                backgroundColor: rankColor + '22',
                border: `2px solid ${rankColor}`,
                color: rankColor,
                fontSize: 15,
              }}
            >
              {RANK_LABELS[rank] ?? `#${rank}`}
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: 15 }}>
                {t('results.sequence_label')} {seq.id}
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                {t('results.activities_count', { n: seq.length, dur: seq.total_durations })}
              </div>
            </div>
          </div>

          {/* Score de similarité */}
          <div className="text-center flex-shrink-0">
            <div
              className="fw-bold"
              style={{ fontSize: 26, color: sColor, lineHeight: 1 }}
            >
              {pct}%
            </div>
            <div style={{ fontSize: 11, color: '#888' }}>{t('results.similarity')}</div>
          </div>
        </div>

        {/* Aperçu des activités */}
        <div className="d-flex flex-wrap align-items-center gap-1 mb-2">
          {previewActivities.map((a, i) => (
            <div key={i} className="d-flex align-items-center gap-1">
              <SeqRepr
                name={a.name}
                duration={a.duration}
                color={colorMap[a.name] ?? '#9c86ec'}
              />
              {i < previewActivities.length - 1 && (
                <span className="text-secondary" style={{ fontSize: 12 }}>→</span>
              )}
            </div>
          ))}
          {overflow > 0 && (
            <span className="text-muted ms-1" style={{ fontSize: 12 }}>
              {t('results.more_activities', { n: overflow })}
            </span>
          )}
        </div>

        {/* Bouton expand */}
        <button
          className="btn btn-sm w-100"
          style={{
            backgroundColor: open ? '#f3f2fd' : '#fff',
            border: '1px solid #9c86ec',
            color: '#4f46e5',
            fontSize: 12,
          }}
          onClick={() => setOpen(o => !o)}
        >
          {open ? `▲ ${t('results.hide_full')}` : `▼ ${t('results.view_full')}`}
        </button>
      </div>

      {/* Section dépliable */}
      {open && (
        <div
          className="px-3 pb-3"
          style={{ borderTop: '1px solid #e9eaee', backgroundColor: '#fafafa' }}
        >
          <div className="mt-3 mb-2 fw-semibold" style={{ fontSize: 13, color: '#272727' }}>
            {t('results.all_activities')}
          </div>
          <div className="d-flex flex-wrap">
            {seq.activities.map((a, i) => (
              <SequenceRepr
                key={i}
                name={a.name}
                duration={a.duration}
                color={colorMap[a.name] ?? '#9c86ec'}
              />
            ))}
          </div>

          <div className="mt-3 mb-1 fw-semibold" style={{ fontSize: 13, color: '#272727' }}>
            {t('results.time_distribution')}
          </div>
          <div className="rounded overflow-hidden d-flex" style={{ height: 36, border: '1px solid #e9eaee' }}>
            {seq.activities.map((a, i) => (
              <SequenceReprLine
                key={i}
                name={a.name}
                duration={a.duration}
                totalDuration={seq.total_durations}
                color={colorMap[a.name] ?? '#9c86ec'}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between mt-1" style={{ fontSize: 11, color: '#888' }}>
            <span>0 min</span>
            <span>{seq.total_durations} min</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsSeq;
