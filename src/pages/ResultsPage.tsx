import SearchedPattern from "./resultats/SearchedPattern";
import ResultsInformations from "./resultats/ResultsInformations";
import ResultsSequences from "./resultats/ResultsSequences";
import type { ResultsProps } from "../types";

interface ResultsPageProps{
    onBackParameter: () => void;
    onBackPattern: () => void;
}

const RESULTS : ResultsProps = {
    pattern: {
        label: "",
        length: 3,
        total_durations: 90,
        activities: [
            {name: "shopping", duration: 30},
            {name: "sport", duration: 30},
            {name: "restaurant", duration: 30}
        ],
    },
    summary: {
        total_results: 5,
        best_score: 95.1,
        avg_duration: 383
    },
    meta:{
        dataset_id: "",
        method: "RFTH",
        top_k: 3,
        count: 5
    },
    results: [
        {
            rank: 1,
            score: 95.1,
            sequence: {
                id: "#mobility-seq-0",
                label: "",
                length: 7,
                total_durations: 505,
                activities: [
                    {name: "sport", duration: 58},
                    {name: "vélo", duration: 132},
                    {name: "vélo", duration: 72},
                    {name: "sport", duration: 68},
                    {name: "sport", duration: 83},
                    {name: "missing", duration: 61},
                    {name: "missing", duration: 31}
                ],
            }
        },
        {
            rank: 2,
            score: 89.9,
            sequence: {
                id: "#mobility-seq-1",
                label: "",
                length: 3,
                total_durations: 197,
                activities: [
                    {name: "restaurant", duration: 46},
                    {name: "missing", duration: 23},
                    {name: "vélo", duration: 128}
                ],
            }
        },
        {
            rank: 3,
            score: 87.7,
            sequence: {
                id: "#mobility-seq-2",
                label: "",
                length: 3,
                total_durations: 325,
                activities: [
                    {name: "maison", duration: 128},
                    {name: "étude", duration: 106},
                    {name: "sport", duration: 91}
                ],
            }
        },
        {
            rank: 4,
            score: 64.3,
            sequence: {
                id: "#mobility-seq-3",
                label: "",
                length: 7,
                total_durations: 584,
                activities: [
                    {name: "bus", duration: 123},
                    {name: "marcher", duration: 107},
                    {name: "étude", duration: 84},
                    {name: "shopping", duration: 120},
                    {name: "marcher", duration: 56},
                    {name: "shopping", duration: 59},
                    {name: "marcher", duration: 35}
                ],
            }
        },
        {
            rank: 5,
            score: 61.4,
            sequence: {
                id: "#mobility-seq-4",
                label: "",
                length: 4,
                total_durations: 302,
                activities: [
                    {name: "étude", duration: 102},
                    {name: "travail", duration: 60},
                    {name: "missing", duration: 68},
                    {name: "sport", duration: 72}
                ],
            }
        }
    ]
}
//Exemple de résultat renvoyé par l'api

function ResultsPage({onBackParameter, onBackPattern} : ResultsPageProps ){

    const handleBackParameterPage = () => {
        const divParameterPage = document.getElementById("parameter-card")
        const divResultsPage = document.getElementById("results-card")
        divParameterPage.hidden = false
        divResultsPage.hidden = true
        onBackParameter()
    }

    const handleBackPatternPage = () => {
        const divResultsPage = document.getElementById("results-card")
        const divPatternPage = document.getElementById("pattern-card")
        divResultsPage.hidden = true
        divPatternPage.hidden = false
        onBackPattern()
    }

    return(
        <div id="results-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">🎯 Résultats de la recherche</h2>
                    <p className="text-muted mb-0">
                        Top {RESULTS.meta.count} séquences les plus similaires à votre motif
                    </p>
                </div>
                <SearchedPattern pattern={RESULTS.pattern} method={RESULTS.meta.method}/>
                <ResultsInformations summary={RESULTS.summary}/>
                <ResultsSequences results={RESULTS.results}/>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button 
                    className="btn-return px-5 py-2 text-black"
                    onClick={handleBackPatternPage}
                    style={{
                        backgroundColor: "#858494",
                        borderColor: "#858494",
                        cursor: "pointer",
                    }}
                >
                    Nouvelle recherche
                </button>
                <button 
                    className="btn-next px-5 py-2 text-white"
                    onClick={handleBackParameterPage}
                    style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        cursor: "pointer",
                    }}
                >
                    Ajuster les paramètres
                </button>
            </div>
        </div>
    )
}

export default ResultsPage