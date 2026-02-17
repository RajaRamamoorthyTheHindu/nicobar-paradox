/**
 * Application entry point.
 * Initializes analytics, registers global error handlers, and bootstraps
 * all page components with CDN availability checks and error boundaries.
 * @module main
 */
import { initAnalytics } from './utils/analytics.js';
import { logError, renderFallback, isCDNAvailable } from './utils/errorHandler.js';
import { Hero } from './components/Hero.js';
import { Game } from './components/Game.js';
import { Timeline } from './components/Timeline.js';
import { MapComponent } from './components/Map.js';
import { Gallery } from './components/Gallery.js';

// Global error handlers
window.addEventListener('error', (event) => {
  logError('Global', event.error || new Error(event.message));
});
window.addEventListener('unhandledrejection', (event) => {
  logError('UnhandledPromise', event.reason);
});

// Initialize Google Analytics
initAnalytics();

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hero — no external dependencies
  try {
    if (document.querySelector('.hero')) {
      new Hero();
    }
  } catch (error) {
    logError('Hero', error);
  }

  // Game — requires Phaser CDN
  const gameContainer = document.getElementById('game-canvas');
  if (gameContainer) {
    if (!isCDNAvailable('Phaser')) {
      logError('Game', new Error('Phaser library not loaded from CDN'));
      renderFallback(gameContainer, 'Game Simulation',
        'The game engine (Phaser) could not be loaded. Please check your internet connection and try refreshing.');
    } else {
      try {
        new Game();
      } catch (error) {
        logError('Game', error);
        renderFallback(gameContainer, 'Game Simulation');
      }
    }
  }

  // Timeline — no external dependencies
  const timelineContainer = document.querySelector('.timeline-container');
  if (timelineContainer) {
    try {
      new Timeline();
    } catch (error) {
      logError('Timeline', error);
      renderFallback(timelineContainer, 'Timeline');
    }
  }

  // Map — requires Mapbox CDN
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    if (!isCDNAvailable('mapboxgl')) {
      logError('Map', new Error('Mapbox GL JS not loaded from CDN'));
      renderFallback(mapContainer, 'Interactive Map',
        'The map library (Mapbox) could not be loaded. Please check your internet connection and try refreshing.');
    } else {
      try {
        new MapComponent();
      } catch (error) {
        logError('Map', error);
        renderFallback(mapContainer, 'Interactive Map');
      }
    }
  }

  // Gallery — no external dependencies
  if (document.getElementById('endangered-species')) {
    try {
      new Gallery();
    } catch (error) {
      logError('Gallery', error);
      const speciesGrid = document.querySelector('.species-grid');
      renderFallback(speciesGrid, 'Species Gallery');
    }
  }
});
