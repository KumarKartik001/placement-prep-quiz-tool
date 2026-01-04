"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
    const features = [
        { title: "Precision Engine", desc: "Algorithmic assessment of technical core competencies for B.Tech graduates." },
        { title: "Zero Latency", desc: "Optimized for high-speed terminal-like performance on any network condition." },
        { title: "Deep Analytics", desc: "Post-assessment reports providing granular insights into your strengths." },
        { title: "Obsidian Logic", desc: "A minimal, high-contrast interface designed for maximum focus and zero eye-strain." }
    ];

    return (
        <div className="fixed inset-0 bg-black text-white z-[9999] overflow-y-auto overflow-x-hidden selection:bg-white/20">

            {/* 1. Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-24">

                {/* Navigation Header */}
                <nav className="flex justify-between items-center mb-20">
                    <Link href="/" className="group flex items-center gap-2 text-white/30 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
                    </Link>
                    <div className="h-[1px] w-12 bg-white/10"></div>
                </nav>

                {/* 2. Hero Section */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-6 block">System Documentation</span>
                        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tighter leading-[0.9] uppercase mb-8">
                            The Next Gen<br />Training Ground.
                        </h1>
                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                            Built specifically for the modern B.Tech ecosystem. Our mission is to bridge the gap between academic theory and technical interview precision through a high-performance terminal experience.
                        </p>
                    </motion.div>
                </section>

                {/* 3. Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-32 overflow-hidden rounded-3xl">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-black p-10 md:p-14 group hover:bg-white/[0.02] transition-colors"
                        >
                            <h3 className="text-emerald-500 font-mono text-xs mb-4">0{i + 1}.</h3>
                            <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* 4. Tech Stack Section */}
                <section className="border-t border-white/5 pt-20 mb-32 text-center">
                    <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">Core Architecture</h2>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        <div className="font-black text-xl md:text-2xl tracking-tighter italic">NEXT.JS</div>
                        <div className="font-black text-xl md:text-2xl tracking-tighter italic">TAILWIND</div>
                        <div className="font-black text-xl md:text-2xl tracking-tighter italic">FRAMER</div>
                        <div className="font-black text-xl md:text-2xl tracking-tighter italic">TYPESCRIPT</div>
                    </div>
                </section>

                {/* 5. Contact/CTA Section */}
                <section className="bg-white/5 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden border border-white/10">
                    <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[200%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 uppercase tracking-tighter">Ready to initiate?</h2>
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 bg-white text-black font-black rounded-full uppercase text-xs tracking-widest relative z-10"
                        >
                            Access Dashboard
                        </motion.button>
                    </Link>
                </section>

                {/* Visual Padding for bottom */}
                <div className="h-32"></div>
            </div>
        </div>
    );
}