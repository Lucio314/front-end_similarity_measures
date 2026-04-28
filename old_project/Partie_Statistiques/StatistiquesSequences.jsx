import React from 'react';
import MenuSelect from '../component/MenuSelect';
import SearchBar from '../component/SearchBar';
import StatsSequencesGlobales from './StatsSequencesGlobales';
import StatsSequencesAffichage from './StatsSequencesAffichage';

const DATASETS = []
//Représente les différents datasets téléchargés/par défaut

const STATSGLOBALES = [
    {text:"Séquences totales", nombre:"50"},
    {text:"Activités moy./séquence", nombre:"5"},
    {text:"Durée moyenne (min)", nombre:"365"},
    {text:"Total Trous", nombre:"53"}
]

/**
 * @returns 
 */
function StatistiquesSequences(){
    const listeStatsGlobales = []
    for(let stats of STATSGLOBALES){
        listeStatsGlobales.push(
            <StatsSequencesGlobales nombre={stats.nombre} text={stats.text}/>
        )
    }
    
    return(
        <div id="div-part-body-sequences" className="part-main-body" hidden>
            <div className="part-body">
                <h2 className="h2-title">Visualisation des Séquences</h2>
                <div>
                    <label>Dataset :</label>
                    <MenuSelect options={DATASETS}/>
                </div>
                <SearchBar placeholder="Rechercher une séquence ou une activité..."/>
                <StatsSequencesAffichage/>
                <div className="stats-sequences-globales">
                    {listeStatsGlobales}
                </div>
            </div>
        </div>
    )
}

export default StatistiquesSequences