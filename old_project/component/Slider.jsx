import React from 'react';

/**
 * @param {float} valueSlider
 * @param {Function} onValueSliderChange 
 * @param {float} minValue 
 * @param {float} maxValue 
 * @param {float} pas
 * @returns 
 */
function Slider({valueSlider, onValueSliderChange, minValue, maxValue, pas}){
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