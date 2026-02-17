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

    const img = document.createElement('img');
    img.src = species.image;
    img.alt = species.name;
    img.className = 'species-image';
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'species-overlay';
    card.appendChild(overlay);

    const info = document.createElement('div');
    info.className = 'species-info';

    const name = document.createElement('h3');
    name.className = 'species-name';
    name.textContent = species.name;
    info.appendChild(name);

    const desc = document.createElement('p');
    desc.className = 'species-description';
    desc.textContent = species.shortDescription;
    info.appendChild(desc);

    const status = document.createElement('div');
    status.className = 'species-status';
    const statusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    statusSvg.setAttribute('width', '16');
    statusSvg.setAttribute('height', '16');
    statusSvg.setAttribute('viewBox', '0 0 24 24');
    statusSvg.setAttribute('fill', 'none');
    statusSvg.setAttribute('stroke', 'currentColor');
    statusSvg.setAttribute('stroke-width', '2');
    statusSvg.setAttribute('stroke-linecap', 'round');
    statusSvg.setAttribute('stroke-linejoin', 'round');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '10');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('y1', '8');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y2', '12');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '12');
    line2.setAttribute('y1', '16');
    line2.setAttribute('x2', '12.01');
    line2.setAttribute('y2', '16');
    statusSvg.appendChild(circle);
    statusSvg.appendChild(line1);
    statusSvg.appendChild(line2);
    status.appendChild(statusSvg);
    status.appendChild(document.createTextNode(species.status));
    info.appendChild(status);

    card.appendChild(info);

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
    if (window.gameAnalytics) {
      window.gameAnalytics.trackSpeciesView(species.name);
    }
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