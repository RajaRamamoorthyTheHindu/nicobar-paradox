/**
 * Google Analytics wrapper for tracking user engagement events.
 * @module analytics
 */
import { CONFIG } from '../config.js';

/**
 * Initialize Google Analytics by dynamically loading the gtag script.
 * Called once from the application entry point.
 */
export function initAnalytics() {
  const id = CONFIG.GA_ID;
  if (!id) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
}

/**
 * Analytics event tracking wrapper.
 * All methods are safe to call even when gtag is not loaded.
 * @namespace gameAnalytics
 */
export const gameAnalytics = {
  /**
   * Track a custom analytics event.
   * @param {string} eventName - Name of the event.
   * @param {Object} [eventParams={}] - Additional event parameters.
   */
  trackEvent: (eventName, eventParams = {}) => {
    try {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', eventName, {
          ...eventParams,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.warn('[Analytics] Failed to track event:', eventName, error);
    }
  },

  /** Track the start of a new game session. */
  trackGameStart: () => {
    gameAnalytics.trackEvent('game_start');
  },

  /**
   * Track the end of a game session with final stats.
   * @param {Object} stats - Final game statistics.
   */
  trackGameEnd: (stats) => {
    gameAnalytics.trackEvent('game_end', stats);
  },

  /**
   * Track a player decision during the game.
   * @param {string} decision - The decision text.
   * @param {Object} effects - The decision's effects on metrics.
   */
  trackDecision: (decision, effects) => {
    gameAnalytics.trackEvent('game_decision', { decision, effects });
  },

  /**
   * Track when a user views species details.
   * @param {string} species - Name of the species viewed.
   */
  trackSpeciesView: (species) => {
    gameAnalytics.trackEvent('species_view', { species });
  }
};
