// Make data globally available
window.mapData = {
  pristine: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Forest Reserve',
          type: 'protected'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.8, 6.8],
            [93.9, 6.8],
            [93.9, 6.9],
            [93.8, 6.9],
            [93.8, 6.8]
          ]]
        }
      },
      // ... [Previous map features remain unchanged]
    ]
  }
};

window.mapLayers = [
  {
    id: 'pristine',
    name: 'Pristine Ecosystem (Pre-2020)',
    color: '#2ecc71',
    description: 'Dense forests and indigenous settlements'
  },
  // ... [Previous layer definitions remain unchanged]
];