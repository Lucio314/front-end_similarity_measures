import React from 'react';
import MethodsTable from './MethodsTable';
import GreenCheckIcon from '../../components/icons/GreenCheckIcon';
import RedCrossIcon from '../../components/icons/RedCrossIcon';

const ADVICES = [
    {adviceStrong: "Pour la simplicité et la vitesse :", adviceNotStrong: "HD"},
    {adviceStrong: "Pour la sémantique sans flexibilité temporelle :", adviceNotStrong: "CED"},
    {adviceStrong: "Pour la flexibilité temporelle classique :", adviceNotStrong: "DTW"},
    {adviceStrong: "Pour des séquences de même durée avec sémantique :", adviceNotStrong: "FTH"},
    {adviceStrong: "Pour le maximum de flexibilité :", adviceNotStrong: "RFTH"},
    {adviceStrong: "Pour détecter des anomalies comportementales : ", adviceNotStrong: "DHD"}
]

function ComparativeTable({}){
    const listeAdvices = []
    for(let advice of ADVICES){ //Pas de changement niveau CSS dans ces balises p
        listeAdvices.push(
            <p>
                <strong>{advice.adviceStrong}</strong>
                {advice.adviceNotStrong}
            </p>
        )
    }

    return (
        <div id="comparative-tab" className="tab-methods" hidden>
            <h3 className="text-center mb-4">📊 Tableau Comparatif des Méthodes</h3>
            <div className="comparative-table">
                <MethodsTable/>
            </div>
            <div className="tab-legend">
                <h4 className="text-center mb-4">Légende :</h4>
                <div className="legend-infos">
                    <div className="legend-info">
                        <GreenCheckIcon/>
                        <span>Propriété supportée</span>
                    </div>
                    <div className="legend-info">
                        <RedCrossIcon/>
                        <span>Propriété non supportée</span>
                    </div>
                </div>
            </div>
            <div className="advices">
                <h4 className="text-center mb-4">💡 Recommandations de choix</h4>
                <div className="advice">
                    {listeAdvices}
                </div>
            </div>
        </div>
    )
}

export default ComparativeTable