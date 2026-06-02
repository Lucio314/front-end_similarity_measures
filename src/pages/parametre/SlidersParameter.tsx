import SliderParameter from './SliderParameter';
import type { ListParametersProps } from '../../types';
import MenuSelectParameter from './MenuSelectParameter';

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
        parametres: ["lambda",  "fuzzy_window",  "semantic_measure"]
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
                    if(methode.parametres[i] === listeParametres[j].nomParam && methode.parametres[i] === "alignment_strategy"){
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