import React from 'react';
import TableauComparatif from './Partie_Tableau/TableauComparatif';
import DemoFTHT from './Partie_Demos/DemoFTHT';
import DemoRFTH from './Partie_Demos/DemoRFTH';
import MethodesSimilarite from './MethodesSimilarite';
import IconBook from '../component/Icons/IconBook';
import { useState } from 'react';

/**
 * @param {*} param0 
 * @returns 
 */
function Methode({}){
    const [textTabButton, setTextTabButton] = useState("Voir")
    const [textDemoFTHTButton, setTextDemoFTHTButton] = useState("Voir")
    const [textDemoRFTHButton, setTextDemoRFTHButton] = useState("Voir")

    const handleClickTabButton = (e) => {
        const divTabComparatif = document.getElementById('comparative-tab')
        if(divTabComparatif.hidden){
            setTextTabButton("Masquer")
            divTabComparatif.hidden=false
        }else{
            setTextTabButton("Voir")
            divTabComparatif.hidden=true
        }

    }

    const handleClickDemoFTHTButton = (e) => {
        const divDemoFTHT = document.getElementById('demo-ftht')
        if(divDemoFTHT.hidden){
            setTextDemoFTHTButton("Masquer")
            divDemoFTHT.hidden=false
        }else{
            setTextDemoFTHTButton("Voir")
            divDemoFTHT.hidden=true
        }
    }

    const handleClickDemoRFTHButton = (e) => {
        const divDemoRFTH = document.getElementById('demo-rfth')
        if(divDemoRFTH.hidden){
            setTextDemoRFTHButton("Masquer")
            divDemoRFTH.hidden=false
        }else{
            setTextDemoRFTHButton("Voir")
            divDemoRFTH.hidden=true
        }

    }

    return (
        <div id="method-part" className="part">
            <div className="part-main-body">
                <div className="part-body">
                    <h2 className="h2-title">🎯 Méthode de Similarité</h2>
                    <p className="h2-title-p">Choisissez l'algorithme pour mesurer la similarité entre les séquences</p>
                    <div className="method-body">
                        <button className="tab-button" onClick={handleClickTabButton}>
                            <IconBook/>
                            {textTabButton} le tableau comparatif
                        </button>
                        <button className="demo-button" onClick={handleClickDemoFTHTButton}>
                            {textDemoFTHTButton} la démo FTH Troncature
                        </button>
                        <button className="demo-button" onClick={handleClickDemoRFTHButton}>
                            {textDemoRFTHButton} la démo RFTH
                        </button>
                    </div>
                    <TableauComparatif/>
                    <DemoFTHT/>
                    <DemoRFTH/>
                    <MethodesSimilarite/>
                </div>
            </div>
            <button className="validate-button" onClick={() => null}>Configurer les paramètres →</button>
            <button className="return-button" onClick={() => null}>← Retour</button>
        </div>
    )
    //Finir DemoFTHT
    //Faire DemoRFTH
    //Faire les event des buttons 
    //Faire un isChecked pour MethodesSimilarite pour permettre la communication avec Parametres.jsx (envoie des paramètres et nom méthode)
}


export default Methode