import React from 'react';

/**
 * @param {String} id
 * @param {String} icon
 * @param {String} temps
 * @returns 
 */
function SeqComparee({id, icon, nomActi, temps}){
    return (
        <div id={id} className="repr-seq-comparee-demo">
            <span>{icon}</span>
            <span>{nomActi}</span>
            <span>{temps}</span>
        </div>
    )
}

export default SeqComparee