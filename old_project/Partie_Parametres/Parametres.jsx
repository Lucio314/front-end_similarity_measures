import React from 'react';
import GreenCheck from '../component/Icons/GreenCheck'
import ParametreRFTH from './ParametreRFTH';
import { useState } from 'react';

function Parametres({}){
    const [valueSliderMobilite, setValueSliderMobilite] = useState(0.0)
    const [valueSliderMeteo, setValueSliderMeteo] = useState(0.0)

    return (
        <div id="param-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <h2 className="h2-title">Configuration des Paramètres</h2>
                    <p className="h2-title-p">
                        Ajustez finement les paramètres de la méthode
                        <strong></strong>
                    </p>
                    <ParametreRFTH/>
                    <div className="param-div">
                        <h3 className="h3-title">Paramètres réglables</h3>
                        <ParametreSliders/>
                    </div>
                    <div className="param-multidim" hidden>
                        <h3 className="h3-title">Pondération Multidimensionnelle</h3>
                        <p className="paragraph">Ajustez l'importance relative de chaque dimension dans le calcul de similarité</p>
                        <ParametreMultidim
                            valueSliderMobilite={valueSliderMobilite}
                            valueSliderMeteo={valueSliderMeteo}
                            onValueSliderMobilitieChange={setValueSliderMobilite}
                            onValueSliderMeteoChange={setValueSliderMeteo}
                        />
                    </div>
                    <div className="param-actual-config">
                        <h4 className="h4-param-actual-config">
                            <GreenCheck/>
                            Configuration actuelle
                        </h4>
                        <ParametreConfig/>
                    </div>
                </div>
                <button className="validate-button" onClick={() => null}>Lancer la recherche →</button>
                <button className="return-button" onClick={() => null}>← Retour</button>
            </div>
        </div>
    )
    //Faire les buttons plus tard
    //Ajouter des useState entre Methode et Parametres (peut-être au niveau de l'App) pour gérer le fait qu'on
    //selectionne une méthode particulière
    //Exemple : [RFTHIsSelected, setRFTHIsSelected] dans App, 
    //Methode reçoit le getter et setter (modifie avec le setter quand button cliqué),
    //Parametres reçoit le getter (modifie les div visibles, comme les sliders)
}

export default Parametres