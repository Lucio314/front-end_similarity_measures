import { type JSX } from 'react';
import MenuSelect from '../../components/MenuSelect';
import SearchBar from '../../components/SearchBar';
import OverallSequencesStats from './OverallSequencesStats';
import DisplaySequencesStats from './DisplaySequencesStats';
import type { DatasetProps } from '../../types';

interface SequenceStatisticsProps{
    dataset: DatasetProps;
    nombreSequences: number;
    moyActivitesSequence: number;
    dureeMoy: number;
    nombreTrous: number;
} 

function SequencesStatistics({dataset, nombreSequences, moyActivitesSequence, dureeMoy, nombreTrous} : SequenceStatisticsProps){
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
                <h2 className="fw-bold mb-1 text-center">Visualisation des Séquences</h2>
                <SearchBar placeholder="Rechercher une séquence ou une activité..."/>
                <DisplaySequencesStats 
                    dataset={dataset}
                />
                <div className="border rounded d-flex justify-content-between">
                    {listeOverallSequencesStats}
                </div>
            </div>
        </div>
    )
}

export default SequencesStatistics