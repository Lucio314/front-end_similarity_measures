interface RFTHSeqProps{
    id: string;
    icon: string;
    temps: number;
}

function RFTHSeq({id, icon, temps} : RFTHSeqProps){
    return (
        <div id={id} className="d-flex">
            <div className="icon-seq-demo">
                {icon}
            </div>
            <div className="time-seq-demo">
                {temps} %
            </div>
        </div>
    )
}


export default RFTHSeq