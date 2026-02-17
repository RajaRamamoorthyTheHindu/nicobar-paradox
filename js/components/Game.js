/**
 * Phaser 3 game simulation component for the decision-making experience.
 * Manages game state, UI rendering, player decisions, and screen reader announcements.
 * @module Game
 */

import { GAME_CONSTANTS } from '../constants/gameConstants.js';
import { gameLogic } from '../services/gameLogic.js';
import { gameAnalytics } from '../utils/analytics.js';
import { logError, renderFallback } from '../utils/errorHandler.js';

/** @class Game - Phaser 3 based decision simulation with budget management and metric tracking. */
export class Game {
  constructor() {
    const constants = GAME_CONSTANTS;
    this.stats = { ...constants.INITIAL_STATS };
    this.turn = 1;
    this.maxTurns = constants.MAX_TURNS;
    this.gameOver = false;
    this.notifications = [];
    this.decisions = constants.DECISIONS;

    this.init();
  }

  /** Initialize the Phaser game instance and attach event listeners. */
  init() {
    const config = {
      type: Phaser.AUTO,
      parent: 'game-canvas',
      width: 1024,
      height: 768,
      backgroundColor: '#ffffff',
      scene: {
        create: () => this.create(),
        update: () => this.update()
      }
    };

    try {
      this.game = new Phaser.Game(config);
    } catch (error) {
      logError('Game.init', error);
      renderFallback(document.getElementById('game-canvas'), 'Game Simulation', 'Failed to initialize the game engine. Please refresh the page.');
      return;
    }
    this.observeSection();
    window.addEventListener('resize', () => this.handleResize());
  }

  /** Phaser scene create callback — sets up UI and tracks game start. */
  create() {
    gameAnalytics.trackGameStart();
    this.createUI();
    this.createDecisions();
    this.updateStats();
  }

  /** Phaser scene update callback (currently unused). */
  update() {}

