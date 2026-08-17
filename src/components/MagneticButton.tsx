import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  variant = 'primary',
  disabled,
  onClick,
  type = 'button',
  title,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles =
        'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-500/20 border border-purple-400/30';
      break;
    case 'secondary':
      variantStyles =
        'bg-slate-200/80 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-800 dark:text-slate-100 border border-slate-300/50 dark:border-white/10';
      break;
    case 'outline':
      variantStyles =
        'border border-slate-300 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200';
      break;
    case 'ghost':
      variantStyles =
        'bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300';
      break;
    case 'danger':
      variantStyles =
        'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20';
      break;
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${variantStyles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
