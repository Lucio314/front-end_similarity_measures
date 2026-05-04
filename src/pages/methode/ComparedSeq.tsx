import React from 'react';

interface ComparedSeqProps{
    id: string;
    icon: string;
    nomActi: string;
    temps: string;
}

function ComparedSeq({id, icon, nomActi, temps} : ComparedSeqProps){
    return (
        <div id={id} className="repr-seq-comparee-demo">
            <span>{icon}</span>
            <span>{nomActi}</span>
            <span>{temps}</span>
        </div>
    )
}
//Peut-être modif "temps" en number à cause du JSON de l'api, rien de grave à modif

export default ComparedSeq