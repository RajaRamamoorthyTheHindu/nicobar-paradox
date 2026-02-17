class Timeline {
  constructor() {
    this.container = document.querySelector('.timeline-container');
    this.init();
  }

  init() {
    this.renderEvents();
    this.observeEvents();
  }

  renderEvents() {
    window.timelineData.forEach((event, index) => {
      const eventElement = this.createEventElement(event, index % 2 === 0);
      this.container.appendChild(eventElement);
    });
  }

  createEventElement(event, isLeft) {
    const element = document.createElement('div');
    element.className = `timeline-event ${isLeft ? 'left' : 'right'}`;
    
    // Event element creation code
    element.innerHTML = `
      <div class="timeline-content">
        <span class="timeline-year">${event.year}</span>
        <h3 class="timeline-title">${event.title}</h3>
        <p class="timeline-description">${event.description}</p>
        ${event.quote ? `
          <div class="timeline-quote">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            <p>${event.quote.text}</p>
            <cite>— ${event.quote.author}</cite>
          </div>
        ` : ''}
      </div>
      <div class="timeline-marker"></div>
      ${event.image ? `
        <div class="timeline-image">
          <img src="${event.image}" alt="${event.title}">
        </div>
      ` : ''}
    `;

    return element;
  }

  observeEvents() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.timeline-event').forEach(event => {
      observer.observe(event);
    });
  }
}

// Make Timeline class globally available
window.Timeline = Timeline;