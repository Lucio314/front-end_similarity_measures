//npm i recharts
import React from 'react';
import {PieChart, Pie, ResponsiveContainer, Tooltip, Sector} from 'recharts'
import type { TooltipContentProps, PieSectorShapeProps } from 'recharts'

const COLORS =[
    '#ff2828',
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
    dataset: JSON; //Pour l'instant JSON, à voir si modif
    isAnimationActive: boolean;
}

function PiesChart({dataset, isAnimationActive = true } : PiesChartProps){ 
  return (
    <div className="pie-chart-div">
      <h3 className="h3-title">Distribution des activités</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
          <Pie
            datakey=""
            data={dataset}
            cx="50%"
            cy="50%"
            fill=""
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <Tooltip content={CustomToolTip}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
    )
}

function CustomToolTip({active, payload} : TooltipContentProps){
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
}

export default PiesChart