import React from 'react';
import TimelineEvent from './TimelineEvent';
import { useInView } from 'react-intersection-observer';
import type { TimelineEvent as TimelineEventType } from '../../types';

const timelineEvents: TimelineEventType[] = [
  {
    year: 1950,
    title: "Pre-Colonial Era: Indigenous Harmony",
    description: "The Shompen and Nicobarese people lived in harmony with the pristine forests of Great Nicobar, developing sustainable practices over generations.",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
    quote: {
      text: "Our ancestors taught us to take only what we need, to respect the forest that gives us life.",
      author: "Tribal Elder (Historical Record)"
    }
  },
  {
    year: 1980,
    title: "Conservation Era Begins",
    description: "Great Nicobar was recognized as a UNESCO Biosphere Reserve, acknowledging its unique biodiversity and ecological importance.",
    image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5"
  },
  {
    year: 2016,
    title: "Mega Project Proposal",
    description: "The ₹81,800 crore Great Nicobar development project is proposed, promising economic growth through ports and infrastructure.",
    image: "https://images.unsplash.com/photo-1584931423298-c576fda54bd2",
    quote: {
      text: "This project will transform Great Nicobar into a global trading hub.",
      author: "Development Authority Statement"
    }
  },
  {
    year: 2021,
    title: "Environmental Concerns Surface",
    description: "Scientists and activists raise alarms about the project's impact on biodiversity and indigenous communities.",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf"
  },
  {
    year: 2024,
    title: "Point of No Return",
    description: "Construction begins despite legal challenges, marking the start of irreversible changes to the island's ecosystem.",
    image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b",
    quote: {
      text: "We're witnessing the destruction of one of Earth's last pristine ecosystems.",
      author: "Environmental Scientist"
    }
  }
];

const Timeline: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="timeline" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-16 opacity-0 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">A Land in Flux</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Witness the transformation of Great Nicobar through time, from an untouched paradise to a contested ground of development.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-emerald-500/20"></div>
          
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              {...event}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;