"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Attempt } from '../types';

interface Props {
    score: number;
    total: number;
    history: Attempt[];
    topic: string;
}

export default function ReviewMode({ score, total, history, topic }: Props) {
    const percentage = Math.round((score / total) * 100);

    return (
        /* BYPASS CONTAINER: fixed inset-0 to ignore any external py-10 or margins */
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center z-[9999] overflow-y-auto overflow-x-hidden selection:bg-white/20">

            {/* Engineering Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '35px 35px'
                }}>
            </div>

            <div className="relative z-10 w-full max-w-3xl px-6 py-12 md:py-20 flex flex-col items-center">

                {/* 1. Performance Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[20px] font-black text-white/80 uppercase tracking-[0.4em] mb-4 block">Assessment Concluded</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">
                        {percentage}% <span className="text-white/80 not-italic tracking-normal text-3xl md:text-5xl">Accuracy</span>
                    </h1>
                    <div className="flex items-center justify-center gap-8 text-[15px] font-bold uppercase tracking-widest text-white/50">
                        <p>Score: <span className="text-white font-mono">{score}/{total}</span></p>
                        <p>Subject: <span className="text-white">{topic}</span></p>
                    </div>
                </motion.div>

                {/* 2. Detailed History Logs */}
                <div className="w-full space-y-4 mb-20">
                    <h3 className="text-[15px] font-black uppercase tracking-[0.3em] text-white/90 mb-6 px-2">Detailed Log Report</h3>
                    {history.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 transition-all hover:bg-white/[0.04]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-sm md:text-base font-bold text-white/90 leading-relaxed">
                                    <span className="text-white/20 font-mono mr-2">{idx + 1}.</span> {item.question}
                                </p>
                                {item.isCorrect ? (
                                    <span className="shrink-0 text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase">Pass</span>
                                ) : (
                                    <span className="shrink-0 text-[9px] font-black text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 uppercase">Fail</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Your Input</p>
                                    <p className={`text-xs font-bold ${item.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.userAnswer === "TIMEOUT" ? "SESSION EXPIRED" : item.userAnswer}
                                    </p>
                                </div>
                                {!item.isCorrect && (
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Correct Answer</p>
                                        <p className="text-xs font-bold text-white/70">{item.correctAnswer}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Action Navigation */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-xs px-4">
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-white text-black font-black rounded-full shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all uppercase text-[10px] tracking-widest"
                        >
                            Back to Dashboard
                        </motion.button>
                    </Link>
                </div>

                {/* Visual Separator Footer */}
                <div className="h-24 w-full"></div>
            </div>
        </div>
    );
}