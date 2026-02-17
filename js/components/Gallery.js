class Gallery {
  constructor() {
    this.activeFilter = 'all';
    this.modal = document.getElementById('species-modal');
    this.init();
  }

  init() {
    this.createFilters();
    this.renderSpecies();
    this.setupModal();
    this.observeSection();
  }

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

  createFilterButton(filter) {
    const button = document.createElement('button');
    button.className = `filter-button ${filter.id === this.activeFilter ? 'active' : ''}`;
    button.textContent = filter.label;
    button.addEventListener('click', () => this.filterSpecies(filter.id));
    return button;
  }

  filterSpecies(category) {
    this.activeFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.textContent.toLowerCase().includes(category));
    });
    
    this.renderSpecies();
  }

  renderSpecies() {
    const container = document.querySelector('.species-grid');
    container.innerHTML = '';

    const filteredSpecies = this.activeFilter === 'all'
      ? window.speciesData
      : window.speciesData.filter(species => species.category === this.activeFilter);

    filteredSpecies.forEach(species => {
      const card = this.createSpeciesCard(species);
      container.appendChild(card);
    });
  }

  createSpeciesCard(species) {
    const card = document.createElement('div');
    card.className = 'species-card';
    card.innerHTML = `
      <img src="${species.image}" alt="${species.name}" class="species-image">
      <div class="species-overlay"></div>
      <div class="species-info">
        <h3 class="species-name">${species.name}</h3>
        <p class="species-description">${species.shortDescription}</p>
        <div class="species-status">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          ${species.status}
        </div>
      </div>
    `;

    card.addEventListener('click', () => this.showSpeciesDetails(species));
    return card;
  }

  setupModal() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        this.modal.classList.remove('active');
      }
    });
  }

  showSpeciesDetails(species) {
    this.modal.innerHTML = `
      <div class="modal-content species-modal-content">
        <img src="${species.image}" alt="${species.name}" class="modal-image">
        <button class="modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="modal-body">
          <div class="modal-header">
            <h2 class="modal-title">${species.name}</h2>
            <div class="modal-subtitle">
              <span class="modal-status">${species.status}</span>
              <span class="modal-scientific-name">${species.scientificName}</span>
            </div>
          </div>
          <p class="modal-description">${species.description}</p>
          <div class="modal-threats">
            <h3 class="threats-title">Conservation Challenges</h3>
            <ul class="threats-list">
              ${species.threats.map(threat => `<li>${threat}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    
    this.modal.classList.add('active');
    window.gameAnalytics.trackSpeciesView(species.name);
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

    observer.observe(document.getElementById('endangered-species'));
  }
}

// Make Gallery class globally available
window.Gallery = Gallery;