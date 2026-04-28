import React from 'react';
import Seq from './Seq';

const ACTIVITIES = [
    {actiId: "acti-9", icon: "🏠", temps: "25m"},
    {actiId: "acti-10", icon: "🚴", temps: "25m"},
    {actiId: "acti-11", icon: "💼", temps: "90m"},
    {actiId: "acti-12", icon: "⚽", temps: "50m"},
    {actiId: "acti-13", icon: "🏠", temps: "40m"}
]

/**
 * @returns 
 */
function Sequence({}){
    const listSeqs = []
    for(let acti of ACTIVITIES){
        listSeqs.push(
            <Seq id={acti.actiId} icon={acti.icon} temps={acti.temps}/>
        )
    }

    return (
        <div className="repr-sequence-demo">
            {listSeqs}
        </div>
    )
}

export default Sequence