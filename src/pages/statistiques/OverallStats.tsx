import React, { type JSX } from 'react'; 
import HashtagIcon from '../../components/icons/HashtagIcon';
import TypeIcon from '../../components/icons/TypeIcon';
import LengthIcon from '../../components/icons/LengthIcon';
import ClockIcon from '../../components/icons/ClockIcon';

interface OverallStatsProps{
    id: string;
    nombre: number;
    text: string;
}

function OverallStats({id, nombre, text} : OverallStatsProps){
    const icon : Array<JSX.Element> = []
    if(id === "hash"){
        icon.push(<HashtagIcon/>)
    }
    if(id === "type"){
        icon.push(<TypeIcon/>)
    }
    if(id === "longueur"){
        icon.push(<LengthIcon/>)
    }
    if(id === "horloge"){
        icon.push(<ClockIcon/>)
    }
        

    return(
        <div className="stats-dataset" id={id}>
            <div className="stats-dataset-icon">
                {icon}
            </div>
            <p className="stats-dataset-valeur-paragraphe">{nombre}</p>
            <p className="stats-dataset-paragraphe">{text}</p>
        </div>
    )

}

export default OverallStats