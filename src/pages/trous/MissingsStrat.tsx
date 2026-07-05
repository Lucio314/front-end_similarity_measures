import CheckedIcon from '../../components/icons/CheckedIcon';
import ProsNCons from '../../components/ProsNCons';

// Composant legacy non utilisé — MissingsStratManagement le remplace.
interface MissingsStratProps{
    id: string;
    strategie: string;
    descriptionStrategie: string;
    avantages: Array<string>;
    inconvenients: Array<string>;
    onClick: () => void;
}

function MissingsStrat({id, strategie, descriptionStrategie, avantages, inconvenients, onClick} : MissingsStratProps){
  return (
    <div className="border rounded d-flex flex-column gap-3" onClick={onClick}>
      <div className="d-flex align-items-left gap-3">
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
  );
}

export default MissingsStrat