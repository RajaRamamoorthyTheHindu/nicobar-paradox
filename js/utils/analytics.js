// Make analytics functions globally available
window.gameAnalytics = {
  trackEvent: (eventName, eventParams = {}) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString()
      });
    }
  },

  trackGameStart: () => {
    window.gameAnalytics.trackEvent('game_start');
  },

  trackGameEnd: (stats) => {
    window.gameAnalytics.trackEvent('game_end', stats);
  },

  trackDecision: (decision, effects) => {
    window.gameAnalytics.trackEvent('game_decision', { decision, effects });
  },

  trackSpeciesView: (species) => {
    window.gameAnalytics.trackEvent('species_view', { species });
  }
};