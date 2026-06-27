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
        nomParam: "time_window",
        paramTitre: "Fenêtre temporelle (FTH, RFTH)",
        paramValue: [" min"],
    },
    {
        nomParam: "duration_threshold",
        paramTitre: "λ - Seuil de comparabilité (RFTH)",
        paramValue: [" min"],
    },
    {
        nomParam: "agg",
        paramTitre: "Agrégation (FTH, RFTH)",
        paramValue: [""],
    },
    {
        nomParam: "beta",
        paramTitre: "β - Poids sémantique (CED)",
        paramValue: [""],
    },
]

interface ConfigurationParameterProps{
    nomParam: string;
    listeParametres: Array<ListParametersProps>;
}

function ConfigurationParameter({nomParam, listeParametres} : ConfigurationParameterProps){
    const param = PARAMS.find(p => p.nomParam === nomParam)
    const lp = listeParametres.find(l => l.nomParam === nomParam)
    if (!param || !lp) return null;

    if (nomParam === "agg") {
        const aggOptions = ["max", "min"]
        return (
            <div className="param-config-item">
                <p>{param.paramTitre}</p>
                <p>{aggOptions[lp.getter]}</p>
            </div>
        )
    }

    return(
        <div className="param-config-item">
            <p>{param.paramTitre}</p>
            <p>{lp.getter}{param.paramValue[0]}</p>
        </div>
    )
}

export default ConfigurationParameter