import React, { act } from 'react';
import Sequence from './Sequence';
import FTHTComparedSequences from './FTHTComparedSequences';
import type { ActivitiesProps } from '../../types';

const ACTIVITIESTRONQUEES = '[{actiId: "acti-1", icon: "🏠", nomActi:"maison", temps: "30m"},{actiId: "acti-2", icon: "🚶", nomActi:"marcher", temps: "20m"},{actiId: "acti-3", icon: "🚌", nomActi:"bus", temps: "40m"},{actiId: "acti-4", icon: "💼", nomActi:"travail", temps: "120m"},{actiId: "acti-5", icon: "🍽️", nomActi:"restaurant", temps: "45m"},{actiId: "acti-6", icon: "🛍️", nomActi:"shopping", temps: "30m"},{actiId: "acti-7", icon: "🚶", nomActi:"marcher", temps: "15m"},{actiId: "acti-8", icon: "🏠", nomActi:"maison", temps: "60m"}]'

const ACTIVITIES = '[{actiId: "acti-9", icon: "🏠", nomActi: "maison", temps: "25m"},{actiId: "acti-10", icon: "🚴", nomActi: "vélo", temps: "25m"},{actiId: "acti-11", icon: "💼", nomActi: "travail", temps: "90m"},{actiId: "acti-12", icon: "⚽", nomActi: "sport", temps: "50m"},{actiId: "acti-13", icon: "🏠", nomActi: "maison", temps: "40m"}]'

//A faire plus tard en fonction de l'api
const activitesTronquees = JSON.parse(ACTIVITIESTRONQUEES) as ActivitiesProps;
const activites = JSON.parse(ACTIVITIES) as ActivitiesProps;

function FTHTDemo({}){
    return (
        <div id="demo-ftht" className="demo" hidden>
            <h4 className="text-center mb-4">🎯 Démonstration : FTH avec Troncature</h4>
            <div className="tenet-demo">
                <p className="paragraph">
                    <strong>Principe :</strong>
                    Quand on compare deux séquences de longueurs différentes, on glisse 
                    la séquence courte le long de la longue et on tronque la différence.
                    On garde l'alignement qui donne la meilleure similarité.
                </p>
            </div>
            <div className="sequences-demo">
                <div className="sequence-demo">
                    <h5 className="text-center mb-4">Séquence 1 (longue) - 8 activités, 360 min</h5>
                    <Sequence activites={activitesTronquees} comparee={false}/>
                </div>
                <div className="sequence-demo">
                    <h5 className="text-center mb-4">Séquence 2 (courte) - 5 activités, 230 min</h5>
                    <Sequence activites={activites} comparee={false}/>
                </div>
            </div>
            <div className="comparaison-demo">
                <h5 className="text-center mb-4">✂️ Après troncature (comparaison élément par élément) :</h5>
                <FTHTComparedSequences activites={activites} activitesTronquees={activitesTronquees}/>
                <div className="comparaison-stats-demo">
                    <div className="comparaison-paire-demo">
                        <span>Paires identiques :</span>
                        <span>1 / 5</span>
                    </div>
                    <div className="comparaison-pourcent-demo">
                        <span>Similarité approximative :</span>
                        <span>20 %</span>
                    </div>
                </div>
                <div className="demo-legend">
                    <p className="paragraph">
                        <strong>Vert :</strong>
                        Activités identiques à la même position
                        <br/>
                        <strong>Rouge :</strong>
                        Activités différentes
                    </p>
                </div>
            </div>
            <div className="div-hint">
                <p>
                    💡
                    <strong> Astuce :</strong>
                    Glissez le curseur pour voir comment différents alignements changent
                    le nombre de correspondances. L'algorithme teste tous les alignements
                    possibles et garde celui qui maximise la similarité.
                </p>
            </div>
        </div>
    )
    // A faire : SequencesCompareesFTHT, les différents eventListener pour modifier useState
    //Nous avons dit que nous passions sur une démo statique, sans le slider, donc j'ai retiré les différents useState en lien avec le Slider
    //Et mis des valeurs statiques à la place
}

export default FTHTDemo