import React, { type Dispatch, type SetStateAction } from 'react';
import ActivitiesDragNDrop from './ActivitiesDragNDrop';
import type { PatternActivitiesProps } from '../../types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface PatternCreationProps {
  dureeMotif: number;
  setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
  pattern: PatternActivitiesProps[];
  setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
  colorMap: Record<string, string>;
}

function PatternCreation({ dureeMotif, setDureeMotif, pattern, setPattern, colorMap }: PatternCreationProps) {
  return (
    <div>
      <SortableContext items={pattern} strategy={verticalListSortingStrategy}>
        {pattern.map(motif => (
          <ActivitiesDragNDrop
            key={motif.id}
            dureeMotif={dureeMotif}
            setDureeMotif={setDureeMotif}
            motif={motif}
            pattern={pattern}
            setPattern={setPattern}
            color={colorMap[motif.name]}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default PatternCreation;
