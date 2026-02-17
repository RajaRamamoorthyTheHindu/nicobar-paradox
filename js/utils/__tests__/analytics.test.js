import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Replicate the analytics functions for testing
function createAnalytics() {
  return {
    trackEvent(eventName, eventParams) {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          ...eventParams,
          timestamp: new Date().toISOString()
        });
      }
    },
    trackGameStart() {
      this.trackEvent('game_start');
    },
    trackGameEnd(stats) {
      this.trackEvent('game_end', stats);
    },
    trackDecision(decision, effects) {
      this.trackEvent('game_decision', { decision, effects });
    },
    trackSpeciesView(species) {
      this.trackEvent('species_view', { species });
    }
  };
}

describe('analytics', () => {
  let analytics;
  let mockGtag;

  beforeEach(() => {
    mockGtag = vi.fn();
    globalThis.window = globalThis.window || {};
    window.gtag = mockGtag;
    analytics = createAnalytics();
  });

  afterEach(() => {
    delete window.gtag;
  });

  describe('trackEvent', () => {
    it('calls window.gtag when available', () => {
      analytics.trackEvent('test_event', { key: 'value' });
      expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', expect.objectContaining({
        key: 'value',
        timestamp: expect.any(String)
      }));
    });

    it('does not throw when window.gtag is undefined', () => {
      delete window.gtag;
      expect(() => analytics.trackEvent('test_event')).not.toThrow();
    });

    it('includes timestamp in every event', () => {
      analytics.trackEvent('test_event', {});
      const call = mockGtag.mock.calls[0];
      expect(call[2]).toHaveProperty('timestamp');
      expect(typeof call[2].timestamp).toBe('string');
    });
  });

  describe('trackGameStart', () => {
    it('sends game_start event', () => {
      analytics.trackGameStart();
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_start', expect.any(Object));
    });
  });

  describe('trackGameEnd', () => {
    it('sends game_end event with stats', () => {
      const stats = { turns: 5, social: 60, economic: 70, ecology: 50, budget: 30000 };
      analytics.trackGameEnd(stats);
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_end', expect.objectContaining(stats));
    });
  });

  describe('trackDecision', () => {
    it('sends game_decision event with decision name and effects', () => {
      analytics.trackDecision('Build Port', { social: -20, economic: 25 });
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_decision', expect.objectContaining({
        decision: 'Build Port',
        effects: { social: -20, economic: 25 }
      }));
    });
  });

  describe('trackSpeciesView', () => {
    it('sends species_view event with species name', () => {
      analytics.trackSpeciesView('Nicobar Megapode');
      expect(mockGtag).toHaveBeenCalledWith('event', 'species_view', expect.objectContaining({
        species: 'Nicobar Megapode'
      }));
    });
  });
});
