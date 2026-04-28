import React from 'react';
import EtapeNTransi from './EtapesNTransi';

const ETAPESNTRANSITIONS = [
  {
    idEtape: "etape-1",
    numEtape: 1,
    valueSpan: "Données",
    idTransi: "transi-etape-1-2"
  },
  {
    idEtape: "etape-2",
    numEtape: 2,
    valueSpan: "Statistiques",
    idTransi: "transi-etape-2-3"
  },
  {
    idEtape: "etape-3",
    numEtape: 3,
    valueSpan: "Ontologie",
    idTransi: "transi-etape-3-4"
  },
  {
    idEtape: "etape-4",
    numEtape: 4,
    valueSpan: "Trous",
    idTransi: "transi-etape-4-5"
  },
  {
    idEtape: "etape-5",
    numEtape: 5,
    valueSpan: "Motif",
    idTransi: "transi-etape-5-6"
  },
  {
    idEtape: "etape-6",
    numEtape: 6,
    valueSpan: "Méthode",
    idTransi: "transi-etape-6-7"
  },
  {
    idEtape: "etape-7",
    numEtape: 7,
    valueSpan: "Paramètres",
    idTransi: "transi-etape-7-8"
  },
  {
    idEtape: "etape-8",
    numEtape: 8,
    valueSpan: "Résultats",
    idTransi: null
  }
]

/**
 * @returns 
 */
function Etapes({}){
  let listEtapesNTransi = []
  for(let etapeNTransi of ETAPESNTRANSITIONS){
    listEtapesNTransi.push(
      <EtapeNTransi idEtape={etapeNTransi.idEtape} numEtape={etapeNTransi.numEtape} valueSpan={etapeNTransi.valueSpan} idTransi={etapeNTransi.idTransi}/>
    )
  }

  return (
    <div className="header-etapes">
      <div className="etapes">
        {listEtapesNTransi}
      </div>
    </div>
  )
}

export default Etapes