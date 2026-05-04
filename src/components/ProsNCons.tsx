import React from 'react';
import Pros from './Pros';
import Cons from './Cons';

interface ProsNConsProps{
    avantages: Array<String>;
    inconvenients: Array<String>;
}

function ProsNCons({avantages, inconvenients} : ProsNConsProps){
  return (
    <div className="div-pros-cons">
      <Pros avantages={avantages}/>
      <Cons inconvenients={inconvenients}/>
    </div>
  )
}

export default ProsNCons