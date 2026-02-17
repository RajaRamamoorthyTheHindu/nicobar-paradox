import Phaser from 'phaser';
import { trackEvent, trackGameStart, trackGameEnd, trackDecision } from '../../utils/analytics';

interface GameStats {
  social: number;
  economic: number;
  ecology: number;
  budget: number;
}

interface StatusBar {
  background: Phaser.GameObjects.Rectangle;
  bar: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
}

interface Decision {
  text: string;
  cost: number;
  effects: {
    social: number;
    economic: number;
    ecology: number;
  };
  message: string;
  description: string;
}

interface Notification {
  container: Phaser.GameObjects.Container;
  background: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
  timer: number;
}

export default class GameScene extends Phaser.Scene {
  private stats: GameStats = {
    social: 100,
    economic: 100,
    ecology: 100,
    budget: 81800
  };
  private turn: number = 1;
  private maxTurns: number = 10;
  private gameOver: boolean = false;
  private messageText!: Phaser.GameObjects.Text;
  private messageBackground!: Phaser.GameObjects.Rectangle;
  private buttons: Phaser.GameObjects.Container[] = [];
  private statusBars: Record<keyof Omit<GameStats, 'budget'>, StatusBar> = {} as Record<keyof Omit<GameStats, 'budget'>, StatusBar>;
  private turnText!: Phaser.GameObjects.Text;
  private budgetText!: Phaser.GameObjects.Text;
  private startTime: number = 0;
  private gameOverContainer?: Phaser.GameObjects.Container;
  private notifications: Notification[] = [];
  private readonly NOTIFICATION_PADDING = 16;
  private readonly NOTIFICATION_MARGIN = 16;
  private readonly NOTIFICATION_WIDTH = 300;
  private readonly NOTIFICATION_HEIGHT = 80;

