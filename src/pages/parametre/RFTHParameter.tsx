import InformationIcon from '../../components/icons/InformationIcon';
import GreenCheckIcon from '../../components/icons/GreenCheckIcon';

interface RFTHParameterProps{
    RFTHIsSelected: boolean;
}

function RFTHParameter({RFTHIsSelected} : RFTHParameterProps){
    if(RFTHIsSelected){
        return (
            <div id="id-param-rfth" className="param-rfth" hidden>
                <h3 className="h3-title">
                    <InformationIcon/>
                    Paramètres spécifiques RFTH
                </h3>
                <div className="param-rfth-normalisation">
                    <h4 className="h4-title">Normalisation des durées</h4>
                    <p className="paragraph">
                        RFTH normalise les séquences sur une échelle commune (0-1)
                        pour permettre la comparaison de séquences de durées totales différentes.
                        Chaque activité est représentée proportionnellement à sa durée relative.
                    </p>
                    <div className="param-rfth-normalisation-exemples">
                        <span>
                            Exemple: Séquence 8h → [0.0 - 1.0]
                        </span>
                        <span>
                            Exemple: Séquence 10h → [0.0 - 1.0]
                        </span>
                    </div>
                </div>
                <div className="param-rfth-tnormes">
                    <h4 className="h4-title">T-normes pour combinaison</h4>
                    <p className="paragraph">
                        RFTH utilise des T-normes (opérateurs de logique floue)
                        pour combiner les scores de similarité sémantique et temporelle de manière cohérente.
                    </p>
                    <div className="param-rfth-tnormes-formule">
                        similarity = T-norm(sim_sémantique, sim_temporelle)
                    </div>
                </div>
                <div className="param-rfth-mesure">
                    <h4 className="h4-title">Mesure sémantique utilisée</h4>
                    <p className="paragraph">
                        Par défaut, RFTH utilise <strong>Wu-Palmer</strong>
                        pour mesurer la similarité sémantique entre les activités via l'ontologie.
                        Cette mesure est basée sur la profondeur dans la taxonomie et l'ancêtre commun.
                    </p>
                    <div className="param-rfth-mesure-wupalmer">
                        <GreenCheckIcon/>
                        <p className="paragraph">
                            Actuellement: <strong>Wu-Palmer</strong> (déjà configuré)
                        </p>
                    </div>
                </div>
            </div>
        )
    }else{
        return(null)
    }
}

export default RFTHParameter