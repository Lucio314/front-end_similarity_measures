import type { EmojisProps } from "../types";
import { EMOJIS } from "../types";

interface PatternReprProps{
    name: string;
    duration: number;
}

function PatternRepr({name, duration} : PatternReprProps){
    let emojiRepr : EmojisProps = {emoji:"", emojiName:"", emojiColor:""}
        for(let emoji of EMOJIS){
            if(emoji.emojiName === name){
                emojiRepr = emoji
                break
            }
        }
    
    return (
        <div 
            className="border rounded p-2 justify-content-center"
            style={{
                backgroundColor: '#f3f2fd',
            }}
        >
            <div 
                className="text-center"
                style={{
                    fontSize: 22
                }}
            >
                {emojiRepr.emoji}
            </div>
            <div className="text-center text-capitalize">
                {name}
            </div>
            <div 
                className="text-center"
                style={{
                    fontSize: 13,
                    color: "#757373"
                }}
            >
                {duration}m
            </div>
        </div>
    )
}

export default PatternRepr