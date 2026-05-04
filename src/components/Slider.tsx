import React from 'react';

interface SliderProps{
    valueSlider: string;
    onValueSliderChange: (value : string) => void;
    minValue: string;
    maxValue: string;
    pas: string;
}

function Slider({valueSlider, onValueSliderChange, minValue, maxValue, pas} : SliderProps){
  return (
    <div className="slider">
      <input
        type="range"
        className="form-range"
        min={minValue}
        max={maxValue}
        value={valueSlider}
        step={pas}
        onChange={(e) => onValueSliderChange((e.target.value))}
      />
    </div>
  )
}

export default Slider