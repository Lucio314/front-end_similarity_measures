import InformationIcon from "../../components/icons/InformationIcon"
import InterrogationIcon from "../../components/icons/InterrogationIcon"
import MenuSelect from "../../components/MenuSelect"
import type { ParamsProps } from "../../types"

const PARAM : ParamsProps =
    {
        param: "alignment_strategy",
        nomClasse: "param-slider-alignment-strategy",
        paramTitre: "Stratégie d'alignement (FTH-T)",
        paramValue: ["exhaustive", "centered", "greedy"],
        paramValueMax: -1,
        paramValueMin: -1,
        paramValuePas: -1,
        paramLegend: ["Comment aligner les séquences lors de la troncature"],
        paramInfo: "Pour FTH-T. \"exhaustive\" teste tous les alignements possibles, \"centered\" aligne au centre, \"greedy\" utilise une heuristique rapide."
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