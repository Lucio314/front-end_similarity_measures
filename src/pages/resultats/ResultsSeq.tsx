import type { ResultsOneResultProps } from "../../types"

interface ResultsSeqProps{
    sequence: ResultsOneResultProps
}
//Va utiliser des composants identiques que pour la page StatsPage
function ResultsSeq({sequence} : ResultsSeqProps){
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
                            onClick={() => null}
                        >
                            {/*<ArrowsIcon/> à mettre ici, mais vu que c'est mal fait, je mets ça en commentaire */}
                        </button>
                    </div>
                </div>
                <div className="">
                    {/* Motifs de la séquence, on va utiliser la même chose que dans StatsPage*/}
                </div>
            </div>
        </div>
    )
}

export default ResultsSeq