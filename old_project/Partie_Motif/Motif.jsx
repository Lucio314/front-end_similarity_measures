import React from 'react';
import PaletteActivite from './PaletteActivite';
import CreationMotif from './CreationMotif';
import ApercuSequence from './ApercuSequence';
import { useState } from 'react';

/**
 * @returns 
 */
function Motif({}){
    const [dureeMotif, setDureeMotif] = useState(0)

    return (
        <div id="motif-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <h2 className="h2-title">🎨 Construire votre motif de recherche</h2>
                    <p className="h2-title-p">Glissez des activités pour créer votre séquence recherchée</p>
                    <PaletteActivite/>
                    <div className="div-motif">
                        <div className="div-motif-header">
                            <h3 className="h3-title">🔨 Votre motif</h3>
                            <div className="motif-total-time">
                                Durée totale :
                                <span className="motif-total-time-span">{dureeMotif} min</span>
                            </div>
                        </div>
                        <CreationMotif dureeMotif={dureeMotif} setDureeMotif={setDureeMotif}/>
                    </div>
                    <div className="">
                        <h3 className="h3-title">👁️ Aperçu de votre séquence</h3>
                        <ApercuSequence dureeMotif={dureeMotif}/>
                    </div>
                </div>
                <button className="validate-button" onClick={() => null}>Choisir la méthode de similarité →</button>
                <button className="return-button" onClick={() => null}>← Retour</button>
            </div>
        </div>
    )
    //Modif les buttons plus tard
}

export default Motif