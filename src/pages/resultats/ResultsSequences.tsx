import type { ResultsOneResultProps } from '../../types';
import ResultsSeq from './ResultsSeq';

interface ResultsSequencesProps {
  results: ResultsOneResultProps[];
  colorMap?: Record<string, string>;
}

function ResultsSequences({ results, colorMap = {} }: ResultsSequencesProps) {
  return (
    <div>
      {results.map(seq => (
        <ResultsSeq key={seq.rank} sequence={seq} colorMap={colorMap} />
      ))}
    </div>
  );
}

export default ResultsSequences;
