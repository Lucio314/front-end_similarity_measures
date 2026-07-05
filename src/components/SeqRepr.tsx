// SeqRepr: compact activity chip in sequence previews — no emoji.

interface SeqReprProps {
  name: string;
  duration: number;
  color?: string;
}

function SeqRepr({ name, duration, color = '#e0e7ff' }: SeqReprProps) {
  return (
    <div
      className="rounded text-center px-2 py-1"
      style={{
        border: `1.5px solid ${color}`,
        backgroundColor: color + '33',
        minWidth: 56,
      }}
    >
      <div className="text-capitalize fw-semibold" style={{ fontSize: 11, color: '#272727' }}>{name}</div>
      <div style={{ fontSize: 10, color: '#666' }}>{duration} min</div>
    </div>
  );
}

export default SeqRepr;
