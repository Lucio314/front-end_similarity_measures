//npm i recharts
import React from 'react';
import {PieChart, Pie, Tooltip, Sector} from 'recharts'
import type { PieSectorShapeProps, TooltipIndex } from 'recharts'
import type { DataStatsProps } from '../../types';

const COLORS =[
    '#ff2828', /* Mettre couleur rouge pour */
    '#fe00e9',
    '#ff4281',
    '#a36f0e',
    '#ddce48',
    '#bfff28',
    '#6eff42',
    '#00C49F',
    '#0d7494',
    '#2f1cdf'
]

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
}; 

interface PiesChartProps {
    dataset: DataStatsProps[];
    isAnimationActive?: boolean;
    defaultIndex? : TooltipIndex;
}

function PiesChart({dataset, isAnimationActive = true, defaultIndex = undefined} : PiesChartProps){ 
  return (
    <div className="col-md-6 border rounded d-flex flex-column align-items-center">
      <h5 className="fw-bold mb-1">Distribution des activités</h5>
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
          <Pie
            dataKey="value"
            data={dataset}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <Tooltip defaultIndex={defaultIndex} />
        </PieChart>
    </div>
    )
}

/*function CustomToolTip({active, payload} : TooltipContentProps){
  if(active && payload && payload.length){
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          Nombre : 
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
      )
  }
}*/

export default PiesChart