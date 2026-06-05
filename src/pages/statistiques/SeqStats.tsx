// SeqStats: one sequence card showing label, stats, and temporal timeline.
// SeqRepr and SequenceRepr removed — only the timeline visualization is kept.
// Expand/collapse via useState, not document.getElementById.

import { useState, type JSX } from 'react';
import ArrowsIcon from '../../components/icons/ArrowsIcon';
import SequenceReprLine from '../../components/SequenceReprLine';
import type { DatasetSequenceProps } from '../../types';

interface SeqStatsProps {
  sequence: DatasetSequenceProps;
  colorMap: Record<string, string>;
}

function SeqStats({ sequence, colorMap }: SeqStatsProps) {
  const [open, setOpen] = useState(false);

  const gapCount = sequence.activities.filter(a => a.name === 'missing').length;

  const timelineItems: JSX.Element[] = sequence.activities.map((activity, i) => (
    <SequenceReprLine
      key={i}
      name={activity.name}
      duration={activity.duration}
      totalDuration={sequence.total_duration}
      color={colorMap[activity.name]}
    />
  ));

  return (
    <div className="border rounded mb-2" style={{ backgroundColor: '#fafafa' }}>
      <div className="d-flex justify-content-between align-items-center p-3">
        <div>
          <span className="fw-semibold" style={{ fontSize: 14 }}>{sequence.label}</span>
          <span className="text-muted ms-3" style={{ fontSize: 12 }}>
            {sequence.length} activities &bull; {sequence.total_duration} min
            {gapCount > 0 && <span className="ms-2 text-warning">&#10067; {gapCount} gap(s)</span>}
          </span>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOpen(o => !o)}
          title={open ? 'Collapse' : 'Expand timeline'}
        >
          <ArrowsIcon />
        </button>
      </div>

      {open && (
        <div className="px-3 pb-3">
          <div className="text-muted mb-1" style={{ fontSize: 12 }}>Temporal visualization:</div>
          <div className="d-flex" style={{ borderRadius: 4, overflow: 'hidden' }}>
            {timelineItems}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeqStats;
