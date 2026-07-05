// ActivitiesDragNDrop: draggable activity card inside the pattern builder.
// No more document.getElementById — state managed by PatternPage.

import { useState, type Dispatch, type SetStateAction } from 'react';
import DragNDropIcon from '../../components/icons/DragNDropIcon';
import TrashBinIcon from '../../components/icons/TrashBinIcon';
import type { PatternActivitiesProps } from '../../types';
import InputNumber from '../../components/InputNumber';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ActivitiesDragNDropProps {
  dureeMotif: number;
  setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
  motif: PatternActivitiesProps;
  pattern: PatternActivitiesProps[];
  setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
  color?: string;
}

function ActivitiesDragNDrop({
  dureeMotif,
  setDureeMotif,
  motif,
  pattern,
  setPattern,
  color,
}: ActivitiesDragNDropProps) {
  const [dureeActivite, setDureeActivite] = useState<PatternActivitiesProps>(motif);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable(motif);

  // Synchronise la durée modifiée dans le tableau pattern du parent
  // (sans ça, SequenceOverview lit toujours la durée initiale)
  const setDureeActiviteAndSync: React.Dispatch<React.SetStateAction<PatternActivitiesProps>> = (val) => {
    const next = typeof val === 'function' ? val(dureeActivite) : val;
    setDureeActivite(next);
    setPattern(prev => prev.map(a => a.id === motif.id ? next : a));
  };

  const handleDelete = () => {
    setDureeMotif(Math.max(0, dureeMotif - dureeActivite.duration));
    setPattern(pattern.filter(a => a.id !== motif.id));
  };

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      id={motif.id}
      className="card border shadow-sm mb-2"
      ref={setNodeRef}
      style={{ ...style, borderLeftColor: color, borderLeftWidth: 4 }}
    >
      <div className="d-flex align-items-center p-2 gap-2">
        <button className="btn btn-drag p-1" {...attributes} {...listeners}>
          <DragNDropIcon />
        </button>
        <div
          className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 32, height: 32, backgroundColor: color ?? '#e9eaee' }}
        />
        <div className="flex-grow-1">
          <div className="text-capitalize fw-semibold" style={{ fontSize: 13 }}>{motif.name}</div>
          <div className="d-flex align-items-center gap-1">
            <InputNumber
              dureeMotif={dureeMotif}
              setDureeMotif={setDureeMotif}
              dureeActivite={dureeActivite}
              setDureeActivite={setDureeActiviteAndSync}
            />
            <span style={{ fontSize: 12 }}>min</span>
          </div>
        </div>
        <button className="btn-trash btn p-1" onClick={handleDelete} name="Supprimer" >
          <TrashBinIcon />
        </button>
      </div>
    </div>
  );
}

export default ActivitiesDragNDrop;
