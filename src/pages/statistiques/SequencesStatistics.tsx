import React, { type JSX } from 'react';
import MenuSelect from '../../components/MenuSelect';
import SearchBar from '../../components/SearchBar';
import OverallSequencesStats from './OverallSequencesStats';
import DisplaySequencesStats from './DisplaySequencesStats';

interface SequenceStatisticsProps{
    listeDatasets: Array<string>;
    nombreSequences: number;
    moyActivitesSequence: number;
    dureeMoy: number;
    nombreTrous: number;
} 

function SequencesStatistics({listeDatasets, nombreSequences, moyActivitesSequence, dureeMoy, nombreTrous} : SequenceStatisticsProps){
    const listeStatsGlobales : Array<number> = [nombreSequences, moyActivitesSequence, dureeMoy, nombreTrous]
    const listeStatsGlobalesLabel : Array<string> = ["Séquences affichées", "Activités moy./séquence", "Durée moy. (min)", "Total trous"]
    const listeOverallSequencesStats : Array<JSX.Element> = []
    for(let i = 0; i<listeStatsGlobales.length; i++){
        listeOverallSequencesStats.push(
            <OverallSequencesStats nombre={listeStatsGlobales[i]} text={listeStatsGlobalesLabel[i]}/>
        )
    }//Pas de problème vu qu'elles sont de même taille (fait exprès)
    
    return(
        <div id="div-part-body-sequences" className="part-main-body" hidden>
            <div className="part-body">
                <h2 className="h2-title">Visualisation des Séquences</h2>
                <div>
                    <label>Dataset :</label>
                    <MenuSelect options={listeDatasets}/>
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