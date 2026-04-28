import React from 'react';
import ProsNCons from '../component/ProsNCons';

/**
 * @param {String} emoji
 * @param {String} strategie
 * @param {String} descriptionStrategie
 * @param {Array<String>} avantages
 * @param {Array<String>} inconvenients
 * @returns 
 */
function StrategieTrous({emoji, strategie, descriptionStrategie, avantages, inconvenients}){
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

export default StrategieTrous