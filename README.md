# The Great Nicobar Paradox

An interactive web experience exploring the environmental and social impact of the ₹81,800 crore Great Nicobar development project. This application combines storytelling, data visualization, and interactive gaming to highlight the complex trade-offs between development and conservation.

## 🌟 Features

- **Interactive Game Simulation**: Make decisions as a project manager balancing economic, social, and environmental factors
- **Timeline Visualization**: Explore the historical transformation of Great Nicobar Island
- **Interactive Map**: Visualize the impact zones using satellite imagery and development overlays
- **Species Gallery**: Learn about endangered species threatened by the development
- **Responsive Design**: Optimized for all devices and screen sizes
- **Accessibility**: Built with web accessibility best practices

## 🛠️ Technology Stack

This project is built using **vanilla web technologies** without any frameworks:

- **HTML5**: Semantic markup with proper accessibility features
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Modular, class-based architecture
- **Mapbox GL JS**: Interactive map visualization
- **Phaser 3**: Game engine for the decision-making simulation

## 📁 Project Structure

```
├── index.html                 # Main HTML file
├── styles/                    # CSS stylesheets
│   ├── main.css              # Global styles and layout
│   ├── game.css              # Game component styles
│   ├── timeline.css          # Timeline component styles
│   ├── map.css               # Map component styles
│   └── gallery.css           # Species gallery styles
├── js/                       # JavaScript modules
│   ├── main.js               # Application entry point
│   ├── components/           # Component modules
│   │   ├── Hero.js           # Hero section component
│   │   ├── Game.js           # Game simulation component
│   │   ├── Timeline.js       # Timeline visualization
│   │   ├── Map.js            # Interactive map component
│   │   └── Gallery.js        # Species gallery component
│   ├── data/                 # Data modules
│   │   ├── speciesData.js    # Endangered species data
│   │   ├── timelineData.js   # Historical timeline data
│   │   └── mapData.js        # Geographic data for map
│   └── utils/                # Utility modules
│       └── analytics.js      # Google Analytics integration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd great-nicobar-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Use

### Interactive Game
- Navigate to the game section to start the simulation
- Manage a ₹81,800 crore budget across 10 turns
- Balance social, economic, and environmental metrics
- Make strategic decisions that affect the island's future
- Try to maintain all metrics above 50% to achieve victory

## 🎮 Game Mechanics Deep Dive

### Core Gameplay Loop

The Great Nicobar Paradox game is a turn-based decision-making simulation where players take on the role of a project manager overseeing the ₹81,800 crore development project. Each turn represents a significant phase of the project timeline.

### Resource Management

#### Budget System
- **Starting Budget**: ₹81,800 crores (based on real project allocation)
- **Budget Depletion**: Each decision costs money, reflecting real-world project expenses
- **Budget Tracking**: Real-time display of remaining funds
- **Bankruptcy Condition**: Game ends if budget reaches zero

#### Three-Pillar Metric System

**Social Impact (Purple Bar)**
- Represents community welfare, indigenous rights, and public approval
- Affected by: Community engagement, relocation programs, cultural preservation
- High Social Impact: Happy communities, preserved traditions, local support
- Low Social Impact: Displaced communities, cultural loss, public protests

**Economic Growth (Yellow Bar)**
- Represents job creation, infrastructure development, and economic benefits
- Affected by: Port construction, urban development, industrial projects
- High Economic Growth: Job opportunities, increased trade, regional prosperity
- Low Economic Growth: Limited opportunities, investor concerns, economic stagnation

**Environmental Health (Green Bar)**
- Represents ecosystem preservation, biodiversity, and ecological balance
- Affected by: Conservation measures, deforestation, marine protection
- High Environmental Health: Protected habitats, thriving wildlife, sustainable practices
- Low Environmental Health: Habitat destruction, species extinction, ecological collapse

### Decision Framework

#### Available Decisions

**1. Build Port Infrastructure**
- **Cost**: ₹15,000 crores
- **Effects**: Social -20, Economic +25, Ecology -30
- **Description**: Construct deep-water port and shipping facilities
- **Real-world Impact**: Major economic driver but devastating to marine ecosystems
- **Strategic Consideration**: High-cost, high-reward option with severe environmental consequences

**2. Implement Conservation Measures**
- **Cost**: ₹8,000 crores
- **Effects**: Social -15, Economic -25, Ecology +20
- **Description**: Establish protected areas and wildlife corridors
- **Real-world Impact**: Preserves biodiversity but slows development progress
- **Strategic Consideration**: Environmental investment that may frustrate stakeholders

**3. Expand Urban Development**
- **Cost**: ₹12,000 crores
- **Effects**: Social -25, Economic +30, Ecology -35
- **Description**: Build housing and commercial zones
- **Real-world Impact**: Creates infrastructure but consumes pristine forest land
- **Strategic Consideration**: Balanced cost with mixed social reception

**4. Focus on Social Programs**
- **Cost**: ₹5,000 crores
- **Effects**: Social +20, Economic -20, Ecology -15
- **Description**: Invest in community welfare and relocation support
- **Real-world Impact**: Improves community relations but delays project timelines
- **Strategic Consideration**: Lowest cost option for maintaining social stability

### Victory and Defeat Conditions

#### Victory Requirements (All must be met)
1. **Metric Threshold**: All three metrics (Social, Economic, Environmental) must remain above 50%
2. **Turn Completion**: Successfully complete all 10 turns
3. **Budget Management**: Maintain positive budget balance
4. **Balanced Approach**: Demonstrate sustainable development practices

#### Defeat Scenarios
1. **Social Collapse** (Social ≤ 30%): Communities revolt, project faces massive opposition
2. **Ecological Collapse** (Ecology ≤ 30%): Environmental destruction triggers legal challenges
3. **Economic Collapse** (Economic ≤ 30%): Investors withdraw, project becomes unviable
4. **Budget Depletion** (Budget ≤ 0): Financial resources exhausted, project halted
5. **Time Expiration**: Failed to maintain balance across all 10 turns

### Strategic Gameplay Elements

#### Decision Timing
- **Early Game**: Focus on establishing foundation while maintaining balance
- **Mid Game**: Navigate increasing complexity and competing demands
- **Late Game**: Manage consequences of earlier decisions while staying within budget

#### Risk vs. Reward Analysis
- **High-Cost Decisions**: Offer greater impact but limit future options
- **Balanced Decisions**: Moderate effects across multiple metrics
- **Emergency Decisions**: React to critical metric drops

#### Notification System
- **Real-time Feedback**: Immediate consequences of each decision
- **Contextual Messages**: Explain the real-world implications
- **Progress Tracking**: Visual indicators of metric changes

### Educational Objectives

#### Learning Outcomes
1. **Complexity Awareness**: Understanding the interconnected nature of development decisions
2. **Trade-off Recognition**: Realizing that every choice has multiple consequences
3. **Stakeholder Perspective**: Appreciating different viewpoints (economic, social, environmental)
4. **Resource Constraints**: Managing limited budgets in large-scale projects
5. **Long-term Thinking**: Considering cumulative effects over time

#### Real-world Parallels
- **Actual Budget**: Game budget matches real project allocation
- **Realistic Consequences**: Effects mirror documented environmental and social impacts
- **Stakeholder Conflicts**: Decisions reflect real tensions between development and conservation
- **Time Pressure**: Turn-based system simulates project timeline constraints

### Difficulty and Accessibility

#### Difficulty Scaling
- **Beginner-Friendly**: Clear instructions and tooltips
- **Strategic Depth**: Multiple viable approaches to victory
- **Replayability**: Different strategies lead to different outcomes

#### Accessibility Features
- **Visual Indicators**: Color-coded metrics with numerical values
- **Hover Information**: Detailed decision descriptions
- **Progress Feedback**: Clear victory/defeat conditions
- **Restart Option**: Learn from mistakes and try new approaches

### Performance Metrics

The game tracks various metrics for educational analysis:
- **Decision Patterns**: Which choices players make most frequently
- **Success Rates**: Percentage of players achieving victory
- **Failure Points**: Common scenarios leading to defeat
- **Engagement Time**: How long players spend with the simulation

This comprehensive game system transforms complex environmental and development issues into an engaging, educational experience that highlights the real challenges faced in balancing progress with preservation.

### Timeline Explorer
- Scroll through the timeline to see historical events
- View images and quotes from different time periods
- Understand the progression from pristine ecosystem to development zone

### Interactive Map
- Toggle different map layers to see development impact
- Compare pristine ecosystem vs. current vs. projected future states
- Explore satellite imagery showing real environmental changes

### Species Gallery
- Browse endangered species by category (Marine, Terrestrial, Avian)
- Click on species cards to learn detailed information
- Understand the conservation challenges each species faces

## 🌍 Environmental Impact

This project highlights the real environmental consequences of large-scale development:

- **Biodiversity Loss**: Over 650 species at risk
- **Habitat Destruction**: 166 sq km of pristine forest affected
- **Marine Ecosystem Impact**: Coral reefs and nesting beaches threatened
- **Indigenous Communities**: Traditional ways of life disrupted

## 📊 Data Sources

- Environmental Impact Assessments
- Scientific research papers
- Government project documents
- Conservation organization reports
- Satellite imagery and geographic data

## 🔧 Technical Features

### Performance Optimizations
- Lazy loading of images and components
- Efficient DOM manipulation
- Optimized asset delivery
- Responsive image handling

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement
- Graceful degradation for older browsers
- Mobile-first responsive design

## 📈 Analytics

The application includes Google Analytics to track:
- User engagement with different sections
- Game completion rates and decision patterns
- Species gallery interactions
- Overall user journey through the experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ES6+ JavaScript standards
- Use semantic HTML5 elements
- Maintain responsive design principles
- Include proper comments and documentation
- Test across multiple browsers and devices
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Environmental scientists and researchers
- Indigenous communities of the Nicobar Islands
- Conservation organizations
- Open source community
- Mapbox for mapping services
- Phaser community for game development resources

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please open an issue on GitHub.

---

**Note**: This is an educational and awareness project. The game simulation is based on real data but simplified for interactive purposes. The actual environmental and social impacts of the Great Nicobar project are complex and ongoing.