// Game configuration constants
window.GAME_CONSTANTS = {
  INITIAL_STATS: {
    social: 100,
    economic: 100,
    ecology: 100,
    budget: 81800
  },

  MAX_TURNS: 10,
  DEFEAT_THRESHOLD: 30,
  VICTORY_THRESHOLD: 50,

  STAT_COLORS: {
    social: 0x8E44AD,
    economic: 0xF1C40F,
    ecology: 0x2ECC71
  },

  DECISIONS: [
    {
      text: "Build Port Infrastructure",
      cost: 15000,
      effects: { social: -20, economic: 25, ecology: -30 },
      message: "Port construction accelerates, devastating marine ecosystems.",
      description: "Construct a deep-water port and shipping facilities. High economic potential but significant environmental impact."
    },
    {
      text: "Implement Conservation Measures",
      cost: 8000,
      effects: { social: -15, economic: -25, ecology: 20 },
      message: "Conservation efforts slow development, causing economic setbacks.",
      description: "Establish protected areas and wildlife corridors. Preserves ecology but slows development."
    },
    {
      text: "Expand Urban Development",
      cost: 12000,
      effects: { social: -25, economic: 30, ecology: -35 },
      message: "Urban sprawl consumes pristine forest land, communities protest.",
      description: "Build housing and commercial zones. Boosts economy but impacts local communities."
    },
    {
      text: "Focus on Social Programs",
      cost: 5000,
      effects: { social: 20, economic: -20, ecology: -15 },
      message: "Social initiatives delay project timelines, investors concerned.",
      description: "Invest in community welfare and relocation support. Improves social metrics but costly."
    }
  ]
};
