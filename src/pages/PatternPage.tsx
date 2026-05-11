import React from 'react';
import RangeActivities from './motif/RangeActivities';
import PatternCreation from './motif/PatternCreation';
import SequenceOverview from './motif/SequenceOverview';
import { useState } from 'react';
import type { PatternActivitiesProps } from '../types';

interface PatternPageProps{
    onNext: () => void;
    onBack: () => void;
}

function PatternPage({onNext, onBack} : PatternPageProps){
    const [dureeMotif, setDureeMotif] = useState<number>(0)
    const [listeActivites, setListeActivites] = useState<Array<PatternActivitiesProps>>([])

    const handleNextPage = () => {
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

    return (
        <div id="pattern-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">🎨 Construire votre motif de recherche</h2>
                    <p className="text-muted mb-0">Glissez des activités pour créer votre séquence recherchée</p>
                </div>
                <div>
                    <RangeActivities pattern={listeActivites} setPattern={setListeActivites}/>
                    <div className="div-motif">
                        <div className="div-motif-header">
                            <h3 className="fw-bold mb-1">🔨 Votre motif</h3>
                            <div className="motif-total-time">
                                Durée totale :
                                <span className="motif-total-time-span">{dureeMotif} min</span>
                            </div>
                        </div>
                        <PatternCreation dureeMotif={dureeMotif} setDureeMotif={setDureeMotif} pattern={listeActivites} setPattern={setListeActivites}/>
                    </div>
                    <SequenceOverview pattern={listeActivites}/>
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
                        Choisir la méthode de similarité →
                    </button>
                </div>
            </div>
        </div>
    )
    //Le button next doit être disabled tant qu'il n'y a pas de motif
}

export default PatternPage