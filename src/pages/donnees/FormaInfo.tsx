function FormatInfo() {
  return (
    <div className="mt-4 p-3 rounded border bg-light" style={{ fontSize: 13 }}>
      <p className="mb-1">
        <strong>Format attendu :</strong> fichier CSV avec <code>;</code> comme séparateur, colonnes dans cet ordre :
      </p>
      <p className="mb-1 text-muted" style={{ fontFamily: 'monospace', fontSize: 12 }}>
        pcode;space;start;end;activity;mode
      </p>
      <p className="mb-1 text-muted" style={{ fontFamily: 'monospace', fontSize: 12 }}>
        110100000101,00;*;840;859;moving;walk
      </p>
      <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
        <strong>start</strong> et <strong>end</strong> sont des entiers (minutes). <strong>space</strong> et <strong>mode</strong> acceptent <code>*</code> si non renseignés.
      </p>
    </div>
  );
}

export default FormatInfo;