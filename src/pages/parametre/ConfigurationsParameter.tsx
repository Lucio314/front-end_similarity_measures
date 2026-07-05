import type { ListParametersProps } from '../../types';
import GreenCheckIcon from '../../components/icons/GreenCheckIcon';
import ConfigurationParameter from './ConfigurationParameter';

const PARAMETRES = [
    {
        nomMethode: "TCED",
        parametres: ["beta"]
    },
    {
        nomMethode: "FTHT",
        parametres: ["time_window", "agg"]
    },
    {
        nomMethode: "RFTH",
        parametres: ["time_window", "duration_threshold", "agg"]
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
            <div className="d-flex flex-wrap gap-4 mt-2">
                <ConfigurationParameter nomParam="K" listeParametres={listeParametres}/>
                <ConfigurationParameter nomParam="Similarite" listeParametres={listeParametres}/>
                {listConfigParam}
            </div>
        </div>
    )
}

export default ConfigurationsParameter