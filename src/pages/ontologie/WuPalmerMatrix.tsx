interface WuPalmerMatrixProps{
    matrice: Array<Array<number>>;
    activites: Array<string>;
}

function WuPalmerMatrix({matrice, activites} : WuPalmerMatrixProps){
  const listeTHead = []
  for(let i = 0; i < activites.length; i++){
    listeTHead.push(
      <th key={i} className="text-center border">{activites[i]}</th>
    )
  }
  const listeTBody = []
  for(let i = 0; i < activites.length; i++){
    const ligne = []
    for(let j = 0; j < activites.length; j++){
      let style = {}
      if(matrice[i][j] === 1){
        style = {
          backgroundColor: "#2c8b42"
        }
      }
      if(matrice[i][j] < 0.33){
        style = {
          backgroundColor: "#f87171"
        }
      }
      if(matrice[i][j] >= 0.33 && matrice[i][j] <= 0.5){
        style = {
          backgroundColor: "#fa9e26"
        }
      }
      if(matrice[i][j] > 0.5 && matrice[i][j] <= 0.67){
        style = {
          backgroundColor: "#f1c637"
        }
      }
      if(matrice[i][j] > 0.67 && matrice[i][j] < 1){
        style = {
          backgroundColor: "#55ee8d"
        }
      }
      ligne.push(
        <td 
          key={`${i}-${j}`} 
          className="text-center border"
          style={style}
        >
          {matrice[i][j]}
        </td>
      )
    }
    listeTBody.push(
      <tr key={i} className="border ">
        {ligne}
      </tr>
    )
  }

  return (
    <table className="border rounded table table-bordered mt-4 p-3">
      <thead className="">
        <tr className="">
          {listeTHead}
        </tr>
      </thead>
      <tbody className="">
        {listeTBody}
      </tbody>
    </table>
  )
}

export default WuPalmerMatrix