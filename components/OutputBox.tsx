
import React, { useState } from 'react';
import { Button } from './Button';

interface OutputBoxProps {
  content: string;
  title: string;
  isLoading?: boolean;
}

export const OutputBox: React.FC<OutputBoxProps> = ({ content, title, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-orange-100 p-6 shadow-xl shadow-orange-100/50 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="brand-font text-red-400 font-bold text-lg">{title}</h3>
        <Button 
          variant="secondary" 
          onClick={handleCopy} 
          className="py-1.5 px-4 text-xs"
          disabled={!content || isLoading}
        >
          {copied ? "✨ Copied!" : "📋 Copy"}
        </Button>
      </div>
      
      <div className="relative group">
        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 pr-2">
          {content || (isLoading ? "Typing magic..." : "Waiting for prompt...")}
        </pre>
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};
