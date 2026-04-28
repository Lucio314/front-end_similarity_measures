import React from 'react';
import Etape from './Etape';

function EtapeNTransi({idEtape, numEtape, valueSpan, idTransi}){
    if(idTransi === null){
        return(
            <div>
                <Etape idEtape={idEtape} numEtape={numEtape} valueSpan={valueSpan}/>
            </div>
        )
    }else{
        return(
            <div>
                <Etape idEtape={idEtape} numEtape={numEtape} valueSpan={valueSpan}/>
                <div id={idTransi} className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
            </div>
        )
    }
}

export default EtapeNTransi