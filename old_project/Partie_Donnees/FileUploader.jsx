import React from 'react';
import IconUpload from '../component/Icons/IconUpload';
import IconPoubelle from '../component/Icons/IconPoubelle';
import { useEffect } from 'react';
import { useState } from 'react'


function FileUploader() {
  const [files, setFiles] = useState([])

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
  
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const newFiles = files.concat(droppedFiles)
    setFiles(newFiles)
  };

  const handleDragOver = (e) => {
    e.preventDefault()
  };

  useEffect(() => {
      const divAffichageFichiers = document.getElementById('div-affichage-fichiers')
      if(files.length === 0){
        divAffichageFichiers.hidden = true
      }else{
        divAffichageFichiers.hidden = false
      }
    }, [files]
)
//Problème avec le useEffect à régler plus tard

  return (
    <div className="file-uploader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <IconUpload/>
      <h3 className="h3-title">Charger des fichiers</h3>
      <p className="h3-title-p">Importez un ou plusieurs fichiers JSON/CSV</p>
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
      <div id="div-affichage-fichiers" className="affichage-fichiers" hidden>
        <p>{files.length} fichier(s) déposé(s)</p>
        {files.map((file, index) => (
          <div key={index}>
            <span>
              {file.name}  
            </span>
            <button 
              className="delete-button"
              onClick={() => setFiles(files.filter(f => f !== file))}
            >
              <IconPoubelle/>
            </button>
          </div>
        ))}
        <button className="upload-button" /*onClick={uploadFiles}*/>Charger des fichiers</button>
      </div>
      
    </div>
  )
  //Modif le button plus tard, pour qu'il renvoie à la page suivante, et cache celle-ci
  //Terminer également l'envoie du/des fichier(s) à l'api
  //Le bouton doit également afficher une div en attendant le chargement des données

}

export default FileUploader