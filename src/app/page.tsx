"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* 1. Subtle Engineering Grid Background - Scaled for better density */}
      <div className="absolute inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)'
        }}>
      </div>

      {/* 2. Radial Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]"></div>

      {/* 3. Top Sharp Beam Glow - Softened for smaller screens */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[min(100vw,800px)] h-[400px] bg-white/[0.03] blur-[100px] rounded-full z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 w-full max-w-4xl mx-auto"
      >
        {/* Label - Responsive Font Size */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase"
        >
          System v1.0 • Placement Engine
        </motion.div>

        {/* Responsive Heading - Using clamp for perfect scaling */}
        <h1 className="text-[clamp(2rem,12vw,5rem)] font-black mb-6 tracking-tighter leading-[0.9] text-white">
          CODE.
          TEST.
          HIRED.
        </h1>

        {/* Responsive Paragraph - Better width and line height */}
        <p className="text-white/40 text-sm md:text-lg max-w-lg mx-auto mb-10 md:mb-12 font-light leading-relaxed tracking-wide px-4">
          An elite training ground for B.Tech graduates.
          Master technical rounds with precision-engineered assessments.
        </p>

        {/* Buttons - Mobile friendly sizing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:px-10 py-3.5 border border-white bg-transparent text-white font-bold rounded-full transition-all duration-300 uppercase text-[10px] md:text-xs tracking-[0.2em]"
            >
              Enter Dashboard
            </motion.button>
          </Link>

          <Link href="/about" className="text-white/30 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            System Specs
          </Link>
        </div>
      </motion.div>

      {/* 5. Animated Scanline Effect at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_0_15px_white]"
      />
    </div>
  );
}