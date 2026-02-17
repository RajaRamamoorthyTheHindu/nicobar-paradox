// Pure game logic functions — no Phaser dependency, easily testable
window.gameLogic = {
  /**
   * Apply a decision's effects to current stats.
   * Returns a new stats object with clamped values.
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
   * Check if the game is over.
   * Returns { isOver: boolean, reason: string|null }
   */
  checkGameOver(stats, turn, maxTurns) {
    const threshold = window.GAME_CONSTANTS.DEFEAT_THRESHOLD;

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
   * Get the appropriate end message based on what triggered game over.
   */
  getEndMessage(reason) {
    const messages = {
      social: 'Social fabric torn apart. Communities scattered, traditions lost forever.',
      ecology: 'Ecological collapse. Ancient forests give way to concrete and steel.',
      economic: 'Economic promises unfulfilled. Development at any cost proves costly.',
      budget: 'Budget depleted. The price of progress exceeds all estimates.',
      turns: 'Time runs out. Progress marches on, leaving destruction in its wake.'
    };
    return messages[reason] || 'A precarious balance achieved, but at what cost to the island\'s soul?';
  },

  /**
   * Check if the player can afford a decision.
   */
  canAfford(budget, cost) {
    return budget >= cost;
  },

  /**
   * Clamp a stat value between 0 and 100.
   */
  clampStat(value) {
    return Math.max(0, Math.min(100, value));
  }
};
