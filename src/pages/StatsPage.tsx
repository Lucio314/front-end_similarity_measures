import { useState } from "react";
import MenuSelect from "../components/MenuSelect";
import Checkbox from "../components/Checkbox";
import DatasetStatistics from "./statistiques/DatasetStatistics";
import SequencesStatistics from "./statistiques/SequencesStatistics";
import type { DatasetInfoProps, DatasetProps } from "../types";

const DATASETINFO : DatasetInfoProps = {
        "global": {
            "num_sequences": 50,
            "num_activities": 10,
            "avg_length": 5.2
        },
        "duration": {
            "min": 106,
            "avg": 353,
            "max": 636
        },
        "activities": {
            "distribution": [
                                {name: "marcher", value: 20},
                                {name: "restaurant", value: 26},
                                {name: "sport", value: 25},
                                {name: "bus", value: 27},
                                {name: "shopping", value: 23},
                                {name: "travail", value: 27},
                                {name: "étude", value: 21},
                                {name: "vélo", value: 19},
                                {name: "missing", value: 56},
                                {name: "maison", value: 17}
                            ]
        },
        "missing": {
            "total_gaps": 56,
            "sequences_with_gaps": 34,
            "percentage_sequences_with_gaps": 68.0,
            "avg_gaps_per_sequence": 1.6,
            "percentage_missing_activities": 21.46
        }
    }   
    
//Exemple de données d'un dataset
/* 
    Les données à mettre dans les graphes doivent être de la forme :
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
*/
    
const DATASET : DatasetProps = {
    "dataset_id": "sidos",
    "count" : 2,
    "limit" : 50,
    "offset": 0,
    "sequence" : [
        {
            "id": 1,
            "label": "#mobility-seq-1",
            "length": 4,
            "total_duration": 200,
            "activities": [
                {
                    "name": "marcher",
                    "duration" : 60
                },
                {
                    "name": "bus",
                    "duration" : 35
                },
                {
                    "name": "travail",
                    "duration" : 45
                },
                {
                    "name": "restaurant",
                    "duration" : 60
                }
            ],
            "avg_duration": 50
        },
        {
            "id": 2,
            "label": "#mobility-seq-2",
            "length": 3,
            "total_duration": 300,
            "activities": [
                {
                    "name": "travail",
                    "duration" : 105
                },
                {
                    "name": "missing",
                    "duration" : 80
                },
                {
                    "name": "travail",
                    "duration" : 115
                }
            ],
            "avg_duration": 100
        }
    ]
}

//Exemple de dataset

const LISTDATASETS : Array<string> = [DATASET.dataset_id]

//Exemple de liste de tous les datasets pour le MenuSelect


interface DataPageProps {
  onNext: () => void;
  onBack: () => void;
}

function StatsPage({ onNext, onBack }: DataPageProps){
    const [isMultiChecked, setIsMultiChecked] = useState<boolean>(false);

    const handleShowSequencesClick = () => {
        const divSequences = document.getElementById("div-part-body-sequences");
        const divStats = document.getElementById("div-part-body-stats");
        const button = document.getElementById("btn-show-seq")
        if(divSequences.hidden) {
            button.textContent = "Voir les statistiques"
            divSequences.hidden = false
            divStats.hidden = true
        }else{
            button.textContent = "Visualiser toutes les séquences"
            divSequences.hidden = true
            divStats.hidden = false
        }
    }

    const handleNextPage = () => {
        const divStatsPage = document.getElementById("stats-card")
        const divOntologyPage = document.getElementById("ontology-card")
        divStatsPage.hidden = true
        divOntologyPage.hidden = false
        onNext()
    }

    const handlePreviousPage = () => {
        const divDataPage = document.getElementById("data-card")
        const divStatsPage = document.getElementById("stats-card")
        divStatsPage.hidden = true
        divDataPage.hidden = false
        onBack()
    }

    return(
        <div id="stats-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <button 
                    id="btn-show-seq"
                    className="btn-show-seq px-5 py-2 text-white"
                    onClick={handleShowSequencesClick}
                    style={{
                        backgroundColor: "#662fcc",
                        borderColor: "#662fcc",
                        cursor: "pointer",
                    }}
                >
                    Visualiser toutes les séquences
                </button>
                <div id="div-part-body-stats" className="part-main-body">
                    <div className="part-body">
                        <div className="">
                            <h2 className="fw-bold mb-1 text-center">Statistiques du Dataset</h2>
                            <div className="div-checkbox-multi">
                                <Checkbox 
                                    id="checkbox-multi"
                                    checked={isMultiChecked}
                                    onChange={setIsMultiChecked}
                                    label="Activer la recherche multidimensionnelle (Activités Humaines + Données Météo)"
                                />
                            </div>
                            <label className="text-muted mb-0">
                                Sélectionner le dataset :
                                <MenuSelect 
                                    options={LISTDATASETS}
                                    value={-1}
                                    onValueChange={() => null}
                                />
                            </label>
                        </div>
                        <DatasetStatistics datasetInfo={DATASETINFO}/>
                    </div>
                </div>
                <SequencesStatistics 
                    dataset = {DATASET}
                    listeDatasets={LISTDATASETS} 
                    nombreSequences={DATASETINFO.global.num_activities}
                    moyActivitesSequence={DATASETINFO.global.avg_length}
                    dureeMoy={DATASETINFO.duration.avg}
                    nombreTrous={DATASETINFO.missing.total_gaps}
                />
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
                    Construire l'ontologie →
                </button>
            </div>
        </div>
    )
    //Faire les event des buttons
}

export default StatsPage