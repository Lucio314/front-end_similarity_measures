import React from 'react';
import ProsOrCons from './ProsOrCons';
import RedCrossIcon from './icons/RedCrossIcon';

interface ConsProps{
    inconvenients: Array<String>;
}

function Cons({inconvenients} : ConsProps){
    return (
        <div className="div-cons">
            <RedCrossIcon/>
            <span className="cons"> Inconvénients :</span>
            <ProsOrCons liste={inconvenients}/>
        </div>
    )
}

export default Cons