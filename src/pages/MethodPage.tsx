import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMethods } from '../api';
import type { Method } from '../api';

interface MethodPageProps {
  onNext: () => void;
  onBack: () => void;
  onMethodSelect: (method: Method) => void;
}

function PropBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <span
      className="badge me-1"
      style={{
        backgroundColor: value ? '#dcfce7' : '#fee2e2',
        color: value ? '#166534' : '#991b1b',
        fontSize: 11,
      }}
    >
      {value ? 'Yes' : 'No'} {label}
    </span>
  );
}

function MethodSlide({ method, selected, onSelect }: { method: Method; selected: boolean; onSelect: () => void }) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="border rounded p-4 h-100"
      style={{
        borderColor: selected ? '#4f46e5' : '#dee2e6',
        backgroundColor: selected ? '#eef2ff' : '#fff',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
        minHeight: 320,
      }}
      onClick={onSelect}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span className="badge mb-1" style={{ backgroundColor: '#4f46e5', color: '#fff', fontSize: 12 }}>
            {method.name}
          </span>
          <h5 className="fw-bold mb-0" style={{ fontSize: 16 }}>{method.label}</h5>
        </div>
        {selected && (
          <span className="badge" style={{ backgroundColor: '#4f46e5', color: '#fff', fontSize: 11 }}>
            {t('method.selected_badge')}
          </span>
        )}
      </div>

      <p className="text-muted mb-3" style={{ fontSize: 13 }}>{method.description}</p>

      <div className="mb-3">
        <PropBadge label={t('method.symmetry')}              value={method.properties.symmetry} />
        <PropBadge label={t('method.normalized')}            value={method.properties.normalized} />
        <PropBadge label={t('method.metric')}                value={method.properties.metric} />
        <PropBadge label={t('method.requires_ontology')}     value={method.properties.requires_ontology} />
        <PropBadge label={t('method.supports_diff_lengths')} value={method.properties.supports_different_lengths} />
      </div>

      {method.semantic_measure && (
        <div className="mb-3">
          <span className="badge" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', fontSize: 11 }}>
            {t('method.semantic_label')}: {method.semantic_measure.name}
          </span>
        </div>
      )}

      <button
        className="btn btn-sm btn-outline-secondary"
        style={{ fontSize: 12 }}
        onClick={e => { e.stopPropagation(); setShowDetails(v => !v); }}
      >
        {showDetails ? t('method.hide_details_btn') : t('method.show_details_btn')}
      </button>

      {showDetails && (
        <div className="mt-3 pt-2" style={{ borderTop: '1px solid #e2e8f0', fontSize: 13 }}
          onClick={e => e.stopPropagation()}>
          <div className="mb-2">
            <strong>{t('method.principle_label')} :</strong>
            <p className="text-muted mb-1" style={{ fontSize: 12 }}>{method.principle}</p>
          </div>
          <div className="row g-2">
            <div className="col-6">
              <strong style={{ fontSize: 12 }}>{t('method.advantages')}</strong>
              <ul className="mb-0" style={{ fontSize: 12, paddingLeft: 16 }}>
                {method.advantages.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="col-6">
              <strong style={{ fontSize: 12 }}>{t('method.limitations')}</strong>
              <ul className="mb-0" style={{ fontSize: 12, paddingLeft: 16 }}>
                {method.limitations.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          </div>
          {method.semantic_measure && (
            <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#eff6ff', fontSize: 12 }}>
              <strong>{t('method.formula_label')} : </strong>
              <code>{method.semantic_measure.formula}</code>
              <span className="ms-2 text-muted">
                {t('method.range_label')} [{method.semantic_measure.range[0]}, {method.semantic_measure.range[1]}]
              </span>
            </div>
          )}
          <div className="mt-2">
            <strong style={{ fontSize: 12 }}>{t('method.parameters')} : </strong>
            {method.params.length > 0
              ? method.params.map((p, i) => <code key={i} className="me-1" style={{ fontSize: 11 }}>{p}</code>)
              : <span className="text-muted" style={{ fontSize: 12 }}>{t('method.params_none')}</span>
            }
          </div>
        </div>
      )}
    </div>
  );
}

function MethodPage({ onNext, onBack, onMethodSelect }: MethodPageProps) {
  const { t } = useTranslation();
  const [methods, setMethods]       = useState<Method[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  useEffect(() => {
    getMethods()
      .then(data => {
        setMethods(data);
        if (data.length > 0) {
          setSelectedMethod(data[0].name);
          onMethodSelect(data[0]);
        }
      })
      .catch(() => setError(t('method.failed')))
      .finally(() => setLoading(false));
  }, []);

  const prev = () => setActiveIdx(i => (i - 1 + methods.length) % methods.length);
  const next = () => setActiveIdx(i => (i + 1) % methods.length);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">{t('method.title')}</h2>
          <p className="text-muted mb-0">{t('method.subtitle')}</p>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2 text-muted">{t('method.loading')}</p>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && methods.length > 0 && (
          <>
            <div className="d-flex align-items-center gap-3 mb-3">
              <button className="btn btn-outline-secondary" onClick={prev} style={{ minWidth: 40, minHeight: 40 }}>
                &#8592;
              </button>

              <div className="flex-grow-1">
                <MethodSlide
                  key={methods[activeIdx].name}
                  method={methods[activeIdx]}
                  selected={selectedMethod === methods[activeIdx].name}
                  onSelect={() => {
                    setSelectedMethod(methods[activeIdx].name);
                    onMethodSelect(methods[activeIdx]);
                  }}
                />
              </div>

              <button className="btn btn-outline-secondary" onClick={next} style={{ minWidth: 40, minHeight: 40 }}>
                &#8594;
              </button>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-4">
              {methods.map((m, i) => (
                <button
                  key={m.name}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: 10, height: 10, borderRadius: '50%', border: 'none', padding: 0,
                    backgroundColor: i === activeIdx ? '#4f46e5' : '#c7d2fe',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            {selectedMethod && (
              <div className="border rounded p-3 mb-4" style={{ backgroundColor: '#f8faff', borderColor: '#c7d2fe' }}>
                <span className="text-muted" style={{ fontSize: 13 }}>
                  {t('method.selected_label')} <strong style={{ color: '#4f46e5' }}>{selectedMethod}</strong>
                </span>
              </div>
            )}
          </>
        )}

        <div className="d-flex justify-content-end gap-2 mt-2">
          <button
            className="btn-return px-5 py-2 text-black"
            onClick={onBack}
            style={{ backgroundColor: '#858494', borderColor: '#858494', cursor: 'pointer' }}
          >
            {t('method.back')}
          </button>
          <button
            className="btn-next px-5 py-2 text-white"
            onClick={onNext}
            disabled={!selectedMethod}
            style={{
              backgroundColor: !selectedMethod ? '#a5b4fc' : '#4f46e5',
              borderColor: '#4f46e5',
              cursor: !selectedMethod ? 'not-allowed' : 'pointer',
            }}
          >
            {t('method.next')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MethodPage;
