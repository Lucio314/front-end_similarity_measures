//npm i recharts
import React from 'react';
import {PieChart, Pie, ResponsiveContainer, Tooltip} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools' //Pas besoin je pense

function PieChartDiv({dataset, isAnimationActive = true }/*: { isAnimationActive?: boolean }*/){ //Truc Typescript
  return (
    <div className="pie-chart-div">
      <p>Distribution des activités</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
          <Pie
            datakey=""
            data={dataset}
            cx="50%"
            cy="50%"
            fill=""
            isAnimationActive={isAnimationActive}
          />
          <Tooltip content={CustomToolTip}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
    )
}

function CustomToolTip({active, payload}){
  if(active && payload && payload.lenght){
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-sm text-blue-400">
          Nombre : 
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
      )
  }
}

export default PieChartDiv