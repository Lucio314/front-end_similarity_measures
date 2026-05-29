import type { JSX } from "react"
import type { ResultsOneResultProps } from "../../types"
import ResultsSeq from "./ResultsSeq"

interface ResultsSequencesProps{
    results: Array<ResultsOneResultProps>
}
//Va utiliser des composants identiques que pour la page StatsPage
function ResultsSequences({results} : ResultsSequencesProps){
    const listeResultsSeq : Array<JSX.Element> = []
    for(let seq of results){
        listeResultsSeq.push(
            <ResultsSeq key={seq.rank} sequence={seq}/>
        )
    }

    return ( 
        <div className="">
            {listeResultsSeq}
        </div>
    )
}

export default ResultsSequences