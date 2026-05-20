# PAM Advisor Platform Backend

A unified platform that serves both **REST API** and **MCP (Model Context Protocol)** from a single server, providing AI-powered PAM tool recommendations.

## Features

- **AI-Powered PAM Recommendations**: Multi-dimensional scoring and intelligent tool selection
- **Dual Protocol Support**: Same business logic exposed via REST and MCP
- **Single Server**: One codebase, one port, both protocols
- **Comprehensive PAM Database**: 15+ enterprise PAM solutions with detailed specifications

## Quick Start

### Install Dependencies

```bash
cd pam_advisor_backend
pip install -r requirements.txt
```

### Run the Server

```bash
python server.py
```

The server starts on port **8080** with:
- REST endpoints at `/pam/*`
- MCP tools at `/mcp`
- Health check at `/`
- Swagger UI at `/docs`

## API Reference

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/pam-tools` | List all PAM tools with optional filtering |
| POST | `/pam/analyze` | Analyze PAM requirements |
| POST | `/pam/recommend` | Generate PAM tool recommendations |
| POST | `/pam/report` | Generate comparison report |
| POST | `/pam/report/{tool_id}` | Generate detailed tool report |
| POST | `/pam/briefing` | Generate executive briefing |

### MCP Tools

#### PAM Advisor Tools

| Tool | Description |
|------|-------------|
| `compare_pam_tools` | Compare PAM tools with optional filtering |
| `calculate_pam_score` | Analyze PAM requirements and calculate organization profile |
| `generate_pam_recommendation` | Generate ranked PAM tool recommendations |
| `generate_pam_report` | Generate comprehensive comparison report |
| `generate_executive_briefing` | Generate executive briefing with top 3 recommendations |

## Usage Examples

### REST API Examples

```bash
# Get all PAM tools
curl http://localhost:8080/pam-tools

# Get filtered PAM tools
curl "http://localhost:8080/pam-tools?deployment_type=SaaS&pricing_category=Medium"

# Generate PAM recommendations
curl -X POST http://localhost:8080/pam/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "num_privileged_accounts": 500,
    "num_servers": 200,
    "deployment_preference": "SaaS",
    "budget": 75000,
    "compliance_requirements": ["SOX", "PCI-DSS"],
    "required_features": ["session_recording", "jit_access"],
    "azure_ad_integration": true,
    "siem_integration": true,
    "cloud_environment": "Azure",
    "implementation_timeline": "Standard (3-6 months)"
  }'
```

### MCP Tools (with Claude Code or MCP Inspector)

Connect to `http://localhost:8080/mcp` and use the available PAM tools:

```python
# Compare PAM tools
compare_pam_tools(deployment_type="SaaS")

# Calculate organization profile
calculate_pam_score(
    num_privileged_accounts=500,
    num_servers=200,
    deployment_preference="SaaS",
    budget=75000,
    compliance_requirements=["SOX", "PCI-DSS"],
    required_features=["session_recording", "jit_access"],
    azure_ad_integration=True,
    siem_integration=True,
    cloud_environment="Azure",
    implementation_timeline="Standard (3-6 months)"
)

# Generate recommendations
generate_pam_recommendation(
    num_privileged_accounts=500,
    num_servers=200,
    deployment_preference="SaaS",
    budget=75000,
    compliance_requirements=["SOX", "PCI-DSS"],
    required_features=["session_recording", "jit_access"],
    azure_ad_integration=True,
    siem_integration=True,
    cloud_environment="Azure",
    implementation_timeline="Standard (3-6 months)"
)

# Generate comparison report
generate_pam_report(...)  # Same parameters as above

# Generate executive briefing
generate_executive_briefing(...)  # Same parameters as above
```

**Sample MCP Response:**
```json
{
  "tool_id": "delinea",
  "tool_name": "Delinea Secret Server",
  "vendor": "Delinea",
  "match_score": 87.5,
  "scores": {
    "feature_score": 100.0,
    "compliance_score": 100.0,
    "scalability_score": 100.0,
    "deployment_score": 100.0,
    "integration_score": 100.0,
    "budget_score": 95.0,
    "implementation_score": 75.0,
    "operational_score": 75.0,
    "overall_score": 87.5
  },
  "estimated_yearly_cost": 52800,
  "implementation_timeline": "8 weeks - Standard deployment with medium complexity",
  "executive_summary": "**Highly Recommended** - Overall Match Score: 87.5/100..."
}
```

## Testing

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_services.py
pytest tests/test_rest.py
```

## Project Structure

```
pam_advisor_backend/
├── server.py          # Main server - exposes REST & MCP
├── services/          # Business logic layer
│   ├── pam_tools.py   # PAM tool database
│   ├── pam_scoring.py # Scoring algorithms
│   ├── pam_recommendation.py # Recommendation engine
│   └── pam_report.py  # Report generation
├── models.py          # SQLAlchemy Base (minimal)
├── schemas.py         # Pydantic request/response schemas
├── db.py              # Database configuration
├── seed.py            # Database initialization
├── tests/             # Test suite
├── requirements.txt
├── Dockerfile
└── pytest.ini
```

## Demo Data

The server seeds the database with:
- **10 users**: Alice, Bob, Charlie, Diana, Eve, Frank, Grace, Heidi, Ivan, Judy
- **10 flights**: Interplanetary routes (Earth, Mars, Moon, Venus, Jupiter, Europa, Pluto)
- **20 bookings**: Random bookings across users and flights
doc
## Docker

```bash
# Build
docker build -t pam-advisor-backend .

# Run
docker run -p 8080:8080 pam-advisor-backend
```

## Architecture

The system uses a **service layer** pattern:

1. **Services** (`services/`) - Pure business logic functions
2. **Server** (`server.py`) - Thin wrappers exposing services via REST and MCP
3. **Models** (`models.py`) - SQLAlchemy ORM definitions
4. **Schemas** (`schemas.py`) - Pydantic validation schemas

This architecture ensures:
- Business logic is tested independently of transport layer
- Same validation and error handling for both REST and MCP
- Easy to add new transport layers (GraphQL, gRPC, etc.)
