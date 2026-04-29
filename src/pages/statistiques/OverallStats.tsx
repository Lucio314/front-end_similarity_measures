import React from 'react'; 
import HashtagIcon from '../../components/icons/HashtagIcon';
import TypeIcon from '../../components/icons/TypeIcon';
import LengthIcon from '../../components/icons/LengthIcon';
import ClockIcon from '../../components/icons/ClockIcon';

interface OverallStatsProps{
    id: String;
    nombre: String;
    text: String;
}

function OverallStats({id, nombre, text} : OverallStatsProps){
    let icon = null
    if(id === "hash"){
        icon = <HashtagIcon/>
    }
    if(id === "type"){
        icon = <TypeIcon/>
    }
    if(id === "longueur"){
        icon = <LengthIcon/>
    }
    if(id === "horloge"){
        icon = <ClockIcon/>
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

    //A faire autrement plus tard, car ne va pas fonctionner avec le dataset
    //On va devoir identifier qu'est ce qui est quoi dans le json de l'api
}

export default OverallStats