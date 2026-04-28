import React from 'react';

function Etape({idEtape, numEtape, valueSpan}){
  return(
    <div id={idEtape} className="etape">
      <div>{numEtape}</div>
      <span>{valueSpan}</span>
    </div>
  )
}

export default Etape