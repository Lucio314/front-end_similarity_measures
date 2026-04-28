import React from 'react';
import ProsOrCons from './ProsOrCons';
import RedCross from './Icons/RedCross';

/**
 * @param {Array<String>} inconvenients 
 * @returns 
 */
function Cons({inconvenients}){
    return (
        <div className="div-cons">
            <RedCross/>
            <span className="cons"> Inconvénients :</span>
            <ProsOrCons liste={inconvenients}/>
        </div>
    )
}

export default Cons