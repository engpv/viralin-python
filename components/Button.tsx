
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md brand-font flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-400 to-red-400 text-white hover:shadow-lg hover:-translate-y-1",
    secondary: "bg-white border-2 border-orange-300 text-orange-500 hover:bg-orange-50",
    success: "bg-gradient-to-r from-emerald-400 to-green-500 text-white hover:shadow-lg hover:-translate-y-1",
    ghost: "text-gray-400 hover:text-orange-500 font-medium"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
      ) : children}
    </button>
  );
};
