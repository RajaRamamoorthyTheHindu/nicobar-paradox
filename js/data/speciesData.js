/**
 * Endangered species data for the gallery section.
 * @module speciesData
 */

/**
 * @typedef {Object} Species
 * @property {string} name - Common name of the species.
 * @property {string} scientificName - Scientific (Latin) name.
 * @property {string} status - IUCN conservation status.
 * @property {string} category - Habitat category (marine, terrestrial, avian).
 * @property {string} image - URL or path to species image.
 * @property {string} shortDescription - Brief description for card display.
 * @property {string} description - Full description for modal display.
 * @property {string[]} threats - List of conservation threats.
 */

// Species data for the endangered species gallery
/** @type {Species[]} */
export const speciesData = [
  {
    id: 1,
    name: 'Nicobar Megapode',
    scientificName: 'Megapodius nicobariensis',
    category: 'avian',
    status: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0',
    shortDescription: 'A unique ground-dwelling bird known for building massive mound nests.',
    description: 'The Nicobar Megapode is a remarkable bird species endemic to the Nicobar Islands. These birds are known for their unique nesting behavior, where they construct large mounds of soil and vegetation that can reach several meters in height. These mounds serve as natural incubators for their eggs.',
    threats: [
      'Habitat loss due to coastal development',
      'Predation by introduced species',
      'Climate change affecting nesting sites',
      'Human disturbance of nesting grounds'
    ]
  },
  // ... [Previous species data entries remain unchanged]
];