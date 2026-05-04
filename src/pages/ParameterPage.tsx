import React from 'react';
import GreenCheckIcon from '../components/icons/GreenCheckIcon';
import RFTHParameter from './parametre/RFTHParameter';
import { useState } from 'react';
import SliderParameter from './parametre/SliderParameter';
import ConfigurationParameter from './parametre/ConfigurationParameter';

interface ParameterPageProps{
    onNext: () => void;
    onBack: () => void;
}

function ParameterPage({onNext, onBack} : ParameterPageProps){
    const [valueSliderMobilite, setValueSliderMobilite] = useState<number>(0.0)
    const [valueSliderMeteo, setValueSliderMeteo] = useState<number>(0.0)

    return (
        <div id="param-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <h2 className="fw-bold mb-1">Configuration des Paramètres</h2>
                    <p className="text-muted mb-0">
                        Ajustez finement les paramètres de la méthode
                        <strong></strong>
                    </p>
                    <RFTHParameter/>
                    <div className="param-div">
                        <h3 className="fw-bold mb-1">Paramètres réglables</h3>
                        <SliderParameter/>
                    </div>
                    <div className="param-multidim" hidden>
                        <h3 className="fw-bold mb-1">Pondération Multidimensionnelle</h3>
                        <p className="text-muted mb-0">Ajustez l'importance relative de chaque dimension dans le calcul de similarité</p>
                        <ParametreMultidim
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
                        <ConfigurationParameter/>
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