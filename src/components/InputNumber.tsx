interface InputNumberProps{
    duration: number;
    dureeMotif: number;
    setDureeMotif: (nmb : number) => void;
}

function InputNumber({duration, dureeMotif, setDureeMotif} : InputNumberProps){

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const duree : number = duration + dureeMotif
        setDureeMotif(duree)
    }

    return (
        <div className="">
            <label className="">Durée :</label>
            <input 
                className="" 
                type="number"
                value={duration}
                onChange={handleOnChange}
            >
            </input>
        </div>
    )
}

export default InputNumber