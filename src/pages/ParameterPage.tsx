import GreenCheckIcon from '../components/icons/GreenCheckIcon';
import RFTHParameter from './parametre/RFTHParameter';
import { useState } from 'react';
import SlidersParameter from './parametre/SlidersParameter';
import ConfigurationsParameter from './parametre/ConfigurationsParameter';
import MultidimParameter from './parametre/MultidimParameter';
import type { ListParametersProps } from '../types';
import SlidersIcon from '../components/icons/SlidersIcon';

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
    const [valueSliderAlignementStrategy, setValueSliderAlignementStrategy] = useState<number>(0)
    const [valueSliderLambda, setValueSliderLambda] = useState<number>(60)
    const [valueSliderWarpingWindow, setValueSliderWarpingWindow] = useState<number>(10)
    const [valueSliderTransitionThreshold, setValueSliderTransitionThreshold] = useState<number>(0.10)

    //Liste de listes contenant tous les getters et setters des useState pour SlidersParameter et ConfigurationParameter
    
    const listeParametres : Array<ListParametersProps> = [  
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
            nomParam: "position_weight",
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
            nomParam: "alignment_strategy",
            getter: valueSliderAlignementStrategy,
            setter: setValueSliderAlignementStrategy
        },
        {
            nomParam: "lambda",
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
    //Définir si RFTH sélectionné que le paramètre semantic_measure soit Wu Palmer, sans modification possible

    const handleNextPage = () => {
        const divResultsPage = document.getElementById("results-card")
        const divParameterPage = document.getElementById("parameter-card")
        divParameterPage.hidden = true
        divResultsPage.hidden = false
        onNext()
    }

    const handlePreviousPage = () => {
        const divParameterPage = document.getElementById("parameter-card")
        const divMethodPage = document.getElementById("method-card")
        divParameterPage.hidden = false
        divMethodPage.hidden = true
        onBack()
    }

    return (
        <div id="parameter-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Configuration des Paramètres</h2>
                    <p className="text-muted mb-0">
                        Ajustez finement les paramètres de la méthode
                        <strong>{"FTH-T"}</strong> {/*Sert d'exemple ici, doit être la méthode sélectionné de MethodPage*/}
                    </p>
                    <RFTHParameter 
                        RFTHIsSelected={false}
                    /> {/* Paramètre à ajouter (un useState) */}
                    <div className="param-div">
                        <h3 className="fw-bold mb-1">
                            <SlidersIcon/>
                            Paramètres réglables
                        </h3>
                        <SlidersParameter 
                            listeParametres={listeParametres} 
                            nomMethode="FTH-T"
                        /> {/* Paramètre à ajouter (nom de la méthode sélectionnée à la page d'avant) */}
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
                        <ConfigurationsParameter 
                            listeParametres={listeParametres} 
                            nomMethode="FTH-T"
                        /> {/* Paramètre à ajouter (nom de la méthode sélectionnée à la page d'avant) */}
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
                    >
                        Lancer la recherche →
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