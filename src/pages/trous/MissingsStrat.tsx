import React from 'react';
import ProsNCons from '../../components/ProsNCons';

interface MissingsStratProps{
    emoji: string;
    strategie: string;
    descriptionStrategie: string;
    avantages: Array<string>;
    inconvenients: Array<string>;
}

function MissingsStrat({emoji, strategie, descriptionStrategie, avantages, inconvenients} : MissingsStratProps){
  return (
    <div key={strategie} className="div-strategy-missings" onClick={() => null}>
      <span className="strategy-emoji">{emoji}</span>
      <div className="div-header-strategy">
        <h4 className="strategy-name">{strategie}</h4>
        <p className="strategy-description">{descriptionStrategie}</p>
      </div>
      <svg className="strategy-selected"></svg>
      <div className="div-body-strategy">
        <ProsNCons avantages={avantages} inconvenients={inconvenients}/>
      </div>
    </div>
  )
  //Modif le onClick de la div plus tard 
}

export default MissingsStrat