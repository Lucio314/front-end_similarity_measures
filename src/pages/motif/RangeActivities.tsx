// RangeActivities: activity palette built from backend data + ontology colors.
// Replaces hardcoded EMOJIS constant from types/index.ts.

import React, { type Dispatch, type SetStateAction } from 'react';
import Activities from './Activities';
import type { PatternActivitiesProps, EmojisProps } from '../../types';
import { ACTIVITY_EMOJI_MAP } from '../../types';

interface RangeActivitiesProps {
  activityNames: string[];
  colorMap: Record<string, string>;
  pattern: PatternActivitiesProps[];
  setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
  dureeMotif: number;
  setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
}

function RangeActivities({
  activityNames,
  colorMap,
  pattern,
  setPattern,
  dureeMotif,
  setDureeMotif,
}: RangeActivitiesProps) {
  const emojis: EmojisProps[] = activityNames.map(name => ({
    emojiName: name,
    emoji: ACTIVITY_EMOJI_MAP[name] ?? name.charAt(0).toUpperCase(),
  }));

  if (emojis.length === 0) {
    return (
      <div className="border rounded p-3 text-center text-muted" style={{ fontSize: 13 }}>
        No activities available for this dataset.
      </div>
    );
  }

  return (
    <div className="border rounded p-3" style={{ borderColor: '#9c86ec', backgroundColor: '#dadff1' }}>
      <h5 className="p-1" style={{ color: '#272727', fontSize: 15 }}>Activity Palette</h5>
      <div className="row g-2">
        {emojis.map(emoji => (
          <Activities
            key={emoji.emojiName}
            emoji={emoji}
            pattern={pattern}
            setPattern={setPattern}
            dureeMotif={dureeMotif}
            setDureeMotif={setDureeMotif}
            color={colorMap[emoji.emojiName]}
          />
        ))}
      </div>
    </div>
  );
}

export default RangeActivities;
