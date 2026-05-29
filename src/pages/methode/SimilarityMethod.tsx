import Pros from '../../components/Pros';
import Cons from '../../components/Cons';
import Properties from './Properties';
import { useState } from 'react';
import CheckedIcon from '../../components/icons/CheckedIcon';
import InformationIcon from '../../components/icons/InformationIcon';

interface SimilarityMethodProps{
    nomMethode: string;
    descMethode: string;
    specification: Array<string>;
    avantages: Array<string>;
    inconvenients: Array<string>;
    proprietes: Array<string>;
    parametres: Array<string>;
}

function SimilarityMethod({nomMethode, descMethode, specification, avantages, inconvenients, proprietes, parametres} : SimilarityMethodProps){
    const [buttonText, setButtonText] = useState("Voir les détails")
    const idMethodInfo = nomMethode + "-method-info"
    
    const listeSpec = []
    for(let i=0; i<specification.length; i++){
        listeSpec.push(
            <span className={specification[i]}>{specification[i]}</span>
        )
    }

    const listeParam = []
    const param = []
    for(let i=0; i<parametres.length; i++){
        listeParam.push(
            <span className="method-param">{parametres[i]}</span>
        )
    }
    if(listeParam.length != 0){
        param.push(<div>{listeParam}</div>)
    }
    

    const handleClickShowInfo = (e) => {
        e.preventDefault()
        const divMethodInfo = document.getElementById(idMethodInfo)
        if(divMethodInfo.hidden){
            setButtonText("Masquer les détails")
            divMethodInfo.hidden=false
        }else{
            setButtonText("Voir les détails")
            divMethodInfo.hidden=true
        }
    }
    
    return (
        <div className="border rounded">
            <div className="method-header">
                <div className="method-name-desc">
                    <h3 className="h3-title">{nomMethode}</h3>
                    <p className="h3-title-p">{descMethode}</p>
                </div>
                <CheckedIcon/>
            </div>
            <div className="method-spec">
                {listeSpec}
            </div>
            <button
                id="show-method-info-button"
                className="show-button"
                onClick={handleClickShowInfo}
            >
                <InformationIcon/>
                {buttonText}
            </button>
            <div id={idMethodInfo} className="method-body" hidden>
                <Pros avantages={avantages}/>
                <Cons inconvenients={inconvenients}/>
                <Properties proprietes={proprietes}/>
                {param}
            </div>
        </div>
    )
}

export default SimilarityMethod