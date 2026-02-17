import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToGame = () => {
    document.getElementById('game-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4">
          The Great Nicobar Paradox
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
          Explore the story of Great Nicobar, where progress meets irreversible loss
        </p>
        <button
          onClick={scrollToGame}
          className="bg-white text-black px-8 py-3 rounded-full font-semibold 
                   hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
        >
          Start Experience
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;