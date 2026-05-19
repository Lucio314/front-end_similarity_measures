//npm i recharts
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import type { DataStatsProps } from '../../types';
import type { TooltipIndex } from 'recharts';

interface BarsChartProps {
    dataset : DataStatsProps[]; //Pour l'instant JSON, à voir si modif
    defaultIndex? : TooltipIndex;
}

function BarsChart({dataset, defaultIndex = undefined} : BarsChartProps){
  return (
    <div className="col">
      <h5 className="fw-bold mb-1">Répartition des activités</h5>
        <BarChart 
          width={500}
          height={300}
          data={dataset}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis dataKey="value"/>
          <Tooltip defaultIndex={defaultIndex}/>
          <Bar dataKey="value" fill="#8884d8"/>
        </BarChart>
    </div>
    )
}

/*function CustomToolTip({active, payload, label} : TooltipContentProps){
  if(active && payload && payload.length){
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Nombre : 
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
      )
  }
}
*/

export default BarsChart