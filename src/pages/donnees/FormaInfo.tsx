function FormatInfo() {
  return (
    <div className="mt-4 p-3 rounded border bg-light" style={{ fontSize: 13 }}>
      <p className="mb-1">
        <strong>📄 Format attendu :</strong> Chaque fichier doit contenir une liste de séquences.
      </p>
      <p className="mb-1 text-muted" style={{ fontFamily: 'monospace', fontSize: 12 }}>
        {`[{"activities": [{"type": "marcher", "duration": 30, "isMissing": false}]}]`}
      </p>
      <p className="mb-0" style={{ color: '#92400e', fontSize: 12 }}>
        💡 Vous pouvez charger plusieurs fichiers (ex: mobilité + météo) pour créer des datasets croisés.
      </p>
    </div>
  );
}

export default FormatInfo;