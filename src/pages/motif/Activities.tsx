import React, { type Dispatch, type SetStateAction } from 'react';
import type { EmojisProps, PatternActivitiesProps } from '../../types';

interface ActivitiesProps{
    emoji: EmojisProps
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function Activities({emoji, pattern, setPattern} : ActivitiesProps){

    const handleClick = () => {

    }

    return (
        <button 
            className=""
            onClick={() => null}
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