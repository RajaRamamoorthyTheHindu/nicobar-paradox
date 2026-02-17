class Game {
  constructor() {
    this.stats = {
      social: 100,
      economic: 100,
      ecology: 100,
      budget: 81800
    };

    this.turn = 1;
    this.maxTurns = 10;
    this.gameOver = false;
    this.notifications = [];
    this.decisions = [
      {
        text: "Build Port Infrastructure",
        cost: 15000,
        effects: { social: -20, economic: 25, ecology: -30 },
        message: "Port construction accelerates, devastating marine ecosystems.",
        description: "Construct a deep-water port and shipping facilities. High economic potential but significant environmental impact."
      },
      {
        text: "Implement Conservation Measures",
        cost: 8000,
        effects: { social: -15, economic: -25, ecology: 20 },
        message: "Conservation efforts slow development, causing economic setbacks.",
        description: "Establish protected areas and wildlife corridors. Preserves ecology but slows development."
      },
      {
        text: "Expand Urban Development",
        cost: 12000,
        effects: { social: -25, economic: 30, ecology: -35 },
        message: "Urban sprawl consumes pristine forest land, communities protest.",
        description: "Build housing and commercial zones. Boosts economy but impacts local communities."
      },
      {
        text: "Focus on Social Programs",
        cost: 5000,
        effects: { social: 20, economic: -20, ecology: -15 },
        message: "Social initiatives delay project timelines, investors concerned.",
        description: "Invest in community welfare and relocation support. Improves social metrics but costly."
      }
    ];

    this.init();
  }

  init() {
    // Initialize Phaser game
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

    this.game = new Phaser.Game(config);
    this.observeSection();
    window.addEventListener('resize', () => this.handleResize());
  }

  create() {
    window.gameAnalytics.trackGameStart();
    this.createUI();
    this.createDecisions();
    this.updateStats(true);
  }

  update() {
    // Game update logic
  }

  createUI() {
    const { width, height } = this.game.config;
    
    // Add title
    this.titleText = this.game.scene.scenes[0].add.text(width / 2, 30, "The Great Nicobar Paradox", {
      fontSize: '28px',
      color: '#B7080D',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    // Add budget display
    this.budgetText = this.game.scene.scenes[0].add.text(width / 2, 80, `Budget: ₹${this.stats.budget.toLocaleString()} Cr`, {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    // Add turn counter
    this.turnText = this.game.scene.scenes[0].add.text(50, 30, `Turn ${this.turn}/${this.maxTurns}`, {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    });

    // Create status bars
    this.createStatusBars();
  }

  createStatusBars() {
    const startY = 200;
    const spacing = 40;
    const width = 200;
    const height = 20;
    const x = 580;

    ['social', 'economic', 'ecology'].forEach((stat, index) => {
      const y = startY + (spacing * index);
      
      // Background
      this.game.scene.scenes[0].add.rectangle(x, y, width, height, 0xeeeeee)
        .setStrokeStyle(1, 0xdddddd);
      
      // Bar
      const bar = this.game.scene.scenes[0].add.rectangle(x - width/2, y, width, height, this.getStatColor(stat))
        .setOrigin(0, 0.5);
      
      // Label
      this.game.scene.scenes[0].add.text(x - width/2 - 15, y, this.capitalizeFirst(stat), {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'Georgia, serif'
      }).setOrigin(1, 0.5);

      this[`${stat}Bar`] = bar;
    });
  }

  getStatColor(stat) {
    const colors = {
      social: 0x8E44AD,
      economic: 0xF1C40F,
      ecology: 0x2ECC71
    };
    return colors[stat];
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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

  createDecisionButton(decision, width, height, x, y) {
    const scene = this.game.scene.scenes[0];
    const canAfford = this.stats.budget >= decision.cost;
    const bgColor = canAfford ? 0xB7080D : 0x95A5A6;

    const button = scene.add.rectangle(x + width/2, y, width, height, bgColor, 0.1)
      .setStrokeStyle(1, bgColor);

    if (canAfford) {
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

    scene.add.text(x + width/2, y - 12, decision.text, {
      fontSize: '16px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    scene.add.text(x + width/2, y + 12, `Cost: ₹${decision.cost.toLocaleString()} Cr`, {
      fontSize: '14px',
      color: canAfford ? '#2ECC71' : '#E74C3C',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
  }

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

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }

  makeDecision(decision) {
    if (this.gameOver) return;

    // Apply effects
    this.stats.budget -= decision.cost;
    Object.entries(decision.effects).forEach(([stat, value]) => {
      this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + value));
    });

    // Track decision
    window.gameAnalytics.trackDecision(decision.text, decision.effects);

    // Update UI
    this.updateStats();
    this.showNotification(decision.message);
    this.updateBudget();

    // Advance turn
    this.turn++;
    this.updateTurn();

    // Check game over
    if (this.checkGameOver()) {
      this.endGame();
    }
  }

  updateStats() {
    ['social', 'economic', 'ecology'].forEach(stat => {
      const bar = this[`${stat}Bar`];
      const width = 200;
      const value = this.stats[stat];
      bar.width = (width * value) / 100;
    });
  }

  updateBudget() {
    this.budgetText.setText(`Budget: ₹${this.stats.budget.toLocaleString()} Cr`);
  }

  updateTurn() {
    this.turnText.setText(`Turn ${this.turn}/${this.maxTurns}`);
  }

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

  checkGameOver() {
    return (
      this.turn > this.maxTurns ||
      this.stats.social <= 30 ||
      this.stats.ecology <= 30 ||
      this.stats.economic <= 30 ||
      this.stats.budget <= 0
    );
  }

  endGame() {
    this.gameOver = true;
    const scene = this.game.scene.scenes[0];
    
    const overlay = scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.95);
    
    const endMessage = this.getEndMessage();
    
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

    const button = scene.add.rectangle(512, 584, 200, 50, 0xB7080D)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.resetGame());

    scene.add.text(512, 584, 'Play Again', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    window.gameAnalytics.trackGameEnd({
      turns: this.turn,
      social: this.stats.social,
      economic: this.stats.economic,
      ecology: this.stats.ecology,
      budget: this.stats.budget
    });
  }

  getEndMessage() {
    if (this.stats.social <= 30) {
      return 'Social fabric torn apart. Communities scattered, traditions lost forever.';
    } else if (this.stats.ecology <= 30) {
      return 'Ecological collapse. Ancient forests give way to concrete and steel.';
    } else if (this.stats.economic <= 30) {
      return 'Economic promises unfulfilled. Development at any cost proves costly.';
    } else if (this.stats.budget <= 0) {
      return 'Budget depleted. The price of progress exceeds all estimates.';
    } else if (this.turn > this.maxTurns) {
      return 'Time runs out. Progress marches on, leaving destruction in its wake.';
    }
    return 'A precarious balance achieved, but at what cost to the island\'s soul?';
  }

  resetGame() {
    this.stats = {
      social: 100,
      economic: 100,
      ecology: 100,
      budget: 81800
    };
    this.turn = 1;
    this.gameOver = false;
    
    this.game.scene.scenes[0].scene.restart();
  }

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

    observer.observe(document.getElementById('game-section'));
  }
}

// Make Game class globally available
window.GameComponent = Game;