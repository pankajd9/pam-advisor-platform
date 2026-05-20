# 🔒 PAM Advisor Platform

A complete full-stack AI-powered platform for Privileged Access Management (PAM) tool recommendations, featuring a modern React frontend and a FastAPI backend with dual REST and MCP protocol support.

## 🌟 Features

- **AI-Powered Recommendations** - Intelligent PAM tool selection based on your requirements
- **Multi-Dimensional Scoring** - 8 criteria evaluation (features, compliance, scalability, budget, etc.)
- **PAM Tool Comparison** - Side-by-side comparison of leading PAM solutions
- **Architecture Advisor** - Tailored deployment architecture recommendations
- **Executive Briefings** - Generate reports for stakeholders and decision-makers
- **Dual Protocol Backend** - REST API and MCP (Model Context Protocol) support for AI agents
- **Type-Safe** - Full TypeScript frontend and Python type hints
- **Production Ready** - Optimized builds and comprehensive error handling

## 🏗️ Architecture

```
pam-advisor-platform/
├── pam_advisor_backend/        # FastAPI backend (Python)
│   ├── server.py              # Main server with REST & MCP
│   ├── services/              # Business logic layer
│   ├── models.py              # SQLAlchemy ORM models
│   └── tests/                 # Test suite
│
├── pam_advisor_frontend/       # React frontend (TypeScript)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Route pages
│   │   ├── services/         # API integration
│   │   └── types/            # TypeScript definitions
│   └── dist/                 # Production build
│
├── start.sh                   # Unix/Mac startup script
└── start.bat                  # Windows startup script
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Option 1: One-Command Start (Recommended)

#### On macOS/Linux:
```bash
./start.sh
```

#### On Windows:
```bash
start.bat
```

This will automatically:
- ✅ Install all dependencies
- ✅ Start the backend server on port 8080
- ✅ Start the frontend dev server on port 5173
- ✅ Open both in separate terminal windows

### Option 2: Manual Start

#### Start Backend:
```bash
cd pam_advisor_backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python server.py
```

#### Start Frontend (in a new terminal):
```bash
cd pam_advisor_frontend
npm install
npm run dev
```

## 🌐 Access the Application

Once started, access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/docs
- **MCP Endpoint**: http://localhost:8080/mcp

## 📚 Documentation

### Backend
See [pam_advisor_backend/README.md](pam_advisor_backend/README.md) for:
- API endpoints documentation
- MCP tools reference
- Database schema
- Testing instructions

### Frontend
See [pam_advisor_frontend/README.md](pam_advisor_frontend/README.md) for:
- Component documentation
- Styling guide
- Build instructions
- Deployment options

## 🎯 User Guide

### Using PAM Advisor

1. **Dashboard** - Overview of PAM tools and quick access to features
2. **Compare Tools** - Browse and filter 15+ PAM solutions by deployment type, pricing, and features
3. **AI Recommendations** - Get personalized PAM tool recommendations based on your requirements
4. **Architecture Advisor** - Receive tailored deployment architecture guidance

### PAM Tool Database

The platform includes comprehensive data on 15+ enterprise PAM solutions including:
- CyberArk, BeyondTrust, Delinea, Okta, Microsoft Entra, HashiCorp Vault
- AWS Secrets Manager, Azure Key Vault, Google Secret Manager
- And more leading PAM vendors

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **FastMCP** - MCP protocol support
- **SQLite** - Lightweight database
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 🧪 Testing

### Backend Tests
```bash
cd pam_advisor_backend
pytest
```

### Frontend Build Test
```bash
cd pam_advisor_frontend
npm run build
```

## 📦 Production Deployment

### Backend
```bash
cd pam_advisor_backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8080
```

### Frontend
```bash
cd pam_advisor_frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Docker Support
Both backend and frontend include Dockerfiles for containerized deployment.

## 🎨 Customization

### Change API URL
Edit `pam_advisor_frontend/.env`:
```env
VITE_API_URL=https://your-api-url.com
```

### Modify Theme Colors
Edit `pam_advisor_frontend/tailwind.config.js`:
```js
colors: {
  'cosmic-purple': '#6366F1',
  'nebula-pink': '#EC4899',
  // Add your colors
}
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed: `python --version`
- Check if port 8080 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't start
- Ensure Node.js 18+ is installed: `node --version`
- Check if port 5173 is available
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Connection Issues
- Verify backend is running on http://localhost:8080
- Check CORS settings in backend
- Ensure `.env` file exists in frontend with correct API URL

## 📄 License

This project is the PAM Advisor Platform for intelligent PAM tool selection.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Check the documentation in each component's README
- Review the troubleshooting section above
- Open an issue on GitHub

---

**Built with ❤️ for security professionals** 🔒✨

*Empowering secure access management decisions!*