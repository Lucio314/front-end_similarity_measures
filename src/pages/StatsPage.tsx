import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getDatasetStats } from "../api";
import type { DatasetStats } from "../api";

interface StatsPageProps {
  onNext: () => void;
}

function StatsPage({ onNext }: StatsPageProps) {
  const { datasetId } = useAppContext();
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!datasetId) {
      setError("Aucun dataset chargé.");
      setLoading(false);
      return;
    }
    getDatasetStats(datasetId)
      .then(setStats)
      .catch(() => setError("Impossible de récupérer les statistiques."))
      .finally(() => setLoading(false));
  }, [datasetId]);

  if (loading) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Chargement des statistiques…</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
        <div className="card-body p-5 text-center">
          <p className="text-danger">{error ?? "Erreur inconnue."}</p>
        </div>
      </div>
    );
  }

  const { global: g, duration, activities, missing } = stats;
  const activityEntries = [...activities.distribution].sort((a, b) => b.value - a.value);

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body p-5">

        {/* Titre */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">📊 Statistiques du Dataset</h2>
          <p className="text-muted mb-0">Dataset : <strong>{datasetId}</strong></p>
        </div>

        {/* KPI Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="rounded p-3 text-white h-100" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="fw-bold mb-1" style={{ fontSize: 13 }}># Séquences totales</div>
              <div className="fw-bold" style={{ fontSize: 36 }}>{g.num_sequences}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="rounded p-3 text-white h-100" style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)" }}>
              <div className="fw-bold mb-1" style={{ fontSize: 13 }}>Types d'activités</div>
              <div className="fw-bold" style={{ fontSize: 36 }}>{g.num_activities}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="rounded p-3 text-white h-100" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
              <div className="fw-bold mb-1" style={{ fontSize: 13 }}>Longueur moyenne</div>
              <div className="fw-bold" style={{ fontSize: 36 }}>{g.avg_length.toFixed(1)}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="rounded p-3 text-white h-100" style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
              <div className="fw-bold mb-1" style={{ fontSize: 13 }}>Durée moy. (min)</div>
              <div className="fw-bold" style={{ fontSize: 36 }}>{Math.round(duration.avg)}</div>
            </div>
          </div>
        </div>

        {/* Durées */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Durées des séquences</h6>
          <div className="row g-3">
            {[
              { label: "Durée minimale", value: `${Math.round(duration.min)} min` },
              { label: "Durée moyenne",  value: `${Math.round(duration.avg)} min` },
              { label: "Durée maximale", value: `${Math.round(duration.max)} min` },
            ].map(({ label, value }) => (
              <div key={label} className="col-4">
                <div className="border rounded p-3 text-center">
                  <div className="text-muted mb-1" style={{ fontSize: 12 }}>{label}</div>
                  <div className="fw-bold" style={{ fontSize: 20 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Données manquantes */}
        <div className="rounded p-3 mb-4" style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d" }}>
          <h6 className="fw-semibold mb-3" style={{ color: "#92400e" }}>⚠ Données Manquantes (Trous)</h6>
          <div className="row g-2 text-center">
            {[
              { label: "Total de trous",              value: missing.total_gaps },
              { label: "Séquences affectées",         value: missing.sequences_with_gaps },
              { label: "% séquences avec trous",      value: `${missing.percentage_sequences_with_gaps.toFixed(1)}%` },
              { label: "Moy. trous/séquence affectée",value: missing.avg_gaps_per_sequence.toFixed(1) },
            ].map(({ label, value }) => (
              <div key={label} className="col-6 col-md-3">
                <div className="fw-bold" style={{ fontSize: 22, color: "#d97706" }}>{value}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
          <p className="mb-0 mt-2" style={{ fontSize: 12, color: "#92400e" }}>
            💡 Les données manquantes représentent <strong>{missing.percentage_missing_activities.toFixed(2)}%</strong> de toutes les activités.
            Il est recommandé de définir une stratégie de gestion des trous.
          </p>
        </div>

        {/* Détail des activités */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Détail des activités présentes</h6>
          <div className="row g-2">
            {activityEntries.map(({ name, value }) => (
              <div key={name} className="col-6 col-md-4">
                <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2">
                  <span className="text-capitalize" style={{ fontSize: 14 }}>{name}</span>
                  <span className="badge rounded-pill" style={{ backgroundColor: "#e0e7ff", color: "#4f46e5", fontSize: 12 }}>
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton suivant */}
        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn text-white px-5 py-2"
            style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }}
            onClick={onNext}
          >
            Construire l'ontologie →
          </button>
        </div>

      </div>
    </div>
  );
}

export default StatsPage;
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
                <div id="div-part-body-stats" className="border rounded p-3 mt-4 row">
                    <div className="col-md-12">
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
}

export default StatsPage
