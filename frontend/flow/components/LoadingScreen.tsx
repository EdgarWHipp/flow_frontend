import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const FadeLoadingScreen = ({ isVisible }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible 
          ? 'bg-white backdrop-blur-2xl' 
          : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
    >
      <div className={`flex flex-col items-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <span className="font-instrument-serif text-4xl font-bold mb-4">flow</span>
        <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
      </div>
    </div>
  );
};

export default FadeLoadingScreen;