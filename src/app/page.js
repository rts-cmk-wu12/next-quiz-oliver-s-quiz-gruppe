"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState("5");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())

      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleStartQuiz = (event) => {
    event.preventDefault();
    router.push(`/quiz/${category}/${difficulty}/${amount}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 py-25 px-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-emerald-800 tracking-tight">Oliver's Quiz App</h1>
        <form onSubmit={handleStartQuiz} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-emerald-700 text-lg font-medium">Select Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-transparent transition-all duration-300">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-emerald-700 text-lg font-medium">Select Difficulty</label>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-transparent transition-all duration-300">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-emerald-700 text-lg font-medium">Number of Questions</label>
            <select
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-transparent transition-all duration-300">
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 focus:outline-none focus:ring-4 focus:ring-emerald-300">
            Start Quiz Adventure
          </button>
        </form>
      </div>
    </div>
  );
}
