import type { GameStats } from '../types';

export const trackEvent = (
  eventName: string,
  eventParams?: { [key: string]: any }
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackGameStart = () => {
  trackEvent('game_start', {
    timestamp: new Date().toISOString()
  });
};

export const trackGameEnd = (stats: {
  turns: number;
  social: number;
  economic: number;
  ecology: number;
  budget: number;
  endReason: string;
  duration: number;
}) => {
  trackEvent('game_end', {
    ...stats,
    timestamp: new Date().toISOString()
  });
};

export const trackGameReplay = (previousStats: {
  turns: number;
  social: number;
  economic: number;
  ecology: number;
  budget: number;
  endReason: string;
  duration: number;
}) => {
  trackEvent('game_replay', {
    ...previousStats,
    timestamp: new Date().toISOString()
  });
};

export const trackDecision = (
  decision: string,
  effects: Partial<GameStats>
) => {
  trackEvent('game_decision', {
    decision,
    effects,
    timestamp: new Date().toISOString()
  });
};

export const trackSpeciesView = (species: string) => {
  trackEvent('species_view', {
    species,
    timestamp: new Date().toISOString()
  });
};