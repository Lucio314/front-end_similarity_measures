import React from 'react';
import OntologieDiv from './OntologieDiv';
import WuPalmer from './WuPalmer';

function Ontologie({}){
  return (
    <div id="ontologie-part" className="part">
        <OntologieDiv/>
        <WuPalmer/>
        <button className="return-button" onClick={() => null}>← Retour</button> 
    </div>
  )
  //Modif button plus tard
}

export default Ontologie