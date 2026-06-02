interface SeqProps{
    id: string;
    icon: string;
    temps: number;
}

function Seq({id, icon, temps} : SeqProps){
    return (
        <div id={id} className="repr-seq-demo">
            <div className="icon-seq-demo">
                {icon}
            </div>
            <div className="time-seq-demo">
                {temps}m
            </div>
        </div>
    )
}
//Peut-être modif "temps" en number à cause du JSON de l'api, rien de grave à modif

export default Seq