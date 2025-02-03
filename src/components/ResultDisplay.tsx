import React from 'react';
import { ResultChart } from './ResultChart';

interface ResultDisplayProps {
  result: number | null;
  error: string | null;
  matrix: number[][] | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, matrix }) => {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (result !== null && matrix !== null) {
    return (
      <>
        <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-primary-800 mb-2">Result</h2>
          <p className="text-4xl font-bold text-primary-600">
            {result.toFixed(4)}
          </p>
        </div>
        <ResultChart result={result} matrix={matrix} />
      </>
    );
  }

  return null;
};