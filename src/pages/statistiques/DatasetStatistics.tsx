import React, { type JSX } from "react";
import OverallStats from "./OverallStats";
import DurationStats from "./DurationStats";
import InformationIcon from "../../components/icons/InformationIcon";
import MissingStats from "./MissingStats";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";
import DetailsStats from "./DetailsStats";
import type { DatasetInfoProps, DataStatsProps } from "../../types";
interface DatasetStatisticsProps{
    datasetInfo : DatasetInfoProps
}

function DatasetStatistics({ datasetInfo } : DatasetStatisticsProps){
    const listeStatsGlobales : Array<number> = [datasetInfo.global.num_sequences, datasetInfo.global.num_activities,datasetInfo.global.avg_length, datasetInfo.duration.avg]
    const listeStatsGlobalesLabel : Array<string> = ["Séquences totales", "Types d'activités", "Longueur moyenne", "Durée moy. (min)"]
    const listeStatsGlobalesId : Array<string> = ["hash", "type", "longueur", "horloge"]
    const listeOverallStats : Array<JSX.Element> = []
    for(let i = 0; i<listeStatsGlobales.length; i++){
        listeOverallStats.push(
            <OverallStats id={listeStatsGlobalesId[i]} nombre={listeStatsGlobales[i]} text={listeStatsGlobalesLabel[i]}/>
        )
    }//Pas de problème vu qu'elles sont de même taille (fait exprès)

    const listeStatsDurees : Array<number> = [datasetInfo.duration.min, datasetInfo.duration.avg, datasetInfo.duration.max]
    const listeStatsDureesLabel : Array<string> = ["minimum", "moyenne", "maximum"]
    const listeDurationStats : Array<JSX.Element> = []
    for(let i = 0; i<listeStatsDurees.length; i++){
        listeDurationStats.push(
            <DurationStats duree={listeStatsDureesLabel[i]} tempsDuree={listeStatsDurees[i]}/>
        )
    }//Pas de problème vu qu'elles sont de même taille (fait exprès)

    const listeStatsTrous : Array<number> = [datasetInfo.missing.total_gaps, datasetInfo.missing.sequences_with_gaps, datasetInfo.missing.sequences_with_gaps, datasetInfo.missing.avg_gaps_per_sequence]
    const listeStatsTrousLabel : Array<string> = ["Total de trous", "Séquences affectées", "% de séquences avec trous", "Moy. trous/séquence affectée"]
    const listeMissingStats : Array<JSX.Element> = []
    for(let i = 0; i<listeStatsTrous.length; i++){
        listeMissingStats.push(
            <MissingStats stats={listeStatsTrousLabel[i]} valeur={listeStatsTrous[i]}/>
        )
    }//Pas de problème vu qu'elles sont de même taille (fait exprès)
    //Ne pas oublier de ne pas faire apparaître la div s'il n'y a pas de trous (useEffect probablement)

    const listeStatsDetails : DataStatsProps[] = datasetInfo.activities.distribution
    const listeDetailsStats : Array<JSX.Element> = []
    for(let i = 0; i<listeStatsDetails.length; i++){
        listeDetailsStats.push(
            <DetailsStats activite={listeStatsDetails[i].name} nombre={listeStatsDetails[i].value}/>
        )
    }//Pas de problème vu qu'elles sont de même taille (fait exprès)

    return(
        <div className="part-body-stats">
            <div className="stats-dataset-globales">
                {listeOverallStats}
            </div>
            <div className="stats-dataset-durees">
                <h3 className="fw-bold mb-1">Durées des séquences</h3>
                <div className="stats-durees">
                    {listeDurationStats}
                </div>
            </div>
            <div id="div-stats-dataset-trous" className="stats-dataset-trous" hidden>
                <h3 className="fw-bold mb-1">
                    <InformationIcon/>
                    Données Manquantes (Trous)
                </h3>
                <div className="stats-trous">
                    {listeMissingStats}
                </div>
                <div className="stats-dataset-trous-impact">
                    <p>
                        <strong>Impact :</strong>
                        Les données manquantes représentent {datasetInfo.missing.percentage_missing_activities}% de toutes les activités.
                        Il est recommandé de définir une stratégie de gestion des trous.
                    </p>
                </div>
            </div>
            <div className="stats-dataset-graphes">
                <BarsChart dataset={datasetInfo.activities.distribution}/>
                <PiesChart dataset={datasetInfo.activities.distribution}/>
            </div>
            <div className="stats-dataset-details">
                <h3 className="fw-bold mb-1">Détails des activités présentes</h3>
                <div className="stats-details">
                    {listeDetailsStats}
                </div>
            </div>
        </div>
    )
    //BarChatDiv et PieChartDiv reçoivent normalement le dataset en paramètre
}

export default DatasetStatistics