import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { applyMissingStrategy } from '../api';
import MissingsStratManagement from './trous/MissingsStratManagement';

interface MissingsPageProps {
  onNext: () => void;
  onBack: () => void;
}

function MissingsPage({ onNext, onBack }: MissingsPageProps) {
  const { datasetId, setDatasetId } = useAppContext();
  const { t } = useTranslation();

  const [selectedStrategyId, setSelectedStrategyId] = useState<string>('');
  const [fillValue, setFillValue]                   = useState<string | undefined>(undefined);
  const [applying, setApplying]                     = useState(false);
  const [error, setError]                           = useState<string | null>(null);
  const [applied, setApplied]                       = useState(false);
  const [resultInfo, setResultInfo]                 = useState<{ newId: string; count: number } | null>(null);

  const handleSelectionChange = (strategyId: string, value?: string) => {
    setSelectedStrategyId(strategyId);
    setFillValue(value);
    setApplied(false);
    setResultInfo(null);
    setError(null);
  };

  const handleApply = async () => {
    if (!datasetId || !selectedStrategyId) return;
    setApplying(true);
    setError(null);
    try {
      const res = await applyMissingStrategy(datasetId, selectedStrategyId, fillValue);
      setDatasetId(res.new_dataset_id);
      setResultInfo({ newId: res.new_dataset_id, count: res.num_sequences });
      setApplied(true);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { detail?: string } } };
      setError(err?.response?.data?.detail ?? 'Erreur lors de l\'application de la stratégie.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">{t('missing.title')}</h2>
          <p className="text-muted mb-0">
            {t('missing.subtitle')}
          </p>
        </div>

        <MissingsStratManagement onSelectionChange={handleSelectionChange} />

        {/* Recommandation pédagogique */}
        <div className="border rounded p-3 mb-4" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac' }}>
          <p className="mb-0" style={{ fontSize: 13 }}>
            <strong>{t('missing.recommendation_label')}</strong> {t('missing.recommendation_text')}
          </p>
        </div>

        {/* Résultat après application */}
        {applied && resultInfo && (
          <div className="border rounded p-3 mb-4" style={{ backgroundColor: '#eef2ff', borderColor: '#9c86ec' }}>
            <p className="mb-0" style={{ fontSize: 13 }}>
              {t('missing.applied_success', { count: resultInfo.count })}
            </p>
          </div>
        )}

        {/* Erreur */}
        {error && <div className="alert alert-danger" style={{ fontSize: 13 }}>{error}</div>}

        {/* Boutons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn px-4 py-2"
            onClick={onBack}
            style={{ backgroundColor: '#858494', color: '#fff', cursor: 'pointer' }}
          >
            {t('missing.back')}
          </button>

          <div className="d-flex gap-2">
            {/* Appliquer la stratégie */}
            <button
              className="btn px-4 py-2 text-white"
              onClick={handleApply}
              disabled={!selectedStrategyId || applying || !datasetId}
              style={{
                backgroundColor: applied ? '#198754' : '#4f46e5',
                cursor: (!selectedStrategyId || applying) ? 'not-allowed' : 'pointer',
                opacity: (!selectedStrategyId || applying) ? 0.7 : 1,
              }}
            >
              {applying ? t('missing.applying') : applied ? t('missing.apply_done') : t('missing.apply')}
            </button>

            {/* Continuer */}
            {/*  le bouton "contunier" est désativé tant que l'utilisateur n'a pas appliqué la stratégie sélectionnée */}
            <button
              className="btn px-4 py-2 text-white"
              onClick={onNext}
              disabled={!applied}
              style={{
                backgroundColor: '#4f46e5',
                cursor: !applied ? 'not-allowed' : 'pointer',
                opacity: !applied ? 0.7 : 1,
              }}
            >
              {t('missing.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
        
export default MissingsPage;
