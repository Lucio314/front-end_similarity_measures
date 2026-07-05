// SequenceRepr: detailed activity card in the expanded sequence view — no emoji.

interface SequenceReprProps {
  name: string;
  duration: number;
  color?: string;
}

function SequenceRepr({ name, duration, color = '#e0e7ff' }: SequenceReprProps) {
  return (
    <div
      className="rounded text-center me-1 mb-1"
      style={{
        border: `1.5px solid ${color}`,
        backgroundColor: color + '22',
        minWidth: 72,
        display: 'inline-block',
      }}
    >
      <div style={{ backgroundColor: color, height: 8, borderRadius: '4px 4px 0 0' }} />
      <div className="px-2 py-1">
        <div className="text-capitalize fw-semibold" style={{ fontSize: 12, color: '#272727' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#666' }}>{duration} min</div>
      </div>
    </div>
  );
}

export default SequenceRepr;
