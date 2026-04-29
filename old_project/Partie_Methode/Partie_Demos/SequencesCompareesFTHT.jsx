import React from 'react';
import SequenceCompareeTronquee from './SequenceCompareeTronquee';
import SequenceComparee from './SequenceComparee';

/**
 * @param {int} valuePaire
 * @param {int} percentPaire
 * @param {Function} onValuePaireChange
 * @param {Function} onPercentPaireChange
 * @param {float} valueSlider 
 * @returns 
 */
function SequencesCompareesFTHT({valuePaire, percentPaire, onValuePaireChange, onPercentPaireChange, valueSlider}){
    return (
        <div className="sequences-comparees">
            <div>
                <p>Séquence 1 (tronquée)</p>
                <div>
                    <SequenceCompareeTronquee/>
                </div>
            </div>
            <div>
                <p>Séquence 2</p>
                <div>
                    <SequenceComparee/>
                </div>
            </div>
        </div>
    )
}

export default SequencesCompareesFTHT