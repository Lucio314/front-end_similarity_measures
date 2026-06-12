<<<<<<< HEAD
import SequenceReprLine from '../../components/SequenceReprLine';
import type { DatasetSequenceProps } from '../../types';
import type { JSX } from 'react';
=======
// SeqStats: one sequence card showing label, stats, and temporal timeline.
// SeqRepr and SequenceRepr removed — only the timeline visualization is kept.
// Expand/collapse via useState, not document.getElementById.

import { useState, type JSX } from 'react';
import ArrowsIcon from '../../components/icons/ArrowsIcon';
import SequenceReprLine from '../../components/SequenceReprLine';
import type { DatasetSequenceProps } from '../../types';
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a

interface SeqStatsProps {
  sequence: DatasetSequenceProps;
  colorMap: Record<string, string>;
}

<<<<<<< HEAD
function SeqStats({sequence} : SeqStatsProps){
    const listeSequenceReprLine : Array<JSX.Element> = []
    let trousSequence = 0
=======
function SeqStats({ sequence, colorMap }: SeqStatsProps) {
  const [open, setOpen] = useState(false);
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a

  const gapCount = sequence.activities.filter(a => a.name === 'missing').length;

<<<<<<< HEAD
    for(let i=0; i<sequence.activities.length; i++){
        listeSequenceReprLine.push(
            <SequenceReprLine name={sequence.activities[i].name} duration={sequence.activities[i].duration} totalDuration={sequence.total_duration}/>
        )
        if(sequence.activities[i].name === "missing"){
            trousSequence++
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
        <div className="border rounded">
            <div className="d-flex justify-content-between">
                <div className="">
                    <div className="">
                        <h4 className="h4-title">{sequence.label}</h4>
                        <div className="">
                            <span>{sequence.length} activités {" "}</span>
                            <span>{sequence.total_duration} {"min "}</span>
                            <span>❓ {trousSequence} trou(s)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id={sequence.label} className="">
                <div 
                    className="border rounded p-2"
                    style={{
                        backgroundColor: "#dadada"
                    }}
                >
                    <div className="">
                        Visualisation temporelle: 
                    </div>
                    <div className="d-flex">
                        {listeSequenceReprLine}
                    </div>
                </div>
            </div>
        </div>
    )
=======
  const timelineItems: JSX.Element[] = sequence.activities.map((activity, i) => (
    <SequenceReprLine
      key={i}
      name={activity.name}
      duration={activity.duration}
      totalDuration={sequence.total_duration}
      color={colorMap[activity.name]}
    />
  ));

  return (
    <div className="border rounded mb-2" style={{ backgroundColor: '#fafafa' }}>
      <div className="d-flex justify-content-between align-items-center p-3">
        <div>
          <span className="fw-semibold" style={{ fontSize: 14 }}>{sequence.label}</span>
          <span className="text-muted ms-3" style={{ fontSize: 12 }}>
            {sequence.length} activities &bull; {sequence.total_duration} min
            {gapCount > 0 && <span className="ms-2 text-warning">&#10067; {gapCount} gap(s)</span>}
          </span>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setOpen(o => !o)}
          title={open ? 'Collapse' : 'Expand timeline'}
        >
          <ArrowsIcon />
        </button>
      </div>

      {open && (
        <div className="px-3 pb-3">
          <div className="text-muted mb-1" style={{ fontSize: 12 }}>Temporal visualization:</div>
          <div className="d-flex" style={{ borderRadius: 4, overflow: 'hidden' }}>
            {timelineItems}
          </div>
        </div>
      )}
    </div>
  );
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a
}

export default SeqStats;
