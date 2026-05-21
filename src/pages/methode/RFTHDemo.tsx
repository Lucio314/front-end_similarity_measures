import Sequence from './Sequence';
import RFTHComparedSequences from './RFTHComparedSequences';
import type { ActivitiesProps } from '../../types';

const ACTIVITIESTRONQUEES : Array<ActivitiesProps> = [
    {actiId: "acti-1", icon: "🏠", nomActi:"maison", temps: 30},
    {actiId: "acti-2", icon: "🚶", nomActi:"marcher", temps: 20},
    {actiId: "acti-3", icon: "🚌", nomActi:"bus", temps: 40},
    {actiId: "acti-4", icon: "💼", nomActi:"travail", temps: 120},
    {actiId: "acti-5", icon: "🍽️", nomActi:"restaurant", temps: 45},
    {actiId: "acti-6", icon: "🛍️", nomActi:"shopping", temps: 30},
    {actiId: "acti-7", icon: "🚶", nomActi:"marcher", temps: 15},
    {actiId: "acti-8", icon: "🏠", nomActi:"maison", temps: 60}
]

const ACTIVITIES : Array<ActivitiesProps> = [
    {actiId: "acti-9", icon: "🏠", nomActi: "maison", temps: 25},
    {actiId: "acti-10", icon: "🚴", nomActi: "vélo", temps: 25},
    {actiId: "acti-11", icon: "💼", nomActi: "travail", temps: 90},
    {actiId: "acti-12", icon: "⚽", nomActi: "sport", temps: 50},
    {actiId: "acti-13", icon: "🏠", nomActi: "maison", temps: 40}
]


function RFTHDemo({}){
    let dureeTotalActivites1 : number = 0
    let dureeTotalActivites2 : number = 0
    for(let i=0; i<ACTIVITIESTRONQUEES.length; i++){
        dureeTotalActivites1 += ACTIVITIESTRONQUEES[i].temps
    }
    for(let i=0; i<ACTIVITIES.length; i++){
        dureeTotalActivites2 += ACTIVITIES[i].temps
    }
    for(let acti of ACTIVITIESTRONQUEES){
        acti.temps = Math.round((acti.temps/dureeTotalActivites1)*100)
    }
    for(let acti of ACTIVITIES){
        acti.temps = Math.round((acti.temps/dureeTotalActivites2)*100)
    }


    return (
        <div id="demo-rfth" className="demo" hidden>
            <h4 className="text-center mb-4">🎯 Démonstration : RFTH</h4>
            <div className="tenet-demo">
                <p className="paragraph">
                    <strong>Principe : </strong>
                    Quand on compare deux séquences de longueurs différentes, on ramène les deux séquences à la même longueur de 1.
                    C'est-à-dire que chaque activité des séquences valent maintenant (durée activité)/(durée séquence)
                </p>
            </div>
            <div className="sequences-demo">
                <div className="sequence-demo">
                    <h5 className="text-center mb-4">Séquence 1 (longue) - 8 activités, 360 min</h5>
                    <Sequence activites={ACTIVITIESTRONQUEES} comparee={false} rfth={true} totalDuration={0}/>
                </div>
                <div className="sequence-demo">
                    <h5 className="text-center mb-4">Séquence 2 (courte) - 5 activités, 230 min</h5>
                    <Sequence activites={ACTIVITIES} comparee={false} rfth={true} totalDuration={0}/>
                </div>
            </div>
            <div className="comparaison-demo">
                <h5 className="text-center mb-4">Après ajustement des durées :</h5>
                <RFTHComparedSequences activites1={ACTIVITIES} activites2={ACTIVITIESTRONQUEES}/>
                <div className="comparaison-stats-demo">
                    <div className="comparaison-pourcent-demo">
                        <span>Similarité approximative : </span>
                        <span>60 %</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RFTHDemo