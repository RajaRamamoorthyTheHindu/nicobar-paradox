import React, { useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import { useInView } from 'react-intersection-observer';
import { Layers, Eye, EyeOff } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFqYXJhbWFtb29ydGh5IiwiYSI6ImNtNzMxZm16NDBmbWoyb3B2NTVtMGNqaGYifQ.2sGBMZyL7BnNf8SxRxYS8w';

// GeoJSON data for different development zones
const layerData = {
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
      {
        type: 'Feature',
        properties: {
          name: 'Indigenous Settlement',
          type: 'settlement'
        },
        geometry: {
          type: 'Point',
          coordinates: [93.85, 6.85]
        }
      }
    ]
  },
  current: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Construction Zone',
          type: 'development'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.75, 6.75],
            [93.85, 6.75],
            [93.85, 6.85],
            [93.75, 6.85],
            [93.75, 6.75]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          name: 'Port Site',
          type: 'port'
        },
        geometry: {
          type: 'Point',
          coordinates: [93.8, 6.8]
        }
      }
    ]
  },
  future: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Urban Development',
          type: 'urban'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [93.7, 6.7],
            [93.9, 6.7],
            [93.9, 6.9],
            [93.7, 6.9],
            [93.7, 6.7]
          ]]
        }
      }
    ]
  }
};

const layers = [
  {
    id: 'pristine',
    name: 'Pristine Ecosystem (Pre-2020)',
    color: '#2ecc71',
    description: 'Dense forests and indigenous settlements',
    layerStyle: {
      fill: {
        'fill-color': '#2ecc71',
        'fill-opacity': 0.4
      },
      line: {
        'line-color': '#2ecc71',
        'line-width': 2
      },
      symbol: {
        'icon-image': 'village',
        'icon-size': 1.5,
        'text-field': ['get', 'name'],
        'text-offset': [0, 1.5],
        'text-anchor': 'top'
      }
    }
  },
  {
    id: 'current',
    name: 'Current Development (2024)',
    color: '#e74c3c',
    description: 'Ongoing construction and deforestation',
    layerStyle: {
      fill: {
        'fill-color': '#e74c3c',
        'fill-opacity': 0.4
      },
      line: {
        'line-color': '#e74c3c',
        'line-width': 2
      },
      symbol: {
        'icon-image': 'harbor',
        'icon-size': 1.5,
        'text-field': ['get', 'name'],
        'text-offset': [0, 1.5],
        'text-anchor': 'top'
      }
    }
  },
  {
    id: 'future',
    name: 'Projected Future (2035)',
    color: '#95a5a6',
    description: 'Urbanized coastline and infrastructure',
    layerStyle: {
      fill: {
        'fill-color': '#95a5a6',
        'fill-opacity': 0.4
      },
      line: {
        'line-color': '#95a5a6',
        'line-width': 2
      }
    }
  }
];

const MapComponent: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [viewState, setViewState] = useState({
    latitude: 6.8,
    longitude: 93.8,
    zoom: 12,
    bearing: 0,
    pitch: 45
  });

  const [activeLayers, setActiveLayers] = useState(['pristine']);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <section id="map" className="bg-white py-24">
      <div 
        ref={ref}
        className={`container mx-auto px-4 opacity-0 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The Vanishing Nicobar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the transformation of Great Nicobar Island through different time periods.
            Toggle layers to visualize the impact of development on this pristine ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-6 h-6 text-[#B7080D]" />
                <h3 className="text-xl font-bold text-gray-900">Map Layers</h3>
              </div>
              
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-all ${
                    activeLayers.includes(layer.id)
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-left text-gray-900">{layer.name}</p>
                    <p className="text-sm text-gray-600 text-left">{layer.description}</p>
                  </div>
                  {activeLayers.includes(layer.id) ? (
                    <Eye className="w-5 h-5 text-[#B7080D]" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-3/4 h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/satellite-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
              style={{ width: '100%', height: '100%' }}
            >
              {layers.map(layer => (
                activeLayers.includes(layer.id) && (
                  <Source
                    key={layer.id}
                    type="geojson"
                    data={layerData[layer.id as keyof typeof layerData]}
                  >
                    <Layer
                      id={`${layer.id}-fill`}
                      type="fill"
                      paint={layer.layerStyle.fill}
                    />
                    <Layer
                      id={`${layer.id}-line`}
                      type="line"
                      paint={layer.layerStyle.line}
                    />
                    {layer.layerStyle.symbol && (
                      <Layer
                        id={`${layer.id}-symbol`}
                        type="symbol"
                        layout={layer.layerStyle.symbol}
                      />
                    )}
                  </Source>
                )
              ))}
            </Map>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Note: This visualization uses satellite imagery to show the approximate impact zones.
          Actual development areas may vary.
        </div>
      </div>
    </section>
  );
};

export default MapComponent;