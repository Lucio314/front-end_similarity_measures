import React from 'react';
import ProsOrCons from './ProsOrCons';
import GreenCheckIcon from './icons/GreenCheckIcon';

interface ProsProps{
    avantages: Array<String>;
}

function Pros({avantages} : ProsProps){
    return (
        <div className="div-pros">
            <GreenCheckIcon/>
            <span className="pros"> Avantages :</span>
            <ProsOrCons liste={avantages}/>
        </div>
    )
}

export default Pros