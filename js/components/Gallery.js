/**
 * Species gallery component with filtering, modal details, and keyboard accessibility.
 * @module Gallery
 */

import { speciesData } from '../data/speciesData.js';
import { gameAnalytics } from '../utils/analytics.js';
import { logError } from '../utils/errorHandler.js';

/** @class Gallery - Filterable species gallery with accessible modal for species details. */
export class Gallery {
  constructor() {
    this.activeFilter = 'all';
    this.modal = document.getElementById('species-modal');
    this.init();
  }

  /** Initialize filters, render species cards, set up modal and observation. */
  init() {
    this.createFilters();
    this.renderSpecies();
    this.setupModal();
    this.observeSection();
  }

  /** Create filter buttons for species categories. */
  createFilters() {
    const container = document.querySelector('.gallery-filters');

    const filters = [
      { id: 'all', label: 'All Species' },
      { id: 'marine', label: 'Marine' },
      { id: 'terrestrial', label: 'Terrestrial' },
      { id: 'avian', label: 'Avian' }
    ];

    filters.forEach(filter => {
      const button = this.createFilterButton(filter);
      container.appendChild(button);
    });
  }

  /**
   * Create a single filter button element.
   * @param {{id: string, label: string}} filter - Filter configuration.
   * @returns {HTMLButtonElement} The filter button element.
   */
  createFilterButton(filter) {
    const button = document.createElement('button');
    button.className = `filter-button ${filter.id === this.activeFilter ? 'active' : ''}`;
    button.textContent = filter.label;
    button.setAttribute('aria-pressed', filter.id === this.activeFilter ? 'true' : 'false');
    button.addEventListener('click', () => this.filterSpecies(filter.id));
    return button;
  }

