import React, { useEffect } from 'react';
import Phaser from 'phaser';
import GameScene from './GameScene';
import { useInView } from 'react-intersection-observer';

const GameComponent: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: 1024, // Increased width for better spacing
        height: 768, // Increased height for better spacing
        backgroundColor: '#ffffff',
        scene: GameScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: 'game-container',
        }
      };

      const game = new Phaser.Game(config);

      const resizeGame = () => {
        const container = document.getElementById('game-container');
        if (container) {
          const canvas = container.querySelector('canvas');
          if (canvas) {
            const maxWidth = Math.min(container.clientWidth, 1024);
            const maxHeight = Math.min(container.clientHeight, 768);
            const scale = Math.min(
              maxWidth / 1024,
              maxHeight / 768
            );
            
            canvas.style.width = `${1024 * scale}px`;
            canvas.style.height = `${768 * scale}px`;
            canvas.style.margin = 'auto';
          }
        }
      };

      window.addEventListener('resize', resizeGame);
      resizeGame();

      return () => {
        window.removeEventListener('resize', resizeGame);
        game.destroy(true);
      };
    }
  }, [inView]);

  return (
    <section id="game-section" className="min-h-screen bg-white py-24">
      <div 
        ref={ref}
        className={`container mx-auto px-4 opacity-0 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Great Nicobar Paradox
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take control of the ₹81,800 crore development project. Can you balance progress with preservation?
          </p>
        </div>

        <div className="max-w-6xl mx-auto"> {/* Increased max-width */}
          <div 
            id="game-container" 
            className="bg-white rounded-lg overflow-hidden shadow-2xl w-full"
            style={{
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              maxWidth: '1024px' // Match game width
            }}
          />
          
          <div className="mt-12 p-8 space-y-8 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B7080D]" />
                  Manage your ₹81,800 crore budget wisely
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B7080D]" />
                  Balance environmental impact with development needs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B7080D]" />
                  Maintain public approval through community engagement
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B7080D]" />
                  Make strategic decisions that shape Great Nicobar's future
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Victory Conditions</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                  Keep all metrics (Social, Economic, Environmental) above 50%
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                  Complete all 10 turns while maintaining balance
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                  Stay within your allocated budget
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Game Controls</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8E44AD]" />
                  Click decision buttons to take actions
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8E44AD]" />
                  Hover over buttons to see detailed effects
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8E44AD]" />
                  Monitor your progress through status bars
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8E44AD]" />
                  Watch for crisis events that may disrupt your plans
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameComponent;