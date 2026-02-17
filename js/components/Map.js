class Map {
  constructor() {
    this.mapbox = null;
    this.activeLayers = ['pristine'];
    this.init();
  }

  init() {
    // Wait for Mapbox GL JS to load
    if (typeof mapboxgl === 'undefined') {
      const script = document.querySelector('script[src*="mapbox-gl"]');
      if (script) {
        script.addEventListener('load', () => this.initMap());
      }
    } else {
      this.initMap();
    }
    this.createControls();
    this.observeSection();
  }

  initMap() {
    if (!mapboxgl) {
      console.error('Mapbox GL JS not loaded');
      return;
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFqYXJhbWFtb29ydGh5IiwiYSI6ImNtNzMxZm16NDBmbWoyb3B2NTVtMGNqaGYifQ.2sGBMZyL7BnNf8SxRxYS8w';
    
    this.mapbox = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [93.8, 6.8],
      zoom: 12,
      pitch: 45
    });

    this.mapbox.on('load', () => this.addLayers());
  }

  addLayers() {
    if (!this.mapbox) return;

    Object.entries(window.mapData).forEach(([id, data]) => {
      this.mapbox.addSource(id, {
        type: 'geojson',
        data
      });

      // Add layers for the source
      this.addLayerStyles(id);
    });
  }

  addLayerStyles(id) {
    if (!this.mapbox) return;

    const layer = window.mapLayers.find(l => l.id === id);
    if (!layer) return;

    this.mapbox.addLayer({
      id: `${id}-fill`,
      type: 'fill',
      source: id,
      paint: {
        'fill-color': layer.color,
        'fill-opacity': 0.4
      }
    });

    this.mapbox.addLayer({
      id: `${id}-line`,
      type: 'line',
      source: id,
      paint: {
        'line-color': layer.color,
        'line-width': 2
      }
    });
  }

  createControls() {
    const container = document.getElementById('layer-controls');
    if (!container) return;
    
    window.mapLayers.forEach(layer => {
      const button = this.createLayerButton(layer);
      container.appendChild(button);
    });
  }

  createLayerButton(layer) {
    const button = document.createElement('button');
    button.className = `layer-button ${this.activeLayers.includes(layer.id) ? 'active' : ''}`;
    button.innerHTML = `
      <div class="layer-info">
        <div class="layer-name">${layer.name}</div>
        <div class="layer-description">${layer.description}</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="layer-icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
    `;
    
    button.addEventListener('click', () => this.toggleLayer(layer.id));
    return button;
  }

  toggleLayer(layerId) {
    if (!this.mapbox) return;

    const visibility = this.mapbox.getLayoutProperty(`${layerId}-fill`, 'visibility');
    const newVisibility = visibility === 'visible' ? 'none' : 'visible';

    this.mapbox.setLayoutProperty(`${layerId}-fill`, 'visibility', newVisibility);
    this.mapbox.setLayoutProperty(`${layerId}-line`, 'visibility', newVisibility);

    const button = document.querySelector(`[data-layer="${layerId}"]`);
    if (button) {
      button.classList.toggle('active');
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

    const section = document.getElementById('map-section');
    if (section) {
      observer.observe(section);
    }
  }
}

// Make Map class globally available
window.Map = Map;