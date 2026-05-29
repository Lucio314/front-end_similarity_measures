interface SliderProps{
    valueSlider: number;
    onValueSliderChange: (value : number) => void;
    minValue: number;
    maxValue: number;
    pas: number;
}

function Slider({valueSlider, onValueSliderChange, minValue, maxValue, pas} : SliderProps){
  return (
    <div className="slider">
      <input
        type="range"
        className="form-range"
        min={""+minValue}
        max={""+maxValue}
        value={""+valueSlider}
        step={""+pas}
        onChange={(e) => onValueSliderChange((e.target.valueAsNumber))}
      />
    </div>
  )
}

export default Slider