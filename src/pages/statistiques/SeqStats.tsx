import SequenceReprLine from '../../components/SequenceReprLine';
import type { DatasetSequenceProps } from '../../types';
import type { JSX } from 'react';


interface SeqStatsProps{
    sequence: DatasetSequenceProps
}

function SeqStats({sequence} : SeqStatsProps){
    const listeSequenceReprLine : Array<JSX.Element> = []
    let trousSequence = 0


    for(let i=0; i<sequence.activities.length; i++){
        listeSequenceReprLine.push(
            <SequenceReprLine name={sequence.activities[i].name} duration={sequence.activities[i].duration} totalDuration={sequence.total_duration}/>
        )
        if(sequence.activities[i].name === "missing"){
            trousSequence++
        }
    }

    

    /*const handleAffichageFlecheClick = (e) => {
    e.preventDefault
    const divFleches = document.getElementById(idSequence)
    const FlecheBas = divFleches.getElementById('fleche-bas')
    const FlecheHaut = divFleches.getElementById('fleche-haut')
        if(divFlecheHaut.hidden){
          FlecheHaut.hidden = false
          FlecheBas.hidden = true
        }else{
          FlecheHaut.hidden = true
          FlecheBas.hidden = false
        }
    }*/

    return(
        <div className="border rounded">
            <div className="d-flex justify-content-between">
                <div className="">
                    <div className="">
                        <h4 className="h4-title">{sequence.label}</h4>
                        <div className="">
                            <span>{sequence.length} activités {" "}</span>
                            <span>{sequence.total_duration} {"min "}</span>
                            <span>❓ {trousSequence} trou(s)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id={sequence.label} className="">
                <div 
                    className="border rounded p-2"
                    style={{
                        backgroundColor: "#dadada"
                    }}
                >
                    <div className="">
                        Visualisation temporelle: 
                    </div>
                    <div className="d-flex">
                        {listeSequenceReprLine}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeqStats