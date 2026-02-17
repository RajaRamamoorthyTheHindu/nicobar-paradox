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

    // Content section
    const content = document.createElement('div');
    content.className = 'timeline-content';

    const year = document.createElement('span');
    year.className = 'timeline-year';
    year.textContent = event.year;
    content.appendChild(year);

    const title = document.createElement('h3');
    title.className = 'timeline-title';
    title.textContent = event.title;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'timeline-description';
    desc.textContent = event.description;
    content.appendChild(desc);

    if (event.quote) {
      const quote = document.createElement('div');
      quote.className = 'timeline-quote';

      const quoteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      quoteSvg.setAttribute('width', '24');
      quoteSvg.setAttribute('height', '24');
      quoteSvg.setAttribute('viewBox', '0 0 24 24');
      quoteSvg.setAttribute('fill', 'none');
      quoteSvg.setAttribute('stroke', 'currentColor');
      quoteSvg.setAttribute('stroke-width', '2');
      quoteSvg.setAttribute('stroke-linecap', 'round');
      quoteSvg.setAttribute('stroke-linejoin', 'round');
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z');
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z');
      quoteSvg.appendChild(path1);
      quoteSvg.appendChild(path2);
      quote.appendChild(quoteSvg);

      const quoteText = document.createElement('p');
      quoteText.textContent = event.quote.text;
      quote.appendChild(quoteText);

      const cite = document.createElement('cite');
      cite.textContent = `— ${event.quote.author}`;
      quote.appendChild(cite);

      content.appendChild(quote);
    }

    element.appendChild(content);

    // Marker
    const marker = document.createElement('div');
    marker.className = 'timeline-marker';
    element.appendChild(marker);

    // Image
    if (event.image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'timeline-image';
      const img = document.createElement('img');
      img.src = event.image;
      img.alt = event.title;
      imageWrapper.appendChild(img);
      element.appendChild(imageWrapper);
    }

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