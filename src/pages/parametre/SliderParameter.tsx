import Slider from "../../components/Slider";
import InterrogationIcon from "../../components/icons/InterrogationIcon";
import InformationIcon from "../../components/icons/InformationIcon";
import type { ParamsProps } from "../../types";

const PARAMS : Array<ParamsProps> = [
    {
        param: "K",
        nomClasse: "param-slider-k", 
        paramTitre: "K - Nombre de résultats",
        paramValue: ["résultats"],
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
        param: "position_weight",
        nomClasse: "param-slider-position-weight",
        paramTitre: "Poids de la position (CED)",
        paramValue: [""],
        paramValueMax: 1,
        paramValueMin: 0,
        paramValuePas: 0.05,
        paramLegend: ["0", "Importance de l'écart de position entre les activités", "1"],
        paramInfo: "Pour CED. Contrôle l'impact de la différence de position. 0 = ignore la position, 1 = position très importante."
    },
    {
        param: "semantic_weight",
        nomClasse: "param-slider-semantic-weight",
        paramTitre: "Poids sémantique (CED)",
        paramValue: [""],
        paramValueMax: 1,
        paramValueMin: 0,
        paramValuePas: 0.05,
        paramLegend: ["0", "Importance de la similarité sémantique", "1"],
        paramInfo: "Pour CED. Contrôle l'importance de la similarité sémantique via l'ontologie. 0 = ignore la sémantique, 1 = sémantique très importante."
    },
    {
        param: "fuzzy_window",
        nomClasse: "param-slider-fuzzy-window",
        paramTitre: "Fenêtre floue (FTH, FTH-T, RFTH)",
        paramValue: ["%"],
        paramValueMax: 100,
        paramValueMin: 10,
        paramValuePas: 5,
        paramLegend: ["10 %", "Pourcentage de la longueur de séquence pour la fenêtre floue", "100 %"],
        paramInfo: "Pour FTH et RFTH. Définit la fenêtre dans laquelle on considère les activités pour la similarité temporelle. 50% = on considère les activités dans la moitié de la séquence normalisée."
    },
    {
        param: "lambda",
        nomClasse: "param-slider-lambda",
        paramTitre: "λ (Lambda) - Seuil de comparabilité (RFTH)",
        paramValue: [""],
        paramValueMax: 240,
        paramValueMin: 10,
        paramValuePas: 10,
        paramLegend: ["10 min", "Différence maximale de durée totale pour comparer deux séquences", "240 min"],
        paramInfo: "Pour RFTH uniquement. Si la différence de durée totale entre deux séquences dépasse λ minutes, elles sont considérées non comparables. Recommandé: 60 minutes."
    },
    {
        param: "warping_window",
        nomClasse: "param-slider-warping-window",
        paramTitre: "Fenêtre de warping (DTW)",
        paramValue: ["positions"],
        paramValueMax: 50,
        paramValueMin: 1,
        paramValuePas: 1,
        paramLegend: ["1 positions", "Quelle flexibilité permettre dans l'alignement temporel ?", "50 positions"],
        paramInfo: "Pour DTW uniquement. Une valeur plus élevée permet plus de flexibilité dans l'alignement des séquences, mais augmente le temps de calcul. Recommandé: 10-20% de la longueur moyenne."
    },
    {
        param: "transition_threshold",
        nomClasse: "param-slider-transition-threshold",
        paramTitre: "Seuil de transition (DHD)",
        paramValue: [""],
        paramValueMax: 1,
        paramValueMin: 0,
        paramValuePas: 0.05,
        paramLegend: ["0", "Probabilité minimale pour considérer une transition normale", "1"],
        paramInfo: "Pour DHD. Seuil en dessous duquel une transition est considérée comme anormale. Plus bas = plus de détection d'anomalies."
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