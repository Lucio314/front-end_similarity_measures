import React from 'react';
import ComparativeTable from './methode/ComparativeTable';
import FTHTDemo from './methode/FTHTDemo';
import RFTHDemo from './methode/RFTHDemo';
import SimilarityMethods from './methode/SimilarityMethods';
import BookIcon from '../components/icons/BookIcon';
import { useState } from 'react';

interface MethodPageProps {
  onNext: () => void;
  onBack: () => void;
}

function MethodPage({onNext, onBack} : MethodPageProps){
    const [textTabButton, setTextTabButton] = useState<String>("Voir")
    const [textDemoFTHTButton, setTextDemoFTHTButton] = useState<String>("Voir")
    const [textDemoRFTHButton, setTextDemoRFTHButton] = useState<String>("Voir")

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
        <div id="method-card" className="card border-0 shadow-sm" style={{ borderRadius: 12 }}>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="text-center mb-4">🎯 Méthode de Similarité</h2>
                    <p className="text-muted mb-0">Choisissez l'algorithme pour mesurer la similarité entre les séquences</p>
                    <div className="method-body">
                        <button className="tab-button" onClick={handleClickTabButton}>
                            <BookIcon/>
                            {textTabButton} le tableau comparatif
                        </button>
                        <button className="demo-button" onClick={handleClickDemoFTHTButton}>
                            {textDemoFTHTButton} la démo FTH Troncature
                        </button>
                        <button className="demo-button" onClick={handleClickDemoRFTHButton}>
                            {textDemoRFTHButton} la démo RFTH
                        </button>
                    </div>
                    <ComparativeTable/>
                    <FTHTDemo/>
                    <RFTHDemo/>
                    <SimilarityMethods/>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button 
                    className="btn-next px-5 py-2 text-white"
                    onClick={onNext}
                    style={{
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        cursor: "pointer",
                    }}
                    disabled
                >
                    Configurer les paramètres →
                </button>
                <button 
                    className="btn-return px-5 py-2 text-black"
                    onClick={onBack}
                    style={{
                        backgroundColor: "#858494",
                        borderColor: "#858494",
                        cursor: "pointer",
                    }}
                >
                    ← Retour
                </button>
            </div>
        </div>
    )
    //Finir FTHTDemo
    //Faire RFTHDemo
    //Le button next doit être disabled tant qu'il n'y a pas de sélection de méthode
    //Faire un isChecked pour MethodesSimilarite pour permettre la communication avec Parametres.jsx (envoie des paramètres et nom méthode)
}


export default MethodPage