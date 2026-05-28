import ProsOrCons from './ProsOrCons';
import RedCrossIcon from './icons/RedCrossIcon';

interface ConsProps{
    inconvenients: Array<string>;
}

function Cons({inconvenients} : ConsProps){
    return (
        <div className="col-md-6">
            <RedCrossIcon/>
            <span className="cons"> Inconvénients :</span>
            <ProsOrCons liste={inconvenients}/>
        </div>
    )
}

export default Cons