import { useState, type Dispatch, type SetStateAction } from "react";
import DragNDropIcon from "../../components/icons/DragNDropIcon"
import TrashBinIcon from "../../components/icons/TrashBinIcon"
import type { PatternActivitiesProps } from "../../types";
import InputNumber from "../../components/InputNumber";

interface ActivitiesDragNDropProps{
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
    motif: PatternActivitiesProps;
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
    removeDiv: (idToRemove: string) => void;
}

function ActivitiesDragNDrop({dureeMotif, setDureeMotif, motif, pattern, setPattern, removeDiv} : ActivitiesDragNDropProps){
    const [dureeActivite, setDureeActivite] = useState<PatternActivitiesProps>(motif)
    const id : string = motif.name + motif.id

    const handleClick = () => {
        setPattern(pattern.filter(acti => acti.id !== id))
        removeDiv(id)
    }
    
    return (
        <div id={id} className="">
            <DragNDropIcon/>
            <div className="">
                {motif.emoji}
            </div>
            <div className="">
                <p className="">
                    {motif.name}
                </p>
                <div className="">
                    <div className="">
                        <InputNumber dureeMotif={dureeMotif} setDureeMotif={setDureeMotif} dureeActivite={dureeActivite} setDureeActivite={setDureeActivite}/>
                        <span>min</span>
                    </div>
                </div>
            </div>
            <button 
                className=""
                onClick={handleClick}
            >
                <TrashBinIcon/>
            </button>
        </div>
    )
}

export default ActivitiesDragNDrop