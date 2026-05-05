import React from 'react';
import GreenCheckIcon from '../components/icons/GreenCheckIcon';
import RFTHParameter from './parametre/RFTHParameter';
import { useState } from 'react';
import SlidersParameter from './parametre/SlidersParameter';
import ConfigurationsParameter from './parametre/ConfigurationsParameter';
import MultidimParameter from './parametre/MultidimParameter';
import type { ListParametersProps } from '../types';

interface ParameterPageProps{
    onNext: () => void;
    onBack: () => void;
}

function ParameterPage({onNext, onBack} : ParameterPageProps){
    //Tous les useState selon les paramètres
    const [valueSliderMobilite, setValueSliderMobilite] = useState<number>(0.0)
    const [valueSliderMeteo, setValueSliderMeteo] = useState<number>(0.0)
    const [valueSliderK, setValueSliderK] = useState<number>(5)
    const [valueSliderSimilarite, setValueSliderSimilarite] = useState<number>(0.50)
    const [valueSliderPositionWeight, setValueSliderPositionWeight] = useState<number>(0.50)
    const [valueSliderSemanticWeight, setValueSliderSemanticWeight] = useState<number>(0.50)
    const [valueSliderFuzzyWindow, setValueSliderFuzzyWindow] = useState<number>(50)
    const [valueSliderAlignementStrategy, setValueSliderAlignementStrategy] = useState<string>("exhaustive")
    const [valueSliderLambda, setValueSliderLambda] = useState<number>(60)
    const [valueSliderWarpingWindow, setValueSliderWarpingWindow] = useState<number>(10)
    const [valueSliderTransitionThreshold, setValueSliderTransitionThreshold] = useState<number>(0.10)

    //Liste de listes contenant tous les getters et setters des useState pour SlidersParameter et ConfigurationParameter
    
    const listeParametres : ListParametersProps[] = [  
        {
            nomParam: "K",
            getter: valueSliderK,
            setter: setValueSliderK
        },
        {
            nomParam: "Similarite",
            getter: valueSliderSimilarite,
            setter: setValueSliderSimilarite
        },
        {
            nomParam: "poistion_weight",
            getter: valueSliderPositionWeight,
            setter: setValueSliderPositionWeight
        },
        {
            nomParam: "semantic_weight",
            getter: valueSliderSemanticWeight,
            setter: setValueSliderSemanticWeight
        },
        {
            nomParam: "fuzzy_window",
            getter: valueSliderFuzzyWindow,
            setter: setValueSliderFuzzyWindow
        },
        {
            nomParam: "alignement_strategy",
            getter: valueSliderAlignementStrategy,
            setter: setValueSliderAlignementStrategy
        },
        {
            nomParam: "lamba",
            getter: valueSliderLambda,
            setter: setValueSliderLambda
        },
        {
            nomParam: "warping_window",
            getter: valueSliderWarpingWindow,
            setter: setValueSliderWarpingWindow
        },
        {
            nomParam: "transition_threshold",
            getter: valueSliderTransitionThreshold,
            setter: setValueSliderTransitionThreshold
        }
    ]

    /*const handleNextPage = () => {
        const divPatternPage = document.getElementById("pattern-card")
        const divMethodPage = document.getElementById("method-card")
        divPatternPage.hidden = true
        divMethodPage.hidden = false
        onNext
    }

    const handlePreviousPage = () => {
        const divPatternPage = document.getElementById("pattern-card")
        const divMissingsPage = document.getElementById("missings-card")
        divPatternPage.hidden = true
        divMissingsPage.hidden = false
        onBack
    }
        A réaliser plus tard quand la page Résultats sera créer 
    */

    return (
        <div id="parameter-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Configuration des Paramètres</h2>
                    <p className="text-muted mb-0">
                        Ajustez finement les paramètres de la méthode
                        <strong></strong>
                    </p>
                    <RFTHParameter/> {/* Paramètre à ajouter (un useState) */}
                    <div className="param-div">
                        <h3 className="fw-bold mb-1">Paramètres réglables</h3>
                        <SlidersParameter listeParametres={listeParametres}/> {/* Paramètre à ajouter (nom de la méthode sélectionnée à la page d'avant) */}
                    </div>
                    <div className="param-multidim" hidden>
                        <h3 className="fw-bold mb-1">Pondération Multidimensionnelle</h3>
                        <p className="text-muted mb-0">Ajustez l'importance relative de chaque dimension dans le calcul de similarité</p>
                        <MultidimParameter
                            valueSliderMobilite={valueSliderMobilite}
                            valueSliderMeteo={valueSliderMeteo}
                            onValueSliderMobilitieChange={setValueSliderMobilite}
                            onValueSliderMeteoChange={setValueSliderMeteo}
                        />
                    </div>
                    <div className="param-actual-config">
                        <h4 className="fw-bold mb-1">
                            <GreenCheckIcon/>
                            Configuration actuelle
                        </h4>
                        <ConfigurationsParameter listeParametres={listeParametres}/> {/* Paramètre à ajouter (nom de la méthode sélectionnée à la page d'avant) */}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button 
                        className="btn-next px-5 py-2 text-white"
                        onClick={onNext}
                        style={{
                            backgroundColor: "#4f46e5",
                            borderColor: "#4f46e5",
                            cursor: "pointer",
                        }}
                        disabled
                    >
                        Choisir la méthode de similarité →
                    </button>
                    <button 
                        className="btn-return px-5 py-2 text-black"
                        onClick={onBack}
                        style={{
                            backgroundColor: "#858494",
                            borderColor: "#858494",
                            cursor: "pointer",
                        }}
                    >
                        ← Retour
                    </button>
                </div>
            </div>
        </div>
    )
    //Ajouter des useState entre Methode et Parametres (peut-être au niveau de l'App) pour gérer le fait qu'on
    //selectionne une méthode particulière
    //Exemple : [RFTHIsSelected, setRFTHIsSelected] dans App, 
    //Methode reçoit le getter et setter (modifie avec le setter quand button cliqué),
    //Parametres reçoit le getter (modifie les div visibles, comme les sliders)
}

export default ParameterPage