import React from 'react';
import ProsOrCons from './ProsOrCons';
import GreenCheck from './Icons/GreenCheck';

/**
 * @param {Array<String>} avantages
 * @returns 
 */
function Pros({avantages}){
    return (
        <div className="div-pros">
            <GreenCheck/>
            <span className="pros"> Avantages :</span>
            <ProsOrCons liste={avantages}/>
        </div>
    )
}

export default Pros