import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ResultChartProps {
  result: number;
  matrix: number[][];
}

export const ResultChart: React.FC<ResultChartProps> = ({ result, matrix }) => {
  const calculateSteps = (matrix: number[][]) => {
    const size = matrix.length;
    
    if (size === 2) {
      const a = matrix[0][0];
      const b = matrix[0][1];
      const c = matrix[1][0];
      const d = matrix[1][1];
      
      const step1 = a * d;
      const step2 = b * c;
      
      return {
        labels: ['Step 1', 'Step 2', 'Final'],
        data: [step1, -step2, result],
        descriptions: [
          `Multiply main diagonal (a × d): ${a} × ${d} = ${step1}`,
          `Subtract secondary diagonal (b × c): ${b} × ${c} = ${step2}`,
          `Final determinant: ${step1} - ${step2} = ${result}`
        ],
        details: [
          'For a 2×2 matrix, multiply elements along the main diagonal',
          'Subtract the product of elements along the secondary diagonal',
          'The difference gives us our determinant'
        ]
      };
    }
    
    if (size === 3) {
      const [
        [a, b, c],
        [d, e, f],
        [g, h, i]
      ] = matrix;
      
      const minor1 = e * i - f * h;
      const minor2 = d * i - f * g;
      const minor3 = d * h - e * g;
      
      const term1 = a * minor1;
      const term2 = -b * minor2;
      const term3 = c * minor3;
      
      return {
        labels: ['Minor 1', 'Minor 2', 'Minor 3', 'Final'],
        data: [term1, term2, term3, result],
        descriptions: [
          `Minor1 (ei-fh): (${e}×${i}) - (${f}×${h}) = ${minor1}\nTerm1 = ${a} × ${minor1} = ${term1}`,
          `Minor2 (di-fg): (${d}×${i}) - (${f}×${g}) = ${minor2}\nTerm2 = -${b} × ${minor2} = ${term2}`,
          `Minor3 (dh-eg): (${d}×${h}) - (${e}×${g}) = ${minor3}\nTerm3 = ${c} × ${minor3} = ${term3}`,
          `Sum of terms: ${term1} + ${term2} + ${term3} = ${result}`
        ],
        details: [
          `First minor calculation:\n• ${e}×${i} = ${e*i}\n• ${f}×${h} = ${f*h}\n• Minor1 = ${minor1}`,
          `Second minor calculation:\n• ${d}×${i} = ${d*i}\n• ${f}×${g} = ${f*g}\n• Minor2 = ${minor2}`,
          `Third minor calculation:\n• ${d}×${h} = ${d*h}\n• ${e}×${g} = ${e*g}\n• Minor3 = ${minor3}`,
          'Final determinant calculation'
        ]
      };
    }
    
    if (size === 4) {
      const getMinor = (row: number, col: number) => {
        const minor = matrix
          .filter((_, index) => index !== row)
          .map(r => r.filter((_, index) => index !== col));
        return det3x3(minor);
      };
      
      const cofactors = matrix[0].map((element, j) => {
        const sign = j % 2 === 0 ? 1 : -1;
        const minor = getMinor(0, j);
        const term = sign * element * minor;
        return {
          element,
          sign,
          minor,
          term
        };
      });
      
      return {
        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4', 'Final'],
        data: [...cofactors.map(c => c.term), result],
        descriptions: cofactors.map((c, i) => 
          `Element: ${c.element}\nMinor${i + 1}: ${c.minor}\nSign: ${c.sign > 0 ? '+' : '-'}\nTerm = ${c.sign > 0 ? '' : '-'}${c.element} × ${c.minor} = ${c.term}`
        ).concat(`Final sum = ${result}`),
        details: cofactors.map((c, i) => {
          const submatrix = matrix
            .filter((_, idx) => idx !== 0)
            .map(row => row.filter((_, idx) => idx !== i))
            .map(row => row.join(' '))
            .join('\n');
          return `Minor matrix ${i + 1}:\n${submatrix}\nCalculated minor: ${c.minor}`;
        }).concat(['Sum all terms for final determinant'])
      };
    }
    
    return {
      labels: ['Final'],
      data: [result],
      descriptions: ['Final determinant'],
      details: ['Calculated determinant value']
    };
  };

  // Helper function for 3x3 determinant calculation
  const det3x3 = (matrix: number[][]) => {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  const steps = calculateSteps(matrix);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Determinant Calculation Steps',
        color: '#5b21b6',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => steps.descriptions[context.dataIndex].split('\n')
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const data = {
    labels: steps.labels,
    datasets: [
      {
        data: steps.data,
        backgroundColor: steps.data.map((value, index) => 
          index === steps.data.length - 1
            ? 'rgba(124, 58, 237, 0.8)'
            : 'rgba(124, 58, 237, 0.4)'
        ),
        borderColor: steps.data.map((value, index) => 
          index === steps.data.length - 1
            ? 'rgb(124, 58, 237)'
            : 'rgb(124, 58, 237, 0.6)'
        ),
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
      <Bar options={options} data={data} />
      <div className="mt-4 space-y-4">
        {steps.descriptions.map((desc, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-primary-700 mb-2">
              {steps.labels[index]}
            </div>
            <div className="text-gray-600 whitespace-pre-line">{desc}</div>
            <div className="text-gray-500 text-xs mt-2 whitespace-pre-line">{steps.details[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};