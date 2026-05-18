import RangeActivities from './motif/RangeActivities';
import PatternCreation from './motif/PatternCreation';
import SequenceOverview from './motif/SequenceOverview';
import { useState } from 'react';
import type { PatternActivitiesProps } from '../types';
import PlusIcon from '../components/icons/PlusIcon';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

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

    const getActivitesPos = (id : string) => listeActivites.findIndex(activite => activite.id === id)

    const handleDragEnd = (event : any) => {
        const {active, over} = event

        if(active.id === over.id){
            return
        }
        setListeActivites(listeActivites => {
            const originalPos = getActivitesPos(active.id)
            const newPos = getActivitesPos(over.id)
            return arrayMove(listeActivites, originalPos, newPos)
        })
    }

    return (
        <div id="pattern-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">🎨 Construire votre motif de recherche</h2>
                    <p className="text-muted mb-0">Glissez des activités pour créer votre séquence recherchée</p>
                </div>
                <div>
                    <RangeActivities 
                        pattern={listeActivites} 
                        setPattern={setListeActivites}
                    />
                    <div 
                        className="border rounded p-3"
                        style={{
                            borderColor: '#e9eaee',
                            backgroundColor: '#e9eaee'
                        }}
                    >
                        <div className="div-motif-header">
                            <h5 
                                className="text-lg"
                                style={{
                                    color: "#272727"
                                }}
                            >
                                🔨 Votre motif
                            </h5>
                            <div id="pattern-total-time" className="" hidden>
                                Durée totale :
                                <span className="motif-total-time-span"> {dureeMotif} min</span>
                            </div>
                        </div>
                        <div id="pattern-placeholder" className="text-center">
                            <PlusIcon/>
                            <p className="">
                                Aucune activité ajoutée
                            </p>
                            <p className="">
                                Cliquez sur les activités ci-dessus pour construire votre motif
                            </p>
                        </div>
                        <DndContext
                            onDragEnd={handleDragEnd}
                            collisionDetection={closestCorners}
                        >
                            <PatternCreation 
                                dureeMotif={dureeMotif}
                                setDureeMotif={setDureeMotif} 
                                pattern={listeActivites} 
                                setPattern={setListeActivites}
                            />
                        </DndContext>
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
    //Faire l'affichage de la durée totale
    //Pour le drag and drop : npm install @dnd-kit/core @dnd-kit/utilities @dnd-kit/sortable
}

export default PatternPage