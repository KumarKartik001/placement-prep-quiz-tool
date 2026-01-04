"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import questionsData from '../../data/questions.json';
import { Question } from '../../types';

export default function Dashboard() {
    const [userStats, setUserStats] = useState<any>({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('prep-stats') || '{}');
        setUserStats(data);
    }, []);

    const questions = questionsData as Question[];
    const topicsMap = questions.reduce((acc, curr) => {
        acc[curr.topic] = (acc[curr.topic] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topics = Object.keys(topicsMap);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">

            {/* 1. Subtle Engineering Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-16">

                {/* HEADER SECTION */}
                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Modules</h2>
                        <p className="text-white/40 text-sm font-medium tracking-widest uppercase mt-1">Select Assessment Path</p>
                    </motion.div>

                    <Link href="/" className="group flex items-center gap-2 text-white/40 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Terminal
                    </Link>
                </nav>

                {/* TOPICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {topics.map((topic, index) => {
                        const stats = userStats[topic];
                        const accuracy = stats ? Math.round((stats.bestScore / stats.totalQuestions) * 100) : 0;

                        return (
                            <motion.div
                                key={topic}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/quiz/${encodeURIComponent(topic)}`}>
                                    <div className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:bg-white/[0.07] hover:border-white/30 overflow-hidden">

                                        {/* Glowing Accent on Hover */}
                                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />

                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center text-white/80 font-mono text-xl group-hover:border-white group-hover:text-white transition-all">
                                                {topic.substring(0, 1).toUpperCase()}
                                            </div>
                                            {stats && (
                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Score</p>
                                                    <p className="text-white font-black text-xl font-mono">{accuracy}%</p>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-black mb-1 tracking-tight relative z-10">{topic}</h3>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8 relative z-10">
                                            {topicsMap[topic]} Data Points
                                        </p>

                                        {/* Minimalist Progress Bar */}
                                        <div className="relative z-10 w-full bg-white/5 h-[2px] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${accuracy}%` }}
                                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                            />
                                        </div>

                                        <div className="mt-8 flex items-center justify-between relative z-10">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                                                {stats ? `${stats.attempts} Recorded` : 'No Entry'}
                                            </span>
                                            <div className="text-white/40 group-hover:text-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* SYSTEM FOOTER */}
                <footer className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Core Assessment Module v1.0.4</p>
                    {/* <div className="flex gap-6">
                        <button
                            onClick={() => { if (confirm('Clear local data?')) { localStorage.clear(); window.location.reload(); } }}
                            className="text-white/20 hover:text-red-500/50 transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
                        >
                            Purge Cache
                        </button>
                    </div> */}
                </footer>
            </div>
        </div>
    );
}