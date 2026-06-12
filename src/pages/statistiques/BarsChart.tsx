<<<<<<< HEAD
//npm i recharts
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import type { DataStatsProps } from '../../types';
import type { BarShapeProps, TooltipIndex } from 'recharts';
=======
// BarsChart: activity distribution bar chart ordered by DFS ontology traversal.
// Colors derived from ontology hierarchy.
// Interactive ontology filter: click any node to show only its leaf activities.
// Pie chart removed per supervisor feedback.

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { getOntology } from '../../api';
import type { OntologyNode } from '../../api';
import type { DataStatsProps } from '../../types';
import { buildOntologyColorMap, dfsLeaves } from '../../types';
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a

interface BarsChartProps {
  dataset: DataStatsProps[];
}

<<<<<<< HEAD
const COLORS =[
    'rgb(255, 0, 0)', 
    'rgb(254, 0, 233)',
    'rgb(255, 66, 129)',
    'rgb(163, 111, 14)',
    'rgb(221, 206, 72)',
    'rgb(191, 255, 40)',
    'rgb(110, 255, 66)',
    'rgb(0, 196, 159)',
    'rgb(13, 116, 148)',
    'rgb(47, 28, 223)'
]

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}
  L${x + width},${y + height}
  L${x + width},${y}
  L${x},${y}
  Z`;
};

const RectBar = (props: BarShapeProps) => {
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
          <Bar dataKey="value" fill="#8884d8" shape={RectBar}/>
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
=======
// Returns all non-leaf nodes in DFS order (for the filter panel)
function dfsInternalNodes(node: OntologyNode, depth = 0): { node: OntologyNode; depth: number }[] {
  const hasChildren = node.children && node.children.length > 0;
  const result: { node: OntologyNode; depth: number }[] = [];
  if (hasChildren) {
    result.push({ node, depth });
    for (const child of node.children!) {
      result.push(...dfsInternalNodes(child, depth + 1));
    }
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a
  }
  return result;
}

// Returns leaf names under a given node
function leavesUnder(node: OntologyNode): string[] {
  if (!node.children || node.children.length === 0) return [node.name];
  return node.children.flatMap(leavesUnder);
}

// Custom tooltip for the bar chart
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border rounded p-2 shadow-sm" style={{ backgroundColor: '#fff', fontSize: 12 }}>
      <strong>{label}</strong>
      <div>Count: <strong>{payload[0].value}</strong></div>
    </div>
  );
}

function BarsChart({ dataset }: BarsChartProps) {
  const [ontology, setOntology]           = useState<OntologyNode | null>(null);
  const [colorMap, setColorMap]           = useState<Record<string, string>>({});
  const [dfsOrder, setDfsOrder]           = useState<string[]>([]);
  const [selectedNode, setSelectedNode]   = useState<OntologyNode | null>(null);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    getOntology()
      .then(tree => {
        setOntology(tree);
        setColorMap(buildOntologyColorMap(tree));
        setDfsOrder(dfsLeaves(tree));
      })
      .catch(() => {
        // Fallback: use distribution order, no colors
        setDfsOrder(dataset.map(d => d.name));
      })
      .finally(() => setLoading(false));
  }, []);

  // Build a lookup from name -> count
  const countByName: Record<string, number> = {};
  for (const d of dataset) countByName[d.name] = d.value;

  // Which leaves to show: all or just those under selectedNode
  const activeLeaves = selectedNode ? leavesUnder(selectedNode) : dfsOrder;

  // Build sorted, filtered chart data
  const chartData = activeLeaves
    .filter(name => countByName[name] !== undefined)
    .map(name => ({ name, value: countByName[name] }));

  // All internal nodes for the filter panel
  const filterNodes = ontology ? dfsInternalNodes(ontology) : [];

  return (
    <div className="border rounded p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Activity Distribution</h6>
        <span className="text-muted" style={{ fontSize: 12 }}>
          Ordered by ontology DFS &bull; colored by hierarchy
        </span>
      </div>

      {loading ? (
        <div className="text-center py-3">
          <div className="spinner-border spinner-border-sm text-primary" role="status" />
        </div>
      ) : (
        <div className="row g-3">
          {/* Ontology filter panel */}
          {filterNodes.length > 0 && (
            <div className="col-md-3">
              <div className="border rounded p-2" style={{ backgroundColor: '#fafafa' }}>
                <p className="text-muted mb-2" style={{ fontSize: 11 }}>Filter by concept:</p>

                {/* "All" reset button */}
                <button
                  className="btn btn-sm w-100 mb-1 text-start"
                  style={{
                    fontSize: 12,
                    backgroundColor: !selectedNode ? '#4f46e5' : 'transparent',
                    color: !selectedNode ? '#fff' : '#334155',
                    border: '1px solid',
                    borderColor: !selectedNode ? '#4f46e5' : '#e2e8f0',
                  }}
                  onClick={() => setSelectedNode(null)}
                >
                  All activities
                </button>

                {filterNodes.map(({ node, depth }) => {
                  const isSelected = selectedNode?.name === node.name;
                  const bg = colorMap[node.name] ?? '#e0e7ff';
                  return (
                    <button
                      key={node.name}
                      className="btn btn-sm w-100 mb-1 text-start text-capitalize"
                      style={{
                        fontSize: 12,
                        paddingLeft: 8 + depth * 12,
                        backgroundColor: isSelected ? bg : 'transparent',
                        color: isSelected ? '#1e293b' : '#475569',
                        border: '1px solid',
                        borderColor: isSelected ? bg : '#e2e8f0',
                        fontWeight: isSelected ? 600 : 400,
                      }}
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                    >
                      {depth > 0 && (
                        <span style={{ color: '#94a3b8', marginRight: 4 }}>{'└'.padStart(depth * 2)}</span>
                      )}
                      {node.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bar chart */}
          <div className={filterNodes.length > 0 ? 'col-md-9' : 'col-12'}>
            {chartData.length === 0 ? (
              <p className="text-muted text-center py-4" style={{ fontSize: 13 }}>
                No activities in this dataset match the selected concept.
              </p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 11 }} width={35} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={colorMap[entry.name] ?? '#818cf8'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Color legend */}
                {selectedNode && (
                  <p className="text-muted mt-1 text-center" style={{ fontSize: 11 }}>
                    Showing {chartData.length} activit{chartData.length > 1 ? 'ies' : 'y'} under &quot;{selectedNode.name}&quot;
                    {' '}&mdash;{' '}
                    <button
                      className="btn btn-link p-0 font-weight-medium "
                      onClick={() => setSelectedNode(null)}
                    >
                      show all
                    </button>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BarsChart;
