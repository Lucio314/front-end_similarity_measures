import React from 'react';
import OntologyDiv from './ontologie/OntologyDiv';
import WuPalmerDiv from './ontologie/WuPalmerDiv';

interface OntologyPageProps {
  onNext: () => void;
  onBack: () => void;
}

function OntologyPage({ onNext, onBack } : OntologyPageProps){
    const handleNextPage = () => {
        const divOntologyPage = document.getElementById("ontology-card")
        const divMissingsPage = document.getElementById("missings-card")
        divOntologyPage.hidden = true
        divMissingsPage.hidden = false
        onNext
    }

    const handlePreviousPage = () => {
        const divOntologyPage = document.getElementById("ontology-card")
        const divStatsPage = document.getElementById("stats-card")
        divOntologyPage.hidden = true
        divStatsPage.hidden = false
        onBack
    }

    return (
        <div id="ontology-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">🌳 Construction de l'Ontologie</h2>
                    <p className="text-muted mb-0">
                        L'ontologie permet de mesurer la similarité sémantique entre les activités
                    </p>
                </div>

                <OntologyDiv/>

                <WuPalmerDiv/>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button 
                    className="btn-next px-5 py-2 text-white"
                    onClick={handleNextPage}
                    style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        cursor: "pointer",
                    }}
                >
                    Confirmer l'ontologie →
                </button>
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
            </div>
        </div>
    )
  //Modif button plus tard
}

export default OntologyPage