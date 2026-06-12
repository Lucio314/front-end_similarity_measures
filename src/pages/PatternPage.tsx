// PatternPage (step 5): build the search pattern by clicking activities.
// Activities loaded from GET /api/datasets/{id}/stats (replaces hardcoded EMOJIS).
// Ontology loaded from GET /api/ontology for color map.
// Navigation via onNext/onBack props — no DOM manipulation.

import { useEffect, useState } from 'react';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useAppContext } from '../context/AppContext';
import { getDatasetStats, getOntology } from '../api';
import type { PatternActivitiesProps } from '../types';
import { ACTIVITY_EMOJI_MAP, buildOntologyColorMap, dfsLeaves } from '../types';
import RangeActivities from './motif/RangeActivities';
import PatternCreation from './motif/PatternCreation';
import SequenceOverview from './motif/SequenceOverview';
import PlusIcon from '../components/icons/PlusIcon';

interface PatternPageProps {
  onNext: () => void;
  onBack: () => void;
}

function PatternPage({ onNext, onBack }: PatternPageProps) {
  const { datasetId } = useAppContext();

  const [totalDuration, setTotalDuration]     = useState(0);
  const [pattern, setPattern]                 = useState<PatternActivitiesProps[]>([]);
  const [activityNames, setActivityNames]     = useState<string[]>([]);
  const [colorMap, setColorMap]               = useState<Record<string, string>>({});
  const [loading, setLoading]                 = useState(true);

  useEffect(() => {
    if (!datasetId) { setLoading(false); return; }

    Promise.all([
      getDatasetStats(datasetId),
      getOntology(),
    ]).then(([stats, ontology]) => {
      // Activities ordered by DFS through ontology, filtered to those in dataset
      const datasetNames = new Set(stats.activities.distribution.map(a => a.name));
      const dfsOrder = dfsLeaves(ontology).filter(n => datasetNames.has(n) && n !== 'missing');
      // Include any dataset activity not in ontology at the end
      const extra = stats.activities.distribution
        .map(a => a.name)
        .filter(n => n !== 'missing' && !dfsOrder.includes(n));
      setActivityNames([...dfsOrder, ...extra]);
      setColorMap(buildOntologyColorMap(ontology));
    }).catch(() => {
      // Fallback: use stats only, no colors
      if (datasetId) {
        getDatasetStats(datasetId).then(stats => {
          setActivityNames(stats.activities.distribution.map(a => a.name).filter(n => n !== 'missing'));
        }).catch(() => {});
      }
    }).finally(() => setLoading(false));
  }, [datasetId]);

  const getPosById = (id: string) => pattern.findIndex(a => a.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setPattern(p => arrayMove(p, getPosById(active.id), getPosById(over.id)));
  };

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">Build Your Search Pattern</h2>
          <p className="text-muted mb-0">Click activities to build your target sequence</p>
        </div>

        <div className="row g-3">
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <span className="ms-2 text-muted" style={{ fontSize: 13 }}>Loading activities...</span>
            </div>
          ) : (
            <RangeActivities
              activityNames={activityNames}
              colorMap={colorMap}
              pattern={pattern}
              setPattern={setPattern}
              dureeMotif={totalDuration}
              setDureeMotif={setTotalDuration}
            />
          )}

          <div className="border rounded p-3" style={{ borderColor: '#e9eaee', backgroundColor: '#e9eaee' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0" style={{ fontSize: 15, color: '#272727' }}>Your Pattern</h5>
              {pattern.length > 0 && (
                <span className="text-muted" style={{ fontSize: 13 }}>
                  Total duration: <strong>{totalDuration} min</strong>
                </span>
              )}
            </div>

            {pattern.length === 0 && (
              <div className="text-center py-3 text-muted">
                <PlusIcon />
                <p className="mb-0">No activities added yet</p>
                <p style={{ fontSize: 13 }}>Click activities above to build your pattern</p>
              </div>
            )}

            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <PatternCreation
                dureeMotif={totalDuration}
                setDureeMotif={setTotalDuration}
                pattern={pattern}
                setPattern={setPattern}
                colorMap={colorMap}
              />
            </DndContext>
          </div>

          {pattern.length > 0 && (
            <SequenceOverview pattern={pattern} colorMap={colorMap} />
          )}
        </div>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <button
            className="btn-return px-5 py-2 text-black"
            onClick={onBack}
            style={{ backgroundColor: '#858494', borderColor: '#858494', cursor: 'pointer' }}
          >
            Back
          </button>
          <button
            className="btn-next px-5 py-2 text-white"
            onClick={onNext}
            disabled={pattern.length === 0}
            style={{
              backgroundColor: pattern.length === 0 ? '#a5b4fc' : '#4f46e5',
              borderColor: '#4f46e5',
              cursor: pattern.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Choose Similarity Method
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatternPage;
