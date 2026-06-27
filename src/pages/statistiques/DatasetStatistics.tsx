// DatasetStatistics: global stats section of StatsPage.
// Pie chart removed per supervisor feedback.
// BarsChart now handles ontology loading and filtering internally.

import { type JSX } from "react";
import OverallStats from "./OverallStats";
import DurationStats from "./DurationStats";
import MissingStats from "./MissingStats";
import BarsChart from "./BarsChart";
import DetailsStats from "./DetailsStats";
import type { DatasetInfoProps, DataStatsProps } from "../../types";

interface DatasetStatisticsProps {
  datasetInfo: DatasetInfoProps;
}

function DatasetStatistics({ datasetInfo }: DatasetStatisticsProps) {
  const globalValues = [
    datasetInfo.global.num_sequences,
    datasetInfo.global.num_activities,
    datasetInfo.global.avg_length,
    datasetInfo.duration.avg,
  ];
  const globalLabels = ['Total Sequences', 'Activity Types', 'Avg Length', 'Avg Duration (min)'];
  const globalIds    = ['hash', 'type', 'length', 'clock'];

  const overallStats: JSX.Element[] = globalValues.map((v, i) => (
    <OverallStats key={globalIds[i]} id={globalIds[i]} nombre={v} text={globalLabels[i]} />
  ));

  const durationValues = [datasetInfo.duration.min, datasetInfo.duration.avg, datasetInfo.duration.max];
  const durationLabels = ['minimum', 'average', 'maximum'];

  const durationStats: JSX.Element[] = durationValues.map((v, i) => (
    <DurationStats key={durationLabels[i]} duree={durationLabels[i]} tempsDuree={v} />
  ));

  const gapValues = [
    datasetInfo.missing.total_gaps,
    datasetInfo.missing.sequences_with_gaps,
    datasetInfo.missing.percentage_sequences_with_gaps,
    datasetInfo.missing.avg_gaps_per_sequence,
  ];
  const gapLabels = [
    'Total temporal gaps',
    'Affected sequences',
    '% sequences with gaps',
    'Avg gaps / affected seq',
  ];

  const gapStats: JSX.Element[] = gapValues.map((v, i) => (
    <MissingStats key={gapLabels[i]} stats={gapLabels[i]} valeur={v} />
  ));

  const detailStats: JSX.Element[] = (datasetInfo.activities.distribution as DataStatsProps[]).map(d => (
    <DetailsStats key={d.name} activite={d.name} nombre={d.value} />
  ));

  return (
    <div>
      {/* Global KPIs */}
      <div className="row mb-4">{overallStats}</div>

      {/* Duration */}
      <div className="border rounded p-3 mb-4">
        <h6 className="fw-semibold mb-3">Sequence Durations</h6>
        <div className="d-flex justify-content-between">{durationStats}</div>
      </div>

      {/* Temporal Gaps — only shown if there are gaps */}
      {datasetInfo.missing.total_gaps > 0 && (
        <div
          className="border rounded p-3 mb-4"
          style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}
        >
          <h6 className="fw-semibold mb-3" style={{ color: '#92400e' }}>
            ⚠ Temporal Gaps
          </h6>
          <div className="d-flex justify-content-between">{gapStats}</div>
          <p className="mb-0 mt-2" style={{ fontSize: 12, color: '#92400e' }}>
            Missing activities account for{' '}
            <strong>{datasetInfo.missing.percentage_missing_activities.toFixed(2)}%</strong>{' '}
            of all activities. Consider defining a gap handling strategy.
          </p>
        </div>
      )}

      {/* Bar chart with ontology filter (pie chart removed) */}
      <div className="mb-4">
        <BarsChart dataset={datasetInfo.activities.distribution} />
      </div>

      {/* Activity details */}
      <div className="border rounded p-3">
        <h6 className="fw-semibold mb-3">Activity Details</h6>
        <div className="row">{detailStats}</div>
      </div>
    </div>
  );
}

export default DatasetStatistics;
