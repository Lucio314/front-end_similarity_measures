import React from 'react';

/**
 * @param {String} upperText
 * @param {String} lowerText
 * @returns 
 */
function THeadMethodeCellule({upperText, lowerText}){
    return (
        <td className="thead-method-cell">
            <div className="thead-method-cell-upper-text">
                {upperText}
            </div>
            <div className="thead-method-cell-lower-text">
                {lowerText}
            </div>
        </td>
    )
}

export default THeadMethodeCellule