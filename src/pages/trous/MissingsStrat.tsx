import { useState } from 'react';
import CheckedIcon from '../../components/icons/CheckedIcon';
import ProsNCons from '../../components/ProsNCons';

interface MissingsStratProps{
    id: string;
    emoji: string;
    strategie: string;
    descriptionStrategie: string;
    avantages: Array<string>;
    inconvenients: Array<string>;
    onClick: () => void;
}

function MissingsStrat({id, emoji, strategie, descriptionStrategie, avantages, inconvenients, onClick} : MissingsStratProps){
  const [buttonText, setButtonText] = useState("Voir les détails")
  const idDivProsNCons = id + "-pros-n-cons"

  const handleClickShowInfo = (e) => {
        e.preventDefault()
        const divMethodInfo = document.getElementById(idDivProsNCons)
        if(divMethodInfo.hidden){
            setButtonText("Masquer les détails")
            divMethodInfo.hidden=false
        }else{
            setButtonText("Voir les détails")
            divMethodInfo.hidden=true
        }
    }

  if(id === "strat1"){
    return (
      <div className="border rounded  d-flex flex-column gap-3">
        <div className="d-flex align-items-left gap-3" onClick={onClick}>
          <span className="strategy-emoji">{emoji}</span>
          <div className="div-header-strategy">
            <h4 className="strategy-name">{strategie}</h4>
            <p className="strategy-description">{descriptionStrategie}</p>
          </div>
          <div id={id}>
            <CheckedIcon/>
          </div>
        </div>
        <div id={idDivProsNCons} className="mt-3" hidden>
          <ProsNCons avantages={avantages} inconvenients={inconvenients}/>
        </div>
        <button 
          className="mt-3 btn btn-primary"
          onClick={handleClickShowInfo}
        >
          {buttonText}
        </button>
      </div>
    )
  }else{
    return (
    <div className="border rounded d-flex flex-column gap-3">
      <div className="dlex d-flex align-items-left gap-3" onClick={onClick}>
        <span className="strategy-emoji">{emoji}</span>
        <div className="div-header-strategy">
          <h4 className="strategy-name">{strategie}</h4>
          <p className="strategy-description">{descriptionStrategie}</p>
        </div>
        <div id={id} hidden>
          <CheckedIcon/>
        </div>
      </div>
      <div id={idDivProsNCons} className="mt-3" hidden>
        <ProsNCons avantages={avantages} inconvenients={inconvenients}/>
      </div>
      <button 
          className="mt-3 btn btn-primary"
          onClick={handleClickShowInfo}
        >
          {buttonText}
      </button>
    </div>
  )
  }
}

export default MissingsStrat