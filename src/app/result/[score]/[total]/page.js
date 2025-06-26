"use client";

import { useParams, useRouter } from "next/navigation";

export default function ResultPage() {
  const { score, total } = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 py-16 px-6 flex items-center justify-center">
      <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-emerald-800 tracking-tight">Quiz completed!</h2>
        <p className="text-emerald-700 text-lg font-medium text-center mb-8">You got {score} out of {total} correct.</p>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 focus:outline-none focus:ring-4 focus:ring-emerald-300">
          Start new quiz
        </button>
      </div>
    </div>
  );
}
