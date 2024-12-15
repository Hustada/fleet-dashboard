# Fleet Dashboard

A modern, sci-fi themed dashboard for managing and monitoring AI agent fleets. Built with React, Material-UI, and Framer Motion, featuring a responsive design that works seamlessly across desktop and mobile devices.

![Fleet Dashboard](screenshot.png)

## 🚀 Features

- **Real-time Agent Monitoring**
  - Live status indicators with sci-fi inspired animations
  - Performance metrics and resource utilization
  - Interactive data visualization

- **Project Management**
  - Responsive project cards with status indicators
  - Infinite scroll on mobile devices
  - Pagination on desktop views
  - Quick search and filtering

- **Modern UI/UX**
  - Sci-fi inspired design language
  - Dark/Light theme support
  - Smooth animations and transitions
  - Particle effects background
  - Responsive layout for all devices

- **Navigation**
  - Animated mobile drawer
  - Permanent sidebar on desktop
  - Real-time notifications
  - Integrated chat panel

## 🛠 Tech Stack

- **Frontend Framework:** React 18
- **UI Components:** Material-UI v5
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **State Management:** React Context
- **Styling:** Emotion (MUI's styling solution)
- **Charts:** Recharts
- **Effects:** react-tsparticles

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fleet-dashboard.git

# Navigate to project directory
cd fleet-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── Dashboard/        # Main dashboard components
│   ├── Layout/           # App layout and navigation
│   ├── Navigation/       # Navigation components
│   ├── Projects/         # Project management
│   └── Common/           # Reusable components
├── theme/                # MUI theme customization
├── context/              # React context providers
├── hooks/                # Custom React hooks
└── pages/                # Main route pages
```

## 🎨 Theming

The application supports both light and dark themes with a consistent sci-fi aesthetic. Theme switching is available through the top navigation bar.

### Key Theme Features:
- Custom color palette optimized for sci-fi aesthetics
- Consistent spacing and typography system
- Smooth theme transitions
- Particle background effects

## 📱 Responsive Design

The dashboard is fully responsive with different optimizations for various screen sizes:

- **Mobile:** 
  - Drawer navigation with smooth animations
  - Infinite scroll for project lists
  - Optimized card layouts
  
- **Desktop:**
  - Permanent sidebar navigation
  - Grid-based layouts
  - Pagination for project lists

## 🔧 Development

```bash
# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📈 Performance Considerations

- Optimized bundle size with code splitting
- Lazy loading of routes and components
- Efficient state management with React Context
- Debounced search and scroll handlers
- Optimized animations with Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the amazing component library
- Framer Motion for the powerful animation system
- React team for the excellent framework

---

Built with ❤️ by [Your Name/Team]
