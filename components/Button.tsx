import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 group font-body";

  const variants = {
    primary: "bg-fire text-white hover:bg-texasRed shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(139,0,0,0.8)] border border-transparent hover:animate-pulse",
    outline: "bg-transparent text-fire border-2 border-fire hover:bg-fire hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(139,0,0,0.6)] hover:animate-pulse",
    text: "bg-transparent text-cream hover:text-fire px-0 py-2",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </motion.button>
  );
};