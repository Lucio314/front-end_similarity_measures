// SequenceOverview: horizontal preview of the built pattern.
// Visibility managed by PatternPage (rendered only when pattern.length > 0).

import type { PatternActivitiesProps } from '../../types';
import PatternRepr from '../../components/PatternRepr';

interface SequenceOverviewProps {
  pattern: PatternActivitiesProps[];
  colorMap: Record<string, string>;
}

function SequenceOverview({ pattern, colorMap }: SequenceOverviewProps) {
  return (
    <div className="border rounded p-3" style={{ borderColor: '#9c86ec', backgroundColor: '#fafafa' }}>
      <h5 style={{ color: '#272727', fontSize: 14 }}>Pattern Preview</h5>
      <div className="d-flex flex-wrap align-items-center gap-1 p-2">
        {pattern.map((activity, i) => (
          <div key={activity.id} className="d-flex align-items-center gap-1">
            <PatternRepr
              name={activity.name}
              duration={activity.duration}
              color={colorMap[activity.name] ?? '#f3f2fd'}
            />
            {i !== pattern.length - 1 && (
              <span className="text-secondary fs-5">&#8594;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SequenceOverview;
