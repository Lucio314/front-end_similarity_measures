import React from 'react';
import GreenCheck from '../../component/Icons/GreenCheck';
import RedCross from '../../component/Icons/RedCross';

/**
 * @param {boolean} valide
 * @returns 
 */
function TBodyMethodeRow({valide}){
    if(valide){
        return (
            <td>
                <GreenCheck/>
            </td>
        )
    }else{
        return (
            <td>
                <RedCross/>
            </td>
        )
    }

}

export default TBodyMethodeRow