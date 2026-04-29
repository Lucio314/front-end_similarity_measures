import React from 'react';
import Pros from '../component/Pros';
import Cons from '../component/Cons';
import Proprietes from './Proprietes';
import { useState } from 'react';
import IconChecked from '../component/Icons/IconChecked';
import IconInfo from '../component/Icons/IconInfo';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function MethodeSimilarite({nomMethode, descMethode, specification, avantages, inconvenients, proprietes, parametres}){
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
        <div className="method">
            <div className="method-header">
                <div className="method-name-desc">
                    <h3 className="h3-title">{nomMethode}</h3>
                    <p className="h3-title-p">{descMethode}</p>
                </div>
                <IconChecked/>
            </div>
            <div className="method-spec">
                {listeSpec}
            </div>
            <button
                id="show-method-info-button"
                className="show-button"
                onClick={handleClickShowInfo}
            >
                <IconInfo/>
                {buttonText}
            </button>
            <div id={idMethodInfo} className="method-body" hidden>
                <Pros avantages={avantages}/>
                <Cons inconvenients={inconvenients}/>
                <Proprietes proprietes={proprietes}/>
                {param}
            </div>
        </div>
    )
}

export default MethodeSimilarite