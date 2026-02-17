import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

interface TimelineEventProps {
  year: number;
  title: string;
  description: string;
  image?: string;
  quote?: {
    text: string;
    author: string;
  };
  isLeft?: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  year,
  title,
  description,
  image,
  quote,
  isLeft = false,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`flex items-center gap-8 my-16 opacity-0 transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'translate-y-10'
      } ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className="w-1/2">
        <div className={`text-right ${!isLeft && 'text-left'}`}>
          <span className="text-2xl font-bold text-[#B7080D]">{year}</span>
          <h3 className="text-xl font-bold mt-2 mb-4 text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          {quote && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
              <Quote className="w-6 h-6 text-[#B7080D] mb-2" />
              <p className="italic text-gray-700">{quote.text}</p>
              <p className="text-sm text-[#B7080D] mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex-shrink-0 w-4 h-4 bg-[#B7080D] rounded-full">
        <div className="absolute w-1 h-32 bg-[#B7080D]/20 left-1/2 -translate-x-1/2 -z-10"></div>
      </div>

      {image && (
        <div className="w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TimelineEvent;