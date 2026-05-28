import Sequence from './Sequence';
import type { ActivitiesProps } from '../../types';

interface FTHTComparedSequencesProps{
    activites: Array<ActivitiesProps>;
    activitesTronquees: Array<ActivitiesProps>;
}

function FTHTComparedSequences({activites, activitesTronquees} : FTHTComparedSequencesProps){
    return (
        <div className="d-flex justify-content-around">
            <div className="border rounded">
                <p>Séquence 1 (tronquée)</p>
                <div>
                    <Sequence activites={activitesTronquees} comparee={true} rfth={false} totalDuration={0}/>
                </div>
            </div>
            <div className="border rounded">
                <p>Séquence 2</p>
                <div>
                    <Sequence activites={activites} comparee={true} rfth={false} totalDuration={0}/>
                </div>
            </div>
        </div>
    )
}

export default FTHTComparedSequences