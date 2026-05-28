import type { ListParametersProps } from '../../types';
import GreenCheckIcon from '../../components/icons/GreenCheckIcon';
import ConfigurationParameter from './ConfigurationParameter';

const PARAMETRES = [
    {
        nomMethode: "CED",
        parametres: ["position_weight", "semantic_weight"]
    },
    {
        nomMethode: "FTH",
        parametres: ["fuzzy_window"]
    },
    {
        nomMethode: "FTH-T",
        parametres: ["fuzzy_window", "alignment_strategy"]
    },
    {
        nomMethode: "RFTH",
        parametres: ["lambda",  "fuzzy_window"]
    },
    {
        nomMethode: "DTW",
        parametres: ["warping_window"]
    },
    {
        nomMethode: "HD",
        parametres: []
    },
    {
        nomMethode: "DHD",
        parametres: ["transition_threshold"]
    }
]

interface ConfigurationParameterProps{
    listeParametres: ListParametersProps[];
    nomMethode: string; 
}

function ConfigurationsParameter({listeParametres, nomMethode} : ConfigurationParameterProps){
    const listConfigParam = []
    for(let param of PARAMETRES){
        if(param.nomMethode === nomMethode && param.parametres.length !== 0){
            for(let i = 0; i < param.parametres.length; i++){
                listConfigParam.push(<ConfigurationParameter nomParam={param.parametres[i]} listeParametres={listeParametres}/>)
            }
        }
    }

    return (
        <div className="">
            <h4 className="fw-bold mb-1">
                <GreenCheckIcon/>
                Configuration actuelle
            </h4>
            <div className="d-flex justify-content-between">
                <ConfigurationParameter nomParam="K" listeParametres={listeParametres}/>
                <ConfigurationParameter nomParam="Similarite" listeParametres={listeParametres}/>
                {listConfigParam}
            </div>
        </div>
    )
}

export default ConfigurationsParameter