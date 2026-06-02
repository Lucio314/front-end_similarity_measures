import type { JSX } from 'react';
import type { DatasetProps } from '../../types';
import SeqStats from './SeqStats';

interface DisplaySequencesStatsProps{
    dataset: DatasetProps;
    search: string;
}

function DisplaySequencesStats({dataset, search} : DisplaySequencesStatsProps){
    const listeStatsSeq = []
    for(let seq of dataset.sequence){
        listeStatsSeq.push(
            <SeqStats
                key={seq.id}
                sequence={seq}
            />
        )
    }

    const visibleSequences : Array<JSX.Element> = listeStatsSeq.filter(
        (sequence) => {
            if(search && !sequence.props.sequence.label.includes(search)){
                return false;
            }
            return true;
        }
    );

    return(
        <div className="stats-sequences-affichage">
            {visibleSequences}
        </div>
    )
    //Doit afficher toutes les séquences, 10 par 10 ou 5 par 5 (à voir)
    //Doit avoir une pagination pour naviguer efficacement (1, 2, ..., 10)
    //Format des séquences : comme dans le prototype
    //Les séquences sont réunis dans une liste (listeStatsSeq)
    //Chaque séquence est un objet StatsSeq
}

export default DisplaySequencesStats