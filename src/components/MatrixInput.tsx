import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface MatrixInputProps {
  size: number;
  onCalculate: (matrix: number[][]) => void;
  onReset: () => void;
  currentMatrix: number[][] | null;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({ size, onCalculate, onReset, currentMatrix }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (currentMatrix) {
      // Update form values when currentMatrix changes
      currentMatrix.forEach((row, i) => {
        row.forEach((value, j) => {
          setValue(`${i}-${j}`, value.toString());
        });
      });
    }
  }, [currentMatrix, setValue]);

  const onSubmit = (data: any) => {
    const matrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = parseFloat(data[`${i}-${j}`]);
      }
    }
    onCalculate(matrix);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(
          <div key={`${i}-${j}`} className="p-1">
            <input
              {...register(`${i}-${j}`, {
                required: 'Required',
                pattern: {
                  value: /^-?\d*\.?\d*$/,
                  message: 'Must be a number'
                }
              })}
              type="text"
              placeholder="0"
              className="w-16 h-16 text-center border-2 border-primary-200 rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>
        );
      }
      inputs.push(
        <div key={i} className="flex justify-center">
          {row}
        </div>
      );
    }
    return inputs;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        {renderInputs()}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Calculate Determinant
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
};