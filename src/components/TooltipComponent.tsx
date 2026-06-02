import "./TooltipComponent.css"

interface TooltipComponentProps{
    children: React.ReactElement;
    text: string;
    width: number;
    bgColor: string;
}

function TooltipComponent({children, text, width, bgColor} : TooltipComponentProps) {
    return(
        <div 
            className=""
            style={{
                    width: width+"%",
                    backgroundColor: bgColor,
                }}
        >
            <div className="tooltip-children">
                {children}
                <div className="tooltip text-capitalize">
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default TooltipComponent