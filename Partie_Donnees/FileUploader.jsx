import React from 'react';
import { useState } from 'react'

/*
  const uploadFiles = async () => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    alert("Upload successful!");
  } else {
    alert("Upload failed.");
  }
*/

function FileUploader() {
  const [files, setFiles] = useState([])
  
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const newFiles = files.concat(droppedFiles)
    setFiles(newFiles)
  };

  const handleDragOver = (e) => {
    e.preventDefault()
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <label 
        id="input-file-label" 
        style={{
          cursor:"pointer",
        }}
      >
        <input
          type="file"
          id="input-file"
          multiple
          accept=".json,.csv"
          style={{
            display:"none",
          }}
        />
        Déposer des fichiers ici 
      </label>
      <div>
        <p>{files.length} fichier(s) déposé(s)</p>
        {files.map((file, index) => (
          <div key={index}>
            <span>
              {file.name}  
            </span>
            <button 
              onClick={() => setFiles(files.filter(f => f !== file))}
            >
              Delete
            </button>
          </div>
        ))}
        <button /*onClick={uploadFiles}*/>Upload Files</button>
      </div>
      
    </div>
  );
};

export default FileUploader