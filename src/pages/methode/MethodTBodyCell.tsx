import React from 'react';
import GreenCheckIcon from '../../components/icons/GreenCheckIcon';
import RedCrossIcon from '../../components/icons/RedCrossIcon';

interface MethodTBodyCellProps{
    valide: boolean;
}

function MethodTBodyCell({valide} : MethodTBodyCellProps){
    if(valide){
        return (
            <td>
                <GreenCheckIcon/>
            </td>
        )
    }else{
        return (
            <td>
                <RedCrossIcon/>
            </td>
        )
    }

}

export default MethodTBodyCell