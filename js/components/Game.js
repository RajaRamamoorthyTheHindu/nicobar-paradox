/**
 * DOM-based game simulation component for the decision-making experience.
 * Builds all UI as HTML elements, manages game state, player decisions,
 * and screen reader announcements.
 * @module Game
 */

import { GAME_CONSTANTS } from '../constants/gameConstants.js';
import { gameLogic } from '../services/gameLogic.js';
import { gameAnalytics } from '../utils/analytics.js';
import { logError, renderFallback } from '../utils/errorHandler.js';

const METRIC_LABELS = {
  social: 'Social Impact',
  economic: 'Economic Growth',
  ecology: 'Environmental Health'
};

/** @class Game - DOM-based decision simulation with budget management, metric tracking, and narrative feedback. */
export class Game {
  constructor() {
    this.container = document.getElementById('game-board');
    this.stats = { ...GAME_CONSTANTS.INITIAL_STATS };
    this.turn = 1;
    this.maxTurns = GAME_CONSTANTS.MAX_TURNS;
    this.gameOver = false;
    this.history = [];
    this.decisions = GAME_CONSTANTS.DECISIONS;
    this.elements = {};
    this._narrativeTimeout = null;

    this.init();
  }

  /** Initialize the game board and track game start. */
  init() {
    if (!this.container) {
      logError('Game.init', new Error('Game container #game-board not found'));
      return;
    }

    try {
      this.buildDOM();
      this.updateMetricBars();
      this.updateBudgetDisplay();
      this.observeSection();
      gameAnalytics.trackGameStart();
    } catch (error) {
      logError('Game.init', error);
      renderFallback(this.container, 'Game Simulation');
    }
  }

  /** Build the complete game UI DOM tree. */
  buildDOM() {
    this.container.innerHTML = '';

    this.container.appendChild(this.buildStatusStrip());
    this.container.appendChild(this.buildMetrics());
    this.container.appendChild(this.buildNarrative());
    this.container.appendChild(this.buildDecisions());
    this.container.appendChild(this.buildHistory());
    this.container.appendChild(this.buildEndstate());
  }

  /**
   * Build the status strip with turn counter and budget display.
   * @returns {HTMLElement}
   */
  buildStatusStrip() {
    const strip = document.createElement('div');
    strip.className = 'game-status-strip';

    const turnLabel = document.createElement('span');
    turnLabel.className = 'game-turn-label';
    turnLabel.textContent = `Turn ${this.turn} / ${this.maxTurns}`;
    this.elements.turnText = turnLabel;
    strip.appendChild(turnLabel);

    const budgetDisplay = document.createElement('div');
    budgetDisplay.className = 'game-budget-display';

    const budgetNumber = document.createElement('span');
    budgetNumber.className = 'game-budget-number';
    this.elements.budgetNumber = budgetNumber;
    this.elements.budgetDisplay = budgetDisplay;
    budgetDisplay.appendChild(budgetNumber);

    const budgetTrack = document.createElement('div');
    budgetTrack.className = 'game-budget-bar-track';
    const budgetFill = document.createElement('div');
    budgetFill.className = 'game-budget-bar-fill';
    budgetFill.style.width = '100%';
    this.elements.budgetBar = budgetFill;
    budgetTrack.appendChild(budgetFill);
    budgetDisplay.appendChild(budgetTrack);

    strip.appendChild(budgetDisplay);
    return strip;
  }

  /**
   * Build the three metric bar rows.
   * @returns {HTMLElement}
   */
  buildMetrics() {
    const metrics = document.createElement('div');
    metrics.className = 'game-metrics';
    this.elements.metricBars = {};
    this.elements.metricValues = {};
    this.elements.metricRows = {};

    ['social', 'economic', 'ecology'].forEach(stat => {
      const row = document.createElement('div');
      row.className = 'game-metric-row';
      row.setAttribute('role', 'meter');
      row.setAttribute('aria-label', METRIC_LABELS[stat]);
      row.setAttribute('aria-valuemin', '0');
      row.setAttribute('aria-valuemax', '100');
      row.setAttribute('aria-valuenow', '100');

      const label = document.createElement('span');
      label.className = 'game-metric-label';
      label.textContent = METRIC_LABELS[stat];
      row.appendChild(label);

      const track = document.createElement('div');
      track.className = 'game-metric-bar-track';
      const fill = document.createElement('div');
      fill.className = `game-metric-bar-fill game-metric-fill--${stat}`;
      fill.style.width = '100%';
      track.appendChild(fill);
      row.appendChild(track);

      const value = document.createElement('span');
      value.className = 'game-metric-value';
      value.textContent = '100%';
      row.appendChild(value);

      this.elements.metricBars[stat] = fill;
      this.elements.metricValues[stat] = value;
      this.elements.metricRows[stat] = row;
      metrics.appendChild(row);
    });

    return metrics;
  }

