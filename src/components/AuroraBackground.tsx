import { motion } from 'motion/react';

interface AuroraBackgroundProps {
  isDark: boolean;
}

export default function AuroraBackground({ isDark }: AuroraBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700">
      {/* Base Canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[#09090b]'
            : 'bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100'
        }`}
      />

      {/* Floating Aurora Mesh Orbs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-[10%] left-[10%] w-[32rem] h-[32rem] rounded-full blur-[100px] opacity-40 ${
          isDark
            ? 'bg-[#4c1d95]'
            : 'bg-gradient-to-tr from-indigo-300/50 via-purple-300/40 to-pink-300/30'
        }`}
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -70, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute bottom-[10%] right-[10%] w-[36rem] h-[36rem] rounded-full blur-[120px] opacity-40 ${
          isDark
            ? 'bg-[#0c4a6e]'
            : 'bg-gradient-to-br from-cyan-200/60 via-blue-200/50 to-teal-200/40'
        }`}
      />

      <motion.div
        animate={{
          x: [0, 50, -60, 0],
          y: [0, 70, -40, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-[110px] opacity-30 ${
          isDark
            ? 'bg-violet-900/40'
            : 'bg-gradient-to-bl from-purple-200/50 via-indigo-200/40 to-violet-200/30'
        }`}
      />

      {/* Subtle Noise / Grid Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.03] ${
          isDark ? 'bg-[radial-gradient(#fff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000_1px,transparent_1px)]'
        } [background-size:24px_24px]`}
      />
    </div>
  );
}
