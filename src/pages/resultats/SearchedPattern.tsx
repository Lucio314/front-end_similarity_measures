import type { JSX } from "react"
import EyeIcon from "../../components/icons/EyeIcon"
import type { ResultsPatternProps } from "../../types"
import PatternRepr from "../../components/PatternRepr";

interface SearchedPatternProps{
    pattern: ResultsPatternProps;
    method: string;
}

function SearchedPattern({pattern, method} : SearchedPatternProps){
    const listeMotifResults : Array<JSX.Element> = [] //Même composant que pour la page PatternPage
    for(let i=0; i<pattern.activities.length; i++){
        listeMotifResults.push(
            <PatternRepr name={pattern.activities[i].name} duration={pattern.activities[i].duration}/>
        )
        if(i !== pattern.activities.length-1){ //Pour créer les flèches entre chaque activités
            listeMotifResults.push(
                <div className="text-gray-400 text-xl">→</div>
            )
        }
    }

    const listeParametresResults : Array<string> = [] //Les paramètres de la page ParameterMethod

    return ( 
        <div className="">
            <h3 className="fw-bold mb-1">
                <EyeIcon/>
                Votre motif recherché
            </h3>
            <div className="">
                {listeMotifResults}
            </div>
            <div className="">
                <p>
                    <strong>
                        Méthode :
                    </strong>
                    {method}
                    <strong>
                        | Paramètres :
                    </strong>
                    {listeParametresResults}
                </p>
            </div>
        </div>
    )
}

export default SearchedPattern