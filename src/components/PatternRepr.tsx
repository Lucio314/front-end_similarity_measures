// PatternRepr: one activity block in the pattern preview.
// Uses ontology color — no emoji.

interface PatternReprProps {
  name: string;
  duration: number;
  color?: string;
}

function PatternRepr({ name, duration, color = '#e0e7ff' }: PatternReprProps) {
  return (
    <div
      className="rounded text-center"
      style={{
        border: `1.5px solid ${color}`,
        backgroundColor: color + '33',
        minWidth: 72,
      }}
    >
      <div style={{ backgroundColor: color, height: 6, borderRadius: '4px 4px 0 0' }} />
      <div className="px-2 py-1">
        <div className="text-capitalize fw-semibold" style={{ fontSize: 12, color: '#272727' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#666' }}>{duration} min</div>
      </div>
    </div>
  );
}

export default PatternRepr;
