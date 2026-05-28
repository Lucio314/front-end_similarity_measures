import type { Dispatch, SetStateAction } from "react";
import type { PatternActivitiesProps } from "../types";

interface InputNumberProps{
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
    dureeActivite: PatternActivitiesProps;
    setDureeActivite: Dispatch<SetStateAction<PatternActivitiesProps>>;
}

function InputNumber({dureeMotif, setDureeMotif, dureeActivite, setDureeActivite} : InputNumberProps){
    let oldValue : number = dureeActivite.duration
    //Valeur initiale de la durée d'une activité.
    let newValue : number = 0
    //Nouvelle valeur pour la durée totale

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if(isNaN(e.target.valueAsNumber) || e.target.valueAsNumber < 0){
            console.log('bonjour')
            e.target.valueAsNumber = 0
        }
        setDureeActivite(
            {
                id: dureeActivite.id,
                name: dureeActivite.name,
                emoji: dureeActivite.emoji,
                duration: e.target.valueAsNumber
            }
        )
        console.log(dureeActivite)
        newValue = dureeMotif - oldValue + e.target.valueAsNumber
        setDureeMotif(newValue)
        oldValue = e.target.valueAsNumber
    }

    return (
        <div className="">
            <label className="">Durée :</label>
            <input 
                className="" 
                type="number"
                value={dureeActivite.duration}
                min={0}
                onChange={handleOnChange}
            >
            </input>
        </div>
    )
}

export default InputNumber