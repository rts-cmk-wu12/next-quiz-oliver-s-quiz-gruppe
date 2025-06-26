"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const { category, difficulty, amount } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`, { cache: 'no-store' });
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const decoded = data.results.map((question) => ({
          ...question,
          question: decode(question.question),
          answers: shuffle([...question.incorrect_answers.map(decode), decode(question.correct_answer)]),
          correct_answer: decode(question.correct_answer),
        }));
        setQuestions(decoded);
      } else {
        setQuestions([]);
      }
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const decode = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    if (answer === questions[0].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (1 < questions.length) {
      questions.shift();
      setQuestions([...questions]);
    } else {
      router.push(`/result/${score + (answer === questions[0].correct_answer ? 1 : 0)}/${amount}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 flex items-center justify-center">
      <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-emerald-800 text-lg">Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center">
            <p className="text-emerald-800 text-lg mb-4">Too many users are using the API. Please refresh the site.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">Refresh
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-emerald-800">Question {amount - questions.length + 1} of {amount}</h2>
            <h3 className="text-xl text-center text-emerald-700 mb-8">{questions[0]?.question}</h3>
            <div className="space-y-4">
              {questions[0]?.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 focus:outline-none focus:ring-4 focus:ring-emerald-300">
                  {answer}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