  /**
   * Build the narrative feedback area.
   * @returns {HTMLElement}
   */
  buildNarrative() {
    const narrative = document.createElement('div');
    narrative.className = 'game-narrative game-narrative--hidden';

    const text = document.createElement('p');
    text.className = 'game-narrative-text';
    narrative.appendChild(text);

    this.elements.narrative = narrative;
    this.elements.narrativeText = text;
    return narrative;
  }

  /**
   * Build the 2x2 decision card grid.
   * @returns {HTMLElement}
   */
  buildDecisions() {
    const grid = document.createElement('div');
    grid.className = 'game-decisions';

    this.decisions.forEach((decision, index) => {
      grid.appendChild(this.buildDecisionCard(decision, index));
    });

    this.elements.decisionsGrid = grid;
    return grid;
  }

  /**
   * Build a single decision card button.
   * @param {import('../constants/gameConstants.js').Decision} decision
   * @param {number} index
   * @returns {HTMLButtonElement}
   */
  buildDecisionCard(decision, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-decision-card';
    button.dataset.index = index;

    const title = document.createElement('span');
    title.className = 'game-decision-title';
    title.textContent = decision.text;
    button.appendChild(title);

    const cost = document.createElement('span');
    cost.className = 'game-decision-cost';
    cost.textContent = `\u20B9${decision.cost.toLocaleString()} Cr`;
    button.appendChild(cost);

    const impacts = document.createElement('div');
    impacts.className = 'game-decision-impacts';
    Object.entries(decision.effects).forEach(([stat, value]) => {
      const badge = document.createElement('span');
      const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
      badge.className = `game-impact-badge ${value > 0 ? 'game-impact--positive' : 'game-impact--negative'}`;
      badge.textContent = `${statName} ${value > 0 ? '+' : ''}${value}`;
      impacts.appendChild(badge);
    });
    button.appendChild(impacts);

    const desc = document.createElement('p');
    desc.className = 'game-decision-desc';
    desc.textContent = decision.description;
    button.appendChild(desc);

    // Accessibility
    const effectsText = Object.entries(decision.effects)
      .map(([stat, value]) => `${stat} ${value > 0 ? '+' : ''}${value}`)
      .join(', ');
    button.setAttribute('aria-label',
      `${decision.text}: costs ${decision.cost.toLocaleString()} crores. ${effectsText}`
    );

    button.addEventListener('click', () => this.makeDecision(decision));
    return button;
  }

  /**
   * Build the decision history list.
   * @returns {HTMLOListElement}
   */
  buildHistory() {
    const list = document.createElement('ol');
    list.className = 'game-history game-history--empty';
    list.setAttribute('aria-label', 'Decision history');
    this.elements.historyList = list;
    return list;
  }

  /**
   * Build the endstate container (hidden initially).
   * @returns {HTMLElement}
   */
  buildEndstate() {
    const endstate = document.createElement('div');
    endstate.className = 'game-endstate game-endstate--hidden';
    this.elements.endstate = endstate;
    return endstate;
  }

  /**
   * Process a player's decision.
   * @param {import('../constants/gameConstants.js').Decision} decision
   */
  makeDecision(decision) {
    if (this.gameOver) return;
    if (!gameLogic.canAfford(this.stats.budget, decision.cost)) return;

    try {
      this.stats = gameLogic.applyDecision(this.stats, decision);
      gameAnalytics.trackDecision(decision.text, decision.effects);

      this.history.push({
        turn: this.turn,
        text: decision.text,
        cost: decision.cost,
        message: decision.message,
        stats: { ...this.stats }
      });

      this.updateMetricBars();
      this.updateBudgetDisplay();
      this.showNarrative(decision.message);
      this.addHistoryEntry(this.history[this.history.length - 1]);

      this.turn++;
      this.elements.turnText.textContent = `Turn ${this.turn} / ${this.maxTurns}`;
      this.updateDecisionStates();
      this.announceGameState(decision);

      const result = gameLogic.checkGameOver(this.stats, this.turn, this.maxTurns);
      if (result.isOver) {
        this.endGame(result.reason);
      }
    } catch (error) {
      logError('Game.makeDecision', error);
    }
  }

  /** Update metric bar widths and warning/critical states. */
  updateMetricBars() {
    ['social', 'economic', 'ecology'].forEach(stat => {
      const value = Math.round(this.stats[stat]);
      const row = this.elements.metricRows[stat];
      const fill = this.elements.metricBars[stat];
      const valueEl = this.elements.metricValues[stat];

      fill.style.width = `${value}%`;
      valueEl.textContent = `${value}%`;
      row.setAttribute('aria-valuenow', String(value));

      row.classList.remove('game-metric--warning', 'game-metric--critical');
      if (value <= GAME_CONSTANTS.DEFEAT_THRESHOLD) {
        row.classList.add('game-metric--critical');
      } else if (value < GAME_CONSTANTS.VICTORY_THRESHOLD) {
        row.classList.add('game-metric--warning');
      }
    });
  }

