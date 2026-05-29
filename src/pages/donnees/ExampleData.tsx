import { useState } from 'react';
import { loadDefaultDataset } from '../../api';

interface ExampleDataProps {
  onLoad: () => void;
  onDatasetReady: (id: string) => void;
}

function ExampleData({ onLoad, onDatasetReady }: ExampleDataProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loadDefaultDataset();
      if (res.dataset_id) {
        onDatasetReady(res.dataset_id);
      }
      setLoaded(true);
      onLoad();
    } catch {
      setError("Impossible de charger les données. Le backend est-il démarré ?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="border rounded p-4 text-center d-flex flex-column align-items-center justify-content-center"
      style={{
        borderStyle: 'dashed',
        borderColor: '#dee2e6',
        backgroundColor: '#fafafa',
        minHeight: 260,
      }}
    >
      {/* Icône base de données */}
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className="mb-3"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>

      <h5 className="fw-semibold mb-1">Données d'exemple</h5>
      <p className="text-muted mb-3" style={{ fontSize: 14 }}>
        Datasets générés : 50 séquences d'activités humaines + 50 séquences météo
      </p>

      <button
        className="btn px-4 text-white"
        style={{
          backgroundColor: loaded ? '#15803d' : '#16a34a',
          borderColor: loaded ? '#15803d' : '#16a34a',
        }}
        onClick={handleLoad}
        disabled={loading || loaded}
      >
        {loading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
        {loaded ? '✓ Données chargées' : "Charger les données d'exemple"}
      </button>

      {error && (
        <p className="text-danger mt-2 mb-0" style={{ fontSize: 12 }}>{error}</p>
      )}
    </div>
  );
}

export default ExampleData;