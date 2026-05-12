import type { Dispatch, SetStateAction } from "react";
import type { PatternActivitiesProps } from "../types";

interface InputNumberProps{
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
    dureeActivite: PatternActivitiesProps;
    setDureeActivite: Dispatch<SetStateAction<PatternActivitiesProps>>;
}

function InputNumber({dureeMotif, setDureeMotif, dureeActivite, setDureeActivite} : InputNumberProps){

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setDureeActivite({...dureeActivite, duration: e.target.valueAsNumber})
    }

    return (
        <div className="">
            <label className="">Durée :</label>
            <input 
                className="" 
                type="number"
                value={dureeActivite.duration}
                onChange={handleOnChange}
            >
            </input>
        </div>
    )
}

export default InputNumber