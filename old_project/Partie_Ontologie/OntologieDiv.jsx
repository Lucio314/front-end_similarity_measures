import React from 'react';
import ArbreOntologie from './ArbreOntologie';
import Checkbox from '../component/Checkbox'
import { useState } from 'react';

function OntologieDiv({}){
  const [isChecked, setIsChecked] = useState(true)
  
  return (
    <div>
      <h2>🌳 Construction de l'Ontologie</h2>
      <p>L'ontologie permet de mesurer la similarité sémantique entre les activités</p>
      <div>
        <Checkbox 
          id="checkbox-ontologie"
          checked={isChecked}
          onChange={setIsChecked}
          label="Utiliser l'ontologie par défaut pour les activités humaines"
        />
        <ArbreOntologie/>
        <div>
          <button onClick={() => null}>Confirmer l'ontologie →</button>
        </div>
      </div>
      <div>
        <p>
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
}

export default OntologieDiv