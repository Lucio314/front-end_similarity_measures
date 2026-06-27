import Slider from "../../components/Slider";
import InterrogationIcon from "../../components/icons/InterrogationIcon";
import InformationIcon from "../../components/icons/InformationIcon";
import type { ParamsProps } from "../../types";

const PARAMS : Array<ParamsProps> = [
    {
        param: "K",
        nomClasse: "param-slider-k", 
        paramTitre: "K - Nombre de résultats",
        paramValue: [" résultats"],
        paramValueMax: 50,
        paramValueMin: 1,
        paramValuePas: 1,
        paramLegend: ["1 résultats", "Combien de séquences similaires voulez-vous voir ? C'est le \"TOP-K\" de votre recherche.", "50 résultats"],
        paramInfo: "Par exemple, K=5 affichera les 5 séquences les plus similaires à votre motif. Plus K est élevé, plus vous verrez de résultats, mais ils seront potentiellement moins similaires."
    },
    {
        param: "Similarite",
        nomClasse: "param-slider-similarite",
        paramTitre: "Seuil de similarité",
        paramValue: [""],
        paramValueMax: 1,
        paramValueMin: 0,
        paramValuePas: 0.05,
        paramLegend: ["0", "À partir de quelle similarité minimale accepter un résultat ?", "1"],
        paramInfo: "Une valeur de 0.5 signifie que seules les séquences avec au moins 50% de similarité seront retournées. Plus le seuil est élevé, plus les résultats seront stricts."
    },
    {
        param: "time_window",
        nomClasse: "param-slider-time-window",
        paramTitre: "Fenêtre temporelle (FTH, RFTH)",
        paramValue: [" min"],
        paramValueMax: 240,
        paramValueMin: 5,
        paramValuePas: 5,
        paramLegend: ["5 min", "Tolérance temporelle pour comparer les activités", "240 min"],
        paramInfo: "Pour FTH et RFTH. Largeur de la fenêtre floue en minutes (unités originales du dataset). Ex: 60 min = les activités dans une fenêtre de 1h sont comparées."
    },
    {
        param: "duration_threshold",
        nomClasse: "param-slider-duration-threshold",
        paramTitre: "λ - Seuil de comparabilité (RFTH)",
        paramValue: [" min"],
        paramValueMax: 240,
        paramValueMin: 10,
        paramValuePas: 10,
        paramLegend: ["10 min", "Différence max de durée totale pour comparer deux séquences", "240 min"],
        paramInfo: "Pour RFTH uniquement. Si la différence de durée totale entre deux séquences dépasse ce seuil, elles sont considérées non comparables. Recommandé: 60 min."
    },
    {
        param: "beta",
        nomClasse: "param-slider-beta",
        paramTitre: "β - Poids sémantique (CED)",
        paramValue: [""],
        paramValueMax: 1,
        paramValueMin: 0,
        paramValuePas: 0.05,
        paramLegend: ["0", "Importance de la similarité sémantique via l'ontologie", "1"],
        paramInfo: "Pour CED. Contrôle l'importance de la similarité sémantique. 0 = ignore la sémantique, 1 = sémantique très importante."
    }
]

interface SliderParameterProps{
    name: string; 
    value: number;
    onValueChange: React.Dispatch<React.SetStateAction<number>>

} 

function SliderParameter({name, value, onValueChange} : SliderParameterProps){
    let dicParam : ParamsProps = {
        param: "",
        nomClasse: "",
        paramTitre: "",
        paramValue: [""],
        paramValueMax: 0,
        paramValueMin: 0,
        paramValuePas: 0,
        paramLegend: [""],
        paramInfo: ""
    };
    for(let param of PARAMS){
        if(param.param === name){
            dicParam = param;
        }
    }

    return (
        <div className={dicParam.nomClasse}>
            <div>
                <span className="param-slider-title">{dicParam.paramTitre}</span>
                <button className="param-info-button" onClick={() => null}>
                    <InterrogationIcon/>
                </button>
            </div>
            <span className="param-slider-value">{value}{dicParam.paramValue[0]}</span>
            <Slider
                valueSlider={value}
                onValueSliderChange={onValueChange}
                minValue={dicParam.paramValueMin}
                maxValue={dicParam.paramValueMax}
                pas={dicParam.paramValuePas}
            />
            <div className="param-slider-legend">
                <span>{dicParam.paramLegend[0]}</span>
                <span>{dicParam.paramLegend[1]}</span>
                <span>{dicParam.paramLegend[2]}</span>
            </div>
            <div id="param-slider-info" className="param-slider-info" hidden>
                <InformationIcon/>
                {dicParam.paramInfo}
            </div>
        </div>
    )
}


export default SliderParameter