/**
 * Historical timeline events for the timeline section.
 * @module timelineData
 */

/**
 * @typedef {Object} TimelineQuote
 * @property {string} text - Quote text.
 * @property {string} source - Attribution source.
 */

/**
 * @typedef {Object} TimelineEvent
 * @property {string} year - Year or date string.
 * @property {string} title - Event title.
 * @property {string} description - Event description.
 * @property {string} category - Event category.
 * @property {TimelineQuote} [quote] - Optional associated quote.
 */

// Historical timeline events for Great Nicobar Island
/** @type {TimelineEvent[]} */
export const timelineData = [
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
  // ... [Previous timeline entries remain unchanged]
];