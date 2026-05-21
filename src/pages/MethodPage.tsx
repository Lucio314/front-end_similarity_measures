import ComparativeTable from './methode/ComparativeTable';
import FTHTDemo from './methode/FTHTDemo';
import RFTHDemo from './methode/RFTHDemo';
import SimilarityMethods from './methode/SimilarityMethods';
import BookIcon from '../components/icons/BookIcon';
import { useState } from 'react';
import type { MethodProps } from '../types';

const METHODS : Array<MethodProps> = [
    {
        "name": "RFTH",
        "label": "Relative Fuzzy Temporal Hamming",
        "description": "Extension de FTH pour sequences de t-lengths differentes. Combine comparabilite temporelle et similarite semantique via une T-norme.",
        "principle": "Normalise les durees a 1000, applique FTH sur les versions normalisees, puis pondere par l'indice de comparabilite des t-lengths.",
        "advantages": [
            "Gere des sequences de longueurs temporelles differentes",
            "Integre la similarite semantique via l'ontologie",
            "Robuste aux permutations et repetitions"
        ],
        "limitations": [
            "Necessite une ontologie",
            "Cout de calcul eleve"
        ],
        "properties": {
            "symmetry": true,
            "normalized": true,
            "metric": false,
            "requires_ontology": true,
            "supports_different_lengths": true
        },
        "params": ["interval_step", "time_window", "agg", "duration_threshold"],
        "semantic_measure": {
            "name": "Wu-Palmer",
            "description": "Mesure la proximite semantique entre deux activites basee sur leur profondeur dans l'ontologie et celle de leur ancetre commun le plus profond (LCS).",
            "formula": "2 * depth(LCS) / (depth(a1) + depth(a2))",
            "range": [0, 1]
        }
    },
    {
        "name": "FTH",
        "label": "Fuzzy Temporal Hamming",
        "description": "Generalisation floue de la distance de Hamming. Utilise une fenetre temporelle floue et la similarite Wu-Palmer pour comparer les elements semantiquement et temporellement.",
        "principle": "Attribue un cout aux operations de substitution base sur l'alignement temporel et la similarite semantique entre les elements.",
        "advantages": [
            "Robuste aux decalages temporels",
            "Integre la similarite semantique",
            "Plus rapide que RFTH"
        ],
        "limitations": [
            "Limitee aux sequences de t-lengths comparables",
            "Necessite une ontologie"
        ],
        "properties": {
            "symmetry": true,
            "normalized": false,
            "metric": false,
            "requires_ontology": true,
            "supports_different_lengths": false
        },
        "params": ["interval_step", "time_window", "agg"],
        "semantic_measure": {
            "name": "Wu-Palmer",
            "description": "Mesure la proximite semantique entre deux activites basee sur leur profondeur dans l'ontologie et celle de leur ancetre commun le plus profond (LCS).",
            "formula": "2 * depth(LCS) / (depth(a1) + depth(a2))",
            "range": [0, 1]
        }
    },
    {
        "name": "CED",
        "label": "Contextual Edit Distance",
        "description": "Extension de la distance d'edition qui prend en compte la proximite semantique entre activites via une ontologie et la position relative des elements.",
        "principle": "Mesure le cout de transformation d'une sequence en une autre, en penalisant moins les substitutions d'activites semantiquement proches.",
        "advantages": [
            "Simple et interpretable",
            "Sensible au contexte semantique",
            "Gere les inversions et repetitions"
        ],
        "limitations": [
            "Ignore la structure temporelle",
            "Necessite une ontologie"
        ],
        "properties": {
            "symmetry": true,
            "normalized": false,
            "metric": true,
            "requires_ontology": true,
            "supports_different_lengths": true
        },
        "params": ["beta"]
    }
]
//Element METHOD de l'api

interface MethodPageProps {
  onNext: () => void;
  onBack: () => void;
}

function MethodPage({onNext, onBack} : MethodPageProps){
    const [textTabButton, setTextTabButton] = useState<String>("Voir")
    const [textDemoFTHTButton, setTextDemoFTHTButton] = useState<String>("Voir")
    const [textDemoRFTHButton, setTextDemoRFTHButton] = useState<String>("Voir")

    const handleClickTabButton = (e) => {
        const divTabComparatif = document.getElementById('comparative-tab')
        if(divTabComparatif.hidden){
            setTextTabButton("Masquer")
            divTabComparatif.hidden=false
        }else{
            setTextTabButton("Voir")
            divTabComparatif.hidden=true
        }

    }

    const handleClickDemoFTHTButton = (e) => {
        const divDemoFTHT = document.getElementById('demo-ftht')
        if(divDemoFTHT.hidden){
            setTextDemoFTHTButton("Masquer")
            divDemoFTHT.hidden=false
        }else{
            setTextDemoFTHTButton("Voir")
            divDemoFTHT.hidden=true
        }
    }

    const handleClickDemoRFTHButton = (e) => {
        const divDemoRFTH = document.getElementById('demo-rfth')
        if(divDemoRFTH.hidden){
            setTextDemoRFTHButton("Masquer")
            divDemoRFTH.hidden=false
        }else{
            setTextDemoRFTHButton("Voir")
            divDemoRFTH.hidden=true
        }
    }

    const handleNextPage = () => {
        const divMethodPage = document.getElementById("method-card")
        const divParameterPage = document.getElementById("parameter-card")
        divMethodPage.hidden = true
        divParameterPage.hidden = false
        onNext()
    }

    const handlePreviousPage = () => {
        const divMethodPage = document.getElementById("method-card")
        const divPatternPage = document.getElementById("pattern-card")
        divMethodPage.hidden = true
        divPatternPage.hidden = false
        onBack()
    }

    return (
        <div id="method-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="text-center mb-4">🎯 Méthode de Similarité</h2>
                    <p className="text-muted mb-0">Choisissez l'algorithme pour mesurer la similarité entre les séquences</p>
                    <div className="method-body">
                        <button className="tab-button" onClick={handleClickTabButton}>
                            <BookIcon/>
                            {textTabButton} le tableau comparatif
                        </button>
                        <button className="demo-button" onClick={handleClickDemoFTHTButton}>
                            {textDemoFTHTButton} la démo FTH Troncature
                        </button>
                        <button className="demo-button" onClick={handleClickDemoRFTHButton}>
                            {textDemoRFTHButton} la démo RFTH
                        </button>
                    </div>
                    <ComparativeTable/>
                    <FTHTDemo/>
                    <RFTHDemo/>
                    <SimilarityMethods/>
                </div>
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
                    disabled
                >
                    Configurer les paramètres →
                </button>
            </div>
        </div>
    )
    //Finir FTHTDemo
    //Faire RFTHDemo
    //Le button next doit être disabled tant qu'il n'y a pas de sélection de méthode
    //Faire un isChecked pour MethodesSimilarite pour permettre la communication avec Parametres.jsx (envoie des paramètres et nom méthode)
}


export default MethodPage