import React from 'react';
import Seq from './Seq';

const ACTIVITIES = [
    {actiId: "acti-1", icon: "🏠", temps: "30m"},
    {actiId: "acti-2", icon: "🚶", temps: "20m"},
    {actiId: "acti-3", icon: "🚌", temps: "40m"},
    {actiId: "acti-4", icon: "💼", temps: "120m"},
    {actiId: "acti-5", icon: "🍽️", temps: "45m"},
    {actiId: "acti-6", icon: "🛍️", temps: "30m"},
    {actiId: "acti-7", icon: "🚶", temps: "15m"},
    {actiId: "acti-8", icon: "🏠", temps: "60m"}
]

/**
 * @returns 
 */
function SequenceTronquee({}){
    const listSeqs = []
    for(let acti of ACTIVITIES){
        listSeqs.push(
            <Seq id={acti.actiId} icon={acti.icon} temps={acti.temps}/>
        )
    }

    return (
        <div className="repr-sequence-tronquee-demo">
            {listSeqs}
        </div>
    )
}

export default SequenceTronquee