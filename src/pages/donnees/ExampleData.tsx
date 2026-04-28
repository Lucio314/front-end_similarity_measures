import { useState } from 'react';

interface ExampleDataProps {
  onLoad: () => void;
}

function ExampleData({ onLoad }: ExampleDataProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = async () => {
    setLoading(true);
    try {
      // TODO: brancher quand l'API est prête
      // await fetch('/api/example-data');
      await new Promise((r) => setTimeout(r, 800)); // simulation
      setLoaded(true);
      onLoad();
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
    </div>
  );
}

export default ExampleData;