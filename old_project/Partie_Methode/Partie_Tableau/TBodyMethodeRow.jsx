import React from 'react';
import TBodyMethodeCellule from './TBodyMethodeCellule';

/**
 * @param {String} methodRow
 * @param {String} methodName
 * @param {String} support
 * @param {String} flexibilite
 * @param {String} longueur
 * @param {String} ontologie
 * @param {String} vitesse
 * @returns 
 */
function TBodyMethodeRow({methodRow, methodName, support, flexibilite, longueur, ontologie, vitesse}){

    return (
        <tr className="tbody-method-row">
            <td className="tbody-method-cell">
                <div className="tbody-method-cell-upper-text">
                    {methodRow}
                </div>
                <div className="tbody-method-cell-lower-text">
                    {methodName}
                </div>
            </td>
            <TBodyMethodeCellule valide={support}/>
            <TBodyMethodeCellule valide={flexibilite}/>
            <TBodyMethodeCellule valide={longueur}/>
            <TBodyMethodeCellule valide={ontologie}/>
            <td className="tbody-method-cell">
                <span>{vitesse}</span>
            </td>
        </tr>
    )
}

export default TBodyMethodeRow