import React from 'react';

/**
 * @param {String} id
 * @param {String} icon
 * @param {String} temps
 * @returns 
 */
function Seq({id, icon, temps}){
    return (
        <div id={id} className="repr-seq-demo">
            <div className="icon-seq-demo">
                {icon}
            </div>
            <div className="time-seq-demo">
                {temps}
            </div>
        </div>
    )
}

export default Seq