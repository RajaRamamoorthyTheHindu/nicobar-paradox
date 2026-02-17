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