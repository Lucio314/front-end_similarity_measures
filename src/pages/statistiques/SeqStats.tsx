import ArrowsIcon from '../../components/icons/ArrowsIcon';
import SeqRepr from '../../components/SeqRepr';
import SequenceRepr from '../../components/SequenceRepr';
import SequenceReprLine from '../../components/SequenceReprLine';
import type { DatasetSequenceProps } from '../../types';
import { EMOJIS } from '../../types';
import type { JSX } from 'react';


interface SeqStatsProps{
    sequence: DatasetSequenceProps
}

function SeqStats({sequence} : SeqStatsProps){
    const listeSeqRepr : Array<JSX.Element> = [] //Même composant que pour la page PatternPage
    const listeSequenceRepr : Array<JSX.Element> = []
    const listeSequenceReprLine : Array<JSX.Element> = []
    let trousSequence = 0


    for(let i=0; i<sequence.activities.length; i++){
        listeSeqRepr.push(
            <SeqRepr name={sequence.activities[i].name} duration={sequence.activities[i].duration}/>
        )
        if(listeSeqRepr.length === 9){
            listeSeqRepr.push(
                <span> +{sequence.length - i}  activités</span>
            )
            break
        }
        if(i !== sequence.activities.length-1){ //Pour créer les flèches entre chaque activités
            listeSeqRepr.push(
                <div className="text-secondary fs-4 p-1 align-self-center">→</div>
            )
        }
    }

    for(let i=0; i<sequence.activities.length; i++){
        listeSequenceRepr.push(
            <SequenceRepr name={sequence.activities[i].name} duration={sequence.activities[i].duration} />
        )
        listeSequenceReprLine.push(
            <SequenceReprLine name={sequence.activities[i].name} duration={sequence.activities[i].duration} totalDuration={sequence.total_duration}/>
        )
        if(sequence.activities[i].name === "missing"){
            trousSequence++
        }
    }


    const handleButtonClick = () => {
        const divHidden = document.getElementById(sequence.label)
        if(divHidden.hidden){
            divHidden.hidden = false
        }else{
            divHidden.hidden = true
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
                            <span>{sequence.total_duration} {" "}</span>
                            <span>❓ {trousSequence} trou(s)</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                        {listeSeqRepr}
                </div>
                <button 
                    className="show-more-details-activities-button"
                    onClick={handleButtonClick}
                >
                    <ArrowsIcon/>
                </button>
            </div>
            <div id={sequence.label} className="" hidden>
                <div className="">
                    {listeSequenceRepr}
                </div>
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
    //faire le changement d'icon après l'appui du bouton
}

export default SeqStats