// SeqStats: carte d'une séquence — aperçu + timeline dépliable.
// Pas d'emoji, couleurs via colorMap de l'ontologie.

import { useState } from 'react';
import SequenceReprLine from '../../components/SequenceReprLine';
import type { Sequence } from '../../api';

interface SeqStatsProps {
  sequence: Sequence;
  colorMap: Record<string, string>;
}

function SeqStats({ sequence, colorMap }: SeqStatsProps) {
  const [open, setOpen] = useState(false);

  const gapCount = sequence.activities.filter(a => a.name === 'missing').length;

  return (
    <div className="border rounded mb-2" style={{ backgroundColor: '#fafafa', borderColor: '#e9eaee' }}>
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center p-3">
        <div>
          <span className="fw-semibold" style={{ fontSize: 14 }}>{sequence.label}</span>
          <span className="text-muted ms-3" style={{ fontSize: 12 }}>
            {sequence.length} activité{sequence.length > 1 ? 's' : ''} &bull; {sequence.total_duration} min
          </span>
          {gapCount > 0 && (
            <span
              className="ms-2 badge"
              style={{ backgroundColor: '#fef3c7', color: '#92400e', fontSize: 11 }}
            >
              {gapCount} trou{gapCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          className="btn btn-sm"
          style={{ border: '1px solid #9c86ec', color: '#4f46e5', fontSize: 12 }}
          onClick={() => setOpen(o => !o)}
        >
          {open ? '▲ Masquer' : '▼ Voir la timeline'}
        </button>
      </div>

      {/* Timeline dépliable */}
      {open && (
        <div className="px-3 pb-3">
          {/* Légende des activités */}
          <div className="d-flex flex-wrap gap-2 mb-2">
            {[...new Set(sequence.activities.map(a => a.name))].map(name => (
              <span key={name} className="d-flex align-items-center gap-1" style={{ fontSize: 11 }}>
                <span
                  className="rounded-circle"
                  style={{ width: 10, height: 10, backgroundColor: colorMap[name] ?? '#9c86ec', display: 'inline-block' }}
                />
                <span className="text-capitalize">{name}</span>
              </span>
            ))}
          </div>

          {/* Barre temporelle proportionnelle */}
          <div
            className="d-flex rounded overflow-hidden"
            style={{ height: 36, border: '1px solid #e9eaee' }}
          >
            {sequence.activities.map((a, i) => (
              <SequenceReprLine
                key={i}
                name={a.name}
                duration={a.duration}
                totalDuration={sequence.total_duration}
                color={colorMap[a.name] ?? '#9c86ec'}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between mt-1" style={{ fontSize: 11, color: '#888' }}>
            <span>0 min</span>
            <span>{sequence.total_duration} min</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeqStats;
