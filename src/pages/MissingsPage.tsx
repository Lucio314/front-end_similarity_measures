import MissingsStratManagement from './trous/MissingsStratManagement';

interface MissingsPageProps {
  onNext: () => void;
  onBack: () => void;
}

function Trous({onNext, onBack} : MissingsPageProps){
    const handleNextPage = () => {
        const divMissingsPage = document.getElementById("missings-card")
        const divPatternPage = document.getElementById("pattern-card")
        divMissingsPage.hidden = true
        divPatternPage.hidden = false
        onNext()
    }

    const handlePreviousPage = () => {
        const divMissingsPage = document.getElementById("missings-card")
        const divOntologyPage = document.getElementById("ontology-card")
        divMissingsPage.hidden = true
        divOntologyPage.hidden = false
        onBack()
    }

    return (
        <div id="missings-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }} hidden>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <div className="div-missing-warning">
                        <p className="text-muted mb-0">
                            <strong>⚠️ Données manquantes détectées !</strong>
                            <br/>
                            Votre dataset contient des trous (activités manquantes).
                            Choisissez comment vous souhaitez les gérer pour la recherche.
                        </p>
                    </div>
                    <h2 className="text-center mb-4">🔧 Gestion des données manquantes</h2>
                    <MissingsStratManagement/>
                    <div className="div-strategy-recommendation">
                        <p className="text-muted mb-0">
                            <strong>💡 Recommandation :</strong>
                            Pour une recherche sémantique, l'option "Ajouter missing à l'ontologie"
                            est généralement la plus appropriée car elle permet de traiter les trous
                            de manière cohérente avec votre modèle de données.
                        </p>
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
                        Confirmer la stratégie →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Trous