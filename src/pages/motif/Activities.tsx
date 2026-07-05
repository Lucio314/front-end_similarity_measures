// Activities: one clickable button in the activity palette.
// No more document.getElementById — placeholder/total time managed by PatternPage state.

import { type Dispatch, type SetStateAction } from 'react';
import type { EmojisProps, PatternActivitiesProps } from '../../types';

interface ActivitiesProps {
  emoji: EmojisProps;
  pattern: PatternActivitiesProps[];
  setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
  dureeMotif: number;
  setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
  color?: string;
}

function Activities({ emoji, pattern, setPattern, dureeMotif, setDureeMotif, color }: ActivitiesProps) {
  const handleClick = () => {
    let index = pattern.length;
    for (let i = 0; i < pattern.length; i++) {
      if (parseInt(pattern[i].id.slice(-1)) === pattern.length) index++;
    }
    setPattern([
      ...pattern,
      { id: emoji.emojiName + index, name: emoji.emojiName, emoji: emoji.emoji, duration: 30 },
    ]);
    setDureeMotif(dureeMotif + 30);
  };

  return (
    <div className="col-2">
      <button
        className="btn-activities btn rounded btn-lg btn-outline-primary w-100"
        onClick={handleClick}
        style={{ backgroundColor: color ? color + '33' : undefined, borderColor: color ?? undefined }}
      >
        <div className="text-center text-capitalize fw-semibold" style={{ fontSize: 12, color: '#272727' }}>
          {emoji.emojiName}
        </div>
      </button>
    </div>
  );
}

export default Activities;
