class MapComponent {
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

    mapboxgl.accessToken = (window.__CONFIG__ && window.__CONFIG__.MAPBOX_TOKEN) || '';
    
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
    button.setAttribute('data-layer', layer.id);

    const info = document.createElement('div');
    info.className = 'layer-info';
    const name = document.createElement('div');
    name.className = 'layer-name';
    name.textContent = layer.name;
    const desc = document.createElement('div');
    desc.className = 'layer-description';
    desc.textContent = layer.description;
    info.appendChild(name);
    info.appendChild(desc);
    button.appendChild(info);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.classList.add('layer-icon');
    const eyePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    eyePath.setAttribute('d', 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z');
    const eyeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    eyeCircle.setAttribute('cx', '12');
    eyeCircle.setAttribute('cy', '12');
    eyeCircle.setAttribute('r', '3');
    svg.appendChild(eyePath);
    svg.appendChild(eyeCircle);
    button.appendChild(svg);

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

// Make MapComponent class globally available
window.MapComponent = MapComponent;