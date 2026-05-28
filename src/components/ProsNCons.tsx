import Pros from './Pros';
import Cons from './Cons';

interface ProsNConsProps{
    avantages: Array<string>;
    inconvenients: Array<string>;
}

function ProsNCons({avantages, inconvenients} : ProsNConsProps){
  return (
    <div className="row g-3">
      <Pros avantages={avantages}/>
      <Cons inconvenients={inconvenients}/>
    </div>
  )
}

export default ProsNCons