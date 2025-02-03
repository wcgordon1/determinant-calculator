import React, { useState } from 'react';
import { det } from 'mathjs';
import { MatrixInput } from './MatrixInput';
import { ResultDisplay } from './ResultDisplay';

export const DeterminantCalculator: React.FC = () => {
  const [size, setSize] = useState(2);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentMatrix, setCurrentMatrix] = useState<number[][] | null>(null);

  const calculateDeterminant = (matrix: number[][]) => {
    try {
      const determinant = det(matrix);
      setResult(determinant);
      setCurrentMatrix(matrix);
      setError(null);
    } catch (err) {
      setError('Error calculating determinant. Please check your input.');
      setResult(null);
      setCurrentMatrix(null);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setCurrentMatrix(null);
  };

  const generateIdentityMatrix = () => {
    const matrix = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => i === j ? 1 : 0)
    );
    calculateDeterminant(matrix);
  };

  const generateUpperTriangularMatrix = () => {
    const matrix = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => {
        if (j >= i) {
          // Generate random number for upper triangle and diagonal
          return Math.floor(Math.random() * 9) + 1; // 1 to 9
        }
        return 0; // Below diagonal
      })
    );
    calculateDeterminant(matrix);
  };

  const generateLowerTriangularMatrix = () => {
    const matrix = Array(size).fill(0).map((_, i) =>
      Array(size).fill(0).map((_, j) => {
        if (j <= i) {
          // Generate random number for lower triangle and diagonal
          return Math.floor(Math.random() * 9) + 1; // 1 to 9
        }
        return 0; // Above diagonal
      })
    );
    calculateDeterminant(matrix);
  };

  const generateRandomMatrix = () => {
    const matrix = Array(size).fill(0).map(() =>
      Array(size).fill(0).map(() => Math.floor(Math.random() * 10) - 5)
    );
    calculateDeterminant(matrix);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-800">
        Matrix Determinant Calculator
      </h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Matrix Size
        </label>
        <select
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full p-2 border-2 border-primary-200 rounded-lg focus:border-primary-500 focus:outline-none"
        >
          <option value={2}>2x2</option>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={generateIdentityMatrix}
          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Identity Matrix
        </button>
        <button
          onClick={generateUpperTriangularMatrix}
          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Upper Triangular
        </button>
        <button
          onClick={generateLowerTriangularMatrix}
          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Lower Triangular
        </button>
        <button
          onClick={generateRandomMatrix}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Random Matrix
        </button>
      </div>

      <MatrixInput
        size={size}
        onCalculate={calculateDeterminant}
        onReset={handleReset}
        currentMatrix={currentMatrix}
      />

      {(result !== null || error) && (
        <ResultDisplay result={result} error={error} matrix={currentMatrix} />
      )}
    </div>
  );
};