import type { EmojisProps } from "../types";
import { EMOJIS } from "../types";

interface SeqReprProps{
    name: string;
    duration: number;
}

function SeqRepr({name, duration} : SeqReprProps){
    let emojiRepr : EmojisProps = {emoji:"", emojiName:"", emojiColor:""}
        for(let emoji of EMOJIS){
            if(emoji.emojiName === name){
                emojiRepr = emoji
                break
            }
        }
    
    return (
        <div className="border rounded">
            <span className="">
                {emojiRepr.emoji}
            </span>
            <span className="">
                {duration}m
            </span>
        </div>
    )
}

export default SeqRepr