import React from "react";
import StatsGlobales from "./StatsGlobales";
import StatsDurees from "./StatsDurees";
import IconInfo from "../component/Icons/IconInfo";
import StatsTrous from "./StatsTrous";
import BarChartDiv from "./BarChartDiv";
import PieChartDiv from "./PieChartDiv";
import StatsDetails from "./StatsDetails";
import { useEffect } from "react";

const STATSGLOBALES = [
    {icon: "hash", nombre:"50", text:"Séquences totales"},
    {icon: "type", nombre:"10", text:"Types d'activités"},
    {icon: "longueur", nombre:"5.4", text:"Longueur moyenne"},
    {icon: "horloge", nombre:"365", text:"Durée moyenne (min)"}
]
//nombre provient du dataset normalement, ici, il sert de placeholder en attendant les vraies données

const STATSDUREES = [
    {duree: "minimale", temps: "160 min"},
    {duree: "maximale", temps: "583 min"},
    {duree: "moyenne", temps: "365 min"}
]
//temps provient du dataset également, donc il sert de placeholder en attendant

const STATSTROUS = [
    {stats: "Total de trous", valeur: "53"},
    {stats: "Séquences affectées", valeur: "28"},
    {stats: "% de séquences avec trous", valeur: "56.0%"},
    {stats: "Moy. trous/séquence affectée", valeur: "1.9"}
]
//valeur provient du dataset également, donc il sert de placeholder en attendant
//un useEffect sera utilisé pour faire apparaître la div s'il y a des trous, sinon, la fera disparaître

const STATSDETAILS = [
    {activite: "Vélo", nombre: "18"},
    {activite: "Maison", nombre: "23"},
    {activite: "Restaurant", nombre: "23"},
    {activite: "Sport", nombre: "28"},
    {activite: "Étude", nombre: "25"},
    {activite: "Bus", nombre: "13"},
    {activite: "Missing", nombre: "53"},
    {activite: "Marcher", nombre: "23"},
    {activite: "Shopping", nombre: "20"},
    {activite: "Travail", nombre: "28"},
]
//Liste du nombre des activités, provient normalement du dateset, donc ici placeholder
//activite est le nom de l'activité, nombre est le nombre de fois que cette activité apparaît dans le dataset


/**
 * @returns 
 */
function StatistiquesDataset(){
    const listeStatsGlobales = []
    for(let stats of STATSGLOBALES){
        listeStatsGlobales.push(
            <StatsGlobales id={stats.icon} nombre={stats.nombre} text={stats.text}/>
        )
    }

    const listeStatsDurees = []
    for(let stats of STATSDUREES){
        listeStatsDurees.push(
            <StatsDurees duree={stats.duree} temps={stats.temps}/>
        )
    }

    const listeStatsTrous = []
    for(let stats of STATSTROUS){
        listeStatsTrous.push(
            <StatsTrous stats={stats.stats} valeur={stats.valeur}/>
        )
    }

    const listeStatsDetails = []
    for(let stats of STATSDETAILS){
        listeStatsDetails.push(
            <StatsDetails activite={stats.activite} nombre={stats.nombre}/>
        )
    }

    return(
        <div className="part-body-stats">
            <div className="stats-dataset-globales">
                {listeStatsGlobales}
            </div>
            <div className="stats-dataset-durees">
                <h3 className="h3-title">Durées des séquences</h3>
                <div className="stats-durees">
                    {listeStatsDurees}
                </div>
            </div>
            <div id="div-stats-dataset-trous" className="stats-dataset-trous" hidden>
                <h3 className="h3-title">
                    <IconInfo/>
                    Données Manquantes (Trous)
                </h3>
                <div className="stats-trous">
                    {listeStatsTrous}
                </div>
                <div className="stats-dataset-trous-impact">
                    <p>
                        <strong>Impact :</strong>
                        Les données manquantes représentent {17.04}% de toutes les activités.
                        Il est recommandé de définir une stratégie de gestion des trous.
                    </p>
                </div>
            </div>
            <div className="stats-dataset-graphes">
                <BarChartDiv/>
                <PieChartDiv/>
            </div>
            <div className="stats-dataset-details">
                <h3 className="h3-title">Détails des activités présentes</h3>
                <div className="stats-details">
                    {listeStatsDetails}
                </div>
            </div>
        </div>
    )
    //BarChartDiv et PieChartDiv recoivent normalement le dataset en paramètre
}

export default StatistiquesDataset