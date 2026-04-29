import React from 'react';
import GestionStrategieTrous from "./GestionStrategieTrous";

/**
 * @returns 
 */
function Trous({}){
    return (
        <div id="missings-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <div className="div-missing-warning">
                        <p className="missing-warning">
                            <strong>⚠️ Données manquantes détectées !</strong>
                            <br/>
                            Votre dataset contient des trous (activités manquantes).
                            Choisissez comment vous souhaitez les gérer pour la recherche.
                        </p>
                    </div>
                    <h2 className="h2-title">🔧 Gestion des données manquantes</h2>
                    <GestionStrategieTrous/>
                    <div className="div-strategy-recommendation">
                        <p className="strategy-recommendataion">
                            <strong>💡 Recommandation :</strong>
                            Pour une recherche sémantique, l'option "Ajouter missing à l'ontologie"
                            est généralement la plus appropriée car elle permet de traiter les trous
                            de manière cohérente avec votre modèle de données.
                        </p>
                    </div>
                </div>
                <button className="validate-button" onClick={() => null}>Confirmer la stratégie →</button>
                <button className="return-button" onClick={() => null}>← Retour</button>
            </div>
        </div>
    )
    //Modifier les buttons plus tard
}

export default Trous