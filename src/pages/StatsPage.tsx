import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import { getDatasetStats, getSequences } from "../api";
import type { DatasetStats, Sequence } from "../api";
import BarsChart from "./statistiques/BarsChart";
import SeqStats from "./statistiques/SeqStats";

interface StatsPageProps { onNext: (hasGaps: boolean) => void; }

const PAGE_SIZE = 10;
const PALETTE = ['#6366f1','#8b5cf6','#ec4899','#10b981','#f97316','#3b82f6','#14b8a6','#f59e0b','#ef4444','#84cc16'];

function StatsPage({ onNext }: StatsPageProps) {
  const { t } = useTranslation();
  const { datasetId } = useAppContext();
  const [stats, setStats]           = useState<DatasetStats | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [showSeqs, setShowSeqs]     = useState(false);
  const [sequences, setSequences]   = useState<Sequence[]>([]);
  const [seqTotal, setSeqTotal]     = useState(0);
  const [seqPage, setSeqPage]       = useState(0);
  const [seqLoading, setSeqLoading] = useState(false);

  useEffect(() => {
    if (!datasetId) { setError(t('stats.error')); setLoading(false); return; }
    getDatasetStats(datasetId)
      .then(s => setStats(s))
      .catch(() => setError(t('stats.error')))
      .finally(() => setLoading(false));
  }, [datasetId]);

  useEffect(() => {
    if (!showSeqs || !datasetId) return;
    setSeqLoading(true);
    getSequences(datasetId, PAGE_SIZE, seqPage * PAGE_SIZE)
      .then(({ sequences: s, count }) => { setSequences(s); setSeqTotal(count); })
      .catch(() => {})
      .finally(() => setSeqLoading(false));
  }, [showSeqs, seqPage, datasetId]);

  if (loading) return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">{t('stats.loading')}</p>
      </div>
    </div>
  );

  if (error || !stats) return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5 text-center">
        <p className="text-danger">{error ?? t('stats.error')}</p>
      </div>
    </div>
  );

  const { global: g, duration, activities, missing } = stats;
  const activityEntries = [...activities.distribution].sort((a, b) => b.value - a.value);
  const colorMap: Record<string, string> = Object.fromEntries(
    activityEntries.map((a, i) => [a.name, PALETTE[i % PALETTE.length]])
  );
  const totalPages = Math.ceil(seqTotal / PAGE_SIZE);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">{t('stats.title')}</h2>
          <p className="text-muted mb-0">{t('stats.dataset')} : <strong>{datasetId}</strong></p>
        </div>

        <div className="row g-3 mb-4">
          {[
            { key: 'stats.total_sequences',  value: g.num_sequences,         bg: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
            { key: 'stats.activity_types',   value: g.num_activities,        bg: "linear-gradient(135deg, #ec4899, #a855f7)" },
            { key: 'stats.avg_length',       value: g.avg_length.toFixed(1), bg: "linear-gradient(135deg, #10b981, #059669)" },
            { key: 'stats.avg_duration',     value: Math.round(duration.avg),bg: "linear-gradient(135deg, #f97316, #ef4444)" },
          ].map(({ key, value, bg }) => (
            <div key={key} className="col-6 col-md-3">
              <div className="rounded p-3 text-white h-100" style={{ background: bg }}>
                <div className="fw-semibold mb-1" style={{ fontSize: 12 }}>{t(key)}</div>
                <div className="fw-bold" style={{ fontSize: 34 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h6 className="fw-semibold mb-3">{t('stats.durations')}</h6>
          <div className="row g-3">
            {[
              { key: 'stats.min_duration', value: `${Math.round(duration.min)} ${t('common.min')}` },
              { key: 'stats.avg_duration_label', value: `${Math.round(duration.avg)} ${t('common.min')}` },
              { key: 'stats.max_duration', value: `${Math.round(duration.max)} ${t('common.min')}` },
            ].map(({ key, value }) => (
              <div key={key} className="col-4">
                <div className="border rounded p-3 text-center">
                  <div className="text-muted mb-1" style={{ fontSize: 12 }}>{t(key)}</div>
                  <div className="fw-bold" style={{ fontSize: 20 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {missing.total_gaps > 0 && (
          <div className="rounded p-3 mb-4" style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d" }}>
            <h6 className="fw-semibold mb-3" style={{ color: "#92400e" }}>{t('stats.missing_title')}</h6>
            <div className="row g-2 text-center">
              {[
                { key: 'stats.total_gaps',        value: missing.total_gaps },
                { key: 'stats.affected_sequences', value: missing.sequences_with_gaps },
                { key: 'stats.pct_with_gaps',      value: `${missing.percentage_sequences_with_gaps.toFixed(1)}%` },
                { key: 'stats.avg_gaps',           value: missing.avg_gaps_per_sequence.toFixed(1) },
              ].map(({ key, value }) => (
                <div key={key} className="col-6 col-md-3">
                  <div className="fw-bold" style={{ fontSize: 22, color: "#d97706" }}>{value}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>{t(key)}</div>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-2" style={{ fontSize: 12, color: "#92400e" }}>
              {t('stats.missing_warning', { pct: missing.percentage_missing_activities.toFixed(2) })}
            </p>
          </div>
        )}

        <div className="mb-4"><BarsChart dataset={activityEntries} /></div>

        <div className="mb-4">
          <h6 className="fw-semibold mb-3">{t('stats.activity_detail')}</h6>
          <div className="row g-2">
            {activityEntries.map(({ name, value }) => (
              <div key={name} className="col-6 col-md-4">
                <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle flex-shrink-0"
                      style={{ width: 10, height: 10, backgroundColor: colorMap[name] ?? '#9c86ec' }} />
                    <span className="text-capitalize" style={{ fontSize: 14 }}>{name}</span>
                  </div>
                  <span className="badge rounded-pill" style={{ backgroundColor: "#e0e7ff", color: "#4f46e5", fontSize: 12 }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <button className="btn w-100 d-flex justify-content-between align-items-center py-2 px-3"
            style={{ backgroundColor: showSeqs ? '#f3f2fd' : '#fff', border: '1.5px solid #9c86ec', color: '#4f46e5', fontWeight: 600, fontSize: 14 }}
            onClick={() => setShowSeqs(v => !v)}>
            <span>{t('stats.view_sequences')}</span>
            <span>{showSeqs ? '▲' : '▼'}</span>
          </button>
          {showSeqs && (
            <div className="border rounded mt-0 p-3" style={{ borderTop: 'none', borderColor: '#9c86ec' }}>
              {seqLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary" role="status" />
                  <span className="ms-2 text-muted" style={{ fontSize: 13 }}>{t('stats.loading_sequences')}</span>
                </div>
              ) : (
                <>
                  <div className="mb-2 text-muted" style={{ fontSize: 12 }}>
                    {t('stats.sequences_page', { total: seqTotal, current: seqPage + 1, total_pages: totalPages || 1 })}
                  </div>
                  {sequences.map(seq => <SeqStats key={seq.id} sequence={seq} colorMap={colorMap} />)}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button className="btn btn-sm btn-outline-secondary" disabled={seqPage === 0} onClick={() => setSeqPage(p => p - 1)}>{t('stats.prev')}</button>
                      <span style={{ fontSize: 13 }}>{seqPage + 1} / {totalPages}</span>
                      <button className="btn btn-sm btn-outline-secondary" disabled={seqPage >= totalPages - 1} onClick={() => setSeqPage(p => p + 1)}>{t('stats.next_btn')}</button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end mt-2">
          <button className="btn text-white px-5 py-2"
            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
            onClick={() => onNext(missing.total_gaps > 0)}>
            {t('stats.next')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
