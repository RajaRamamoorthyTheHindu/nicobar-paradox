import React from 'react';
import Hero from './components/Hero';
import GameComponent from './components/Game/GameComponent';
import Timeline from './components/Timeline/Timeline';
import MapComponent from './components/Map/MapComponent';
import GalleryComponent from './components/Gallery/GalleryComponent';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <GameComponent />
      <Timeline />
      <MapComponent />
      <GalleryComponent />
    </div>
  );
}

export default App;