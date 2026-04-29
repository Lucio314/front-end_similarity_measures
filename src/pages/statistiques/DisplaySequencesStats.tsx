import React from 'react';
import SeqStats from './SeqStats';

const SEQUENCES = [
    {
        idSequence: "100010.10",
        nomSequence:"mobility-seq-0", 
        nombreActivites: 5, 
        dureeSequence:"365 minutes", 
        trousSequence: 2
    },
    {
        idSequence: "100010.11", 
        nomSequence:"mobility-seq-1", 
        nombreActivites: 3, 
        dureeSequence:"200 minutes", 
        trousSequence: 0
    }
]

function DisplaySequencesStats(){
    const listeStatsSeq = []
    for(let seq of SEQUENCES){
        listeStatsSeq.push(
            <SeqStats
                idSequence={seq.idSequence} 
                nomSequence={seq.nomSequence} 
                nombreActivites={seq.nombreActivites} 
                dureeSequence={seq.dureeSequence} 
                trousSequence={seq.trousSequence}
            />
        )
    }

    return(
        <div className="stats-sequences-affichage">
            {listeStatsSeq}
        </div>
    )
    //Doit afficher toutes les séquences, 10 par 10 ou 5 par 5 (à voir)
    //Doit avoir une pagination pour naviguer efficacement (1, 2, ..., 10)
    //Format des séquences : comme dans le prototype
    //Les séquences sont réunis dans une liste (listeStatsSeq)
    //Chaque séquence est un objet StatsSeq
}

export default DisplaySequencesStats