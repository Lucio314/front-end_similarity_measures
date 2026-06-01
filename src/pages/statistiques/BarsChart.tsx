//npm i recharts
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import type { DataStatsProps } from '../../types';
import type { BarShapeProps, TooltipIndex } from 'recharts';

interface BarsChartProps {
    dataset : DataStatsProps[]; //Pour l'instant JSON, à voir si modif
    defaultIndex? : TooltipIndex;
}

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

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}
  L${x + width},${y + height}
  L${x + width},${y}
  L${x},${y}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const {x, y, width, height, index} = props;

  const color = COLORS[index % COLORS.length];

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      style={{
        transition: 'stroke-width 0.3s ease-out',
      }}
    />
  );
};

function BarsChart({dataset, defaultIndex = undefined} : BarsChartProps){
  return (
    <div className="border rounded d-flex flex-column align-items-center">
      <h5 className="fw-bold mb-1">Répartition des activités</h5>
        <BarChart 
          width={900}
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
          <Bar dataKey="value" fill="#8884d8" shape={TriangleBar}/>
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