import { type Dispatch, type SetStateAction } from 'react';
import type { EmojisProps, PatternActivitiesProps } from '../../types';

interface ActivitiesProps{
    emoji: EmojisProps
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
}

function Activities({emoji, pattern, setPattern, dureeMotif, setDureeMotif} : ActivitiesProps){
    let index : number = pattern.length

    const handleClick = () => {
        for(let i=0; i<pattern.length; i++){
            if(parseInt(pattern[i].id.substring(pattern[i].id.length-1)) === pattern.length){
                index++
            }
            console.log(index)
        }
        setPattern([
            ...pattern, {
                id: emoji.emojiName + index,
                name: emoji.emojiName,
                emoji: emoji.emoji,
                duration: 30
            }
        ])
        console.log(dureeMotif)
        setDureeMotif(dureeMotif + 30)
        const divPatternPlaceholder = document.getElementById('pattern-placeholder')
        const divPatternTotalTime = document.getElementById('pattern-total-time')
        const divPatternShowSequence = document.getElementById('pattern-show-sequence')
        if(!divPatternPlaceholder.hidden){
            divPatternPlaceholder.hidden = true
            divPatternShowSequence.hidden = false
            divPatternTotalTime.hidden = false
        }
    }

    return (
        <div className="col-2 ">
            <button 
                className="btn-activities btn rounded btn-border btn-lg btn-outline-primary"
                onClick={handleClick}
            >
                <div 
                    className="text-center"
                    style={{
                        fontSize: 30
                    }}
                >
                    {emoji.emoji}
                </div>
                <div 
                    className="text-center text-capitalize"
                    style={{
                        fontSize: 13,
                        color: "#5e5c5c"
                    }}
                >
                    {emoji.emojiName}
                </div>
            </button>
        </div>
    )
    //Le problème d'affichage est du car pattern n'est pas modifié mais l'activité oui, donc si la durée de l'activité est de 42
    //Dans le pattern cette durée est toujours de 30
}

export default Activities