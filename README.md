# Fleet Dashboard

A modern, responsive dashboard for managing and monitoring AI agent fleets. Built with React and Material-UI, this application provides real-time insights into agent performance, task distribution, and system analytics.

## 🚀 Features

- **Real-time Agent Monitoring**: Track agent status, performance metrics, and task completion rates
- **Task Management**: Assign, monitor, and analyze task distribution across your agent fleet
- **Analytics Dashboard**: Visualize key performance indicators and trends
- **Dark/Light Mode**: Full theme support with customizable color schemes
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Real-time Updates**: Live monitoring of agent status and task progress

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Development**:
  - Vite
  - ESLint
  - Prettier

## 🤖 Agent Types and Roles

### Task Execution Agents
- **General Purpose Agents**: Handle a variety of common tasks
- **Specialized Agents**: Focus on specific task types or domains
- **Learning Agents**: Adapt and improve performance over time

### System Agents
- **Dispatcher**: Manages task distribution and assignment
- **Monitor**: Tracks system health and agent performance
- **Analyzer**: Processes performance data and generates insights

## 📊 Analytics Features

- **Weekly Task Trends**: Track task completion rates over time
- **Task Distribution**: Visualize task type allocation
- **Agent Performance**: Monitor individual agent metrics
- **System Health**: Track overall fleet performance

## 🏗️ Project Structure

```
fleet-dashboard/
├── src/
│   ├── components/
│   │   ├── Agents/         # Agent-related components
│   │   ├── Analytics/      # Analytics and charts
│   │   ├── Dashboard/      # Main dashboard views
│   │   ├── Layout/         # Layout components
│   │   └── Navigation/     # Navigation components
│   ├── contexts/           # React contexts
│   ├── theme/              # Theme configuration
│   ├── utils/              # Utility functions
│   └── App.jsx            # Main application component
├── public/                # Static assets
└── vite.config.js        # Vite configuration
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fleet-dashboard.git
   cd fleet-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Theme Configuration
The application supports both light and dark modes. Theme settings can be customized in `src/theme/index.js`.

### Agent Configuration
Agent settings and roles can be configured through the dashboard interface or by modifying the configuration files in the agents directory.

## 📈 Performance Monitoring

The dashboard provides several key metrics for monitoring:

- **Agent Status**: Active/Inactive/Error states
- **Task Completion Rate**: Success/failure ratios
- **Response Time**: Average task completion time
- **Resource Usage**: CPU/Memory utilization
- **Error Rates**: Frequency and types of failures

## 🔐 Security

- **Authentication**: Secure login system
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted communication
- **Audit Logs**: Comprehensive activity tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Mark Hustad** - *Initial work* - [GitHub Profile](https://github.com/markhustad)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the amazing framework
- All contributors who have helped shape this project
