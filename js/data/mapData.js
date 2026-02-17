/**
 * Geographic data and layer definitions for the interactive map.
 * @module mapData
 */

/**
 * @typedef {Object} MapLayer
 * @property {string} id - Unique layer identifier.
 * @property {string} name - Display name.
 * @property {string} description - Layer description.
 * @property {string} color - Hex color for map rendering.
 */

// Geographic data for the Mapbox interactive map
/** @type {Object<string, Object>} GeoJSON data keyed by layer ID. */
export const mapData = {
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

/** @type {MapLayer[]} */
export const mapLayers = [
  {
    id: 'pristine',
    name: 'Pristine Ecosystem (Pre-2020)',
    color: '#2ecc71',
    description: 'Dense forests and indigenous settlements'
  },
  // ... [Previous layer definitions remain unchanged]
];