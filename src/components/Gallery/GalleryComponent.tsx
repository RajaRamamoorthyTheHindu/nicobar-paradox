import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { X, ExternalLink, AlertCircle, BookOpen } from 'lucide-react';
import { speciesData } from './speciesData';
import type { Species } from '../../types';

const GalleryComponent: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const modalRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'all', label: 'All Species' },
    { id: 'marine', label: 'Marine' },
    { id: 'terrestrial', label: 'Terrestrial' },
    { id: 'avian', label: 'Avian' }
  ];

  const filteredSpecies = activeFilter === 'all' 
    ? speciesData 
    : speciesData.filter(species => species.category === activeFilter);

  const handleSpeciesClick = (species: Species) => {
    setSelectedSpecies(species);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedSpecies(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <section id="endangered-species" className="bg-white py-24">
      <div 
        ref={ref}
        className={`container mx-auto px-4 opacity-0 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Vanishing Treasures</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the extraordinary creatures of Great Nicobar, each fighting for survival
            against the tide of development.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#B7080D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => handleSpeciesClick(species)}
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={species.image}
                  alt={species.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{species.name}</h3>
                  <p className="text-gray-200 text-sm line-clamp-2">{species.shortDescription}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-[#B7080D] px-3 py-1 rounded-full">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium text-white">{species.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Section - Updated */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-[#B7080D]" />
            <h3 className="text-2xl font-bold text-gray-900">Dive Deeper</h3>
          </div>
          
          <p className="text-gray-600 mb-8">
            Explore comprehensive coverage of the Great Nicobar development project and its impact on this unique ecosystem:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://frontline.thehindu.com/environment/great-nicobar-infrastructure-environmental-tragedy/article69158497.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-[#B7080D] transition-all"
            >
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#B7080D] mb-2">
                Environmental Impact
              </h4>
              <p className="text-gray-600 mb-4">
                A comprehensive look at the environmental consequences of the infrastructure project.
              </p>
              <div className="flex items-center text-[#B7080D] font-medium">
                Read Article <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href="https://frontline.thehindu.com/environment/great-nicobar-project-campbell-bay-transshipment-terminal-galathea-bay-infrastructure-project/article69159231.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-[#B7080D] transition-all"
            >
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#B7080D] mb-2">
                Infrastructure Details
              </h4>
              <p className="text-gray-600 mb-4">
                Detailed analysis of the proposed development plans and their implications.
              </p>
              <div className="flex items-center text-[#B7080D] font-medium">
                Read Article <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href="https://frontline.thehindu.com/environment/great-nicobar-island-andaman-ecological-development-coral-reefs-marine-ecosystems-climate-change/article69158539.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-[#B7080D] transition-all"
            >
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#B7080D] mb-2">
                Ecological Consequences
              </h4>
              <p className="text-gray-600 mb-4">
                Examining the long-term effects on coral reefs and marine ecosystems.
              </p>
              <div className="flex items-center text-[#B7080D] font-medium">
                Read Article <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>

            <a
              href="https://frontline.thehindu.com/environment/great-nicobar-project-endangered-species-saltwater-crocodile-species-wildlife/article69150433.ece"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-[#B7080D] transition-all"
            >
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#B7080D] mb-2">
                Wildlife Impact
              </h4>
              <p className="text-gray-600 mb-4">
                Understanding the threats to endangered species and their habitats.
              </p>
              <div className="flex items-center text-[#B7080D] font-medium">
                Read Article <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>
          </div>
        </div>

        {/* Modal */}
        {selectedSpecies && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleModalClick}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedSpecies.image}
                  alt={selectedSpecies.name}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedSpecies.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#B7080D] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedSpecies.status}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {selectedSpecies.scientificName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-6">{selectedSpecies.description}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Conservation Challenges
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {selectedSpecies.threats.map((threat, index) => (
                        <li key={index}>{threat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryComponent;