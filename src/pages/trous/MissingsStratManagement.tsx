import { type JSX } from 'react';
import MissingsStrat from './MissingsStrat';
import type { StrategiesProps } from '../../types';

const STRATEGIES : Array<StrategiesProps> = [
  {
    idStrategie: "strat1",
    strategie: "Ajouter \"missing\" à l'ontologie",
    descriptionStrategie: "Les trous sont traités comme une activité à part entière dans l'ontologie",
    emoji: "🌳",
    avantages: ["Conserve l'information sur les trous", "Permet de les rechercher explicitement"],
    inconvenients: ["Augmente la complexité de l'ontologie"]
  },
  {
    idStrategie: "strat2",
    strategie: "Remplacer par une activité spécifique",
    descriptionStrategie: "Remplacer tous les trous par une activité choisie (ex: \"maison\")",
    emoji: "🔄",
    avantages: ["Simple à implémenter", "Peut refléter une hypothèse réaliste"],
    inconvenients: ["Introduit un biais", "Peut fausser les résultats"]
  },
  {
    idStrategie: "strat3",
    strategie: "Remplacer par l'activité la plus fréquente",
    descriptionStrategie: "Remplacer les trous par l'activité qui apparaît le plus souvent dans le dataset",
    emoji: "📊",
    avantages: ["Basé sur les données", "Statistiquement justifiable"],
    inconvenients: ["Peut sur-représenter certaines activités", "Ignore le contexte"]
  },
  {
    idStrategie: "strat4",
    strategie: "Interpolation contextuelle",
    descriptionStrategie: "Deviner l'activité manquante en fonction des activités voisines",
    emoji: "🧩",
    avantages: ["Prend en compte le contexte", "Plus intelligent"],
    inconvenients: ["Plus complexe à calculer", "Peut créer des erreurs"]
  },
  {
    idStrategie: "strat5",
    strategie: "Supprimer les séquences avec trous",
    descriptionStrategie: "Exclure complètement les séquences contenant des données manquantes",
    emoji: "🗑️",
    avantages: ["Garantit des données complètes", "Évite les approximations"],
    inconvenients: ["Perte d'information", "Réduit la taille du dataset"]
  },
  {
    idStrategie: "strat6",
    strategie: "Garder tel quel (avec distance maximale)",
    descriptionStrategie: "Les trous sont comparés avec une distance maximale (similarité = 0)",
    emoji: "⚠️",
    avantages: ["Honnête sur l'incertitude", "Pas de modification des données"],
    inconvenients: ["Pénalise fortement les séquences avec trous"]
  }
]

function MissingsStratManagement({}){
  const strategiesMissings : Array<JSX.Element> = []
  for(let strategy of STRATEGIES){
    let handleClick = () => {
      const divHidden = document.getElementById(strategy.idStrategie)
      if(divHidden.hidden){
        divHidden.hidden = false
        for(let i=0; i<STRATEGIES.length; i++){
          if(STRATEGIES[i].idStrategie !== strategy.idStrategie){
            document.getElementById(STRATEGIES[i].idStrategie).hidden = true
          }
        }
      }else{
        divHidden.hidden = true
    }
  }


    strategiesMissings.push(
    <MissingsStrat
      key={strategy.idStrategie}
      id={strategy.idStrategie}
      emoji={strategy.emoji}
      strategie={strategy.strategie}
      descriptionStrategie={strategy.descriptionStrategie}
      avantages={strategy.avantages}
      inconvenients={strategy.inconvenients}
      onClick={handleClick}
    />
    )
  }

  return (
    <div className="border rounded p-3 mb-4">
      <div className="border rounded mb-4 p-3">
        <p className="text-muted mb-0">
          <strong>⚠️ Données manquantes détectées !</strong>
          <br/>
          Votre dataset contient des trous (activités manquantes).
          Choisissez comment vous souhaitez les gérer pour la recherche.
        </p>
      </div>
      <div className="d-flex flex-column">
        <div className="row g-3">
          {strategiesMissings.map((strategy) => (
            <div className="col-md-6" key={strategy.key}>
              {strategy}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MissingsStratManagement