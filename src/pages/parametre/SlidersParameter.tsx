import React from 'react';
import SliderParameter from './SliderParameter';
import { useState } from 'react';

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
//A modif en mettant la valeur max/min et le pas du slider
//La valeur et la fonction onValueSliderChange seront dans un useState précis
//Un useState par paramètre

interface ParametreSlidersProps{
    nomMethode: string;
}

function ParametreSliders({nomMethode} : ParametreSlidersProps){


    let parametre = []
    for(let param of PARAMETRES){
        if(param.nomMethode === nomMethode){
            for(let i = 0; i < param.parametres.length; i++){
                parametre.push(<SliderParameter nomSlider={param.parametres[i]}/>)
            }
            break
        }
    }

    return (
        <div className="param-sliders">
            <SliderParameter nomSlider="K"/>
            <SliderParameter nomSlider="Similarite"/>
            {parametre}
        </div>
    )
}

export default ParametreSliders