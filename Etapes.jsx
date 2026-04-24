import React from 'react';

function Etapes({}){
  return (
    <div>
      <div>
        <Etape idEtape="etape-1" numEtape={1} valueSpan="Données"/>
        <div id="transi-etape-1-2" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-2" numEtape={2} valueSpan="Statistiques"/>
        <div id="transi-etape-2-3" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-3" numEtape={3} valueSpan="Ontologie"/>
        <div id="transi-etape-3-4" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-4" numEtape={4} valueSpan="Trous"/>
        <div id="transi-etape-4-5" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-5" numEtape={5} valueSpan="Motif"/>
        <div id="transi-etape-5-6" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-6" numEtape={6} valueSpan="Méthode"/>
        <div id="transi-etape-6-7" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-7" numEtape={7} valueSpan="Paramètres"/>
        <div id="transi-etape-7-8" className="flex-1 h-1 mx-2 transition-colors bg-gray-200">-</div>
        <Etape idEtape="etape-8" numEtape={8} valueSpan="Résultats"/>
      </div>
    </div>
  )
}

function Etape({idEtape, numEtape, valueSpan}){
  return(
    <div id={idEtape}>
      <div>{numEtape}</div>
      <span>{valueSpan}</span>
    </div>
  )
}

//A modif 

export default Etapes