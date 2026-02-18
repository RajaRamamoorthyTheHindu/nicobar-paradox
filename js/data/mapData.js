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
        properties: { name: 'Campbell Bay National Park', type: 'protected' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.78, 6.82], [93.84, 6.82], [93.88, 6.85],
            [93.90, 6.90], [93.88, 6.94], [93.84, 6.96],
            [93.79, 6.94], [93.76, 6.90], [93.76, 6.86],
            [93.78, 6.82]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Galathea Bay Biosphere Reserve', type: 'protected' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.82, 6.75], [93.86, 6.76], [93.89, 6.78],
            [93.88, 6.82], [93.85, 6.83], [93.81, 6.82],
            [93.79, 6.79], [93.80, 6.76], [93.82, 6.75]
          ]]
        }
      }
    ]
  },
  development: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Proposed Transshipment Port', type: 'port' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.83, 6.76], [93.87, 6.76], [93.88, 6.79],
            [93.86, 6.81], [93.83, 6.80], [93.82, 6.78],
            [93.83, 6.76]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Proposed International Airport', type: 'airport' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.80, 6.86], [93.84, 6.86], [93.85, 6.88],
            [93.84, 6.90], [93.80, 6.90], [93.79, 6.88],
            [93.80, 6.86]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Proposed Township', type: 'township' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.84, 6.88], [93.87, 6.88], [93.88, 6.91],
            [93.87, 6.93], [93.84, 6.92], [93.83, 6.90],
            [93.84, 6.88]
          ]]
        }
      }
    ]
  },
  tribal: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Shompen Tribal Reserve', type: 'indigenous' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.78, 6.84], [93.83, 6.83], [93.86, 6.86],
            [93.87, 6.90], [93.85, 6.94], [93.82, 6.95],
            [93.78, 6.93], [93.76, 6.89], [93.78, 6.84]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Nicobarese Settlements', type: 'indigenous' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.80, 6.78], [93.83, 6.78], [93.84, 6.80],
            [93.83, 6.83], [93.80, 6.83], [93.79, 6.81],
            [93.80, 6.78]
          ]]
        }
      }
    ]
  },
  impact: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Leatherback Turtle Nesting Site', type: 'ecological' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.82, 6.74], [93.88, 6.74], [93.89, 6.77],
            [93.87, 6.79], [93.83, 6.79], [93.81, 6.77],
            [93.82, 6.74]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Coral Reef Systems', type: 'ecological' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.75, 6.80], [93.78, 6.78], [93.80, 6.80],
            [93.79, 6.84], [93.76, 6.85], [93.74, 6.83],
            [93.75, 6.80]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'Mangrove Ecosystem', type: 'ecological' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.86, 6.92], [93.90, 6.91], [93.92, 6.93],
            [93.91, 6.96], [93.88, 6.96], [93.86, 6.94],
            [93.86, 6.92]
          ]]
        }
      }
    ]
  }
};

/** @type {MapLayer[]} */
export const mapLayers = [
  {
    id: 'pristine',
    name: 'Pristine Ecosystem',
    color: '#2ecc71',
    description: 'Protected forests and biosphere reserves'
  },
  {
    id: 'development',
    name: 'Proposed Development',
    color: '#e74c3c',
    description: 'Port, airport, and township zones'
  },
  {
    id: 'tribal',
    name: 'Indigenous Territories',
    color: '#9b59b6',
    description: 'Shompen and Nicobarese settlements'
  },
  {
    id: 'impact',
    name: 'Ecological Impact Zones',
    color: '#f39c12',
    description: 'Nesting sites, coral reefs, and mangroves'
  }
];
