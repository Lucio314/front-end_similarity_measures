import React from 'react';
import SeqComparee from './SeqComparee';

const ACTIVITIES = [
    {actiId: "acti-compa-1", icon: "🏠", nomActi:"maison", temps: "30m"},
    {actiId: "acti-compa-2", icon: "🚶", nomActi:"marcher", temps: "20m"},
    {actiId: "acti-compa-3", icon: "🚌", nomActi:"bus", temps: "40m"},
    {actiId: "acti-compa-4", icon: "💼", nomActi:"travail", temps: "120m"},
    {actiId: "acti-compa-5", icon: "🍽️", nomActi:"restaurant", temps: "45m"},
    {actiId: "acti-compa-6", icon: "🛍️", nomActi:"shopping", temps: "30m"},
    {actiId: "acti-compa-7", icon: "🚶", nomActi:"marcher", temps: "15m"},
    {actiId: "acti-compa-8", icon: "🏠", nomActi:"maison", temps: "60m"}
]

/**
 * @returns 
 */
function SequenceCompareeTronquee({}){
    const listSeqs = []
    for(let acti of ACTIVITIES){
        listSeqs.push(
            <SeqComparee id={acti.actiId} icon={acti.icon} nomActi={acti.nomActi} temps={acti.temps}/>
        )
    }

    return (
        <div className="repr-sequence-comparee-tronquee-demo">
            {listSeqs}
        </div>
    )
}

export default SequenceCompareeTronquee