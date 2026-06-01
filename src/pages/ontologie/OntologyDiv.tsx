import OntologyTree from './OntologyTree';
import Checkbox from '../../components/Checkbox';
import { useState } from 'react';
import type { OntologyProps } from '../../types';
import OntologyIcon from '../../components/icons/OntologyIcon';
import { DEPTH_COLORS } from '../../types';

interface OntologyDivProps{
  ontology: OntologyProps;
}

function OntologyDiv({ontology}: OntologyDivProps){
  const [isChecked, setIsChecked] = useState(true)
  
  return (
    <div className="">
      <div className="border rounded p-4">
        <Checkbox 
          id="checkbox-ontologie"
          checked={isChecked}
          onChange={setIsChecked}
          label="Utiliser l'ontologie par défaut pour les activités humaines"
        />
        <div className="border rounded">
          <h4>
            <OntologyIcon/>
            Structure de l'ontologie
          </h4>
          <OntologyTree ontology={ontology} layer={0}/>
          <div className="border rounded">
            <p className="">Légende :</p>
            <div>
              <span>
                <div 
                  className="border rounded" 
                  style={{backgroundColor: DEPTH_COLORS[0]?.color}}
                >
                </div>
                {DEPTH_COLORS[0]?.label}
              </span>
              <span>
                <div 
                  className="border rounded" 
                  style={{backgroundColor: DEPTH_COLORS[1]?.color}}
                >
                </div>
                {DEPTH_COLORS[1]?.label}
              </span>
              <span>
                <div 
                  className="border rounded" 
                  style={{backgroundColor: DEPTH_COLORS[2]?.color}}
                >
                </div>
                {DEPTH_COLORS[2]?.label}
              </span>
              <span>
                <div 
                  className="border rounded" 
                  style={{backgroundColor: DEPTH_COLORS[3]?.color}}
                >
                </div>
                {DEPTH_COLORS[3]?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded mt-4 p-3">
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