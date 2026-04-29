import React from 'react';
import ParametreSlider from './ParametreSlider';

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

function ParametreSliders({nomMethode}){
    let parametre = []
    for(let param of PARAMETRES){
        if(param.nomMethode === nomMethode){
            for(let i = 0; i < param.parametres.length; i++){
                parametre.push(<ParametreSlider slider={param.parametres[i]}/>)
            }
            break
        }
    }

    return (
        <div className="param-sliders">
            <ParametreSlider slider="K"/>
            <ParametreSlider slider="Similarite"/>
            {parametre}
        </div>
    )
}

export default ParametreSliders