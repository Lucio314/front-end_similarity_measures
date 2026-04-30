import React from 'react';
import MissingsStrat from './MissingsStrat';

const STRATEGIES = [
  {
    strategie: "Ajouter \"missing\" à l'ontologie",
    descriptionStrategie: "Les trous sont traités comme une activité à part entière dans l'ontologie",
    emoji: "🌳",
    avantages: ["Conserve l'information sur les trous", "Permet de les rechercher explicitement"],
    inconvenients: ["Augmente la complexité de l'ontologie"]
  },
  {
    strategie: "Remplacer par une activité spécifique",
    descriptionStrategie: "Remplacer tous les trous par une activité choisie (ex: \"maison\")",
    emoji: "🔄",
    avantages: ["Simple à implémenter", "Peut refléter une hypothèse réaliste"],
    inconvenients: ["Introduit un biais", "Peut fausser les résultats"]
  },
  {
    strategie: "Remplacer par l'activité la plus fréquente",
    descriptionStrategie: "Remplacer les trous par l'activité qui apparaît le plus souvent dans le dataset",
    emoji: "📊",
    avantages: ["Basé sur les données", "Statistiquement justifiable"],
    inconvenients: ["Peut sur-représenter certaines activités", "Ignore le contexte"]
  },
  {
    strategie: "Interpolation contextuelle",
    descriptionStrategie: "Deviner l'activité manquante en fonction des activités voisines",
    emoji: "🧩",
    avantages: ["Prend en compte le contexte", "Plus intelligent"],
    inconvenients: ["Plus complexe à calculer", "Peut créer des erreurs"]
  },
  {
    strategie: "Supprimer les séquences avec trous",
    descriptionStrategie: "Exclure complètement les séquences contenant des données manquantes",
    emoji: "🗑️",
    avantages: ["Garantit des données complètes", "Évite les approximations"],
    inconvenients: ["Perte d'information", "Réduit la taille du dataset"]
  },
  {
    strategie: "Garder tel quel (avec distance maximale)",
    descriptionStrategie: "Les trous sont comparés avec une distance maximale (similarité = 0)",
    emoji: "⚠️",
    avantages: ["Honnête sur l'incertitude", "Pas de modification des données"],
    inconvenients: ["Pénalise fortement les séquences avec trous"]
  }
]

function MissingsStratManagement({}){
  const strategiesMissings = []
  for(let strategy of STRATEGIES){
    strategiesMissing.push(
    <MissingsStrat
      emoji={strategy.emoji}
      strategie={strategy.strategie}
      descriptionStrategie={strategy.descriptionStrategie}
      avantages={strategy.avantages}
      inconvenients={strategy.inconvenients}
    />
    )
  }

  return (
    <div className= "gestion-strategy-missings">
      {strategiesMissings}
    </div>
  )
  // A modif pour faire comme une checkbox 
}

export default MissingsStratManagement