import React from "react";
import { useState } from "react";
import MenuSelect from "../components/MenuSelect";
import Checkbox from "../components/Checkbox";
import DatasetStatistics from "./statistiques/DatasetStatistics";
import StatistiquesSequences from "./StatistiquesSequences";

const DATASETS = []
//Représente les différents datasets téléchargés/par défaut
//En tant que String, donc il faut récup avec File.name si nous ne les connaissons pas 

interface DataPageProps {
  onNext: () => void;
  onBack: () => void;
}

function StatsPage({ onNext, onBack }: DataPageProps){
    const [isMultiChecked, setIsMultiChecked] = useState<boolean>(false);

    const handleShowSequencesClick = () => {
        const divSequences = document.getElementById("div-part-body-sequences");
        const divStats = document.getElementById("div-part-body-stats");
        if(divSequences.hidden) {
            setButtonText("Voir les statistiques")
            divSequences.hidden = false
            divStats.hidden = true
        }else{
            setButtonText("Visualiser toutes les séquences")
            divSequences.hidden = true
            divStats.hidden = false
        }
    }

    return(
        <div id="stats-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
            <div className="card-body p-5">
                <div id="div-part-body-stats" className="part-main-body">
                    <div className="part-body">
                        <div className="part-body-header">
                            <h2 className="fw-bold mb-1">Statistiques du Dataset</h2>
                            <button 
                                className="btn-show-seq px-5 py-2 text-white"
                                onClick={handleShowSequencesClick}
                                style={{
                                    backgroundColor: "#662fcc",
                                    borderColor: "#662fcc",
                                    cursor: "pointer",
                                }}
                            >
                                Visualiser toutes les séquences
                            </button>
                            <div className="div-checkbox-multi">
                                <Checkbox 
                                    id="checkbox-multi"
                                    checked={isMultiChecked}
                                    onChange={setIsMultiChecked}
                                    label="Activer la recherche multidimensionnelle (Activités Humaines + Données Météo)"
                                />
                            </div>
                            <p className="text-muted mb-0">
                                Sélectionner le dataset :
                                <MenuSelect 
                                    options={DATASETS}
                                />
                            </p>
                        </div>
                        <DatasetStatistics/>
                    </div>
                </div>
                <StatistiquesSequences/>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button 
                    className="btn-next px-5 py-2 text-white"
                    onClick={onNext}
                    style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        cursor: "pointer",
                    }}
                >
                    Construire l'ontologie →
                </button>
                <button 
                    className="btn-return px-5 py-2 text-black"
                    onClick={onBack}
                    style={{
                        backgroundColor: "#858494",
                        borderColor: "#858494",
                        cursor: "pointer",
                    }}
                >
                    ← Retour
                </button>
            </div>
        </div>
    )
    //Faire les event des buttons
}

export default StatsPage