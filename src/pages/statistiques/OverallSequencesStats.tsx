interface OverallSequencesStatsProps{
    nombre: number;
    text: string;
}

function OverallSequencesStats({nombre, text} : OverallSequencesStatsProps){
    if(text === "Total trous"){
        return(
            <div className="">
                <p className="text-2x1 text-center">{nombre}</p>
                <p className="text-gray-600">{text}</p>
            </div>
        )
    }else{
        return(
            <div className="">
                <p className="text-2x1 text-center">{nombre}</p>
                <p className="text-gray-600">{text}</p>
            </div>
        )
    }
}

export default OverallSequencesStats