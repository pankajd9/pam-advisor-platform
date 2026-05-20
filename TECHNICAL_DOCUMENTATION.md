# PAM Advisor Platform - Technical Documentation

**Version:** 1.0.0  
**Last Updated:** 2026-05-19  
**Document Type:** Enterprise Technical Documentation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [System Architecture](#3-system-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Core Components](#5-core-components)
6. [REST API Documentation](#6-rest-api-documentation)
7. [MCP Tools Documentation](#7-mcp-tools-documentation)
8. [Recommendation Engine](#8-recommendation-engine)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Deployment Guide](#10-deployment-guide)
11. [High-Level Design](#11-high-level-design)
12. [Low-Level Design](#12-low-level-design)
13. [Future Enhancements](#13-future-enhancements)

---

## 1. Executive Summary

### 1.1 Purpose

The **PAM Advisor Platform** is an AI-powered recommendation system that helps organizations select the most suitable Privileged Access Management (PAM) solution based on their specific requirements, budget, compliance needs, and infrastructure.

### 1.2 Business Problem

Organizations face challenges in:
- **Complexity**: 10+ PAM vendors with overlapping features
- **Cost Uncertainty**: Wide pricing variations ($40K-$150K+ annually)
- **Compliance Risk**: Ensuring regulatory alignment (SOX, PCI-DSS, HIPAA, etc.)
- **Implementation Risk**: Choosing solutions that don't fit organizational scale
- **Decision Paralysis**: Too many variables to evaluate manually

### 1.3 Solution

An intelligent advisor platform that:
- **Analyzes** organizational requirements across 8 key dimensions
- **Scores** PAM tools using weighted algorithms (25% features, 20% compliance, etc.)
- **Recommends** ranked solutions with detailed justifications
- **Estimates** total cost of ownership including implementation
- **Provides** executive briefings and comparison reports

### 1.4 Key Metrics

- **10 PAM Tools** evaluated (CyberArk, BeyondTrust, Delinea, etc.)
- **8 Scoring Criteria** (features, compliance, scalability, budget, etc.)
- **5 MCP Tools** for AI agent integration
- **Sub-second** recommendation generation
- **100% Type-Safe** TypeScript frontend + Python backend

---

## 2. Project Overview

### 2.1 Technology Stack

#### Backend
- **Framework**: FastAPI 0.115.6
- **Protocol**: REST + MCP (Model Context Protocol)
- **Database**: SQLite with SQLAlchemy ORM
- **Language**: Python 3.8+
- **Server**: Uvicorn ASGI
- **Testing**: Pytest

#### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.19
- **Animations**: Framer Motion 12.26.1
- **Routing**: React Router 7.12.0
- **HTTP Client**: Axios 1.13.2

### 2.2 Architecture Pattern

**Layered Architecture**:
```
┌─────────────────────────────────────┐
│   Frontend (React + TypeScript)    │
├─────────────────────────────────────┤
│   REST API Layer (FastAPI)         │
├─────────────────────────────────────┤
│   Service Layer (Business Logic)   │
├─────────────────────────────────────┤
│   Data Layer (SQLAlchemy + SQLite) │
└─────────────────────────────────────┘
```

### 2.3 AI Use Case

The platform serves as an **AI-powered decision support system**:

1. **Input**: User requirements (accounts, servers, budget, compliance)
2. **Processing**: Multi-dimensional scoring algorithm
3. **Output**: Ranked recommendations with justifications
4. **Delivery**: REST API for humans, MCP for AI agents

---

## 3. System Architecture

### 3.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │  Dashboard │  │  Compare   │  │    PAM     │  │Architecture│ │
│  │    Page    │  │   Tools    │  │  Advisor   │  │  Advisor   │ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘ │
│        └───────────────┴───────────────┴───────────────┘         │
│                    ┌───────▼────────┐                            │
│                    │   API Service  │                            │
│                    └───────┬────────┘                            │
└────────────────────────────┼─────────────────────────────────────┘
                             │ HTTP/JSON
┌────────────────────────────▼─────────────────────────────────────┐
│                        BACKEND LAYER                              │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                    FastAPI Application                        ││
│  │  ┌────────────────┐              ┌────────────────┐          ││
│  │  │   REST API     │              │   MCP Server   │          ││
│  │  │   Endpoints    │              │   (FastMCP)    │          ││
│  │  └───────┬────────┘              └───────┬────────┘          ││
│  │          └───────────────┬───────────────┘                   ││
│  │                  ┌───────▼────────┐                          ││
│  │                  │ Service Layer  │                          ││
│  │                  └───────┬────────┘                          ││
│  └──────────────────────────┼───────────────────────────────────┘│
│  ┌──────────────────────────▼───────────────────────────────────┐│
│  │                    SERVICE MODULES                            ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    ││
│  │  │   PAM    │  │   PAM    │  │   PAM    │  │   PAM    │    ││
│  │  │  Tools   │  │ Scoring  │  │  Recom.  │  │  Report  │    ││
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    ││
│  └───────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

#### REST API Flow
```
User Input → React Form → API Service → FastAPI Endpoint 
→ Service Layer → Scoring Algorithm → Response → Frontend → UI Update
```

#### MCP Flow
```
AI Agent → MCP Tool Call → FastMCP Handler → Service Layer 
→ Scoring Algorithm → Response → AI Agent
```

---

## 4. Folder Structure

### 4.1 Backend Structure

```
pam_advisor_backend/
├── server.py                 # Main application entry point
├── db.py                     # Database configuration
├── models.py                 # SQLAlchemy ORM models
├── schemas.py                # Pydantic request/response schemas
├── seed.py                   # Database seeding script
├── requirements.txt          # Python dependencies
├── services/                 # Business logic layer
│   ├── pam_tools.py         # PAM tool data & filtering
│   ├── pam_scoring.py       # Scoring algorithms
│   ├── pam_recommendation.py # Recommendation generation
│   └── pam_report.py        # Report generation
└── tests/                    # Test suite
    ├── conftest.py          # Pytest fixtures
    ├── test_services.py     # Service layer tests
    └── test_rest.py         # REST API tests
```

### 4.2 Frontend Structure

```
pam_advisor_frontend/
├── src/
│   ├── main.tsx             # Application entry point
│   ├── App.tsx              # Root component with routing
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Generic components
│   │   ├── layout/          # Layout components
│   │   └── pam/             # PAM-specific components
│   ├── pages/               # Route pages
│   │   ├── Dashboard.tsx    # Home/landing page
│   │   ├── CompareTools.tsx # PAM tool comparison
│   │   ├── PAMAdvisor.tsx   # AI recommendations
│   │   └── ArchitectureAdvisor.tsx
│   ├── services/            # API integration
│   │   └── api.ts           # Axios client & endpoints
│   ├── types/               # TypeScript definitions
│   │   ├── index.ts         # Core types
│   │   └── pam.ts           # PAM-specific types
│   └── utils/               # Utility functions
├── package.json             # NPM configuration
└── vite.config.ts           # Vite build configuration
```

---

## 5. Core Components

### 5.1 Backend: server.py

**Purpose**: Main application entry point combining REST API and MCP server.

**Critical Pattern**:
```python
# MCP MUST be created before FastAPI
mcp = FastMCP("PAM Advisor")

# Define MCP tools
@mcp.tool()
def compare_pam_tools(...): ...

# Create MCP app
mcp_app = mcp.http_app()

# Then create FastAPI
app = FastAPI(lifespan=lifespan)

# Mount MCP into FastAPI
app.mount("/mcp", mcp_app)
```

**Key Endpoints**:
- `GET /pam-tools` - Get PAM tools with filters
- `POST /pam/analyze` - Analyze requirements
- `POST /pam/recommend` - Generate recommendations
- `POST /pam/report` - Generate comparison report
- `POST /pam/briefing` - Generate executive briefing

### 5.2 Backend: pam_scoring.py

**Purpose**: Multi-dimensional scoring algorithms.

**Scoring Criteria** (8 dimensions):

| Criterion | Weight | Max Points | Description |
|-----------|--------|------------|-------------|
| Features | 25% | 100 | Session recording, JIT access, password vaulting, analytics, threat detection |
| Compliance | 20% | 100 | Support for required compliance standards (SOX, PCI-DSS, etc.) |
| Scalability | 15% | 100 | Fit for account/server count (50 points each) |
| Deployment | 10% | 100 | Match with deployment preference (SaaS/On-Prem/Hybrid) |
| Integration | 10% | 100 | Azure AD (40), SIEM (30), Cloud provider (30) |
| Budget | 10% | 100 | Cost fit within budget constraints |
| Implementation | 5% | 100 | Complexity and timeline alignment |
| Operational | 5% | 100 | Ongoing maintenance overhead |

**Overall Score Calculation**:
```python
overall = sum(scores[key] * weights[key] for key in scores)
```

### 5.3 Backend: pam_recommendation.py

**Purpose**: Generate ranked recommendations with detailed analysis.

**Key Functions**:

1. **calculate_yearly_cost()** - Estimates total annual cost
   ```python
   base_cost = base_cost_per_account * num_accounts
   implementation_cost = implementation_weeks * 10000 / 3  # Amortized
   total = (base_cost + implementation_cost) * overhead_multiplier
   ```

2. **generate_recommendations()** - Main orchestration
   - Scores all tools
   - Calculates costs and timelines
   - Generates executive summaries
   - Sorts by overall score
   - Returns ranked list

3. **analyze_requirements()** - Organization profiling
   - Determines size (Small/Medium/Large)
   - Analyzes budget fit
   - Estimates cost range
   - Assesses complexity

### 5.4 Frontend: api.ts

**Purpose**: Centralized API client with error handling.

**Configuration**:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
});
```

**Error Interceptor**:
```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Transform all errors to ErrorResponse format
    return Promise.reject({
      success: false,
      error: 'Network error',
      error_code: 'NETWORK_ERROR',
      details: error.message
    });
  }
);
```

### 5.5 Frontend: PAMAdvisor.tsx

**Purpose**: Main recommendation interface.

**Flow**:
1. User fills requirements form
2. Convert to API format
3. Call `generateRecommendations()`
4. Display loading state
5. Show results with top recommendation highlighted
6. Display detailed comparison cards
7. Show score breakdowns

---

## 6. REST API Documentation

### 6.1 GET /pam-tools

**Description**: Get all PAM tools with optional filtering.

**Query Parameters**:
- `deployment_type` (optional): SaaS, On-Prem, Hybrid
- `pricing_category` (optional): Low, Medium, High, Enterprise
- `min_accounts` (optional): Minimum account support
- `max_accounts` (optional): Maximum account support

**Response**: `200 OK` - Array of PAM tools

### 6.2 POST /pam/recommend

**Description**: Generate ranked PAM tool recommendations.

**Request Body**:
```json
{
  "num_privileged_accounts": 250,
  "num_servers": 150,
  "deployment_preference": "SaaS",
  "budget": 75000,
  "compliance_requirements": ["SOX", "PCI-DSS"],
  "required_features": ["session_recording", "jit_access"],
  "azure_ad_integration": true,
  "siem_integration": true,
  "cloud_environment": "Azure",
  "implementation_timeline": "Standard (3-6 months)"
}
```

**Response**: `200 OK`
```json
[
  {
    "tool_id": "beyondtrust-pam",
    "tool_name": "BeyondTrust PAM",
    "vendor": "BeyondTrust",
    "match_score": 92.5,
    "scores": {
      "feature_score": 100.0,
      "compliance_score": 100.0,
      "scalability_score": 100.0,
      "overall_score": 92.5
    },
    "estimated_yearly_cost": 65000,
    "implementation_timeline": "12 weeks",
    "strengths": ["Excellent balance", "Strong Azure AD integration"],
    "considerations": ["Learning curve for advanced configs"]
  }
]
```

---

## 7. MCP Tools Documentation

### 7.1 Overview

MCP (Model Context Protocol) tools enable AI agents to interact with the PAM Advisor platform programmatically.

**Access**: `http://localhost:8080/mcp`

**Available Tools**: 5 PAM-specific tools

### 7.2 Tool List

1. **compare_pam_tools** - Compare PAM tools with filtering
2. **calculate_pam_score** - Analyze requirements and calculate profile
3. **generate_pam_recommendation** - Generate ranked recommendations
4. **generate_pam_report** - Generate comprehensive comparison report
5. **generate_executive_briefing** - Generate executive briefing

### 7.3 Example Usage

```python
# AI Agent using MCP
recommendations = generate_pam_recommendation(
    num_privileged_accounts=250,
    num_servers=150,
    deployment_preference="SaaS",
    budget=75000,
    compliance_requirements=["SOX", "PCI-DSS"],
    required_features=["session_recording", "jit_access"],
    azure_ad_integration=True,
    siem_integration=True,
    cloud_environment="Azure",
    implementation_timeline="Standard (3-6 months)"
)
```

---

## 8. Recommendation Engine

### 8.1 Scoring Algorithm

**Step 1: Individual Scores** - Each criterion scored 0-100

**Step 2: Weighted Average**
```python
overall_score = (
    feature_score * 0.25 +
    compliance_score * 0.20 +
    scalability_score * 0.15 +
    deployment_score * 0.10 +
    integration_score * 0.10 +
    budget_score * 0.10 +
    implementation_score * 0.05 +
    operational_score * 0.05
)
```

**Step 3: Ranking** - Tools sorted by overall_score (descending)

### 8.2 Cost Estimation Formula

```python
base_cost = base_cost_per_account * num_accounts
implementation_cost = implementation_weeks * 10000
yearly_implementation = implementation_cost / 3  # Amortized over 3 years

overhead_multiplier = {"Low": 1.1, "Medium": 1.2, "High": 1.3}[overhead]
total_yearly_cost = (base_cost + yearly_implementation) * overhead_multiplier
```

### 8.3 Recommendation Levels

| Score Range | Level | Description |
|-------------|-------|-------------|
| 85-100 | Highly Recommended | Excellent fit, proceed with confidence |
| 75-84 | Recommended | Strong fit, good choice |
| 65-74 | Suitable | Acceptable fit, evaluate carefully |
| 0-64 | Consider Alternatives | Poor fit, explore other options |

---

## 9. Frontend Architecture

### 9.1 Routing

```typescript
<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/compare" element={<CompareTools />} />
      <Route path="/recommendations" element={<PAMAdvisor />} />
      <Route path="/architecture" element={<ArchitectureAdvisor />} />
    </Routes>
  </Layout>
</BrowserRouter>
```

### 9.2 State Management

**Local State** (useState) - No global state management needed

```typescript
const [recommendations, setRecommendations] = useState<PAMRecommendation[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### 9.3 Error Handling Pattern

```typescript
try {
  const results = await generateRecommendations(requirements);
  setRecommendations(results);
} catch (err: any) {
  setError(err.details || err.error || 'Failed to fetch recommendations');
} finally {
  setLoading(false);
}
```

---

## 10. Deployment Guide

### 10.1 Quick Start

#### One-Command Start (Recommended)

**Unix/Mac**:
```bash
./start.sh
```

**Windows**:
```bash
start.bat
```

### 10.2 Manual Deployment

#### Backend
```bash
cd pam_advisor_backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python server.py
```

**Access**: http://localhost:8080

#### Frontend
```bash
cd pam_advisor_frontend
npm install
npm run dev
```

**Access**: http://localhost:5173

### 10.3 Production Deployment

#### Backend Production
```bash
cd pam_advisor_backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8080 --workers 4
```

#### Frontend Production
```bash
cd pam_advisor_frontend
npm install
npm run build
# Deploy 'dist/' folder to hosting service
```

### 10.4 Environment Configuration

**Frontend .env**:
```env
VITE_API_URL=http://localhost:8080
```

For production:
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 11. High-Level Design (HLD)

### 11.1 Component Interaction

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  (React Components + Tailwind CSS + Framer Motion)     │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/JSON
┌────────────────────▼────────────────────────────────────┐
│                  API Gateway                             │
│  (FastAPI + CORS Middleware + Request Validation)       │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│   REST Layer   │       │   MCP Layer    │
│  (Endpoints)   │       │  (AI Agents)   │
└───────┬────────┘       └───────┬────────┘
        └────────────┬────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                Service Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   PAM    │  │   PAM    │  │   PAM    │             │
│  │  Tools   │  │ Scoring  │  │  Report  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

### 11.2 Data Flow Diagram

```
User Requirements
       │
       ▼
┌──────────────┐
│ Requirements │
│   Form       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ API Service  │
│  (Axios)     │
└──────┬───────┘
       │ POST /pam/recommend
       ▼
┌──────────────┐
│   FastAPI    │
│  Endpoint    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│pam_recommend │
│  .generate   │
│_recommend... │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ pam_scoring  │
│  .calculate  │
│_overall_...  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Ranked List  │
│ of Tools     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Frontend   │
│   Display    │
└──────────────┘
```

---

## 12. Low-Level Design (LLD)

### 12.1 Service Layer Interactions

**pam_recommendation.py** orchestrates:
1. Calls `pam_tools.get_all_tools()` to fetch tool data
2. For each tool, calls `pam_scoring.calculate_overall_score()`
3. Calculates costs using internal `calculate_yearly_cost()`
4. Generates summaries using `generate_executive_summary()`
5. Sorts results by overall score
6. Returns ranked list

**pam_scoring.py** provides:
- 8 individual scoring functions
- `calculate_overall_score()` orchestrator
- Weighted average calculation
- Returns score dictionary

**pam_report.py** consumes:
- Recommendations from `pam_recommendation.py`
- Generates comparison matrices
- Calculates cost analysis
- Creates executive briefings

### 12.2 API-to-Service Mapping

| Endpoint | Service Function | Purpose |
|----------|-----------------|---------|
| `POST /pam/recommend` | `pam_recommendation.generate_recommendations()` | Generate ranked recommendations |
| `POST /pam/analyze` | `pam_recommendation.analyze_requirements()` | Analyze organization profile |
| `POST /pam/report` | `pam_report.generate_comparison_report()` | Create comparison report |
| `POST /pam/briefing` | `pam_report.generate_executive_briefing()` | Create executive briefing |
| `GET /pam-tools` | `pam_tools.get_all_tools()` or `filter_tools()` | Fetch PAM tools |

### 12.3 Frontend Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── {children}
│   └── Footer
└── Routes
    ├── Dashboard
    ├── CompareTools
    │   └── PAMComparisonCard (multiple)
    ├── PAMAdvisor
    │   ├── PAMRequirementsForm
    │   └── PAMComparisonCard (multiple)
    └── ArchitectureAdvisor
```

---

## 13. Future Enhancements

### 13.1 Executive Dashboard

**Features**:
- Real-time cost tracking
- Implementation progress monitoring
- Compliance status dashboard
- ROI calculator

**Technical Approach**:
- Add dashboard page component
- Create new API endpoints for metrics
- Implement data visualization (Chart.js/Recharts)
- Add WebSocket for real-time updates

### 13.2 PDF Export

**Features**:
- Export recommendations as PDF
- Include charts and graphs
- Branded templates
- Email delivery

**Technical Approach**:
- Backend: Use ReportLab or WeasyPrint
- Add `GET /pam/report/{id}/pdf` endpoint
- Frontend: Download button with loading state
- Store generated PDFs temporarily

### 13.3 Migration Advisor

**Features**:
- Analyze current PAM solution
- Generate migration roadmap
- Estimate migration costs
- Risk assessment

**Technical Approach**:
- Add migration analysis service
- Create migration scoring algorithm
- New API endpoints for migration planning
- Frontend wizard for migration assessment

### 13.4 Advanced AI Agents

**Features**:
- Natural language queries
- Automated vendor outreach
- Contract analysis
- Continuous monitoring

**Technical Approach**:
- Integrate LLM (OpenAI/Anthropic)
- Expand MCP tools for agent workflows
- Add conversation history
- Implement agent memory

### 13.5 Multi-Tenant Support

**Features**:
- Organization accounts
- User roles and permissions
- Saved recommendations
- Collaboration features

**Technical Approach**:
- Add authentication (JWT)
- Implement RBAC
- Database schema updates
- Frontend auth flow

---

## Appendix

### A. Glossary

- **PAM**: Privileged Access Management
- **MCP**: Model Context Protocol
- **JIT**: Just-In-Time (access)
- **SIEM**: Security Information and Event Management
- **SaaS**: Software as a Service
- **SOX**: Sarbanes-Oxley Act
- **PCI-DSS**: Payment Card Industry Data Security Standard
- **HIPAA**: Health Insurance Portability and Accountability Act

### B. References

- FastAPI Documentation: https://fastapi.tiangolo.com/
- React Documentation: https://react.dev/
- MCP Protocol: https://modelcontextprotocol.io/
- Tailwind CSS: https://tailwindcss.com/

### C. Support

For issues or questions:
- Review this documentation
- Check API documentation at `/docs`
- Review MCP documentation in `MCP_TOOLS_DOCUMENTATION.md`
- Open an issue on GitHub

---

**Document End**

*Built with ❤️ for security professionals* 🔒