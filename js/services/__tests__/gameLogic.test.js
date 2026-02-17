import { describe, it, expect, beforeEach } from 'vitest';
import { gameLogic } from '../gameLogic.js';
import { GAME_CONSTANTS } from '../../constants/gameConstants.js';

describe('gameLogic', () => {
  let stats;

  beforeEach(() => {
    stats = { ...GAME_CONSTANTS.INITIAL_STATS };
  });

  describe('applyDecision', () => {
    const portDecision = {
      text: 'Build Port Infrastructure',
      cost: 15000,
      effects: { social: -20, economic: 25, ecology: -30 }
    };

    it('deducts cost from budget', () => {
      const result = gameLogic.applyDecision(stats, portDecision);
      expect(result.budget).toBe(81800 - 15000);
    });

    it('applies stat effects correctly', () => {
      const result = gameLogic.applyDecision(stats, portDecision);
      expect(result.social).toBe(80);
      expect(result.economic).toBe(100); // capped at 100
      expect(result.ecology).toBe(70);
    });

    it('clamps stats to 0-100 range', () => {
      stats.ecology = 10;
      const result = gameLogic.applyDecision(stats, portDecision);
      expect(result.ecology).toBe(0); // 10 - 30 = -20, clamped to 0
    });

    it('does not exceed 100', () => {
      stats.economic = 90;
      const result = gameLogic.applyDecision(stats, portDecision);
      expect(result.economic).toBe(100); // 90 + 25 = 115, clamped to 100
    });

    it('does not mutate original stats', () => {
      const original = { ...stats };
      gameLogic.applyDecision(stats, portDecision);
      expect(stats).toEqual(original);
    });
  });

  describe('checkGameOver', () => {
    it('returns false when all metrics are healthy', () => {
      const result = gameLogic.checkGameOver(stats, 1, 10);
      expect(result.isOver).toBe(false);
      expect(result.reason).toBeNull();
    });

    it('detects social collapse', () => {
      stats.social = 30;
      const result = gameLogic.checkGameOver(stats, 1, 10);
      expect(result.isOver).toBe(true);
      expect(result.reason).toBe('social');
    });

    it('detects ecological collapse', () => {
      stats.ecology = 25;
      const result = gameLogic.checkGameOver(stats, 1, 10);
      expect(result.isOver).toBe(true);
      expect(result.reason).toBe('ecology');
    });

    it('detects economic collapse', () => {
      stats.economic = 0;
      const result = gameLogic.checkGameOver(stats, 1, 10);
      expect(result.isOver).toBe(true);
      expect(result.reason).toBe('economic');
    });

    it('detects budget depletion', () => {
      stats.budget = 0;
      const result = gameLogic.checkGameOver(stats, 1, 10);
      expect(result.isOver).toBe(true);
      expect(result.reason).toBe('budget');
    });

    it('detects turn expiration', () => {
      const result = gameLogic.checkGameOver(stats, 11, 10);
      expect(result.isOver).toBe(true);
      expect(result.reason).toBe('turns');
    });

    it('does not trigger at threshold + 1', () => {
      stats.social = 31;
      stats.ecology = 31;
      stats.economic = 31;
      stats.budget = 1;
      const result = gameLogic.checkGameOver(stats, 10, 10);
      expect(result.isOver).toBe(false);
    });
  });

  describe('getEndMessage', () => {
    it('returns social collapse message', () => {
      const msg = gameLogic.getEndMessage('social');
      expect(msg).toContain('Social fabric');
    });

    it('returns ecology collapse message', () => {
      const msg = gameLogic.getEndMessage('ecology');
      expect(msg).toContain('Ecological collapse');
    });

    it('returns economic collapse message', () => {
      const msg = gameLogic.getEndMessage('economic');
      expect(msg).toContain('Economic promises');
    });

    it('returns budget depletion message', () => {
      const msg = gameLogic.getEndMessage('budget');
      expect(msg).toContain('Budget depleted');
    });

    it('returns turn expiration message', () => {
      const msg = gameLogic.getEndMessage('turns');
      expect(msg).toContain('Time runs out');
    });

    it('returns default message for unknown reason', () => {
      const msg = gameLogic.getEndMessage('unknown');
      expect(msg).toContain('precarious balance');
    });
  });

  describe('canAfford', () => {
    it('returns true when budget exceeds cost', () => {
      expect(gameLogic.canAfford(81800, 15000)).toBe(true);
    });

    it('returns true when budget equals cost', () => {
      expect(gameLogic.canAfford(15000, 15000)).toBe(true);
    });

    it('returns false when budget is less than cost', () => {
      expect(gameLogic.canAfford(10000, 15000)).toBe(false);
    });
  });

  describe('clampStat', () => {
    it('clamps negative values to 0', () => {
      expect(gameLogic.clampStat(-10)).toBe(0);
    });

    it('clamps values over 100 to 100', () => {
      expect(gameLogic.clampStat(150)).toBe(100);
    });

    it('passes through values in range', () => {
      expect(gameLogic.clampStat(50)).toBe(50);
    });

    it('handles boundary values', () => {
      expect(gameLogic.clampStat(0)).toBe(0);
      expect(gameLogic.clampStat(100)).toBe(100);
    });
  });
});
