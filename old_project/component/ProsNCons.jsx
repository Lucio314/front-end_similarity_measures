import React from 'react';
import Pros from './Pros';
import Cons from './Cons';

/**
 * @param {Array<String>} avantages
 * @param {Array<String>} inconvenients 
 * @returns 
 */
function ProsNCons({avantages, inconvenients}){
  return (
    <div className="div-pros-cons">
      <Pros avantages={avantages}/>
      <Cons inconvenients={inconvenients}/>
    </div>
  )
}

export default ProsNCons