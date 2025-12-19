import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  glow?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = true, 
  className = '', 
  disabled,
  ...props 
}) => {
  // Explicitly manage disabled styling to ensure it works across all interaction modes
  const baseStyles = "px-6 py-3 font-display font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group";
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none grayscale shadow-none" 
    : "";
  
  const variants = {
    primary: `bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black ${glow && !disabled ? 'shadow-[0_0_10px_rgba(0,240,255,0.4)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]' : ''}`,
    secondary: `bg-neon-brown/50 border border-stone-600 text-stone-300 hover:border-neon-blue hover:text-white`,
    danger: `bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-black ${glow && !disabled ? 'shadow-[0_0_10px_rgba(255,0,60,0.4)] hover:shadow-[0_0_20px_rgba(255,0,60,0.8)]' : ''}`,
    success: `bg-transparent border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black ${glow && !disabled ? 'shadow-[0_0_10px_rgba(10,255,10,0.4)] hover:shadow-[0_0_20px_rgba(10,255,10,0.8)]' : ''}`,
  };

  return (
    <motion.button 
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
    </motion.button>
  );
};

export const NeonCard: React.FC<{ children: React.ReactNode; className?: string; accent?: 'blue' | 'red' | 'green' }> = ({ 
  children, 
  className = '',
  accent = 'blue'
}) => {
  const accentColors = {
    blue: 'border-neon-blue/30 hover:border-neon-blue shadow-[0_0_5px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    red: 'border-neon-red/30 hover:border-neon-red shadow-[0_0_5px_rgba(255,0,60,0.1)] hover:shadow-[0_0_15px_rgba(255,0,60,0.3)]',
    green: 'border-neon-green/30 hover:border-neon-green shadow-[0_0_5px_rgba(10,255,10,0.1)] hover:shadow-[0_0_15px_rgba(10,255,10,0.3)]',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-black/80 backdrop-blur-md border ${accentColors[accent]} p-6 rounded-lg relative overflow-hidden group ${className}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${accent === 'blue' ? 'neon-blue' : accent === 'red' ? 'neon-red' : 'neon-green'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      {children}
    </motion.div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'alert' | 'info' }> = ({ children, variant = 'info' }) => {
  const styles = {
    success: 'text-neon-green border-neon-green/50 bg-neon-green/10',
    alert: 'text-neon-red border-neon-red/50 bg-neon-red/10',
    info: 'text-neon-blue border-neon-blue/50 bg-neon-blue/10',
  };

  return (
    <span className={`px-2 py-1 text-xs font-mono border rounded ${styles[variant]} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}>
      {children}
    </span>
  );
};