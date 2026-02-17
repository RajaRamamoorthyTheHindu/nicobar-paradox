import type { Species } from '../../types';

export const speciesData: Species[] = [
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
  {
    id: 2,
    name: 'Leatherback Sea Turtle',
    scientificName: 'Dermochelys coriacea',
    category: 'marine',
    status: 'Critically Endangered',
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',
    shortDescription: 'The largest of all living turtles, facing multiple threats to survival.',
    description: 'The Leatherback Sea Turtle is the largest of all living turtles and is easily distinguished by its lack of a bony shell. Instead, it has a leather-like carapace. Great Nicobar\'s beaches are crucial nesting sites for these magnificent creatures.',
    threats: [
      'Beach erosion from development',
      'Light pollution disorienting hatchlings',
      'Plastic pollution in marine environments',
      'Climate change affecting nesting beaches'
    ]
  },
  {
    id: 3,
    name: 'Saltwater Crocodile',
    scientificName: 'Crocodylus porosus',
    category: 'marine',
    status: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1590691566903-692bf5ca6e88',
    shortDescription: 'Earth\'s largest living reptile, threatened by habitat destruction.',
    description: 'The Saltwater Crocodile is the largest of all living reptiles and a keystone species in the coastal ecosystems of Great Nicobar. These ancient predators play a crucial role in maintaining the ecological balance of mangrove swamps and estuaries.',
    threats: [
      'Habitat destruction from coastal development',
      'Human-wildlife conflict',
      'Pollution of waterways',
      'Loss of nesting sites'
    ]
  },
  {
    id: 4,
    name: 'Nicobar Tree Shrew',
    scientificName: 'Tupaia nicobarica',
    category: 'terrestrial',
    status: 'Endangered',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e',
    shortDescription: 'A rare mammal found only in the Nicobar Islands.',
    description: 'The Nicobar Tree Shrew is a small, agile mammal endemic to the Nicobar Islands. These fascinating creatures are more closely related to primates than to shrews and play a vital role in seed dispersal throughout the forest ecosystem.',
    threats: [
      'Deforestation',
      'Habitat fragmentation',
      'Competition from invasive species',
      'Climate change impacts on food sources'
    ]
  },
  {
    id: 5,
    name: 'Giant Robber Crab',
    scientificName: 'Birgus latro',
    category: 'terrestrial',
    status: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1590767950092-42b8362368da',
    shortDescription: 'The largest terrestrial arthropod, threatened by development.',
    description: 'The Giant Robber Crab, also known as the Coconut Crab, is the largest terrestrial arthropod in the world. These remarkable creatures can climb trees and crack coconuts with their powerful claws. They play a crucial role in seed dispersal and ecosystem maintenance.',
    threats: [
      'Habitat loss from urban development',
      'Over-harvesting for food',
      'Road mortality',
      'Loss of coastal forest habitat'
    ]
  },
  {
    id: 6,
    name: 'Great Nicobar Crake',
    scientificName: 'Rallina sp.',
    category: 'avian',
    status: 'Critically Endangered',
    image: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4',
    shortDescription: 'A critically endangered bird species endemic to Great Nicobar.',
    description: 'The Great Nicobar Crake is one of the rarest birds in the world, found only in the dense forests of Great Nicobar Island. This elusive species requires specific habitat conditions and is highly sensitive to environmental changes.',
    threats: [
      'Extensive deforestation',
      'Habitat fragmentation',
      'Predation by introduced species',
      'Climate change impacts'
    ]
  },
  {
    id: 7,
    name: 'Nicobar Flying Fox',
    scientificName: 'Pteropus faunulus',
    category: 'terrestrial',
    status: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1515865644861-8bedc4fb8344',
    shortDescription: 'A fruit bat species crucial for forest regeneration.',
    description: 'The Nicobar Flying Fox is a species of fruit bat endemic to the Nicobar Islands. These nocturnal creatures play a vital role in pollination and seed dispersal, making them crucial for forest regeneration and maintenance of biodiversity.',
    threats: [
      'Loss of roosting sites',
      'Deforestation',
      'Hunting',
      'Cyclones and extreme weather events'
    ]
  },
  {
    id: 8,
    name: 'Dugong',
    scientificName: 'Dugong dugon',
    category: 'marine',
    status: 'Critically Endangered',
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd',
    shortDescription: 'Marine mammal facing extinction due to habitat loss.',
    description: 'The Dugong, often called the "sea cow," is a marine mammal that grazes on seagrass beds around Great Nicobar. These gentle giants are crucial for maintaining healthy seagrass ecosystems, which in turn support numerous other marine species.',
    threats: [
      'Seagrass habitat destruction',
      'Boat strikes',
      'Coastal development',
      'Water pollution'
    ]
  },
  {
    id: 9,
    name: 'Andaman Day Gecko',
    scientificName: 'Phelsuma andamanensis',
    category: 'terrestrial',
    status: 'Endangered',
    image: 'https://images.unsplash.com/photo-1580541631971-a0e1861a0e4e',
    shortDescription: 'A vibrant reptile affected by habitat fragmentation.',
    description: 'The Andaman Day Gecko is a colorful species found in the Andaman and Nicobar Islands. These active, diurnal geckos are important insect controllers and indicators of ecosystem health. Their presence often signals a healthy forest environment.',
    threats: [
      'Habitat fragmentation',
      'Collection for pet trade',
      'Forest degradation',
      'Climate change impacts'
    ]
  },
  {
    id: 10,
    name: 'Nicobar Pigeon',
    scientificName: 'Caloenas nicobarica',
    category: 'avian',
    status: 'Near Threatened',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
    shortDescription: 'A stunning iridescent pigeon species facing multiple threats.',
    description: 'The Nicobar Pigeon is the closest living relative to the extinct Dodo. Known for its iridescent plumage and ground-dwelling habits, this species is vital for seed dispersal in the island\'s forests. Their presence indicates the health of the forest ecosystem.',
    threats: [
      'Habitat destruction',
      'Hunting pressure',
      'Invasive predators',
      'Loss of nesting sites'
    ]
  }
];