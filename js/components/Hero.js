class Hero {
  constructor() {
    this.init();
  }

  init() {
    const startButton = document.getElementById('start-experience');
    startButton.addEventListener('click', () => {
      document.getElementById('game-section').scrollIntoView({ behavior: 'smooth' });
    });

    this.observeSection();
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

    observer.observe(document.querySelector('.hero-content'));
  }
}

// Make Hero class globally available
window.Hero = Hero;