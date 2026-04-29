import React from 'react';
import MenuSelect from '../../components/MenuSelect';
import SearchBar from '../../components/SearchBar';
import OverallSequencesStats from './OverallSequencesStats';
import DisplaySequencesStats from './DisplaySequencesStats';

const DATASETS = []
//Représente les différents datasets téléchargés/par défaut

const STATSGLOBALES = [
    {text:"Séquences totales", nombre:"50"},
    {text:"Activités moy./séquence", nombre:"5"},
    {text:"Durée moyenne (min)", nombre:"365"},
    {text:"Total Trous", nombre:"53"}
]

function SequencesStatistics(){
    const listeStatsGlobales = []
    for(let stats of STATSGLOBALES){
        listeStatsGlobales.push(
            <OverallSequencesStats nombre={stats.nombre} text={stats.text}/>
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
                <DisplaySequencesStats/>
                <div className="stats-sequences-globales">
                    {listeStatsGlobales}
                </div>
            </div>
        </div>
    )
}

export default SequencesStatistics