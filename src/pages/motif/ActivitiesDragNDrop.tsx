import { useState, type Dispatch, type SetStateAction } from "react";
import DragNDropIcon from "../../components/icons/DragNDropIcon"
import TrashBinIcon from "../../components/icons/TrashBinIcon"
import type { PatternActivitiesProps } from "../../types";
import InputNumber from "../../components/InputNumber";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ActivitiesDragNDropProps{
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
    motif: PatternActivitiesProps;
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function ActivitiesDragNDrop({dureeMotif, setDureeMotif, motif, pattern, setPattern,} : ActivitiesDragNDropProps){
    const [dureeActivite, setDureeActivite] = useState<PatternActivitiesProps>(motif)
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable(motif)

    const handleClick = () => {
        setDureeMotif(dureeMotif - dureeActivite.duration)
        setPattern(pattern.filter(acti => acti.id !== motif.id))
        if(pattern.length === 1){
            const divPlaceHolder = document.getElementById('pattern-placeholder')
            const divPatternTotalTime = document.getElementById('pattern-total-time')
            const divPatternShowSequence = document.getElementById('pattern-show-sequence')
            divPlaceHolder.hidden = false
            divPatternTotalTime.hidden = true
            divPatternShowSequence.hidden = true
            setDureeMotif(0)
        }
    }

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    
    return (
        <div 
            id={motif.id} 
            className="card bg-3 bg-opacity-10 border-3 border-color-gray border shadow" 
            ref={setNodeRef}  
            style={style}
        >
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-drag p-2"
                    {...attributes} 
                    {...listeners}
                >
                    <DragNDropIcon/>
                </button>
                <div 
                    className="text-center p-2"
                    style={{
                        fontSize: 30
                    }} 
                >
                    {motif.emoji}
                </div>
                <div className="d-flex align-items-start flex-column p-2">
                    <p className="text-center text-capitalize">
                        {motif.name}
                    </p>
                    <div className="d-flex">
                        <div className="d-flex align-self-center">
                            <InputNumber dureeMotif={dureeMotif} setDureeMotif={setDureeMotif} dureeActivite={dureeActivite} setDureeActivite={setDureeActivite}/>
                            <span>min</span>
                        </div>
                    </div>
                </div>
                <button 
                    className="btn-trash btn btn-border p-2"
                    onClick={handleClick}
                >
                    <TrashBinIcon/>
                </button>
            </div>
        </div>
    )
}

export default ActivitiesDragNDrop