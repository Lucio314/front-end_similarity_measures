import React from 'react';

interface MethodTHeadCellProps{
    upperText: string;
    lowerText: string;
}

function MethodtHeadCell({upperText, lowerText} : MethodTHeadCellProps){
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

export default MethodtHeadCell