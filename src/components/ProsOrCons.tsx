interface ProsOrConsProps{
    liste: Array<string>;
}

function ProsOrCons({liste} : ProsOrConsProps){
  const ligne = []
  for(let i=0; i<liste.length; i++){
    ligne.push(<li className="pros-cons">{liste[i]}</li>)
  }
  
  return (
    <ul className="list-pros-cons">
      {ligne}
    </ul>
  )
}

export default ProsOrCons