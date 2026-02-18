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