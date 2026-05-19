import type { DatasetProps } from '../../types';
import SeqStats from './SeqStats';

interface DisplaySequencesStatsProps{
    dataset: DatasetProps;
}

function DisplaySequencesStats({dataset} : DisplaySequencesStatsProps){
    const listeStatsSeq = []
    for(let seq of dataset.sequence){
        listeStatsSeq.push(
            <SeqStats
                sequence={seq}
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