import type { EmojisProps } from "../types";
import { EMOJIS } from "../types";
import TooltipComponent from "./TooltipComponent";

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
        <TooltipComponent 
            text={name + " - " + duration + "m (" + widthRepr + "%)"}
            width={widthRepr}
            bgColor={emojiRepr.emojiColor}
        >
            <div 
                className="d-flex justify-content-center"
            >
                {emojiRepr.emoji}
            </div>
        </TooltipComponent>
    )
}

export default SequenceReprLine