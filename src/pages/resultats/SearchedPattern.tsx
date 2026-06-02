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
                <div 
                    className="text-secondary fs-4 p-1 align-self-center"
                >
                    →
                </div>
            )
        }
    }

    const listeParametresResults : Array<string> = [] //Les paramètres de la page ParameterMethod

    return ( 
        <div 
            className="border rounded p-3"
            style={{
                borderColor: '#9c86ec',
                backgroundColor: '#fafafa'
            }}
        >
            <h5 
                className="text-sm"
                style={{
                    color: "#272727"
                }}
            >
                <EyeIcon/> {" "}
                Votre motif recherché
            </h5>
            <div className="d-flex justify-content-start p-3">
                {listeMotifResults}
            </div>
            <div className="">
                <p>
                    <strong>
                        Méthode : {" "}
                    </strong>
                    {method} {" "}
                    <strong>
                        | Paramètres : {" "}
                    </strong>
                    {listeParametresResults}
                </p>
            </div>
        </div>
    )
}

export default SearchedPattern