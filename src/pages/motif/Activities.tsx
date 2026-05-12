import { type Dispatch, type SetStateAction } from 'react';
import type { EmojisProps, PatternActivitiesProps } from '../../types';

interface ActivitiesProps{
    emoji: EmojisProps
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function Activities({emoji, pattern, setPattern} : ActivitiesProps){
    let index : number = pattern.length

    const handleClick = () => {
        for(let i=0; i<pattern.length; i++){
            if(pattern[i].id === pattern.length){
                index++
            }
        }
        setPattern([
            ...pattern, {
                id: index,
                name: emoji.emojiName,
                emoji: emoji.emoji,
                duration: 30
            }
        ])
        const divPatternPlacholder = document.getElementById("pattern-placeholder")
        const divPatternTotalTime = document.getElementById("pattern-total-time")
        if(!divPatternPlacholder.hidden){
            divPatternPlacholder.hidden = true
            divPatternTotalTime.hidden = false
        }
    }

    return (
        <button 
            className=""
            onClick={handleClick}
        >
            <div className="">
                {emoji.emoji}
            </div>
            <div className="">
                {emoji.emojiName}
            </div>
        </button>
    )
}

export default Activities