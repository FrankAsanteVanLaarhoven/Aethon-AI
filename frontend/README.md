# 🚀 Strategic AI Platform - Palantir-Inspired Frontend

A world-class, ultra-minimalist business intelligence platform built with Next.js 14, TypeScript, and Tailwind CSS. Featuring a Palantir-inspired gun metal design system with Tesla-like typography, advanced data visualization tools, and AWS super admin capabilities for enterprise-scale strategic intelligence.

## ✨ Features

### 🎯 **Core Features**
- **Strategic Dashboard**: Interactive chessboard with competitive landscape visualization
- **Multi-Agent Orchestration**: Real-time monitoring of AI agents with performance analytics
- **Intelligence Feed**: Live competitive intelligence with threat detection
- **Advanced Simulations**: Monte Carlo analysis and scenario planning
- **Comprehensive Analytics**: Market analysis, performance metrics, and predictive insights

### 🔬 **Revolutionary Features**
- **ARPE**: Autonomous Regulatory Prophecy Engine
- **QESO**: Quantum-Enhanced Strategic Optimization
- **ABME**: Autonomous Business Model Execution
- **SNSE**: Sovereign National Security Engine

### 🎨 **Palantir-Inspired Design System**
- **Ultra-Minimalist Interface**: Gun metal black and white aesthetic
- **Tesla-Like Typography**: Clean, modern font system with perfect spacing
- **Dark Theme Optimized**: Sleek black background with white text
- **Neon Accents**: Subtle neon highlights for status indicators
- **Glass Morphism**: Subtle backdrop blur effects
- **Responsive Design**: Fully adaptive to any screen size
- **Accessibility**: WCAG 2.1 AA compliant with high contrast ratios

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Palantir-inspired design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Zustand + TanStack Query
- **Real-time**: WebSocket integration with auto-reconnection
- **Data Visualization**: Plotly.js, D3.js, Observable Plot, Deck.gl
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion with minimalist transitions
- **Icons**: Lucide React
- **Performance**: React Window, React Virtualized
- **Error Handling**: React Error Boundary

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
   NEXT_PUBLIC_WS_URL="ws://localhost:8000/ws"
   NEXT_PUBLIC_APP_NAME="Strategic AI Platform"
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Main dashboard page
│   ├── intelligence/            # Intelligence monitoring
│   ├── agents/                  # Agent management
│   ├── simulations/             # Simulation engine
│   ├── analytics/               # Analytics dashboard
│   ├── revolutionary-features/  # Revolutionary features
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirects to dashboard)
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── intelligence/        # Intelligence components
│   │   ├── agents/              # Agent components
│   │   ├── simulations/         # Simulation components
│   │   ├── analytics/           # Analytics components
│   │   └── revolutionary-features/ # Revolutionary features
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Helper utilities
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```

## 🎨 Design System

### Color Palette
- **Strategic Blue**: Primary brand color
- **Intelligence Green**: Success and positive indicators
- **Quantum Purple**: Advanced features and processing
- **Sovereign Red**: Critical alerts and security features

### Typography
- **Primary Font**: Inter (system fallback)
- **Monospace**: JetBrains Mono

### Components
- **Premium Cards**: Glass-morphism effects with subtle shadows
- **Interactive Elements**: Smooth transitions and hover effects
- **Status Indicators**: Color-coded with animations
- **Data Visualizations**: Clean, modern charts and graphs

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🌐 Pages & Features

### 📊 Dashboard (`/dashboard`)
- Strategic chessboard with competitive landscape
- Multi-agent orchestration panel
- Real-time intelligence feed
- Performance analytics

### 🧠 Intelligence (`/intelligence`)
- Competitive intelligence monitoring
- Threat detection and alerts
- Source tracking and verification
- Intelligence analytics

### 🤖 Agents (`/agents`)
- Agent status and performance monitoring
- Task management and assignment
- Performance analytics and logs
- Agent control panel

### 🎯 Simulations (`/simulations`)
- Scenario builder and planning
- Monte Carlo analysis
- Game theory optimization
- Simulation results visualization

### 📈 Analytics (`/analytics`)
- Performance metrics dashboard
- Market analysis and trends
- Competitive intelligence
- Predictive analytics

### ⚡ Revolutionary Features (`/revolutionary-features`)
- ARPE: Autonomous Regulatory Prophecy Engine
- QESO: Quantum-Enhanced Strategic Optimization
- ABME: Autonomous Business Model Execution
- SNSE: Sovereign National Security Engine

## 🔌 API Integration

The frontend integrates with the Strategic AI Platform backend through:

- **REST API**: For data fetching and CRUD operations
- **WebSocket**: For real-time updates and live data streaming
- **GraphQL**: For complex queries (future enhancement)

### API Endpoints
- `/api/v1/companies` - Company data
- `/api/v1/agents` - Agent management
- `/api/v1/intelligence` - Intelligence feed
- `/api/v1/simulations` - Simulation engine
- `/api/v1/analytics` - Analytics data
- `/ws` - WebSocket connection

## 🎯 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: React Query for intelligent data caching
- **Lazy Loading**: Component and route lazy loading
- **Service Worker**: PWA capabilities (future enhancement)

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers
- **XSS Protection**: Built-in XSS protection
- **CSRF Protection**: CSRF token validation
- **Environment Variables**: Secure configuration management
- **Authentication**: JWT-based authentication (future enhancement)

## 🧪 Testing

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Playwright (future enhancement)
- **Visual Regression**: Chromatic (future enhancement)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop interface
- **Touch Support**: Touch-friendly interactions

## 🌍 Internationalization

- **Multi-language Support**: i18n ready (future enhancement)
- **RTL Support**: Right-to-left language support
- **Localization**: Date, number, and currency formatting

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t strategic-ai-frontend .
docker run -p 3000:3000 strategic-ai-frontend
```

### Static Export
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For support and questions:
- **Documentation**: [Internal Wiki]
- **Issues**: [GitHub Issues]
- **Email**: support@strategicai.com

---

**Strategic AI Platform** - Revolutionizing business intelligence with AI-powered insights and autonomous execution.