  /** Create the main game UI elements (title, budget, turn counter, status bars). */
  createUI() {
    const { width } = this.game.config;
    const scene = this.game.scene.scenes[0];

    this.titleText = scene.add.text(width / 2, 30, "The Great Nicobar Paradox", {
      fontSize: '28px',
      color: '#B7080D',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    this.budgetText = scene.add.text(width / 2, 80, `Budget: ₹${this.stats.budget.toLocaleString()} Cr`, {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    this.turnText = scene.add.text(50, 30, `Turn ${this.turn}/${this.maxTurns}`, {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    });

    this.createStatusBars();
  }

  /** Create the three metric status bars (social, economic, ecology). */
  createStatusBars() {
    const startY = 200;
    const spacing = 40;
    const barWidth = 200;
    const barHeight = 20;
    const x = 580;
    const scene = this.game.scene.scenes[0];
    const colors = GAME_CONSTANTS.STAT_COLORS;

    ['social', 'economic', 'ecology'].forEach((stat, index) => {
      const y = startY + (spacing * index);

      scene.add.rectangle(x, y, barWidth, barHeight, 0xeeeeee)
        .setStrokeStyle(1, 0xdddddd);

      const bar = scene.add.rectangle(x - barWidth / 2, y, barWidth, barHeight, colors[stat])
        .setOrigin(0, 0.5);

      scene.add.text(x - barWidth / 2 - 15, y, stat.charAt(0).toUpperCase() + stat.slice(1), {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'Georgia, serif'
      }).setOrigin(1, 0.5);

      this[`${stat}Bar`] = bar;
    });
  }

  /** Render decision buttons for each available action. */
  createDecisions() {
    const startY = 330;
    const spacing = 85;
    const width = 350;
    const height = 60;

    this.decisions.forEach((decision, index) => {
      const y = startY + (spacing * index);
      this.createDecisionButton(decision, width, height, 50, y);
    });
  }

  /**
   * Create a single decision button with hover tooltip and click handler.
   * @param {import('../constants/gameConstants.js').Decision} decision - Decision data.
   * @param {number} width - Button width in pixels.
   * @param {number} height - Button height in pixels.
   * @param {number} x - X position.
   * @param {number} y - Y position.
   */
  createDecisionButton(decision, width, height, x, y) {
    const scene = this.game.scene.scenes[0];
    const affordable = gameLogic.canAfford(this.stats.budget, decision.cost);
    const bgColor = affordable ? 0xB7080D : 0x95A5A6;

    const button = scene.add.rectangle(x + width / 2, y, width, height, bgColor, 0.1)
      .setStrokeStyle(1, bgColor);

    if (affordable) {
      button.setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
          button.setFillStyle(bgColor, 0.2);
          this.showTooltip(decision, x + width + 20, y);
        })
        .on('pointerout', () => {
          button.setFillStyle(bgColor, 0.1);
          this.hideTooltip();
        })
        .on('pointerdown', () => this.makeDecision(decision));
    }

    scene.add.text(x + width / 2, y - 12, decision.text, {
      fontSize: '16px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    scene.add.text(x + width / 2, y + 12, `Cost: ₹${decision.cost.toLocaleString()} Cr`, {
      fontSize: '14px',
      color: affordable ? '#2ECC71' : '#E74C3C',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
  }

  /**
   * Display a tooltip with the decision description.
   * @param {import('../constants/gameConstants.js').Decision} decision - Decision data.
   * @param {number} x - Tooltip X position.
   * @param {number} y - Tooltip Y position.
   */
  showTooltip(decision, x, y) {
    const scene = this.game.scene.scenes[0];
    this.tooltip = scene.add.container(x, y);

    const bg = scene.add.rectangle(0, 0, 250, 80, 0xffffff)
      .setStrokeStyle(1, 0xe5e7eb);

    const text = scene.add.text(0, 0, decision.description, {
      fontSize: '14px',
      color: '#000000',
      wordWrap: { width: 230 },
      align: 'center'
    }).setOrigin(0.5);

    this.tooltip.add([bg, text]);
  }

  /** Remove the active tooltip from the scene. */
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }

  /**
   * Process a player's decision: apply effects, update UI, check game-over.
   * @param {import('../constants/gameConstants.js').Decision} decision - The chosen decision.
   */
  makeDecision(decision) {
    if (this.gameOver) return;

    try {
      this.stats = gameLogic.applyDecision(this.stats, decision);
      gameAnalytics.trackDecision(decision.text, decision.effects);

      this.updateStats();
      this.showNotification(decision.message);
      this.updateBudget();

      this.turn++;
      this.updateTurn();
      this.announceGameState(decision);

      const result = gameLogic.checkGameOver(this.stats, this.turn, this.maxTurns);
      if (result.isOver) {
        this.endGame(result.reason);
      }
    } catch (error) {
      logError('Game.makeDecision', error);
    }
  }

  /** Redraw status bars to reflect current stat values. */
  updateStats() {
    ['social', 'economic', 'ecology'].forEach(stat => {
      const bar = this[`${stat}Bar`];
      if (bar) {
        bar.width = (200 * this.stats[stat]) / 100;
      }
    });
  }

  /** Update the budget display text. */
  updateBudget() {
    this.budgetText.setText(`Budget: ₹${this.stats.budget.toLocaleString()} Cr`);
  }

  /** Update the turn counter display text. */
  updateTurn() {
    this.turnText.setText(`Turn ${this.turn}/${this.maxTurns}`);
  }

  /**
   * Display a temporary notification message in the game scene.
   * @param {string} message - The message to display.
   */
  showNotification(message) {
    const scene = this.game.scene.scenes[0];
    const notification = scene.add.container(800, 600);

    const bg = scene.add.rectangle(0, 0, 300, 80, 0xffffff)
      .setStrokeStyle(1, 0xe5e7eb);

    const text = scene.add.text(0, 0, message, {
      fontSize: '14px',
      color: '#1f2937',
      wordWrap: { width: 280 },
      align: 'center'
    }).setOrigin(0.5);

    notification.add([bg, text]);
    notification.setAlpha(0);

    scene.tweens.add({
      targets: notification,
      alpha: 1,
      y: 550,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        scene.time.delayedCall(3000, () => {
          scene.tweens.add({
            targets: notification,
            alpha: 0,
            y: 500,
            duration: 500,
            ease: 'Power2',
            onComplete: () => notification.destroy()
          });
        });
      }
    });
  }

  /**
   * End the game and display final results overlay.
   * @param {string} reason - The game-over reason (social, ecology, economic, budget, turns).
   */
  endGame(reason) {
    this.gameOver = true;
    const statusEl = document.getElementById('game-status');
    if (statusEl) {
      statusEl.textContent = 'Game over. ' + gameLogic.getEndMessage(reason);
    }
    const scene = this.game.scene.scenes[0];

    scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.95);

    const endMessage = gameLogic.getEndMessage(reason);

    scene.add.text(512, 284, 'FINAL RESULTS', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    scene.add.text(512, 384, [
      `Final Budget: ₹${this.stats.budget.toLocaleString()} Cr`,
      `Social Impact: ${Math.round(this.stats.social)}%`,
      `Economic Growth: ${Math.round(this.stats.economic)}%`,
      `Environmental Health: ${Math.round(this.stats.ecology)}%`,
      '',
      endMessage,
      '',
      'This was a simulation.',
      'The destruction is real.',
      '',
      'Scroll down to learn more.'
    ].join('\n'), {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5);

    scene.add.rectangle(512, 584, 200, 50, 0xB7080D)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.resetGame());

    scene.add.text(512, 584, 'Play Again', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    gameAnalytics.trackGameEnd({
      turns: this.turn,
      social: this.stats.social,
      economic: this.stats.economic,
      ecology: this.stats.ecology,
      budget: this.stats.budget
    });
  }

  /** Reset game state and restart the Phaser scene. */
  resetGame() {
    this.stats = { ...GAME_CONSTANTS.INITIAL_STATS };
    this.turn = 1;
    this.gameOver = false;
    this.game.scene.scenes[0].scene.restart();
  }

  /** Scale the game canvas to fit the container while maintaining aspect ratio. */
  handleResize() {
    const container = document.getElementById('game-canvas');
    if (!container) return;

    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    const maxWidth = Math.min(container.clientWidth, 1024);
    const maxHeight = Math.min(container.clientHeight, 768);
    const scale = Math.min(maxWidth / 1024, maxHeight / 768);

    canvas.style.width = `${1024 * scale}px`;
    canvas.style.height = `${768 * scale}px`;
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

  /**
   * Update the screen reader live region with current game state.
   * @param {import('../constants/gameConstants.js').Decision} decision - The last decision made.
   */
  announceGameState(decision) {
    const statusEl = document.getElementById('game-status');
    if (!statusEl) return;
    statusEl.textContent = `Turn ${this.turn} of ${this.maxTurns}. Decision: ${decision.text}. ` +
      `Budget: ${this.stats.budget.toLocaleString()} crores. ` +
      `Social: ${Math.round(this.stats.social)}%. ` +
      `Economic: ${Math.round(this.stats.economic)}%. ` +
      `Environmental: ${Math.round(this.stats.ecology)}%.`;
  }
}
