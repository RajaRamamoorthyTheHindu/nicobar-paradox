/**
 * Hero landing section component.
 * Handles the introductory section with scroll-to-content functionality
 * and intersection observer for fade-in animations.
 * @module Hero
 */

/** @class Hero - Landing section with scroll-to-content button and fade-in animation. */
export class Hero {
  constructor() {
    this.init();
  }

  /** Initialize the start button click handler and section observer. */
  init() {
    const startButton = document.getElementById('start-experience');
    startButton.addEventListener('click', () => {
      document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
    });

    this.observeSection();
  }

  /** Set up IntersectionObserver to trigger fade-in animation on the hero content. */
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
