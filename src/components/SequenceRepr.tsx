import { EMOJIS } from "../types";
import type { EmojisProps } from "../types";

interface SequenceReprProps{
    name: string;
    duration: number;
}

function SequenceRepr({name, duration} : SequenceReprProps){
    let emojiRepr : EmojisProps = {emoji:"", emojiName:"", emojiColor:""}
        for(let emoji of EMOJIS){
            if(emoji.emojiName === name){
                emojiRepr = emoji
                break
            }
        }

    return (
        <div 
            className=""
            style={{
                backgroundColor: emojiRepr.emojiColor,
            }}
        >
            <div className="">
                {emojiRepr.emoji}
            </div>
            <div className="">
                {name}
            </div>
            <div className="">
                {duration} minutes
            </div>
        </div>
    )
}

export default SequenceRepr