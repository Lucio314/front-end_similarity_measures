import React from 'react';
import Sequence from './Sequence';
import SequenceTronquee from './SequenceTronquee';
import SequencesCompareesFTHT from './SequencesCompareesFTHT';
import Slider from '../../component/Slider'
import { useState } from 'react';
import { useEffect } from 'react';

function DemoFTHT({}){
    const [valueSlider, setValueSlider] = useState(0.0)
    const [valuePaire, setValuePaire] = useState(0)
    const [percentPaire, setPercentPaire] = useState(0)

    useEffect(() => {
        const idSpanDebut = document.getElementById('span-activites-debut')
        const idSpanFin = document.getElementById('span-activites-fin')
        if(parseInt(valueSlider) == 0){
            idSpanDebut.hidden=true
        }else{
            if(idSpanDebut){
                idSpanDebut.hidden=false
            }
        }
        if(3-parseInt(valueSlider) == 0){
            idSpanFin.hidden=true
        }else{
            if(idSpanFin){
                idSpanFin.hidden=false
            }
        }
    }, [])
    
    return (
        <div id="demo-ftht" className="demo" hidden>
            <h4 className="h4-title">🎯 Démonstration : FTH avec Troncature</h4>
            <div className="tenet-demo">
                <p className="paragraph">
                    <strong>Principe :</strong>
                    Quand on compare deux séquences de longueurs différentes, on glisse 
                    la séquence courte le long de la longue et on tronque la différence.
                    On garde l'alignement qui donne la meilleure similarité.
                </p>
            </div>
            <div className="sequences-demo">
                <div className="sequence-demo">
                    <h5 className="h5-title">Séquence 1 (longue) - 8 activités, 360 min</h5>
                    <SequenceTronquee/>
                    <div className="">
                        <span id="span-activites-debut" hidden>← {parseInt(valueSlider)} activité(s) tronquée(s) au début</span>
                        <span id="span-activites-fin">{3 - parseInt(valueSlider)} activité(s) tronquée(s) à la fin →</span>
                    </div>
                </div>
                <div className="sequence-demo">
                    <h5 className="h5-title">Séquence 2 (courte) - 5 activités, 230 min</h5>
                    <Sequence/>
                </div>
            </div>
            <div className="slider-demo">
                <label className="slider-demo-position">
                    Position de l'alignement (glissement) : {parseInt(valueSlider)}
                </label>
                <Slider 
                    minValue={0.0}
                    maxValue={3.0}
                    valueSlider={valueSlider}
                    onValueSliderChange={setValueSlider}
                    pas={1.0}
                />
                <div className="slider-demo-legend">
                    <span>Début (0)</span>
                    <span>Fin (3)</span>
                </div>
            </div>
            <div className="comparaison-demo">
                <h5 className="h5-title">✂️ Après troncature (comparaison élément par élément) :</h5>
                <SequencesCompareesFTHT
                    valuePaire={valuePaire}
                    percentPaire={percentPaire}
                    onValuePaireChange={setValuePaire}
                    onPercentPaireChange={setPercentPaire}
                    valueSlider = {valueSlider}
                />
                <div className="comparaison-stats-demo">
                    <div className="comparaison-paire-demo">
                        <span>Paires identiques :</span>
                        <span>{valuePaire} / 5</span>
                    </div>
                    <div className="comparaison-pourcent-demo">
                        <span>Similarité approximative :</span>
                        <span>{percentPaire} %</span>
                    </div>
                </div>
                <div className="demo-legend">
                    <p className="paragraph">
                        <strong>Vert :</strong>
                        Activités identiques à la même position
                        <br/>
                        <strong>Rouge :</strong>
                        Activités différentes
                    </p>
                </div>
            </div>
            <div className="div-hint">
                <p>
                    💡
                    <strong> Astuce :</strong>
                    Glissez le curseur pour voir comment différents alignements changent
                    le nombre de correspondances. L'algorithme teste tous les alignements
                    possibles et garde celui qui maximise la similarité.
                </p>
            </div>
        </div>
    )
    // A faire : SequencesCompareesFTHT, les différents eventListener pour modifier useState
}

export default DemoFTHT