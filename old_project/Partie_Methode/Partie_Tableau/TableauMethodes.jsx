import React from 'react';
import THeadMethodeCellule from './THeadMethodeCellule';
import TBodyMethodeRow from './TBodyMethodeRow';

const THEADCELLS = [
    {upperText:"Support", lowerText:"Sémantique"},
    {upperText:"Flexibilité", lowerText:"Temporelle"},
    {upperText:"Longueurs", lowerText:"Différentes"},
    {upperText:"Ontologie", lowerText:"Requise"},
    {upperText:"Vitesse", lowerText:"Calcul"}
]

const TBODYROWS = [
    {row:"CED", methodName:"Context-aware Edit Distance", sup: true, flex: true, long: true, onto: true, vit: "Moyen"},
    {row:"FTH", methodName:"Fuzzy Temporal Hamming", sup: true, flex: true, long: false, onto: true, vit: "Moyen"},
    {row:"FTH-T", methodName:"FTH avec Troncature", sup: true, flex: true, long: true, onto: true, vit: "Lent"},
    {row:"RFTH", methodName:"Relative Fuzzy Temporal Hamming", sup: true, flex: true, long: true, onto: true, vit: "Moyen"},
    {row:"DTW", methodName:"Dynamic Time Warping", sup: true, flex: true, long: true, onto: false, vit: "Moyen"},
    {row:"HD", methodName:"Hamming Distance", sup: false, flex: false, long: false, onto: false, vit: "Très rapide"},
    {row:"DHD", methodName:"Dynamic Hamming Distance", sup: false, flex: true, long: false, onto: false, vit: "Rapide"}
]

/**
 * @returns
 */
function TableauMethodes({}){
    const listeTHeadCellules = []
    for(let THeadCellule of THEADCELLS){
        listeTHeadCellules.push(
            <THeadMethodeCellule upperText={THeadCellule.upperText} lowerText={THeadCellule.lowerText}/>
        )
    }

    const listeTBodyRows = []
    for(let TBodyCellule of TBODYROWS){
        listeTBodyRows.push(
            <TBodyMethodeRow
                methodRow={TBodyCellule.row} 
                methodName={methodName}
                support={sup}
                flexibilite={flex}
                longueur={long}
                ontologie={onto}
                vitesse={vit}
            />
        )
    }

    return (
        <table>
            <thead className="thead-method">
                <tr className="thead-method-row">
                    <td className="thead-method-cell">
                        Méthode
                    </td>
                    {listeTHeadCellules}
                </tr>
            </thead>
            <tbody className="tbody-method">
                {listeTBodyRows}
            </tbody>
        </table>
    )
}

export default TableauMethodes