  /** Update the budget number and bar. */
  updateBudgetDisplay() {
    const budget = this.stats.budget;
    this.elements.budgetNumber.textContent = `\u20B9${budget.toLocaleString()} Cr`;

    const pct = Math.max(0, (budget / GAME_CONSTANTS.INITIAL_STATS.budget) * 100);
    this.elements.budgetBar.style.width = `${pct}%`;

    if (budget < 20000) {
      this.elements.budgetDisplay.classList.add('game-budget--low');
    } else {
      this.elements.budgetDisplay.classList.remove('game-budget--low');
    }
  }

  /**
   * Show narrative feedback text with fade in/out.
   * @param {string} message
   */
  showNarrative(message) {
    clearTimeout(this._narrativeTimeout);
    this.elements.narrativeText.textContent = message;
    this.elements.narrative.classList.remove('game-narrative--hidden');

    this._narrativeTimeout = setTimeout(() => {
      this.elements.narrative.classList.add('game-narrative--hidden');
    }, 5000);
  }

  /**
   * Add a history entry to the list.
   * @param {{turn: number, text: string, cost: number}} record
   */
  addHistoryEntry(record) {
    this.elements.historyList.classList.remove('game-history--empty');

    const li = document.createElement('li');
    li.className = 'game-history-entry game-history-entry--new';

    const turnSpan = document.createElement('span');
    turnSpan.className = 'game-history-turn';
    turnSpan.textContent = `Turn ${record.turn}`;
    li.appendChild(turnSpan);

    const choiceSpan = document.createElement('span');
    choiceSpan.className = 'game-history-choice';
    choiceSpan.textContent = record.text;
    li.appendChild(choiceSpan);

    const costSpan = document.createElement('span');
    costSpan.className = 'game-history-cost';
    costSpan.textContent = `-\u20B9${record.cost.toLocaleString()}`;
    li.appendChild(costSpan);

    this.elements.historyList.prepend(li);

    setTimeout(() => li.classList.remove('game-history-entry--new'), 600);
  }

  /** Enable/disable decision buttons based on affordability. */
  updateDecisionStates() {
    const buttons = this.elements.decisionsGrid.querySelectorAll('.game-decision-card');
    buttons.forEach((button, i) => {
      const decision = this.decisions[i];
      const affordable = gameLogic.canAfford(this.stats.budget, decision.cost);
      button.disabled = !affordable;
      if (!affordable) {
        button.setAttribute('aria-disabled', 'true');
        button.classList.add('game-decision-card--disabled');
      } else {
        button.removeAttribute('aria-disabled');
        button.classList.remove('game-decision-card--disabled');
      }
    });
  }

  /**
   * End the game and show the endstate.
   * @param {string} reason
   */
  endGame(reason) {
    this.gameOver = true;

    const statusEl = document.getElementById('game-status');
    if (statusEl) {
      statusEl.textContent = 'Game over. ' + gameLogic.getEndMessage(reason);
    }

    // Fade out decisions
    this.elements.decisionsGrid.classList.add('game-decisions--exiting');
    this.elements.narrative.classList.add('game-narrative--hidden');
    clearTimeout(this._narrativeTimeout);

    setTimeout(() => {
      this.populateEndstate(reason);

      // Show endstate with fade-in
      const endstate = this.elements.endstate;
      endstate.classList.remove('game-endstate--hidden');
      // Force reflow for transition
      endstate.offsetHeight; // eslint-disable-line no-unused-expressions
      endstate.classList.add('game-endstate--visible');
      endstate.setAttribute('tabindex', '-1');
      endstate.focus();
    }, 400);

    gameAnalytics.trackGameEnd({
      turns: this.turn,
      social: this.stats.social,
      economic: this.stats.economic,
      ecology: this.stats.ecology,
      budget: this.stats.budget
    });
  }

