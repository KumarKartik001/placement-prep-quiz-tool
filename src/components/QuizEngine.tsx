"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Attempt } from '../types';
import ReviewMode from './ReviewMode';

interface Props {
    questions: Question[];
    topic: string;
}

export default function QuizEngine({ questions, topic }: Props) {
    const [quizData] = useState(() => [...questions].sort(() => Math.random() - 0.5));
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState<Attempt[]>([]);

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
        /* FIXED INSET-0: Ye line kisi bhi bahar wale container ya padding (py-10) ko ignore kar degi */
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 z-[9999] overflow-hidden">

            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)'
                }}>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-2xl z-10 flex flex-col gap-4 md:gap-6"
            >
                {/* Header Section */}
                <header className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div className="flex flex-col">
                        <span className="text-[clamp(9px,1vw,11px)] font-black text-white/30 uppercase tracking-[0.3em]">Project Path</span>
                        <h2 className="text-[clamp(1rem,2vw,1.3rem)] font-black uppercase tracking-tight text-white">{topic}</h2>
                    </div>
                    <div className="text-right">
                        <p className={`font-mono text-[clamp(1.2rem,2.5vw,1.8rem)] font-bold ${timeLeft < 10 ? 'text-emerald-500 animate-pulse' : 'text-white'}`}>
                            {timeLeft}s
                        </p>
                    </div>
                </header>

                {/* Main Card */}
                <div className="bg-[#050505] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative">
                    <div className="absolute top-0 left-0 h-[2px] bg-white/5 w-full">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_15px_white]"
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col gap-6"
                        >
                            <h1 className="text-[clamp(1rem,1.8vw,1.5rem)] font-bold text-white leading-snug">
                                {currentQ.question}
                            </h1>

                            <div className="grid grid-cols-1 gap-3">
                                {currentQ.options.map((option, idx) => {
                                    const isCorrect = option === currentQ.answer;
                                    const isSelected = selectedAnswer === option;

                                    return (
                                        <button
                                            key={idx}
                                            disabled={!!selectedAnswer}
                                            onClick={() => handleAnswer(option)}
                                            className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${!selectedAnswer
                                                ? "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 text-white/70"
                                                : isCorrect
                                                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                                    : isSelected
                                                        ? "border-red-500/50 bg-red-500/10 text-red-500"
                                                        : "border-white/5 opacity-20"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center text-sm md:text-base font-medium">
                                                <span>{option}</span>
                                                {/* {selectedAnswer && isCorrect && (
                                                    <span className="text-[9px] font-black text-emerald-500 uppercase">Verified</span>
                                                )} */}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 min-h-[48px]">
                        {selectedAnswer && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={nextQuestion}
                                className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-[0.2em] text-[15px]"
                            >
                                {currentIdx === quizData.length - 1 ? "Complete Attempt" : "Next Question →"}
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}