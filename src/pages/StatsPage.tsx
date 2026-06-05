import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getDatasetStats } from "../api";
import type { DatasetStats } from "../api";
import BarsChart from "./statistiques/BarsChart";

interface StatsPageProps {
  onNext: (hasGaps: boolean) => void;
}

function StatsPage({ onNext }: StatsPageProps) {
  const { datasetId } = useAppContext();
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!datasetId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("No dataset loaded.");
      setLoading(false);
      return;
    }
    getDatasetStats(datasetId)
      .then(setStats)
      .catch(() => setError("Failed to load statistics."))
      .finally(() => setLoading(false));
  }, [datasetId]);

  if (loading) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <p className="text-danger">{error ?? "Unknown error."}</p>
        </div>
      </div>
    );
  }

  const { global: g, duration, activities, missing } = stats;
  const activityEntries = [...activities.distribution].sort((a, b) => b.value - a.value);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Dataset Statistics</h2>
          <p className="text-muted mb-0">Dataset: <strong>{datasetId}</strong></p>
        </div>

        {/* KPI Cards */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total Sequences",    value: g.num_sequences,        bg: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
            { label: "Activity Types",     value: g.num_activities,        bg: "linear-gradient(135deg, #ec4899, #a855f7)" },
            { label: "Avg Length",         value: g.avg_length.toFixed(1), bg: "linear-gradient(135deg, #10b981, #059669)" },
            { label: "Avg Duration (min)", value: Math.round(duration.avg), bg: "linear-gradient(135deg, #f97316, #ef4444)" },
          ].map(({ label, value, bg }) => (
            <div key={label} className="col-6 col-md-3">
              <div className="rounded p-3 text-white h-100" style={{ background: bg }}>
                <div className="fw-bold mb-1" style={{ fontSize: 13 }}>{label}</div>
                <div className="fw-bold" style={{ fontSize: 36 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Durations */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Sequence Durations</h6>
          <div className="row g-3">
            {[
              { label: "Minimum duration", value: `${Math.round(duration.min)} min` },
              { label: "Average duration", value: `${Math.round(duration.avg)} min` },
              { label: "Maximum duration", value: `${Math.round(duration.max)} min` },
            ].map(({ label, value }) => (
              <div key={label} className="col-4">
                <div className="border rounded p-3 text-center">
                  <div className="text-muted mb-1" style={{ fontSize: 12 }}>{label}</div>
                  <div className="fw-bold" style={{ fontSize: 20 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temporal Gaps — only shown if there are gaps */}
        {missing.total_gaps > 0 && (
          <div className="rounded p-3 mb-4" style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d" }}>
            <h6 className="fw-semibold mb-3" style={{ color: "#92400e" }}>
              ⚠ Temporal Gaps
            </h6>
            <div className="row g-2 text-center">
              {[
                { label: "Total gaps",                value: missing.total_gaps },
                { label: "Affected sequences",        value: missing.sequences_with_gaps },
                { label: "% sequences with gaps",     value: `${missing.percentage_sequences_with_gaps.toFixed(1)}%` },
                { label: "Avg gaps / affected seq",   value: missing.avg_gaps_per_sequence.toFixed(1) },
              ].map(({ label, value }) => (
                <div key={label} className="col-6 col-md-3">
                  <div className="fw-bold" style={{ fontSize: 22, color: "#d97706" }}>{value}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>{label}</div>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-2" style={{ fontSize: 12, color: "#92400e" }}>
              Missing activities account for{" "}
              <strong>{missing.percentage_missing_activities.toFixed(2)}%</strong>{" "}
              of all activities. Consider defining a gap handling strategy.
            </p>
          </div>
        )}

        {/* Bar chart with ontology filter */}
        <div className="mb-4">
          <BarsChart dataset={activityEntries} />
        </div>

        {/* Activity details */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Activity Details</h6>
          <div className="row g-2">
            {activityEntries.map(({ name, value }) => (
              <div key={name} className="col-6 col-md-4">
                <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2">
                  <span className="text-capitalize" style={{ fontSize: 14 }}>{name}</span>
                  <span className="badge rounded-pill" style={{ backgroundColor: "#e0e7ff", color: "#4f46e5", fontSize: 12 }}>
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn text-white px-5 py-2"
            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
            onClick={() => onNext(missing.total_gaps > 0)}
          >
            Build Ontology
          </button>
        </div>

      </div>
    </div>
  );
}

export default StatsPage;
