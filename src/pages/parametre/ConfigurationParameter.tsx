import type { ListParametersProps } from "../../types";

const PARAMS = [
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
    param: ListParametersProps[]
}

function ConfigurationParameter({nomParam, param} : ConfigurationParameterProps){
    let index = 0
    for(let i=0; i<param.length; i++){
        if(nomParam === param[i].nomParam){
            index = i
            break
        }
    }

    return(
        <div className="">
            <p className="">
                {PARAMS[index].paramTitre} {PARAMS[index].paramValue}
            </p> {/* Pas de problème ici, PARAMS et param ont le même nombre d'éléments dans le même ordre */}
            <p className="">
                {param[index].getter}
            </p>
        </div>
    )
}

export default ConfigurationParameter