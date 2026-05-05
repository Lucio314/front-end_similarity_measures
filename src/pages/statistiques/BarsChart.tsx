//npm i recharts
import React from 'react';
import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import type { TooltipContentProps } from 'recharts'

interface BarsChartProps {
    dataset : JSON; //Pour l'instant JSON, à voir si modif
}

function BarsChart({dataset} : BarsChartProps){
  return (
    <div className="bar-chart-div">
      <h3 className="h3-title">Répartition des activités</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          width={500}
          height={300}
          data={dataset}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis datakey=""/>
          <YAxis datakey=""/>
          <Tooltip content={<CustomToolTip/>}/>
          <Bar datakey="" fill=""/>
          <Bar datakey="" fill=""/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    )
}

function CustomToolTip({active, payload, label} : TooltipContentProps){
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

export default BarsChart