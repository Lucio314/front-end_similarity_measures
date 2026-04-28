import React from "react";
import IconDataset from "../component/Icons/IconDataset";

function ExempleDataset(){
    return(
        <div 
            className="exemple-dataset"
            style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
            }}
        >
            <IconDataset/>
            <h3 className="h3-title">Données d'exemple</h3>
            <p className="h3-title-p">Datasets générés : 50 séquences d'activités humaines + 50 séquences météo</p>
            <button className="example-dataset-button" onClick={(e) => null}>Charger les données d'exemple</button>
        </div>
    )
    //Modif le button plus tard, pour qu'il renvoie à la page suivante, et cache celle-ci
    //Envoie aussi la requête par défaut de l'api ( pour utiliser un dataset par défault de l'api)
    //Le bouton doit également afficher une div en attendant le chargement des données
}

export default ExempleDataset