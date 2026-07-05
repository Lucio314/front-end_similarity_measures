import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadDefaultDataset } from '../../api';

interface ExampleDataProps {
  onLoad: () => void;
  onDatasetReady: (id: string) => void;
}

function ExampleData({ onLoad, onDatasetReady }: ExampleDataProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = async () => {
    setLoading(true); setError(null);
    try {
      const res = await loadDefaultDataset();
      if (res.dataset_id) onDatasetReady(res.dataset_id);
      setLoaded(true); onLoad();
    } catch {
      setError(t('data.example.error'));
    } finally { setLoading(false); }
  };

  return (
    <div className="border rounded p-4 text-center d-flex flex-column align-items-center justify-content-center"
      style={{ borderStyle: 'dashed', borderColor: '#dee2e6', backgroundColor: '#fafafa', minHeight: 260 }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
      <h5 className="fw-semibold mb-1">{t('data.example.title')}</h5>
      <p className="text-muted mb-3" style={{ fontSize: 14 }}>{t('data.example.subtitle')}</p>
      <button className="btn px-4 text-white"
        style={{ backgroundColor: loaded ? '#15803d' : '#16a34a', borderColor: loaded ? '#15803d' : '#16a34a' }}
        onClick={handleLoad} disabled={loading || loaded}>
        {loading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
        {loaded ? t('data.example.loaded') : t('data.example.load')}
      </button>
      {error && <p className="text-danger mt-2 mb-0" style={{ fontSize: 12 }}>{error}</p>}
    </div>
  );
}

export default ExampleData;
