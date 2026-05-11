import type { JSX } from "react"
import SeqRepr from "../../components/SeqRepr"
import type { ResultsOneResultProps } from "../../types"
import SequenceRepr from "../../components/SequenceRepr"
import SequenceReprLine from "../../components/SequenceReprLine"

interface ResultsSeqProps{
    sequence: ResultsOneResultProps
}
//Va utiliser des composants identiques que pour la page StatsPage
function ResultsSeq({sequence} : ResultsSeqProps){
    const listeSeqRepr : Array<JSX.Element> = [] //Même composant que pour la page PatternPage
    const listeSequenceRepr : Array<JSX.Element> = []
    const listeSequenceReprLine : Array<JSX.Element> = []
    const id : string= "hidden-results-"+sequence.rank


    for(let i=0; i<sequence.sequence.activities.length; i++){
        listeSeqRepr.push(
            <SeqRepr name={sequence.sequence.activities[i].name} duration={sequence.sequence.activities[i].duration}/>
        )
        if(listeSeqRepr.length === 9){
            listeSeqRepr.push(
                <span> +{sequence.sequence.activities.length - i}  activités</span>
            )
            break
        }
        if(i !== sequence.sequence.activities.length-1){ //Pour créer les flèches entre chaque activités
            listeSeqRepr.push(
                <div className="text-gray-400 text-xl">→</div>
            )
        }
    }

    for(let i=0; i<sequence.sequence.activities.length; i++){
        listeSequenceRepr.push(
            <SequenceRepr name={sequence.sequence.activities[i].name} duration={sequence.sequence.activities[i].duration} />
        )
        listeSequenceReprLine.push(
            <SequenceReprLine name={sequence.sequence.activities[i].name} duration={sequence.sequence.activities[i].duration} totalDuration={sequence.sequence.total_durations}/>
        )
    }

    const handleButtonClick = () => {
        const divHidden = document.getElementById(id)
        if(divHidden.hidden){
            divHidden.hidden = false
        }else{
            divHidden.hidden = true
        }
    }

    return ( 
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        <div className="">
                            {sequence.rank}
                        </div>
                        <div className="">
                            <h3 className="fw-bold mb-1">
                                Séquence {sequence.sequence.id}
                            </h3>
                            <p className="text-muted mb-0">
                                {sequence.sequence.length} activités • {sequence.sequence.total_durations} minutes
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <span className="">
                                {sequence.score}%
                            </span>
                        </div>
                        <button 
                            className=""
                            onClick={handleButtonClick}
                        >
                            {/*<ArrowsIcon/> à mettre ici, mais vu que c'est mal fait, je mets ça en commentaire */}
                        </button>
                    </div>
                </div>
                <div className="">
                    {listeSeqRepr}
                </div>
                <div id={id} className="" hidden>
                    <h4 className="fw-bold mb-1">
                        Séquence complète :
                    </h4>
                    <div className="">
                        {listeSequenceRepr}
                    </div>
                    <div className="">
                        <div className="">
                            Visualisation temporelle :
                        </div>
                        <div className="">
                            {listeSequenceReprLine}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ResultsSeq