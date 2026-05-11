import type { EmojisProps } from "../types";
import { EMOJIS } from "../types";

interface SequenceReprLineProps{
    name: string;
    duration: number;
    totalDuration: number
}

function SequenceReprLine({name, duration, totalDuration} : SequenceReprLineProps){
    let emojiRepr : EmojisProps = {emoji:"", emojiName:"", emojiColor:""}
    for(let emoji of EMOJIS){
        if(emoji.emojiName === name){
            emojiRepr = emoji
            break
        }
    }

    const widthRepr : number = duration/totalDuration * 100

    return (
        <div 
            className=""
            style={{
                width: widthRepr+"%",
                backgroundColor: emojiRepr.emojiColor,
            }}
        >
            {name}
        </div>
    )
}

export default SequenceReprLine