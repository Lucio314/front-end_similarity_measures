import React from 'react';
import OntologyTree from './OntologyTree';
import Checkbox from '../../components/Checkbox';
import { useState } from 'react';

function OntologyDiv({}){
  const [isChecked, setIsChecked] = useState(true)
  
  return (
    <div>
      <div>
        <Checkbox 
          id="checkbox-ontologie"
          checked={isChecked}
          onChange={setIsChecked}
          label="Utiliser l'ontologie par défaut pour les activités humaines"
        />
        <OntologyTree/>
      </div>
      <div>
        <p className="text-muted mb-0">
          <strong>💡 À quoi sert l'ontologie ?</strong>
          <br/>
          Elle permet aux algorithmes de comprendre que "marcher" et "vélo"
          sont plus similaires entre eux (tous deux sous "human_power") qu'avec "bus"
          (qui est sous "motorized"). Cela améliore considérablement
          la qualité de la recherche sémantique.
        </p>
      </div>
    </div>
    ) 
    //Modif button plus tard
    //Mettre className également
    //Sans doute retirer la checkbox étant donné qu'on reste sur l'ontologie par défaut
}

export default OntologyDiv