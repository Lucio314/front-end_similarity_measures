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
    const listeSequenceReprLine : Array<JSX.Element> = []
    const id : string= "hidden-results-"+sequence.rank

    for(let i=0; i<sequence.sequence.activities.length; i++){
        listeSequenceReprLine.push(
            <SequenceReprLine name={sequence.sequence.activities[i].name} duration={sequence.sequence.activities[i].duration} totalDuration={sequence.sequence.total_durations}/>
        )
    }


    return ( 
        <div className="container">
            <div 
                className="border rounded row"
                style={{
                    backgroundColor: "#fafafa",
                    borderColor: "#fafafa"
                }}
            >
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <div className="align-self-center">
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
                    <div className="d-flex align-items-center">
                        <div className="">
                            <span className="">
                                {sequence.score}%
                            </span>
                        </div>
                    </div>
                </div>
                <div id={id} className="">
                    <div className="">
                        <div className="">
                            Visualisation temporelle :
                        </div>
                        <div className="d-flex">
                            {listeSequenceReprLine}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ResultsSeq