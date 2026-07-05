// MissingsStratManagement: sélection d'une stratégie de gestion des trous.
// L'application effective est déléguée au parent (MissingsPage).

import { useEffect, useState } from 'react';
import { getMissingStrategies } from '../../api';
import type { MissingStrategy } from '../../api';
import Pros from '../../components/Pros';
import Cons from '../../components/Cons';
import CheckedIcon from '../../components/icons/CheckedIcon';

interface MissingsStratManagementProps {
  onSelectionChange: (strategyId: string, value?: string) => void;
}

interface StrategyCardProps {
  strategy: MissingStrategy;
  selected: boolean;
  value: string;
  onSelect: () => void;
  onValueChange: (v: string) => void;
}

function StrategyCard({ strategy, selected, value, onSelect, onValueChange }: StrategyCardProps) {
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
      <div className="d-flex align-items-start justify-content-between mb-1">
        <h6 className="fw-semibold mb-0" style={{ fontSize: 14 }}>{strategy.label}</h6>
        {selected && <CheckedIcon />}
      </div>
      <p className="text-muted mb-2" style={{ fontSize: 12 }}>{strategy.description}</p>

      {/* Champ valeur si requis */}
      {selected && strategy.requires_value && (
        <input
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="Nom de l'activité de remplacement (ex: home)"
          value={value}
          onChange={e => { e.stopPropagation(); onValueChange(e.target.value); }}
          onClick={e => e.stopPropagation()}
          style={{ fontSize: 12 }}
        />
      )}

      <button
        className="btn btn-sm btn-outline-secondary"
        style={{ fontSize: 11, padding: '1px 8px' }}
        onClick={e => { e.stopPropagation(); setShowDetails(v => !v); }}
      >
        {showDetails ? 'Masquer les détails' : 'Voir les détails'}
      </button>

      {showDetails && (
        <div className="mt-3 pt-2" style={{ borderTop: '1px solid #e2e8f0' }} onClick={e => e.stopPropagation()}>
          <div className="row g-2">
            <div className="col-6"><Pros avantages={strategy.advantages} /></div>
            <div className="col-6"><Cons inconvenients={strategy.disadvantages} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

function MissingsStratManagement({ onSelectionChange }: MissingsStratManagementProps) {
  const [strategies, setStrategies] = useState<MissingStrategy[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');
  const [fillValue, setFillValue]   = useState('');

  useEffect(() => {
    getMissingStrategies()
      .then(data => {
        setStrategies(data);
        if (data.length > 0) {
          setSelectedId(data[0].id);
          onSelectionChange(data[0].id);
        }
      })
      .catch(() => setError('Erreur lors du chargement des stratégies.'))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setFillValue('');
    onSelectionChange(id);
  };

  const handleValueChange = (v: string) => {
    setFillValue(v);
    onSelectionChange(selectedId, v);
  };

  if (loading) return (
    <div className="text-center py-3">
      <div className="spinner-border spinner-border-sm text-primary" role="status" />
      <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Chargement des stratégies...</span>
    </div>
  );

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mb-4">
      <div className="border rounded p-3 mb-4" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}>
        <p className="mb-0" style={{ fontSize: 13 }}>
          <strong>Des trous temporels ont été détectés dans votre dataset.</strong>
          {' '}Choisissez comment les traiter avant de lancer la recherche.
        </p>
      </div>
      <div className="row g-3">
        {strategies.map(strategy => (
          <div className="col-md-6" key={strategy.id}>
            <StrategyCard
              strategy={strategy}
              selected={selectedId === strategy.id}
              value={fillValue}
              onSelect={() => handleSelect(strategy.id)}
              onValueChange={handleValueChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissingsStratManagement;
