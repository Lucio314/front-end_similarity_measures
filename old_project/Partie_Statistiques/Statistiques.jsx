import React from "react";
import MenuSelect from "../component/MenuSelect";
import Checkbox from "../component/Checkbox";
import { useState } from "react";
import StatistiquesDataset from "./StatistiquesDataset";
import StatistiquesSequences from "./StatistiquesSequences";

const DATASETS = []
//Représente les différents datasets téléchargés/par défaut

/**
 * @returns 
 */
function Statistiques(){
    const [isMultiChecked, setIsMultiChecked] = useState(false);

    const handleShowSequencesClick = (e) => {
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
        <div id="stats-part" className="part">
            <div className="show-sequences-or-stats">
                <button 
                    className="show-sequences-button"
                    onClick={handleShowSequencesClick}
                >
                    Visualiser toutes les séquences
                </button>
            </div>
            <div id="div-part-body-stats" className="part-main-body">
                <div className="part-body">
                    <div className="part-body-header">
                        <h2 className="h2-title">Statistiques du Dataset</h2>
                        <p className="h2-title-p">
                            Sélectionner le dataset :
                            <MenuSelect options={DATASETS}/>
                        </p>
                        <div className="div-checkbox-multi">
                            <Checkbox 
                                id="checkbox-multi"
                                checked={isMultiChecked}
                                onChange={setIsMultiChecked}
                                label="Activer la recherche multidimensionnelle (Activités Humaines + Données Météo)"
                            />
                        </div>
                    </div>
                    <StatistiquesDataset/>
                </div>
            </div>
            <StatistiquesSequences/>
            <button className="validate-button" onClick={() => null}>Construire l'ontologie →</button>
            <button className="return-button" onClick={() => null}>← Retour</button>
        </div>
    )
    //Faire les event des buttons
}

export default Statistiques