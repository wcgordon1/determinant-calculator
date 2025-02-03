import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ShuffledQuestion extends Omit<Question, 'options' | 'correctAnswer'> {
  options: string[];
  originalOrder: number[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the determinant of a 2x2 identity matrix?",
    options: ["0", "1", "2", "-1"],
    correctAnswer: 1,
    explanation: "The identity matrix has 1s on the main diagonal and 0s elsewhere. For a 2x2 matrix, det([[1,0],[0,1]]) = 1×1 - 0×0 = 1",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "If a matrix has a determinant of 0, what does this indicate?",
    options: [
      "The matrix is invertible",
      "The matrix is singular (non-invertible)",
      "The matrix is symmetric",
      "The matrix is diagonal"
    ],
    correctAnswer: 1,
    explanation: "A determinant of 0 means the matrix is singular (non-invertible), indicating that the matrix equations have either no solution or infinitely many solutions.",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "What is the relationship between the determinant of a matrix and its inverse?",
    options: [
      "det(A⁻¹) = det(A)",
      "det(A⁻¹) = -det(A)",
      "det(A⁻¹) = 1/det(A)",
      "det(A⁻¹) = det(A)²"
    ],
    correctAnswer: 2,
    explanation: "The determinant of the inverse of a matrix is equal to the reciprocal of the original matrix's determinant: det(A⁻¹) = 1/det(A)",
    difficulty: 'medium'
  },
  {
    id: 4,
    question: "For a 3x3 matrix, what does each term in the cofactor expansion represent?",
    options: [
      "The sum of the diagonal elements",
      "The product of the row elements",
      "The product of an element and its minor determinant",
      "The trace of the matrix"
    ],
    correctAnswer: 2,
    explanation: "In cofactor expansion, each term is the product of a matrix element and its minor determinant (with appropriate sign), representing that element's contribution to the total determinant.",
    difficulty: 'hard'
  },
  {
    id: 5,
    question: "What happens to the determinant when you multiply a matrix by a scalar k?",
    options: [
      "det(kA) = k×det(A)",
      "det(kA) = k²×det(A)",
      "det(kA) = k³×det(A)",
      "det(kA) = k^n×det(A) where n is matrix size"
    ],
    correctAnswer: 3,
    explanation: "When multiplying an n×n matrix by a scalar k, the determinant is multiplied by k^n. For example, for a 3×3 matrix, det(kA) = k³×det(A)",
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "What is the determinant of a triangular matrix?",
    options: [
      "Sum of diagonal elements",
      "Product of diagonal elements",
      "Zero",
      "One"
    ],
    correctAnswer: 1,
    explanation: "The determinant of a triangular matrix (either upper or lower) is the product of its diagonal elements.",
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "How does row swapping affect the determinant?",
    options: [
      "No change",
      "Changes sign",
      "Doubles the value",
      "Halves the value"
    ],
    correctAnswer: 1,
    explanation: "Swapping any two rows of a matrix changes the sign of its determinant. This is why odd permutations contribute negative terms to the determinant formula.",
    difficulty: 'easy'
  },
  {
    id: 8,
    question: "What is the relationship between eigenvalues and determinant?",
    options: [
      "Their sum equals the determinant",
      "Their product equals the determinant",
      "No direct relationship",
      "They are always equal"
    ],
    correctAnswer: 1,
    explanation: "The determinant of a matrix equals the product of its eigenvalues. This is a fundamental relationship in linear algebra.",
    difficulty: 'hard'
  },
  {
    id: 9,
    question: "In geometric terms, what does the determinant represent for a 2×2 matrix?",
    options: [
      "Perimeter of parallelogram",
      "Area of parallelogram",
      "Diagonal length",
      "Angle between vectors"
    ],
    correctAnswer: 1,
    explanation: "The absolute value of the determinant of a 2×2 matrix represents the area of the parallelogram formed by the column vectors of the matrix.",
    difficulty: 'medium'
  },
  {
    id: 10,
    question: "What is Cramer's Rule used for?",
    options: [
      "Finding eigenvalues",
      "Computing matrix inverse",
      "Solving linear equations",
      "Calculating matrix rank"
    ],
    correctAnswer: 2,
    explanation: "Cramer's Rule uses determinants to solve systems of linear equations by expressing each variable as a ratio of determinants.",
    difficulty: 'hard'
  }
];

const shuffleArray = <T,>(array: T[]): [T[], number[]] => {
  const shuffled = [...array];
  const originalOrder = array.map((_, index) => index);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    [originalOrder[i], originalOrder[j]] = [originalOrder[j], originalOrder[i]];
  }
  
  return [shuffled, originalOrder];
};

export const Quiz: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<{[key: number]: number}>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle questions and their options
    const shuffled = [...questions].sort(() => Math.random() - 0.5).map(question => {
      const [shuffledOptions, originalOrder] = shuffleArray(question.options);
      // Map the correct answer to its new position
      const newCorrectAnswer = originalOrder.findIndex(i => i === question.correctAnswer);
      
      return {
        ...question,
        options: shuffledOptions,
        originalOrder,
        correctAnswer: newCorrectAnswer
      };
    });
    
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(currentAnswers).forEach(([questionId, answer]) => {
      const question = shuffledQuestions.find(q => q.id === parseInt(questionId));
      if (question && question.correctAnswer === answer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    if (Object.keys(currentAnswers).length === questions.length) {
      const score = calculateScore();
      // Store both the shuffled questions and the original order for the results page
      localStorage.setItem('quizResults', JSON.stringify({
        answers: currentAnswers,
        questions: shuffledQuestions,
        score
      }));
      window.location.href = '/quiz/results';
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-800 mb-8">Matrix Mathematics Quiz</h1>
      <div className="space-y-8">
        {shuffledQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                {question.difficulty}
              </span>
              <span className="text-gray-500">Question {index + 1}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center p-3 rounded-lg border-2 cursor-pointer hover:bg-primary-50 transition-colors">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={currentAnswers[question.id] === optionIndex}
                    onChange={() => handleAnswer(question.id, optionIndex)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};