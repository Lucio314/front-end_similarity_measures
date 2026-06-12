import { useState, type JSX } from "react";
import { DEPTH_COLORS, type OntologyProps } from "../../types";

interface OntologyTreeProps{
    ontology: OntologyProps;
    color: {color: string, r: number, g: number, b: number};
}

function OntologyTree({ ontology, color }: OntologyTreeProps){
  //let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  //let newColor = '#';
  let newColor = color;
  if(color.color === "rgb(79, 70, 229)"){
    //for (let i = 0; i < 6; i++) {
    //  newColor += hex[Math.floor(Math.random() * 16)];
    //}
    newColor = {
      color: 
        `rgb(
          ${Math.floor(Math.random() * 256)}, 
          ${Math.floor(Math.random() * 256)}, 
          ${Math.floor(Math.random() * 256)}
        )`, 
      r: Math.floor(Math.random() * 256), 
      g: Math.floor(Math.random() * 256), 
      b: Math.floor(Math.random() * 256)
    };
  }else{
    //for (let i = 0; i < 6; i++) {
    //  newColor += hex[Math.floor(Math.random() * 16)];
    //}
    if(Math.random() < 0.33){
      newColor = {
        color: 
          `rgb(
            ${color.r}, 
            ${color.g}, 
            ${color.b ? color.b + Math.floor(Math.random() * 100) : color.b - Math.floor(Math.random() * 100)}
          )`, 
        r: color.r, 
        g: color.g, 
        b: color.b ? color.b + Math.floor(Math.random() * 100) : color.b - Math.floor(Math.random() * 100)
      };
    }else{
      if(Math.random() < 0.66){
        newColor = {
          color: 
            `rgb(
              ${color.r}, 
              ${color.g ? color.g + Math.floor(Math.random() * 100) : color.g - Math.floor(Math.random() * 100)}, 
              ${color.b}
            )`, 
          r: color.r, 
          g: color.g ? color.g + Math.floor(Math.random() * 100) : color.g - Math.floor(Math.random() * 100), 
          b: color.b
        };
      }else{
        newColor = {
          color: 
            `rgb(
              ${color.r ? color.r + Math.floor(Math.random() * 100) : color.r - Math.floor(Math.random() * 100)}, 
              ${color.g}, 
              ${color.b}
            )`, 
          r: color.r ? color.r + Math.floor(Math.random() * 100) : color.r - Math.floor(Math.random() * 100), 
          g: color.g, 
          b: color.b
        };
      }
    }
  }
  

  const listeOntology : Array<JSX.Element> = []
  //for(let onto of ontology.children){
  //  listeOntology.push(
  //    <OntologyTree ontology={onto} color={newColor}/>
  //  )
  //}
  if(ontology.children.length === 0){
      return (
        <div className="">
        <div 
          className="border rounded" 
          style={{backgroundColor: color.color}}
        >
          {ontology.name}
        </div>
      </div>
      )
  }else{
    for(let i = 0; i<ontology.children.length; i++){
      listeOntology.push(
        <OntologyTree ontology={ontology.children[i]} color={newColor}/>
      )
    }
  }






  return (
    <div className="">
      <div 
        className="border rounded" 
        style={{backgroundColor: color.color}}
      >
        {ontology.name}
      </div>
      <div className="">
        {listeOntology}
      </div>
    </div>
  )
}

//A complèter avec du coup le retour de l'api pour faire l'arbre
//Donc par rapport aux données de l'api (donc il y a un/des paramètre(s) à implementer)
//Doit créer une div All, puis une div pour chaques enfants de All, ainsi de suite

export default OntologyTree