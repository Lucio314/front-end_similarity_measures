import DragNDropIcon from "../../components/icons/DragNDropIcon"
import TrashBinIcon from "../../components/icons/TrashBinIcon"

interface ActivitiesDragNDropProps{
    emoji: string;
    name: string;
    duration: number;
    dureeMotif: number;
    setDureeMotif: (nmb : number) => void;
}

function ActivitiesDragNDrop({emoji, name, duration, dureeMotif, setDureeMotif} : ActivitiesDragNDropProps){
    return (
        <div className="">
            <DragNDropIcon/>
            <div className="">
                {emoji}
            </div>
            <div className="">
                <p className="">
                    {name}
                </p>
                <div className="">
                    <div className="">
                        <InputNumber duration={duration} dureeMotif={dureeMotif} setDureeMotif={setDureeMotif}/>
                        <span>min</span>
                    </div>
                </div>
            </div>
            <button 
                className=""
                onClick= {() => null}
            >
                <TrashBinIcon/>
            </button>
        </div>
    )
}

export default ActivitiesDragNDrop