// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components only if their containers exist
  if (document.getElementById('game-canvas')) {
    new window.GameComponent();
  }
  
  if (document.querySelector('.hero')) {
    new window.Hero();
  }

  if (document.querySelector('.timeline-container')) {
    new window.Timeline();
  }

  if (document.getElementById('map')) {
    new window.MapComponent();
  }

  if (document.getElementById('endangered-species')) {
    new window.Gallery();
  }
});