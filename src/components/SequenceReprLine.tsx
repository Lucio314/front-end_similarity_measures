// SequenceReprLine: proportional timeline bar — color block with tooltip, no emoji inside.

import TooltipComponent from './TooltipComponent';

interface SequenceReprLineProps {
  name: string;
  duration: number;
  totalDuration: number;
  color?: string;
}

function SequenceReprLine({ name, duration, totalDuration, color = '#e0e7ff' }: SequenceReprLineProps) {
  const widthPct = totalDuration > 0 ? (duration / totalDuration) * 100 : 0;
  const tooltip = `${name} — ${duration} min (${widthPct.toFixed(1)}%)`;

  return (
    <TooltipComponent text={tooltip} width={widthPct} bgColor={color}>
      <div style={{ height: 36, minWidth: 4 }} />
    </TooltipComponent>
  );
}

export default SequenceReprLine;
