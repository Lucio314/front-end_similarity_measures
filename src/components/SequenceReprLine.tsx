// SequenceReprLine: proportional timeline bar for one activity.
// bgColor comes from ontology color map (replaces hardcoded EMOJIS emojiColor).

import TooltipComponent from './TooltipComponent';
import { ACTIVITY_EMOJI_MAP } from '../types';

interface SequenceReprLineProps {
  name: string;
  duration: number;
  totalDuration: number;
  color?: string;
}

function SequenceReprLine({ name, duration, totalDuration, color }: SequenceReprLineProps) {
  const emoji = ACTIVITY_EMOJI_MAP[name] ?? name.charAt(0).toUpperCase();
  const widthPct = (duration / totalDuration) * 100;
  const tooltip = name + ' - ' + duration + 'm (' + widthPct.toFixed(1) + '%)';

  return (
    <TooltipComponent text={tooltip} width={widthPct} bgColor={color ?? '#e0e7ff'}>
      <div className="d-flex justify-content-center">{emoji}</div>
    </TooltipComponent>
  );
}

export default SequenceReprLine;
