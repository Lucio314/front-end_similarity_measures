import SliderParameter from './SliderParameter';
import type { ListParametersProps } from '../../types';
import MenuSelectParameter from './MenuSelectParameter';

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

interface ParametreSlidersProps{
    listeParametres: Array<ListParametersProps>;
    nomMethode: string;
}

function ParametreSliders({listeParametres, nomMethode} : ParametreSlidersProps){


    let parametre = []
    for(let methode of PARAMETRES){
        if(methode.nomMethode === nomMethode && methode.parametres.length !== 0){
            for(let i = 0; i < methode.parametres.length; i++){
                for(let j = 0; j<listeParametres.length; j++){
                    if(methode.parametres[i] === listeParametres[j].nomParam && methode.parametres[i] === "agg"){
                        parametre.push(
                            <MenuSelectParameter
                                value={listeParametres[j].getter}
                                onValueChange={listeParametres[j].setter}
                            />
                        )
                    }else{
                        if(methode.parametres[i] === listeParametres[j].nomParam){
                            parametre.push(
                                <SliderParameter 
                                    name={methode.parametres[i]} 
                                    value={listeParametres[j].getter}
                                    onValueChange={listeParametres[j].setter}
                                />
                            )
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="param-sliders">
            <SliderParameter name="K" value={listeParametres[0].getter} onValueChange={listeParametres[0].setter}/>
            <SliderParameter name="Similarite" value={listeParametres[1].getter} onValueChange={listeParametres[1].setter}/>
            {parametre}
        </div>
    )
}

export default ParametreSliders