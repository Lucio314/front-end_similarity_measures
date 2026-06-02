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
  
  if(id === "strat1"){
    return (
      <div className="border rounded" onClick={onClick}>
        <div className="d-flex align-items-left gap-3">
          <span className="strategy-emoji">{emoji}</span>
          <div className="div-header-strategy">
            <h4 className="strategy-name">{strategie}</h4>
            <p className="strategy-description">{descriptionStrategie}</p>
          </div>
          <div id={id}>
            <CheckedIcon/>
          </div>
        </div>
        <div className="mt-3">
          <ProsNCons avantages={avantages} inconvenients={inconvenients}/>
        </div>
      </div>
    )
  }else{
    return (
    <div className="border rounded d-flex flex-column gap-3" onClick={onClick}>
      <div className="dlex d-flex align-items-left gap-3">
        <span className="strategy-emoji">{emoji}</span>
        <div className="div-header-strategy">
          <h4 className="strategy-name">{strategie}</h4>
          <p className="strategy-description">{descriptionStrategie}</p>
        </div>
        <div id={id} hidden>
          <CheckedIcon/>
        </div>
      </div>
      <div className="mt-3">
        <ProsNCons avantages={avantages} inconvenients={inconvenients}/>
      </div>
    </div>
  )
  }
}

export default MissingsStrat