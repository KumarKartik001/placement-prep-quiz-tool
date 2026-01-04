// "use client";
// import { useState, useEffect } from 'react';
// import questions from '../data/questions.json';

// // Define a type for our history
// type Attempt = {
//   question: string;
//   userAnswer: string;
//   correctAnswer: string;
//   isCorrect: boolean;
// };

// export default function PlacementApp() {
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [quizQuestions, setQuizQuestions] = useState<any[]>([]); // To store shuffled questions
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(30);

//   // NEW: Track history for Review Mode
//   const [history, setHistory] = useState<Attempt[]>([]);

//   const allTopics = Array.from(new Set(questions.map(q => q.topic)));

//   // SHUFFLE LOGIC: When a topic is selected
//   const startQuiz = (topic: string) => {
//     const filtered = questions.filter(q => q.topic === topic);
//     // Shuffle the array
//     const shuffled = [...filtered].sort(() => Math.random() - 0.5);
//     setQuizQuestions(shuffled);
//     setSelectedTopic(topic);
//     setHistory([]); // Reset history
//   };

//   useEffect(() => {
//     if (!selectedTopic || selectedAnswer || showScore) return;
//     if (timeLeft === 0) {
//       handleAnswerClick("TIMEOUT");
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, selectedAnswer, showScore, selectedTopic]);

//   const handleAnswerClick = (option: string) => {
//     if (selectedAnswer) return;

//     const currentQ = quizQuestions[currentQuestion];
//     const isCorrect = option === currentQ.answer;

//     setSelectedAnswer(option);
//     if (isCorrect) setScore(prev => prev + 1);

//     // Save to history
//     setHistory(prev => [...prev, {
//       question: currentQ.question,
//       userAnswer: option,
//       correctAnswer: currentQ.answer,
//       isCorrect: isCorrect
//     }]);
//   };

//   const handleNext = () => {
//     if (currentQuestion + 1 < quizQuestions.length) {
//       setCurrentQuestion(prev => prev + 1);
//       setSelectedAnswer(null);
//       setTimeLeft(30);
//     } else {
//       setShowScore(true);
//     }
//   };

//   const resetAll = () => {
//     setSelectedTopic(null);
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false);
//     setSelectedAnswer(null);
//     setTimeLeft(30);
//     setQuizQuestions([]);
//   };

//   // --- DASHBOARD VIEW ---
//   if (!selectedTopic) {
//     return (
//       <main className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
//         <h1 className="text-4xl font-black text-slate-900 mb-2 mt-10">Prep Tracker</h1>
//         <p className="text-slate-500 mb-10 text-center">Master your B.Tech fundamentals</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
//           {allTopics.map((topic) => (
//             <button
//               key={topic}
//               onClick={() => startQuiz(topic)}
//               className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all text-left flex justify-between items-center group"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-slate-800">{topic}</h3>
//                 <p className="text-slate-400 text-sm">Practice Mode</p>
//               </div>
//               <span className="text-blue-500 font-bold group-hover:translate-x-1 transition-transform">→</span>
//             </button>
//           ))}
//         </div>
//       </main>
//     );
//   }

//   // --- RESULT & REVIEW VIEW ---
//   if (showScore) {
//     return (
//       <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
//         <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 mb-6">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold">Quiz Summary</h2>
//             <div className="text-5xl font-black text-blue-600 my-4">{score} / {quizQuestions.length}</div>
//           </div>

//           <h3 className="text-xl font-bold mb-4 border-b pb-2">Review Your Answers</h3>
//           <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//             {history.map((item, index) => (
//               <div key={index} className={`p-4 rounded-xl border ${item.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
//                 <p className="font-bold text-slate-800 mb-1">{index + 1}. {item.question}</p>
//                 <p className={`text-sm ${item.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
//                   Your Answer: {item.userAnswer}
//                 </p>
//                 {!item.isCorrect && (
//                   <p className="text-sm text-slate-600 font-medium">Correct Answer: {item.correctAnswer}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button onClick={resetAll} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-bold">
//             Back to Dashboard
//           </button>
//         </div>
//       </main>
//     );
//   }

//   // --- QUIZ VIEW (Keep your previous Quiz UI here) ---
//   return (
//     <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
//         {/* Progress Bar */}
//         <div className="h-2 w-full bg-slate-100">
//           <div className="h-full bg-blue-500 transition-all duration-500"
//             style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
//         </div>

//         <div className="p-8 md:p-12">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <button onClick={resetAll} className="text-slate-400 hover:text-red-500 font-bold text-sm uppercase tracking-tighter">✕ Quit</button>
//             <div className={`font-mono font-bold text-xl px-4 py-1 rounded-full ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
//               {timeLeft}s
//             </div>
//           </div>

//           {/* Question */}
//           <h1 className="text-2xl font-bold text-slate-800 mb-8">
//             {quizQuestions[currentQuestion].question}
//           </h1>

//           {/* Options */}
//           <div className="grid grid-cols-1 gap-3">
//             {quizQuestions[currentQuestion].options.map((option: string, index: number) => {
//               const isCorrect = option === quizQuestions[currentQuestion].answer;
//               const isSelected = selectedAnswer === option;
//               let style = "w-full p-4 text-left rounded-xl border-2 transition-all font-semibold ";

//               if (!selectedAnswer) style += "border-slate-100 hover:border-blue-500 hover:bg-blue-50";
//               else if (isCorrect) style += "border-green-500 bg-green-50 text-green-700";
//               else if (isSelected) style += "border-red-500 bg-red-50 text-red-700";
//               else style += "border-slate-50 text-slate-300";

//               return (
//                 <button key={index} disabled={!!selectedAnswer} onClick={() => handleAnswerClick(option)} className={style}>
//                   {option}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Next Button */}
//           <div className="mt-8">
//             {selectedAnswer && (
//               <button onClick={handleNext} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100">
//                 {currentQuestion === quizQuestions.length - 1 ? "Finish & Review" : "Continue"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }





// src/app/page.tsx
import Link from 'next/link';
import questionsData from '../data/questions.json';
import { Question } from '../types';

export default function Dashboard() {
  // Get unique topics and count questions for each
  const topicsMap = (questionsData as Question[]).reduce((acc, curr) => {
    acc[curr.topic] = (acc[curr.topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topics = Object.keys(topicsMap);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900">Placement Portal</h1>
          <p className="text-slate-500 mt-2 font-medium">Select a module to begin your assessment.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/quiz/${encodeURIComponent(topic)}`}
              className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="text-xl font-bold uppercase">{topic.substring(0, 2)}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                  {topicsMap[topic]} Questions
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {topic}
              </h2>
              <p className="text-slate-400 mt-2 text-sm">Practice technical MCQs and core concepts.</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}