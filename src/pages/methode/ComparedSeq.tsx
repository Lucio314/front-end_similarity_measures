interface ComparedSeqProps{
    id: string;
    icon: string;
    nomActi: string;
    temps: number;
}

function ComparedSeq({id, icon, nomActi, temps} : ComparedSeqProps){
    return (
        <div id={id} className="repr-seq-comparee-demo">
            <span>{icon}{" "}</span>
            <span>{nomActi}{" "}</span>
            <span>{temps}m</span>
        </div>
    )
}
//Peut-être modif "temps" en number à cause du JSON de l'api, rien de grave à modif

export default ComparedSeq