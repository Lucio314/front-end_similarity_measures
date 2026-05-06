import React from 'react'; 

interface OverallSequencesStatsProps{
    nombre: number;
    text: string;
}

function OverallSequencesStats({nombre, text} : OverallSequencesStatsProps){
    if(text === "Total trous"){
        return(
            <div className="stats-sequences">
                <p className="text-2x1 text-yellow-600">{nombre}</p>
                <p className="text-gray-600">{text}</p>
            </div>
        )
    }else{
        return(
            <div className="stats-sequences">
                <p className="text-2x1 text-indigo-600">{nombre}</p>
                <p className="text-gray-600">{text}</p>
            </div>
        )
    }
}

export default OverallSequencesStats