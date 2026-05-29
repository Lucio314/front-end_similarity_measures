import type { ListParametersProps } from "../../types";

interface ParamsProps{
    nomParam: string;
    paramTitre: string;
    paramValue: Array<string>;
}

const PARAMS : Array<ParamsProps> = [
    {
        nomParam: "K",
        paramTitre: "K - Nombre de résultats",
        paramValue: ["résultats"],
    },
    {
        nomParam: "Similarite",
        paramTitre: "Seuil de similarité",
        paramValue: [""],
    },
    {
        nomParam: "position_weight",
        paramTitre: "Poids de la position (CED)",
        paramValue: [""],
    },
    {
        nomParam: "semantic_weight",
        paramTitre: "Poids sémantique (CED)",
        paramValue: [""],
    },
    {
        nomParam: "fuzzy_window",
        paramTitre: "Fenêtre floue (FTH, FTH-T, RFTH)",
        paramValue: ["%"],
    },
    {
        nomParam: "alignment_strategy",
        paramTitre: "Stratégie d'alignement (FTH-T)",
        paramValue: [""],
    },
    {
        nomParam: "lambda",
        paramTitre: "λ (Lambda) - Seuil de comparabilité (RFTH)",
        paramValue: [""]
    },
    {
        nomParam: "warping_window",
        paramTitre: "Fenêtre de warping (DTW)",
        paramValue: ["positions"]
    },
    {
        nomParam: "transition_threshold",
        paramTitre: "Seuil de transition (DHD)",
        paramValue: [""]
    }
]
//nomParam dans PARAMS est simplement un repère visuel pour nous, va sans dpute être modif plus tard
interface ConfigurationParameterProps{
    nomParam: string;
    listeParametres: Array<ListParametersProps>;
}

function ConfigurationParameter({nomParam, listeParametres} : ConfigurationParameterProps){
    let index = 0
    for(let i=0; i<listeParametres.length; i++){
        if(nomParam === listeParametres[i].nomParam){
            index = i
            break
        }
    }

    if(nomParam === "alignment_strategy"){
        const paramMenuSelect : Array<string> = ["exhaustive", "centered", "greedy"]
        return(
            <div className="">
                <p className="">
                    {PARAMS[index].paramTitre}
                </p> {/* Pas de problème ici, PARAMS et param ont le même nombre d'éléments dans le même ordre */}
                <p className="">
                    {paramMenuSelect[listeParametres[index].getter]} {PARAMS[index].paramValue}
                </p>
            </div>
        )
    }else{
        return(
            <div className="">
                <p className="">
                    {PARAMS[index].paramTitre}
                </p> {/* Pas de problème ici, PARAMS et param ont le même nombre d'éléments dans le même ordre */}
                <p className="">
                    {listeParametres[index].getter} {PARAMS[index].paramValue}
                </p>
            </div>
        )
    }
}

export default ConfigurationParameter