  private decisions: Decision[] = [
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

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.startTime = Date.now();
    trackGameStart();
    
    // Set up white background
    this.add.rectangle(400, 300, 800, 600, 0xffffff);
    
    // Add title with custom styling and more space
    this.add.text(400, 30, "The Great Nicobar Paradox", {
      fontSize: '28px',
      color: '#B7080D',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    // Add budget display with increased spacing
    this.budgetText = this.add.text(400, 80, `Budget: ₹${this.stats.budget.toLocaleString()} Cr`, {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);

    // Create message display area with more space and better positioning
    this.messageBackground = this.add.rectangle(400, 140, 700, 60, 0xf8f9fa)
      .setStrokeStyle(1, 0xe9ecef)
      .setVisible(false);
    
    this.messageText = this.add.text(400, 140, '', {
      fontSize: '16px',
      color: '#000000',
      align: 'center',
      wordWrap: { width: 680 }
    }).setOrigin(0.5).setVisible(false);

    // Add turn counter with better positioning
    this.turnText = this.add.text(50, 30, `Turn ${this.turn}/${this.maxTurns}`, {
      fontSize: '20px',
      color: '#000000',
      fontFamily: 'Georgia, serif'
    });

    // Add win conditions text with increased spacing
    const conditionsContainer = this.add.container(50, 80);
    
    const conditionsTitle = this.add.text(0, 0, 'Victory Conditions:', {
      fontSize: '16px',
      color: '#2ECC71',
      fontFamily: 'Georgia, serif'
    });
    
    const conditionsList = this.add.text(0, 25, [
      '• Maintain all metrics above 50%',
      '• Complete all 10 turns',
      '• Stay within budget'
    ].join('\n'), {
      fontSize: '14px',
      color: '#000000',
      fontFamily: 'Georgia, serif',
      lineSpacing: 8
    });

    conditionsContainer.add([conditionsTitle, conditionsList]);

    // Add stats display with increased spacing
    this.createStatsDisplay();

    // Add decision buttons with more space between them
    this.createDecisionButtons();

    // Initial stats update
    this.updateStats(true);
  }

  private createStatsDisplay() {
    const createBar = (y: number, value: number, color: number, label: string): StatusBar => {
      const width = 200;
      const height = 20;
      const x = 580;

      const background = this.add.rectangle(x, y, width, height, 0xeeeeee)
        .setStrokeStyle(1, 0xdddddd);
      
      const bar = this.add.rectangle(x - width/2, y, width * (value/100), height, color)
        .setOrigin(0, 0.5);
      
      const text = this.add.text(x - width/2 - 15, y, label, {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'Georgia, serif'
      }).setOrigin(1, 0.5);

      return { background, bar, text };
    };

    // Increased spacing between bars
    this.statusBars.social = createBar(200, this.stats.social, 0x8E44AD, 'Social');
    this.statusBars.economic = createBar(240, this.stats.economic, 0xF1C40F, 'Economic');
    this.statusBars.ecology = createBar(280, this.stats.ecology, 0x2ECC71, 'Ecology');
  }

  private createDecisionButtons() {
    const buttonWidth = 350;
    const buttonHeight = 60;
    const buttonSpacing = 25;
    const startY = 330;

    this.decisions.forEach((decision, index) => {
      const y = startY + index * (buttonHeight + buttonSpacing);
      const button = this.add.container(50, y);
      
      const canAfford = this.stats.budget >= decision.cost;
      const bgColor = canAfford ? 0xB7080D : 0x95A5A6;
      
      const bg = this.add.rectangle(buttonWidth/2, 0, buttonWidth, buttonHeight, bgColor, 0.1)
        .setStrokeStyle(1, bgColor);

      if (canAfford) {
        bg.setInteractive({ useHandCursor: true })
          .on('pointerover', () => {
            bg.setFillStyle(bgColor, 0.2);
            this.tweens.add({
              targets: button,
              x: 60,
              duration: 200,
              ease: 'Power2'
            });
          })
          .on('pointerout', () => {
            bg.setFillStyle(bgColor, 0.1);
            this.tweens.add({
              targets: button,
              x: 50,
              duration: 200,
              ease: 'Power2'
            });
          })
          .on('pointerdown', () => {
            this.tweens.add({
              targets: button,
              scaleX: 0.95,
              scaleY: 0.95,
              duration: 100,
              yoyo: true,
              onComplete: () => this.makeDecision(decision)
            });
          });
      }

      const title = this.add.text(buttonWidth/2, -12, decision.text, {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'Georgia, serif'
      }).setOrigin(0.5);

      const costText = this.add.text(buttonWidth/2, 12, `Cost: ₹${decision.cost.toLocaleString()} Cr`, {
        fontSize: '14px',
        color: canAfford ? '#2ECC71' : '#E74C3C',
        fontFamily: 'Georgia, serif'
      }).setOrigin(0.5);

      button.add([bg, title, costText]);
      this.buttons.push(button);

      // Improved tooltip positioning and styling
      const tooltip = this.add.container(buttonWidth + 70, 0);
      
      const tooltipBg = this.add.rectangle(0, 0, 250, 80, 0xffffff)
        .setStrokeStyle(1, 0xe5e7eb);
      
      const tooltipText = this.add.text(0, 0, decision.description, {
        fontSize: '14px',
        color: '#000000',
        wordWrap: { width: 230 },
        align: 'center'
      }).setOrigin(0.5);

      tooltip.add([tooltipBg, tooltipText]);
      tooltip.setVisible(false);
      button.add(tooltip);

      // Improved tooltip animation
      bg.on('pointerover', () => {
        tooltip.setVisible(true);
        tooltip.setAlpha(0);
        this.tweens.add({
          targets: tooltip,
          alpha: 1,
          duration: 200,
          ease: 'Power2'
        });
      }).on('pointerout', () => {
        this.tweens.add({
          targets: tooltip,
          alpha: 0,
          duration: 200,
          ease: 'Power2',
          onComplete: () => tooltip.setVisible(false)
        });
      });
    });
  }

  private makeDecision(decision: Decision) {
    if (this.gameOver) return;

    // Apply costs and effects
    this.stats.budget -= decision.cost;
    Object.entries(decision.effects).forEach(([stat, value]) => {
      this.stats[stat as keyof Omit<GameStats, 'budget'>] += value;
    });

    // Track the decision
    trackDecision(decision.text, decision.effects);

    // Update UI
    this.updateStats();
    this.showMessage(decision.message);
    this.budgetText.setText(`Budget: ₹${this.stats.budget.toLocaleString()} Cr`);

    // Advance turn
    this.turn++;
    this.updateTurnCounter();

    // Check for game over conditions
    if (this.checkGameOver()) {
      this.endGame();
    } else {
      // Disable buttons if can't afford any more decisions
      this.updateButtonStates();
    }
  }

  private updateStats(instant: boolean = false) {
    Object.keys(this.stats).forEach(stat => {
      if (stat !== 'budget') {
        this.stats[stat as keyof Omit<GameStats, 'budget'>] = 
          Phaser.Math.Clamp(this.stats[stat as keyof Omit<GameStats, 'budget'>], 0, 100);
      }
    });

    const duration = instant ? 0 : 500;
    
    Object.keys(this.statusBars).forEach(stat => {
      const value = this.stats[stat as keyof Omit<GameStats, 'budget'>];
      const bar = this.statusBars[stat as keyof Omit<GameStats, 'budget'>];
      const width = 200;
      const targetWidth = (width * value) / 100;

      this.tweens.add({
        targets: bar.bar,
        width: targetWidth,
        duration,
        ease: 'Power2'
      });

      bar.text.setText(`${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${Math.round(value)}%`);
    });
  }

  private updateButtonStates() {
    this.buttons.forEach((button, index) => {
      const decision = this.decisions[index];
      const canAfford = this.stats.budget >= decision.cost;
      
      const [bg] = button.list as [Phaser.GameObjects.Rectangle];
      const color = canAfford ? 0xB7080D : 0x95A5A6;
      
      bg.setStrokeStyle(1, color)
        .setFillStyle(color, 0.1);

      if (canAfford) {
        bg.setInteractive();
      } else {
        bg.disableInteractive();
      }
    });
  }

  private showMessage(text: string) {
    // Create notification instead of center message
    this.createNotification(text);
  }

  private createNotification(message: string) {
    // Calculate position for new notification
    const baseY = 600 - this.NOTIFICATION_MARGIN;
    const offset = this.notifications.length * (this.NOTIFICATION_HEIGHT + this.NOTIFICATION_MARGIN);
    const y = baseY - offset;

    // Create container for notification
    const container = this.add.container(800 - this.NOTIFICATION_MARGIN, y);

    // Create background with rounded corners
    const background = this.add.rectangle(
      0,
      0,
      this.NOTIFICATION_WIDTH,
      this.NOTIFICATION_HEIGHT,
      0xffffff,
      1
    )
      .setStrokeStyle(1, 0xe5e7eb)
      .setOrigin(1, 1);

    // Add drop shadow effect
    const shadow = this.add.rectangle(
      2,
      2,
      this.NOTIFICATION_WIDTH,
      this.NOTIFICATION_HEIGHT,
      0x000000,
      0.1
    )
      .setOrigin(1, 1);

    // Create text with padding
    const text = this.add.text(
      -this.NOTIFICATION_PADDING,
      -this.NOTIFICATION_PADDING,
      message,
      {
        fontSize: '14px',
        color: '#1f2937',
        fontFamily: 'Georgia, serif',
        align: 'right',
        wordWrap: { width: this.NOTIFICATION_WIDTH - (this.NOTIFICATION_PADDING * 2) }
      }
    )
      .setOrigin(1, 1);

    // Add elements to container
    container.add([shadow, background, text]);

    // Set initial position and alpha
    container.setAlpha(0);
    container.x = 900; // Start off-screen

    // Slide in animation
    this.tweens.add({
      targets: container,
      x: 800 - this.NOTIFICATION_MARGIN,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });

    // Create notification object
    const notification: Notification = {
      container,
      background,
      text,
      timer: 3000 // 3 seconds display time
    };

    // Add to notifications array
    this.notifications.push(notification);

    // Start timer for removal
    this.time.delayedCall(notification.timer, () => {
      this.removeNotification(notification);
    });
  }

  private removeNotification(notification: Notification) {
    // Find index of notification
    const index = this.notifications.indexOf(notification);
    if (index === -1) return;

    // Remove from array
    this.notifications.splice(index, 1);

    // Slide out animation
    this.tweens.add({
      targets: notification.container,
      x: 900,
      alpha: 0,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        notification.container.destroy();
        
        // Reposition remaining notifications
        this.notifications.forEach((remaining, i) => {
          const newY = 600 - this.NOTIFICATION_MARGIN - 
            (i * (this.NOTIFICATION_HEIGHT + this.NOTIFICATION_MARGIN));
          
          this.tweens.add({
            targets: remaining.container,
            y: newY,
            duration: 300,
            ease: 'Power2'
          });
        });
      }
    });
  }

  private updateTurnCounter() {
    this.turnText.setText(`Turn ${this.turn}/${this.maxTurns}`);
    
    this.tweens.add({
      targets: this.turnText,
      scale: 1.2,
      duration: 200,
      yoyo: true
    });
  }

  private checkGameOver(): boolean {
    return (
      this.turn > this.maxTurns ||
      this.stats.social <= 30 ||
      this.stats.ecology <= 30 ||
      this.stats.economic <= 30 ||
      this.stats.budget <= 0
    );
  }

  private endGame() {
    this.gameOver = true;
    const gameDuration = Date.now() - this.startTime;
    
    // Determine end reason
    let endReason = '';
    if (this.stats.social <= 30) {
      endReason = 'social_collapse';
    } else if (this.stats.ecology <= 30) {
      endReason = 'ecological_collapse';
    } else if (this.stats.economic <= 30) {
      endReason = 'economic_collapse';
    } else if (this.stats.budget <= 0) {
      endReason = 'budget_depleted';
    } else if (this.turn > this.maxTurns) {
      endReason = 'time_expired';
    }

    // Track game end
    trackGameEnd({
      turns: this.turn,
      social: this.stats.social,
      economic: this.stats.economic,
      ecology: this.stats.ecology,
      budget: this.stats.budget,
      endReason,
      duration: gameDuration
    });

    // Disable all buttons
    this.buttons.forEach(button => {
      const [bg] = button.list as [Phaser.GameObjects.Rectangle];
      bg.disableInteractive();
      this.tweens.add({
        targets: button,
        alpha: 0.5,
        duration: 500
      });
    });

    // Create game over overlay
    this.createGameOverOverlay(endReason);
  }

  private createGameOverOverlay(endReason: string) {
    // Create overlay container
    this.gameOverContainer = this.add.container(0, 0);
    
    // Semi-transparent background
    const overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.95
    ).setOrigin(0.5);
    
    this.gameOverContainer.add(overlay);
    this.gameOverContainer.setDepth(1000);

    // Create results container for better positioning
    const resultsContainer = this.add.container(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100
    );

    // Final results text with improved spacing and formatting
    const statsText = this.add.text(
      0,
      0,
      [
        'FINAL RESULTS',
        '',
        `Final Budget: ₹${this.stats.budget.toLocaleString()} Cr`,
        `Social Impact: ${Math.round(this.stats.social)}%`,
        `Economic Growth: ${Math.round(this.stats.economic)}%`,
        `Environmental Health: ${Math.round(this.stats.ecology)}%`,
        '',
        this.getEndMessage(endReason),
        '',
        'This was a simulation.',
        'The destruction is real.',
        '',
        'Scroll down to learn more.'
      ].join('\n'),
      {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 15,
        fontFamily: 'Georgia, serif',
        wordWrap: { width: Math.min(600, this.cameras.main.width - 40) }
      }
    ).setOrigin(0.5);

    // Add text glow effect
    statsText.setStroke('#B7080D', 1);
    resultsContainer.add(statsText);

    // Add replay button with improved positioning and styling
    const buttonWidth = Math.min(200, this.cameras.main.width - 40);
    const buttonHeight = 50;
    const replayButton = this.add.container(
      this.cameras.main.centerX,
      this.cameras.main.centerY + Math.max(150, statsText.height / 2 + 50)
    );

    const buttonBg = this.add.rectangle(
      0,
      0,
      buttonWidth,
      buttonHeight,
      0xB7080D,
      1
    )
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        buttonBg.setFillStyle(0x95030A);
        this.tweens.add({
          targets: replayButton,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100
        });
      })
      .on('pointerout', () => {
        buttonBg.setFillStyle(0xB7080D);
        this.tweens.add({
          targets: replayButton,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      })
      .on('pointerdown', () => this.resetGame());

    const buttonText = this.add.text(
      0,
      0,
      'Play Again',
      {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Georgia, serif'
      }
    ).setOrigin(0.5);

    replayButton.add([buttonBg, buttonText]);

    // Add all elements to the game over container
    this.gameOverContainer.add([resultsContainer, replayButton]);

    // Add responsive resize handler
    const resizeOverlay = () => {
      overlay.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
      overlay.setSize(this.cameras.main.width, this.cameras.main.height);
      
      resultsContainer.setPosition(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100
      );
      
      replayButton.setPosition(
        this.cameras.main.centerX,
        this.cameras.main.centerY + Math.max(150, statsText.height / 2 + 50)
      );

      statsText.setWordWrapWidth(Math.min(600, this.cameras.main.width - 40));
    };

    this.scale.on('resize', resizeOverlay);
    resizeOverlay();

    // Add fade in animation
    this.gameOverContainer.setAlpha(0);
    this.tweens.add({
      targets: this.gameOverContainer,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });
  }

  private getEndMessage(endReason: string): string {
    const highThreshold = 50;

    if (this.stats.social <= 30) {
        return 'Social fabric torn apart. Communities scattered, traditions lost forever.';
    } else if (this.stats.ecology <= 30) {
        return 'Ecological collapse. Ancient forests give way to concrete and steel.';
    } else if (this.stats.economic <= 30) {
        return 'Economic promises unfulfilled. Development at any cost proves costly.';
    } else if (this.stats.budget <= 0) {
        return 'Budget depleted. The price of progress exceeds all estimates.';
    } else if (
        this.stats.social > highThreshold &&
        this.stats.ecology > highThreshold &&
        this.stats.economic > highThreshold
    ) {
        return 'A precarious balance achieved, but at what cost to the island\'s soul?';
    } else {
        return 'Time runs out. Progress marches on, leaving destruction in its wake.';
    }
  }

  private resetGame() {
    // Reset game state
    this.stats = {
      social: 100,
      economic: 100,
      ecology: 100,
      budget: 81800
    };
    this.turn = 1;
    this.gameOver = false;
    this.startTime = Date.now();

    // Remove game over overlay
    if (this.gameOverContainer) {
      this.tweens.add({
        targets: this.gameOverContainer,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          this.gameOverContainer?.destroy();
          this.gameOverContainer = undefined;
        }
      });
    }

    // Reset UI
    this.updateStats(true);
    this.updateTurnCounter();
    this.budgetText.setText(`Budget: ₹${this.stats.budget.toLocaleString()} Cr`);
    
    // Re-enable buttons
    this.buttons.forEach(button => {
      const [bg] = button.list as [Phaser.GameObjects.Rectangle];
      bg.setInteractive();
      this.tweens.add({
        targets: button,
        alpha: 1,
        duration: 500
      });
    });

    // Track new game start
    trackGameStart();
  }
}