import React, { useEffect, useState } from 'react';
import { Certificate } from './Certificate';

interface QuizResult {
  answers: {[key: number]: number};
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
  }>;
  score: number;
}

export const QuizResults: React.FC = () => {
  const [results, setResults] = useState<QuizResult | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-primary-800 mb-4">No Results Found</h1>
          <p className="text-gray-600">Please take the quiz first to see your results.</p>
          <a href="/quiz" className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Take Quiz
          </a>
        </div>
      </div>
    );
  }

  const percentage = (results.score / results.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-800 mb-4">Quiz Results</h1>
            <div className="text-2xl">
              Your Score: <span className="font-bold text-primary-600">{results.score}/{results.questions.length} ({percentage.toFixed(1)}%)</span>
            </div>
          </div>
          <div>
            {!showNameInput ? (
              <button
                onClick={() => setShowNameInput(true)}
                className="px-6 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
              >
                Print your Certificate
              </button>
            ) : (
              <div className="bg-primary-50 p-4 rounded-lg">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:outline-none mb-4"
                />
                {name && (
                  <Certificate
                    name={name}
                    score={results.score}
                    totalQuestions={results.questions.length}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-1000" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-8">
        {results.questions.map((question, index) => {
          const userAnswer = results.answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
                <span className="text-gray-500">Question {index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-lg border-2 ${
                      optionIndex === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : optionIndex === userAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-transparent'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-primary-800 mb-2">Explanation:</h4>
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/quiz"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Again
        </a>
      </div>
    </div>
  );
};