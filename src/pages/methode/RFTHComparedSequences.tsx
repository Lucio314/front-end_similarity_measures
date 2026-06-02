import Sequence from './Sequence';
import type { ActivitiesProps } from '../../types';

interface RFTHComparedSequencesProps{
    activites1: Array<ActivitiesProps>;
    activites2: Array<ActivitiesProps>;
}

function RFTHComparedSequences({activites1, activites2} : RFTHComparedSequencesProps){
    let dureeTotalActivites1 : number = 0
    let dureeTotalActivites2 : number = 0
    for(let i=0; i<activites1.length; i++){
        dureeTotalActivites1 += activites1[i].temps
    }
    for(let i=0; i<activites2.length; i++){
        dureeTotalActivites2 += activites2[i].temps
    }


    return (
        <div className="sequences-comparees">
            <div>
                <p>Séquence 1 (tronquée)</p>
                <div>
                    <Sequence activites={activites2} comparee={false} rfth={true} totalDuration={dureeTotalActivites2}/>
                </div>
            </div>
            <div>
                <p>Séquence 2</p>
                <div>
                    <Sequence activites={activites1} comparee={false} rfth={true} totalDuration={dureeTotalActivites1}/>
                </div>
            </div>
        </div>
    )
}
export default RFTHComparedSequences