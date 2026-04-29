import React from 'react'; 

interface OverallSequencesStatsProps{
    nombre: String;
    text: String;
}

function OverallSequencesStats({nombre, text} : OverallSequencesStatsProps){
    return(
        <div className="stats-sequences">
            <p className="stats-sequences-valeur-paragraphe">{nombre}</p>
            <p className="stats-sequences-paragraphe">{text}</p>
        </div>
    )
}

export default OverallSequencesStats