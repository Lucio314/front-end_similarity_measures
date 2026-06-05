// SeqRepr: compact activity chip used in sequence previews.
// Color comes from ontology color map (replaces hardcoded EMOJIS).

import { ACTIVITY_EMOJI_MAP } from '../types';

interface SeqReprProps {
  name: string;
  duration: number;
  color?: string;
}

function SeqRepr({ name, duration, color }: SeqReprProps) {
  const emoji = ACTIVITY_EMOJI_MAP[name] ?? name.charAt(0).toUpperCase();
  return (
    <div
      className="border rounded px-2 py-1 text-center"
      style={{ backgroundColor: color, fontSize: 12, minWidth: 48 }}
    >
      <span>{emoji}</span>
      <span className="ms-1">{duration}m</span>
    </div>
  );
}

export default SeqRepr;
