const emojiMap = new Map<string, string>()
emojiMap.set("marcher", "🚶")
emojiMap.set("bus", "🚌")
emojiMap.set("vélo", "🚴")
emojiMap.set("travail", "💼")
emojiMap.set("étude", "📚")
emojiMap.set("maison", "🏠")
emojiMap.set("restaurant", "🍽️")
emojiMap.set("sport", "⚽")
emojiMap.set("shopping", "🛍️")

interface PatternReprProps{
    name: string;
    duration: number;
}

function PatternRepr({name, duration} : PatternReprProps){
    return (
        <div className="">
            <div className="">
                {emojiMap.get(name)}
            </div>
            <div className="">
                {name}
            </div>
            <div className="">
                {duration}m
            </div>
        </div>
    )
}

export default PatternRepr