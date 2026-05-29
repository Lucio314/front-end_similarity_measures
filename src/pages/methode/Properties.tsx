interface PropertiesProps{
    proprietes: Array<string>
}

function Properties({proprietes} : PropertiesProps){
    const ligne = []
    for(let i=0; i<proprietes.length; i++){
        ligne.push(<li className="property">{proprietes[i]}</li>)
    }

    return (
        <div className="div-property">
            <p className="pros">🔧 Propriétés :</p>
            <ul className="list-properties">
                {ligne}
            </ul>
        </div>
    )
}

export default Properties