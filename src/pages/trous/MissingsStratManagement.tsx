// MissingsStratManagement: displays strategies from GET /api/missing-strategies.
// Hardcoded STRATEGIES constant replaced by API call.
// Pros/cons hidden by default, shown on "Show details" toggle per strategy.
// Accordion selection managed by useState, not document.getElementById.

import { useEffect, useState } from 'react';
import { getMissingStrategies } from '../../api';
import type { MissingStrategy } from '../../api';
import Pros from '../../components/Pros';
import Cons from '../../components/Cons';
import CheckedIcon from '../../components/icons/CheckedIcon';

interface StrategyCardProps {
  strategy: MissingStrategy;
  selected: boolean;
  onSelect: () => void;
}

function StrategyCard({ strategy, selected, onSelect }: StrategyCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="border rounded p-3 h-100"
      style={{
        cursor: 'pointer',
        borderColor: selected ? '#4f46e5' : '#dee2e6',
        backgroundColor: selected ? '#eef2ff' : '#fff',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onClick={onSelect}
    >
      <div className="d-flex align-items-start gap-3">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <h6 className="fw-semibold mb-1" style={{ fontSize: 14 }}>{strategy.label}</h6>
            {selected && <CheckedIcon />}
          </div>
          <p className="text-muted mb-2" style={{ fontSize: 12 }}>{strategy.description}</p>
          <button
            className="btn btn-sm btn-outline-secondary"
            style={{ fontSize: 11, padding: '1px 8px' }}
            onClick={e => { e.stopPropagation(); setShowDetails(v => !v); }}
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 pt-2" style={{ borderTop: '1px solid #e2e8f0' }} onClick={e => e.stopPropagation()}>
          <div className="row g-2">
            <div className="col-6">
              <Pros avantages={strategy.advantages} />
            </div>
            <div className="col-6">
              <Cons inconvenients={strategy.disadvantages} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MissingsStratManagement() {
  const [strategies, setStrategies] = useState<MissingStrategy[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    getMissingStrategies()
      .then(data => {
        setStrategies(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setError('Failed to load strategies.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="text-center py-3">
      <div className="spinner-border spinner-border-sm text-primary" role="status" />
      <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Loading strategies...</span>
    </div>
  );

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mb-4">
      <div className="border rounded p-3 mb-4" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}>
        <p className="mb-0" style={{ fontSize: 13 }}>
          <strong>Temporal gaps detected in your dataset.</strong>
          {' '}Choose how to handle missing activities before running the search.
        </p>
      </div>
      <div className="row g-3">
        {strategies.map(strategy => (
          <div className="col-md-6" key={strategy.id}>
            <StrategyCard
              strategy={strategy}
              selected={selectedId === strategy.id}
              onSelect={() => setSelectedId(strategy.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissingsStratManagement;
