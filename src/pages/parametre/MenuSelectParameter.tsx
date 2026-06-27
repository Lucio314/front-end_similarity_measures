import InformationIcon from "../../components/icons/InformationIcon"
import InterrogationIcon from "../../components/icons/InterrogationIcon"
import MenuSelect from "../../components/MenuSelect"
import type { ParamsProps } from "../../types"

const PARAM : ParamsProps =
    {
        param: "agg",
        nomClasse: "param-slider-agg",
        paramTitre: "Agrégation (FTH, RFTH)",
        paramValue: ["max", "min"],
        paramValueMax: -1,
        paramValueMin: -1,
        paramValuePas: -1,
        paramLegend: ["Fonction pour symétriser FTH : max retient la plus grande similarité, min la plus petite"],
        paramInfo: "Pour FTH et RFTH. \"max\" retient la similarité maximale (plus permissif), \"min\" retient la minimale (plus strict). Recommandé: max."
    }

interface MenuSelectParameterProps{
    value: number;
    onValueChange: React.Dispatch<React.SetStateAction<number>>;
}

function MenuSelectParameter({value, onValueChange} : MenuSelectParameterProps){
    return (
        <div className={PARAM.nomClasse}>
            <div>
                <span className="param-slider-title">{PARAM.paramTitre}</span>
                <button className="param-info-button" onClick={() => null}>
                    <InterrogationIcon/>
                </button>
            </div>
            <MenuSelect 
                options={PARAM.paramValue}
                value={value}
                onValueChange={onValueChange}
            />
            <div className="param-slider-legend">
                <span>{PARAM.paramLegend[0]}</span>
            </div>
            <div id="param-slider-info" className="param-slider-info" hidden>
                <InformationIcon/>
                {PARAM.paramInfo}
            </div>
        </div>
    )
}

export default MenuSelectParameter