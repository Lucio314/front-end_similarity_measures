import { useState, useRef } from "react";

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}


function FileUploader({ files, onFilesChange }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(
      (f) => f.name.endsWith(".json") || f.name.endsWith(".csv"),
    );
    const merged = [...files, ...valid].filter(
      (f, i, arr) => arr.findIndex((x) => x.name === f.name) === i,
    );
    onFilesChange(merged);
  };

  const removeFile = (fileName: string) => {
    onFilesChange(files.filter((f) => f.name !== fileName));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // TODO: brancher quand l'API FastAPI est prête
  // const uploadFiles = async () => {
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append('files', file));
  //   const res = await fetch('/api/upload', { method: 'POST', body: formData });
  //   if (!res.ok) throw new Error('Upload échoué');
  // };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      className="border rounded p-4 text-center d-flex flex-column align-items-center"
      style={{
        borderStyle: "dashed",
        borderColor: isDragging ? "#4f46e5" : "#dee2e6",
        backgroundColor: isDragging ? "#eef2ff" : "#fafafa",
        transition: "all 0.15s",
        minHeight: 260,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-3"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>

      <h5 className="fw-semibold mb-1">Charger des fichiers</h5>
      <p className="text-muted mb-3" style={{ fontSize: 14 }}>
        Importez un ou plusieurs fichiers JSON/CSV
      </p>
      <label className="form-label">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".json,.csv"
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>
      <button
        className="btn text-white px-4"
        style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
        onClick={() => inputRef.current?.click()}
      >
        + Sélectionner des fichiers
      </button>

      {files.length > 0 && (
        <ul className="list-unstyled mt-3 mb-0 w-100 text-start">
          {files.map((file) => (
            <li
              key={file.name}
              className="d-flex justify-content-between align-items-center border rounded px-2 py-1 mb-1"
              style={{ fontSize: 13 }}
            >
              <span className="text-truncate me-2">📄 {file.name}</span>
              <button
                className="btn btn-sm btn-link text-danger p-0"
                onClick={() => removeFile(file.name)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileUploader;
