import OntologyDiv from './ontologie/OntologyDiv';
import WuPalmerDiv from './ontologie/WuPalmerDiv';
import type { OntologyProps } from '../types';

const ONTOLOGY : OntologyProps = {
    name:"All",
    children:[
        {
            name:"moving",
            children:[
                {
                    name:"human_power",
                    children: [
                        {
                            name:"marcher",
                            children: []
                        },
                        {
                            name:"vélo",
                            children: []
                        }
                    ]
                },
                {
                    name:"motorized",
                    children: [
                        {
                            name:"voiture",
                            children: []
                        },
                        {
                            name:"bus",
                            children: []
                        }
                    ]
                },
                {
                    name:"other",
                    children: []
                }
            ]
        },
        {
            name:"stop",
            children:[
                {
                    name:"fun",
                    children: [
                        {
                            name:"sport",
                            children: []
                        },
                        {
                            name:"shopping",
                            children: []
                        }
                    ]
                },
                {
                    name:"serious",
                    children: [
                        {
                            name:"travail",
                            children: []
                        },
                        {
                            name:"étude",
                            children: []
                        }
                    ]
                },
                {
                    name:"home",
                    children: []
                }
            ]
        },
        {
            name:"missing",
            children:[]
        }
    ]
}
//Exemple d'ontologie renvoyée par l'api
const activites : Array<string> = []

interface OntologyActivitesProps {
    ontology: OntologyProps;
    i: number;
}
function OntologyActivites({ontology, i} : OntologyActivitesProps){
    if(ontology.children.length === 0 && i === 3){
        activites.push(ontology.name)
    }
    else {
        ontology.children.forEach((child : OntologyProps) => OntologyActivites({ontology: child, i: i + 1}))
    }
}
OntologyActivites({ontology: ONTOLOGY, i: 0});
//Récupère toutes les activités de l'ontologie dans un Array

const MATRICEWUPALMER = [
    [1.0, 0.67, 0.33, 0.33, 0.0, 0.0, 0.0, 0.0],
    [0.67, 1.0, 0.33, 0.33, 0.0, 0.0, 0.0, 0.0],
    [0.33, 0.33, 1.0, 0.67, 0.0, 0.0, 0.0, 0.0],
    [0.33, 0.33, 0.67, 1.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 1.0, 0.67, 0.33, 0.33],
    [0.0, 0.0, 0.0, 0.0, 0.67, 1.0, 0.33, 0.33],
    [0.0, 0.0, 0.0, 0.0, 0.33, 0.33, 1.0, 0.67],
    [0.0, 0.0, 0.0, 0.0, 0.33, 0.33, 0.67, 1.0]
]
//Exemple de matrice de similarité renvoyée par l'api

interface OntologyPageProps {
  onNext: () => void;
  onBack: () => void;
}

function OntologyPage({ onNext, onBack } : OntologyPageProps){
    const handleNextPage = () => {
        const divOntologyPage = document.getElementById("ontology-card")
        const divStatsPage = document.getElementById("stats-card")
        divOntologyPage.hidden = true
        divStatsPage.hidden = false
        onNext()
    }

    const handlePreviousPage = () => {
        const divOntologyPage = document.getElementById("ontology-card")
        const divDataPage = document.getElementById("data-card")
        divOntologyPage.hidden = true
        divDataPage.hidden = false
        onBack()
    }

    return (
        <div id="ontology-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">🌳 Construction de l'Ontologie</h2>
                    <p className="text-muted mb-0">
                        L'ontologie permet de mesurer la similarité sémantique entre les activités
                    </p>
                </div>

                <OntologyDiv ontology={ONTOLOGY} />

                <WuPalmerDiv matrice={MATRICEWUPALMER} activites={activites}/>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button 
                    className="btn-return px-5 py-2 text-black"
                    onClick={handlePreviousPage}
                    style={{
                        backgroundColor: "#858494",
                        borderColor: "#858494",
                        cursor: "pointer",
                    }}
                >
                    ← Retour
                </button>
                <button 
                    className="btn-next px-5 py-2 text-white"
                    onClick={handleNextPage}
                    style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        cursor: "pointer",
                    }}
                >
                    Confirmer l'ontologie →
                </button>
            </div>
        </div>
    )
}

export default OntologyPage