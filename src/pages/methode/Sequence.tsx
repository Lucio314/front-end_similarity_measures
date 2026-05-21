import Seq from './Seq';
import ComparedSeq from './ComparedSeq';
import type { ActivitiesProps } from '../../types';
import RFTHSeq from './RFTHSeq';
import SequenceReprLine from '../../components/SequenceReprLine';

interface SequenceProps{
    activites: Array<ActivitiesProps>;
    comparee : boolean;
    rfth: boolean;
    totalDuration: number;
}

//A modifier pour pouvoir fonctionner avec le JSON
function Sequence({activites, comparee, rfth, totalDuration} : SequenceProps){
    const listSeqs = []
    if(comparee){
        for(let i=0; i<5; i++){
            listSeqs.push(
                <ComparedSeq key={activites[i].actiId} id={activites[i].actiId} icon={activites[i].icon} nomActi={activites[i].nomActi} temps={activites[i].temps}/>
            )
        }
    }else{
        if(rfth){
            if(totalDuration > 0){
                for(let acti of activites){
                    listSeqs.push(
                        <SequenceReprLine key={acti.actiId} name={acti.nomActi} duration={acti.temps} totalDuration={totalDuration}/>
                    )
                }
            }else{
                for(let acti of activites){
                    listSeqs.push(
                        <RFTHSeq key={acti.actiId} id={acti.actiId} icon={acti.icon} temps={acti.temps}/>
                    )
                }
            }
        }else{
            for(let acti of activites){
                listSeqs.push(
                    <Seq key={acti.actiId} id={acti.actiId} icon={acti.icon} temps={acti.temps}/>
                )
            }
        }
    }

    return (
        <div className="border rounded d-flex">
            {listSeqs}
        </div>
    )
}

export default Sequence