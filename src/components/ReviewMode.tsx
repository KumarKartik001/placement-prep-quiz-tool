"use client";
import { Attempt } from '../types';
import Link from 'next/link';

interface Props {
    score: number;
    total: number;
    history: Attempt[];
    topic: string;
}

export default function ReviewMode({ score, total, history, topic }: Props) {
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center mb-8 border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-400 uppercase tracking-widest mb-4">{topic} Result</h1>
                <div className="inline-block relative mb-6">
                    <span className="text-7xl font-black text-slate-900">{score}</span>
                    <span className="text-2xl font-bold text-slate-300"> / {total}</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full max-w-md mx-auto overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${percentage}%` }} />
                </div>
                <p className="mt-4 font-bold text-slate-500">{percentage}% Accuracy</p>
            </div>

            <div className="space-y-4 mb-10">
                <h3 className="text-xl font-bold text-slate-800 px-2">Detailed Review</h3>
                {history.map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl border-2 ${item.isCorrect ? 'bg-white border-green-100' : 'bg-white border-red-100'}`}>
                        <p className="font-bold text-slate-800 mb-3">{i + 1}. {item.question}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className={`px-3 py-1 rounded-lg font-bold ${item.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                Your: {item.userAnswer}
                            </span>
                            {!item.isCorrect && (
                                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold">
                                    Correct: {item.correctAnswer}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/" className="block w-full text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                Back to Dashboard
            </Link>
        </div>
    );
}