  /**
   * Filter the species grid by category and update button states.
   * @param {string} category - The category to filter by ('all', 'marine', 'terrestrial', 'avian').
   */
  filterSpecies(category) {
    this.activeFilter = category;

    // Update filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.textContent.toLowerCase().includes(category));
      button.setAttribute('aria-pressed', button.classList.contains('active'));
    });

    this.renderSpecies();
  }

  /** Render species cards into the grid based on the active filter. */
  renderSpecies() {
    const container = document.querySelector('.species-grid');
    container.innerHTML = '';

    const filteredSpecies = this.activeFilter === 'all'
      ? speciesData
      : speciesData.filter(species => species.category === this.activeFilter);

    filteredSpecies.forEach(species => {
      const card = this.createSpeciesCard(species);
      container.appendChild(card);
    });
  }

  /**
   * Create an accessible species card element.
   * @param {import('../data/speciesData.js').Species} species - Species data.
   * @returns {HTMLElement} The species card element.
   */
  createSpeciesCard(species) {
    const card = document.createElement('div');
    card.className = 'species-card';

    const img = document.createElement('img');
    img.src = species.image;
    img.alt = species.name;
    img.className = 'species-image';
    card.appendChild(img);

    // Visible name and status below image (always shown)
    const cardInfo = document.createElement('div');
    cardInfo.className = 'species-card-info';
    const cardName = document.createElement('h3');
    cardName.className = 'species-name';
    cardName.textContent = species.name;
    cardInfo.appendChild(cardName);
    const cardStatus = document.createElement('span');
    cardStatus.className = 'species-status';
    cardStatus.textContent = species.status;
    cardInfo.appendChild(cardStatus);
    card.appendChild(cardInfo);

    // Hover overlay with description
    const overlay = document.createElement('div');
    overlay.className = 'species-overlay';
    card.appendChild(overlay);

    const info = document.createElement('div');
    info.className = 'species-info';

    const desc = document.createElement('p');
    desc.className = 'species-description';
    desc.textContent = species.shortDescription;
    info.appendChild(desc);

    card.appendChild(info);

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${species.name} - ${species.status}`);
    card.addEventListener('click', () => this.showSpeciesDetails(species));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.showSpeciesDetails(species);
      }
    });
    return card;
  }

  /** Set up click-outside and close-button handlers for the modal. */
  setupModal() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        this.closeModal();
      }
    });
  }

  /** Close the species detail modal, restore focus, and remove keyboard handlers. */
  closeModal() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }
  }

  /**
   * Open the modal with detailed species information.
   * Manages focus trap and keyboard navigation for accessibility.
   * @param {import('../data/speciesData.js').Species} species - Species to display.
   */
  showSpeciesDetails(species) {
    try {
      this.previouslyFocused = document.activeElement;

      // Clear existing modal content
      while (this.modal.firstChild) {
        this.modal.removeChild(this.modal.firstChild);
      }

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content species-modal-content';

      const modalImg = document.createElement('img');
      modalImg.src = species.image;
      modalImg.alt = species.name;
      modalImg.className = 'modal-image';
      modalContent.appendChild(modalImg);

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-close';
      const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      closeSvg.setAttribute('width', '24');
      closeSvg.setAttribute('height', '24');
      closeSvg.setAttribute('viewBox', '0 0 24 24');
      closeSvg.setAttribute('fill', 'none');
      closeSvg.setAttribute('stroke', 'currentColor');
      closeSvg.setAttribute('stroke-width', '2');
      closeSvg.setAttribute('stroke-linecap', 'round');
      closeSvg.setAttribute('stroke-linejoin', 'round');
      const closeLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      closeLine1.setAttribute('x1', '18');
      closeLine1.setAttribute('y1', '6');
      closeLine1.setAttribute('x2', '6');
      closeLine1.setAttribute('y2', '18');
      const closeLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      closeLine2.setAttribute('x1', '6');
      closeLine2.setAttribute('y1', '6');
      closeLine2.setAttribute('x2', '18');
      closeLine2.setAttribute('y2', '18');
      closeSvg.appendChild(closeLine1);
      closeSvg.appendChild(closeLine2);
      closeBtn.appendChild(closeSvg);
      closeBtn.setAttribute('aria-label', 'Close species details');
      modalContent.appendChild(closeBtn);

      // Modal body
      const body = document.createElement('div');
      body.className = 'modal-body';

      const header = document.createElement('div');
      header.className = 'modal-header';

      const modalTitle = document.createElement('h2');
      modalTitle.className = 'modal-title';
      modalTitle.textContent = species.name;
      header.appendChild(modalTitle);

      const subtitle = document.createElement('div');
      subtitle.className = 'modal-subtitle';
      const modalStatus = document.createElement('span');
      modalStatus.className = 'modal-status';
      modalStatus.textContent = species.status;
      const sciName = document.createElement('span');
      sciName.className = 'modal-scientific-name';
      sciName.textContent = species.scientificName;
      subtitle.appendChild(modalStatus);
      subtitle.appendChild(sciName);
      header.appendChild(subtitle);
      body.appendChild(header);

      const modalDesc = document.createElement('p');
      modalDesc.className = 'modal-description';
      modalDesc.textContent = species.description;
      body.appendChild(modalDesc);

      // Threats section
      const threats = document.createElement('div');
      threats.className = 'modal-threats';
      const threatsTitle = document.createElement('h3');
      threatsTitle.className = 'threats-title';
      threatsTitle.textContent = 'Conservation Challenges';
      threats.appendChild(threatsTitle);

      const threatsList = document.createElement('ul');
      threatsList.className = 'threats-list';
      species.threats.forEach(threat => {
        const li = document.createElement('li');
        li.textContent = threat;
        threatsList.appendChild(li);
      });
      threats.appendChild(threatsList);
      body.appendChild(threats);

      modalContent.appendChild(body);
      this.modal.appendChild(modalContent);

      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      this.escapeHandler = (e) => { if (e.key === 'Escape') this.closeModal(); };
      document.addEventListener('keydown', this.escapeHandler);
      this.focusTrapHandler = (e) => {
        if (e.key === 'Tab') {
          const focusable = this.modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', this.focusTrapHandler);
      gameAnalytics.trackSpeciesView(species.name);
    } catch (error) {
      logError('Gallery.showSpeciesDetails', error);
    }
  }

  /** Set up IntersectionObserver to trigger fade-in on the gallery section. */
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

    observer.observe(document.getElementById('endangered-species'));
  }
}
