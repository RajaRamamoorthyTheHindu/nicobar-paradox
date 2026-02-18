/**
 * Pure game logic functions for the decision simulation.
 * Handles stat calculations, game-over detection, and end-game messaging.
 * @module gameLogic
 */
import { GAME_CONSTANTS } from '../constants/gameConstants.js';

// Pure game logic functions — no Phaser dependency, easily testable
export const gameLogic = {
  /**
   * Apply a decision's effects to the current game stats.
   * Returns a new stats object without mutating the original.
   * @param {import('../constants/gameConstants.js').GameStats} stats - Current game stats.
   * @param {import('../constants/gameConstants.js').Decision} decision - The decision to apply.
   * @returns {import('../constants/gameConstants.js').GameStats} Updated stats with effects applied and values clamped.
   */
  applyDecision(stats, decision) {
    const newStats = { ...stats };
    newStats.budget -= decision.cost;
    Object.entries(decision.effects).forEach(([stat, value]) => {
      newStats[stat] = Math.max(0, Math.min(100, newStats[stat] + value));
    });
    return newStats;
  },

  /**
   * Check whether the game should end based on current conditions.
   * @param {import('../constants/gameConstants.js').GameStats} stats - Current game stats.
   * @param {number} turn - Current turn number.
   * @param {number} maxTurns - Maximum number of turns allowed.
   * @returns {{isOver: boolean, reason: string|null}} Game-over status and reason.
   */
  checkGameOver(stats, turn, maxTurns) {
    const threshold = GAME_CONSTANTS.DEFEAT_THRESHOLD;

    if (stats.social <= threshold) {
      return { isOver: true, reason: 'social' };
    }
    if (stats.ecology <= threshold) {
      return { isOver: true, reason: 'ecology' };
    }
    if (stats.economic <= threshold) {
      return { isOver: true, reason: 'economic' };
    }
    if (stats.budget <= 0) {
      return { isOver: true, reason: 'budget' };
    }
    if (turn > maxTurns) {
      return { isOver: true, reason: 'turns' };
    }
    return { isOver: false, reason: null };
  },

  /**
   * Get the end-game narrative message for a given game-over reason.
   * @param {string} reason - The reason the game ended (social, ecology, economic, budget, turns).
   * @returns {string} A narrative description of the outcome.
   */
  getEndMessage(reason) {
    const messages = {
      social: 'The communities here were never part of the plan. No allocation of funds changes whose land this is.',
      ecology: 'You cannot build a deep-water port in a primary rainforest without destroying it. There was no version where this didn\'t happen.',
      economic: 'The numbers were never meant to add up for the people who live here.',
      budget: 'The costs were always underestimated. That was not an accident.',
      turns: 'The project timeline was fixed before the first public consultation was held.'
    };
    return messages[reason] || 'The outcome was determined before the first decision was made.';
  },

  /**
   * Check if the current budget can cover a decision's cost.
   * @param {number} budget - Current budget in crores.
   * @param {number} cost - Cost of the decision in crores.
   * @returns {boolean} True if budget >= cost.
   */
  canAfford(budget, cost) {
    return budget >= cost;
  },

  /**
   * Clamp a stat value to the valid 0-100 range.
   * @param {number} value - The value to clamp.
   * @returns {number} The clamped value.
   */
  clampStat(value) {
    return Math.max(0, Math.min(100, value));
  }
};
