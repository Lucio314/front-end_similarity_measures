import type { JSX } from "react";
import { ONTOLOGY_COLORS, type OntologyProps } from "../../types";

interface OntologyTreeProps{
    ontology: OntologyProps;
    layer: number;
}

function OntologyTree({ ontology, layer }: OntologyTreeProps){
  const litsteOntology : Array<JSX.Element> = []
  for(let onto of ontology.children){
    litsteOntology.push(
      <OntologyTree ontology={onto} layer={layer+1}/>
    )
  }

  return (
    <div className="">
      <div 
        className="border rounded" 
        style={{backgroundColor: ONTOLOGY_COLORS[layer]}}
      >
        {ontology.name}
      </div>
      <div className="">
        {litsteOntology}
      </div>
    </div>
  )
}

//A complèter avec du coup le retour de l'api pour faire l'arbre
//Donc par rapport aux données de l'api (donc il y a un/des paramètre(s) à implementer)
//Doit créer une div All, puis une div pour chaques enfants de All, ainsi de suite

export default OntologyTree