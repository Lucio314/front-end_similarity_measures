import React from 'react';
import Slider from '../../components/Slider';

interface MultidimParameterProps{
    valueSliderMobilite: string;
    valueSliderMeteo: string;
    onValueSliderMobilitieChange: (value: string) => void;
    onValueSliderMeteoChange: (value: string) => void;
}

function MultidimParameter({valueSliderMobilite, valueSliderMeteo, onValueSliderMobilitieChange, onValueSliderMeteoChange} : MultidimParameterProps){
    return (
        <div className="param-multidim-sliders">
            <div className="param-multidim-slider-mobilite">
                <div className="param-multidim-slider-mobilite-info">
                    <span>Mobilité</span>
                    <span>{valueSliderMobilite} %</span>
                </div>
                <Slider
                    valueSlider={valueSliderMobilite}
                    onValueSliderChange={onValueSliderMobilitieChange}
                    minValue={"0.0"}
                    maxValue={"100.0"}
                    pas={"10.0"}
                />
            </div>
            <div className="param-multidim-slider-meteo">
                <div className="param-multidim-slider-meteo-info">
                    <span>Météo</span>
                    <span>{valueSliderMeteo} %</span>
                </div>
                <Slider
                    valueSlider={valueSliderMeteo}
                    onValueSliderChange={onValueSliderMeteoChange}
                    minValue={"0.0"}
                    maxValue={"100.0"}
                    pas={"10.0"}
                />
            </div>
            <div className="param-multidim-conseil">
                <p className="paragraph">
                    💡 La somme des poids n'a pas besoin d'être 1.0. Le système normalisera
                    automatiquement les scores en fonction des poids relatifs.
                </p>
            </div>
        </div>
    )
}

export default MultidimParameter