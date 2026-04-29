import React from 'react';
import TableauMethodes from './TableauMethodes';
import GreenCheck from '../../component/Icons/GreenCheck';
import RedCross from '../../component/Icons/RedCross';

const ADVICES = [
    {adviceStrong: "Pour la simplicité et la vitesse :", adviceNotStrong: "HD"},
    {adviceStrong: "Pour la sémantique sans flexibilité temporelle :", adviceNotStrong: "CED"},
    {adviceStrong: "Pour la flexibilité temporelle classique :", adviceNotStrong: "DTW"},
    {adviceStrong: "Pour des séquences de même durée avec sémantique :", adviceNotStrong: "FTH"},
    {adviceStrong: "Pour le maximum de flexibilité :", adviceNotStrong: "RFTH"},
    {adviceStrong: "Pour détecter des anomalies comportementales : ", adviceNotStrong: "DHD"}
]

/**
 * @returns 
 */
function TableauComparatif({}){
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
            <h3 className="h3-title">📊 Tableau Comparatif des Méthodes</h3>
            <div className="comparative-table">
                <TableauMethodes/>
            </div>
            <div className="tab-legend">
                <h4 className="h4-title">Légende :</h4>
                <div className="legend-infos">
                    <div className="legend-info">
                        <GreenCheck/>
                        <span>Propriété supportée</span>
                    </div>
                    <div className="legend-info">
                        <RedCross/>
                        <span>Propriété non supportée</span>
                    </div>
                </div>
            </div>
            <div className="advices">
                <h4 className="h4-title">💡 Recommandations de choix</h4>
                <div className="advice">
                    {listeAdvices}
                </div>
            </div>
        </div>
    )
}

export default TableauComparatif