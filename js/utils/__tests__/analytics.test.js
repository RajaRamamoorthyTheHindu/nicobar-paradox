import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { gameAnalytics } from '../analytics.js';

describe('analytics', () => {
  let mockGtag;

  beforeEach(() => {
    mockGtag = vi.fn();
    globalThis.window = globalThis.window || {};
    window.gtag = mockGtag;
  });

  afterEach(() => {
    delete window.gtag;
  });

  describe('trackEvent', () => {
    it('calls window.gtag when available', () => {
      gameAnalytics.trackEvent('test_event', { key: 'value' });
      expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', expect.objectContaining({
        key: 'value',
        timestamp: expect.any(String)
      }));
    });

    it('does not throw when window.gtag is undefined', () => {
      delete window.gtag;
      expect(() => gameAnalytics.trackEvent('test_event')).not.toThrow();
    });

    it('includes timestamp in every event', () => {
      gameAnalytics.trackEvent('test_event', {});
      const call = mockGtag.mock.calls[0];
      expect(call[2]).toHaveProperty('timestamp');
      expect(typeof call[2].timestamp).toBe('string');
    });
  });

  describe('trackGameStart', () => {
    it('sends game_start event', () => {
      gameAnalytics.trackGameStart();
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_start', expect.any(Object));
    });
  });

  describe('trackGameEnd', () => {
    it('sends game_end event with stats', () => {
      const stats = { turns: 5, social: 60, economic: 70, ecology: 50, budget: 30000 };
      gameAnalytics.trackGameEnd(stats);
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_end', expect.objectContaining(stats));
    });
  });

  describe('trackDecision', () => {
    it('sends game_decision event with decision name and effects', () => {
      gameAnalytics.trackDecision('Build Port', { social: -20, economic: 25 });
      expect(mockGtag).toHaveBeenCalledWith('event', 'game_decision', expect.objectContaining({
        decision: 'Build Port',
        effects: { social: -20, economic: 25 }
      }));
    });
  });

  describe('trackSpeciesView', () => {
    it('sends species_view event with species name', () => {
      gameAnalytics.trackSpeciesView('Nicobar Megapode');
      expect(mockGtag).toHaveBeenCalledWith('event', 'species_view', expect.objectContaining({
        species: 'Nicobar Megapode'
      }));
    });
  });
});