  /**
   * Populate the endstate div with final results.
   * @param {string} reason
   */
  populateEndstate(reason) {
    const endstate = this.elements.endstate;
    endstate.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'game-endstate-title';
    title.textContent = 'FINAL RESULTS';
    endstate.appendChild(title);

    // Stats display
    const statsDiv = document.createElement('div');
    statsDiv.className = 'game-endstate-stats';

    // Budget stat
    const budgetStat = document.createElement('div');
    budgetStat.className = 'game-endstate-stat';
    const budgetLabel = document.createElement('span');
    budgetLabel.className = 'game-endstate-stat-label';
    budgetLabel.textContent = 'Final Budget';
    budgetStat.appendChild(budgetLabel);
    const budgetValue = document.createElement('span');
    budgetValue.className = 'game-endstate-stat-value';
    budgetValue.textContent = `\u20B9${this.stats.budget.toLocaleString()} Cr`;
    budgetStat.appendChild(budgetValue);
    statsDiv.appendChild(budgetStat);

    // Metric stats with mini bars
    ['social', 'economic', 'ecology'].forEach(stat => {
      const statDiv = document.createElement('div');
      statDiv.className = 'game-endstate-stat';

      const label = document.createElement('span');
      label.className = 'game-endstate-stat-label';
      label.textContent = METRIC_LABELS[stat];
      statDiv.appendChild(label);

      const value = document.createElement('span');
      value.className = 'game-endstate-stat-value';
      value.textContent = `${Math.round(this.stats[stat])}%`;
      statDiv.appendChild(value);

      const barDiv = document.createElement('div');
      barDiv.className = 'game-endstate-stat-bar';
      const barFill = document.createElement('div');
      barFill.className = `game-endstate-stat-bar-fill game-endstate-stat--${stat}`;
      barFill.style.width = '0%';
      barDiv.appendChild(barFill);
      statDiv.appendChild(barDiv);

      statsDiv.appendChild(statDiv);

      // Animate bar after append
      requestAnimationFrame(() => {
        barFill.style.width = `${Math.round(this.stats[stat])}%`;
      });
    });

    endstate.appendChild(statsDiv);

    // End message
    const message = document.createElement('p');
    message.className = 'game-endstate-message';
    message.textContent = gameLogic.getEndMessage(reason);
    endstate.appendChild(message);

    // Coda
    const coda = document.createElement('p');
    coda.className = 'game-endstate-coda';
    coda.innerHTML = 'There was no winning combination.<br>This was a simulation.<br>The destruction is real.';
    endstate.appendChild(coda);

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'game-endstate-actions';

    const playAgain = document.createElement('button');
    playAgain.type = 'button';
    playAgain.className = 'game-endstate-play-again';
    playAgain.textContent = 'Play Again';
    playAgain.addEventListener('click', () => this.resetGame());
    actions.appendChild(playAgain);

    const scrollLink = document.createElement('button');
    scrollLink.type = 'button';
    scrollLink.className = 'game-endstate-scroll-link';
    scrollLink.textContent = 'See what was decided for them \u2192';
    scrollLink.addEventListener('click', () => {
      const reckoning = document.getElementById('reckoning');
      if (reckoning) {
        reckoning.scrollIntoView({ behavior: 'smooth' });
      }
    });
    actions.appendChild(scrollLink);

    endstate.appendChild(actions);
  }

  /** Reset the game to initial state. */
  resetGame() {
    this.stats = { ...GAME_CONSTANTS.INITIAL_STATS };
    this.turn = 1;
    this.gameOver = false;
    this.history = [];
    clearTimeout(this._narrativeTimeout);

    this.elements.turnText.textContent = `Turn 1 / ${this.maxTurns}`;
    this.updateMetricBars();
    this.updateBudgetDisplay();

    this.elements.narrative.classList.add('game-narrative--hidden');
    this.elements.historyList.innerHTML = '';
    this.elements.historyList.classList.add('game-history--empty');

    // Hide endstate
    this.elements.endstate.classList.remove('game-endstate--visible');
    setTimeout(() => {
      this.elements.endstate.classList.add('game-endstate--hidden');
      this.elements.endstate.innerHTML = '';
    }, 300);

    // Show decisions
    this.elements.decisionsGrid.classList.remove('game-decisions--exiting');
    this.updateDecisionStates();

    // Focus first decision button
    const firstButton = this.elements.decisionsGrid.querySelector('.game-decision-card');
    if (firstButton) firstButton.focus();

    gameAnalytics.trackGameStart();

    const statusEl = document.getElementById('game-status');
    if (statusEl) {
      statusEl.textContent = 'New game started. Turn 1 of 10. All metrics at 100%.';
    }
  }

  /**
   * Update the screen reader live region with current game state.
   * @param {import('../constants/gameConstants.js').Decision} decision
   */
  announceGameState(decision) {
    const statusEl = document.getElementById('game-status');
    if (!statusEl) return;
    statusEl.textContent =
      `Turn ${this.turn} of ${this.maxTurns}. Decision: ${decision.text}. ` +
      `Budget: ${this.stats.budget.toLocaleString()} crores. ` +
      `Social: ${Math.round(this.stats.social)}%. ` +
      `Economic: ${Math.round(this.stats.economic)}%. ` +
      `Environmental: ${Math.round(this.stats.ecology)}%.`;
  }

  /** Set up IntersectionObserver to trigger fade-in on the game section. */
  observeSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('game-section');
    if (section) {
      observer.observe(section);
    }
  }
}
