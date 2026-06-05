// SequenceRepr: detailed activity card shown in expanded sequence view.
// Color comes from ontology color map (replaces hardcoded EMOJIS).

import { ACTIVITY_EMOJI_MAP } from '../types';

interface SequenceReprProps {
  name: string;
  duration: number;
  color?: string;
}

function SequenceRepr({ name, duration, color }: SequenceReprProps) {
  const emoji = ACTIVITY_EMOJI_MAP[name] ?? name.charAt(0).toUpperCase();
  return (
    <div className="border rounded p-2 text-center" style={{ backgroundColor: color }}>
      <div>{emoji}</div>
      <div className="text-capitalize" style={{ fontSize: 12 }}>{name}</div>
      <div style={{ fontSize: 11, color: '#555' }}>{duration} min</div>
    </div>
  );
}

export default SequenceRepr;
