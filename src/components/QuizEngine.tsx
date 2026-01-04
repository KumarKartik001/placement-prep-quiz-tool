"use client";
import { useState, useEffect } from 'react';
import { Question, Attempt } from '../types';
import ReviewMode from './ReviewMode';

interface Props {
    questions: Question[];
    topic: string;
}

export default function QuizEngine({ questions, topic }: Props) {
    // Shuffling questions once when component mounts
    const [quizData] = useState(() => [...questions].sort(() => Math.random() - 0.5));

    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState<Attempt[]>([]);

    // Timer Logic
    useEffect(() => {
        if (showResult || selectedAnswer) return;
        if (timeLeft === 0) {
            handleAnswer("TIMEOUT");
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, selectedAnswer, showResult]);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;

        const currentQ = quizData[currentIdx];
        const isCorrect = answer === currentQ.answer;

        setSelectedAnswer(answer);
        if (isCorrect) setScore(s => s + 1);

        setHistory([...history, {
            question: currentQ.question,
            userAnswer: answer,
            correctAnswer: currentQ.answer,
            isCorrect
        }]);
    };

    const nextQuestion = () => {
        if (currentIdx + 1 < quizData.length) {
            setCurrentIdx(i => i + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return <ReviewMode score={score} total={quizData.length} history={history} topic={topic} />;
    }

    const currentQ = quizData[currentIdx];
    const progress = ((currentIdx + 1) / quizData.length) * 100;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100">
                <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                        {topic}
                    </h2>
                    <div className={`font-mono font-bold text-xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {timeLeft}s
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 leading-snug">
                    {currentQ.question}
                </h1>

                <div className="space-y-4">
                    {currentQ.options.map((option, idx) => {
                        const isCorrect = option === currentQ.answer;
                        const isSelected = selectedAnswer === option;

                        let btnClass = "w-full p-5 text-left rounded-2xl border-2 transition-all font-semibold text-lg flex justify-between items-center ";
                        if (!selectedAnswer) btnClass += "border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-700";
                        else if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-700 shadow-sm shadow-green-100";
                        else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-700";
                        else btnClass += "border-slate-50 text-slate-300";

                        return (
                            <button key={idx} disabled={!!selectedAnswer} onClick={() => handleAnswer(option)} className={btnClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 min-h-[60px]">
                    {selectedAnswer && (
                        <button onClick={nextQuestion} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
                            {currentIdx === quizData.length - 1 ? "Finish Assessment" : "Continue"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}