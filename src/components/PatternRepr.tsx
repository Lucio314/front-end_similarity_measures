// PatternRepr: displays one activity card in the pattern builder.
// Color comes from the ontology color map passed as prop (replaces hardcoded EMOJIS).

import { ACTIVITY_EMOJI_MAP } from '../types';

interface PatternReprProps {
  name: string;
  duration: number;
  color?: string;
}

function PatternRepr({ name, duration, color = '#f3f2fd' }: PatternReprProps) {
  const emoji = ACTIVITY_EMOJI_MAP[name] ?? name.charAt(0).toUpperCase();
  return (
    <div
      className="border rounded p-2 text-center"
      style={{ backgroundColor: color, minWidth: 64 }}
    >
      <div style={{ fontSize: 22 }}>{emoji}</div>
      <div className="text-capitalize" style={{ fontSize: 12 }}>{name}</div>
      <div style={{ fontSize: 11, color: '#757373' }}>{duration}m</div>
    </div>
  );
}

export default PatternRepr;
