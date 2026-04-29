import React from 'react';
import ArrowsIcon from '../../components/icons/ArrowsIcon';
import ActivitiesStats from './ActivitiesStats';

const ACTIVITES = [
    {
        idSequence: "100010.10",
        idActivite:"100010.10.1",
        emojiActivite:"🏠",
        nomActvite:"maison",
        tempsActivite:"32 min"
    },
    {
        idSequence: "100010.10",
        idActivite:"100010.10.2",
        emojiActivite:"🏃‍♂️",
        nomActvite:"marcher",
        tempsActivite:"62 min"
    },
    {
        idSequence: "100010.10",
        idActivite:"100010.10.3",
        emojiActivite:"❓",
        nomActvite:"missing (Trou)",
        tempsActivite:"74 min"
    },
    {
        idSequence: "100010.10",
        idActivite:"100010.10.4",
        emojiActivite:"💼",
        nomActvite:"travail",
        tempsActivite:"122 min"
    },
    {
        idSequence: "100010.10",
        idActivite:"100010.10.5",
        emojiActivite:"🏃‍♂️",
        nomActvite:"marcher",
        tempsActivite:"95 min"
    },
    {
        idSequence: "100010.11",
        idActivite:"100010.11.1",
        emojiActivite:"🏠",
        nomActvite:"maison",
        tempsActivite:"73 min"
    },
    {
        idSequence: "100010.11",
        idActivite:"100010.11.2",
        emojiActivite:"💼",
        nomActvite:"travail",
        tempsActivite:"78 min"
    },
    {
        idSequence: "100010.11",
        idActivite:"100010.11.3",
        emojiActivite:"🏃‍♂️",
        nomActvite:"marcher",
        tempsActivite:"49 min"
    }
]

interface SeqStatsProps{
    idSequence: String;
    nomSequence: String;
    nombreActivites: number;
    dureeSequence: String;
    trousSequence: number;
}

function SeqStats({idSequence, nomSequence, nombreActivites, dureeSequence, trousSequence} : SeqStatsProps){
    const listeSpansEmojiActivites = []
    //Représente les emojis des activités à mettre dans des spans (issu des données du dataset)
    const listeActivites = []
    //Représente les différentes activités
    const listeActivitesVisualisation = []
    //Représente la visualisation temporelle des activités
    for(let activite of ACTIVITES){
        if(activite.idSequence == idSequence){
            listeSpansEmojiActivites.push(
                <span>{activite.emojiActivite}</span>
            )
            listeActivites.push(
                <ActivitiesStats 
                    emoji={activite.emojiActivite}
                    nomActivite={activite.nomActvite}
                    temps={activite.tempsActivite}
                />
            )
        }
    } 
    

    /*const handleAffichageFlecheClick = (e) => {
    e.preventDefault
    const divFleches = document.getElementById(idSequence)
    const FlecheBas = divFleches.getElementById('fleche-bas')
    const FlecheHaut = divFleches.getElementById('fleche-haut')
        if(divFlecheHaut.hidden){
          FlecheHaut.hidden = false
          FlecheBas.hidden = true
        }else{
          FlecheHaut.hidden = true
          FlecheBas.hidden = false
        }
    }*/

    return(
        <div className="stats-seq">
            <div className="">
                <div className="">
                    <div className="">
                        <h4 className="h4-title">{nomSequence}</h4>
                        <div className="">
                            <span>{nombreActivites} activités</span>
                            <span>{dureeSequence}</span>
                            <span>❓ {trousSequence} trou(s)</span>
                        </div>
                    </div>
                    <div className="">
                        {listeSpansEmojiActivites}
                    </div>
                    <button 
                        className="show-more-details-activities-button"
                        onClick=/*{handleAffichageFlecheClick}*/{() => null}
                    >
                        <ArrowsIcon/>
                    </button>
                </div>
            </div>
            <div id="" className="" hidden>
                <div className="">
                    {listeActivites}
                </div>
                <div className="">
                    <div className="">
                        Visualisation temporelle: 
                    </div>
                    <div className="">
                        {listeActivitesVisualisation}
                    </div>
                </div>
            </div>
        </div>
    )
    //faire le changement d'icon après l'appui du bouton
}

export default SeqStats