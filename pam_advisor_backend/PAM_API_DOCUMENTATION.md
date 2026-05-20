# PAM Advisor API Documentation

## Overview
The PAM Advisor backend provides REST APIs for analyzing privileged access management requirements and generating tool recommendations.

## Base URL
```
http://localhost:8080
```

## API Endpoints

### 1. Get All PAM Tools
**GET** `/pam-tools`

Get a list of all available PAM tools with optional filtering.

**Query Parameters:**
- `deployment_type` (optional): Filter by deployment type (SaaS, On-Prem, Hybrid)
- `pricing_category` (optional): Filter by pricing (Low, Medium, High, Enterprise)
- `min_accounts` (optional): Filter by minimum account support
- `max_accounts` (optional): Filter by maximum account support

**Response:** `200 OK`
```json
[
  {
    "id": "cyberark",
    "name": "CyberArk Privileged Access Manager",
    "vendor": "CyberArk",
    "deployment_types": ["SaaS", "On-Prem", "Hybrid"],
    "pricing_category": "Enterprise",
    "base_cost_per_account": 150,
    "scalability": {
      "min_accounts": 100,
      "max_accounts": 100000,
      "min_servers": 50,
      "max_servers": 50000
    },
    "integrations": {
      "azure_ad": true,
      "siem": true,
      "cloud_providers": ["AWS", "Azure", "GCP"]
    },
    "features": {
      "session_recording": true,
      "jit_access": true,
      "password_vaulting": true,
      "privileged_analytics": true,
      "threat_detection": true
    },
    "implementation_complexity": "High",
    "implementation_weeks": 16,
    "operational_overhead": "High",
    "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001", "NIST"],
    "strengths": [...],
    "considerations": [...]
  }
]
```

**Example:**
```bash
curl http://localhost:8080/pam-tools?deployment_type=SaaS&pricing_category=Medium
```

---

### 2. Analyze Requirements
**POST** `/pam/analyze`

Analyze PAM requirements and provide insights about organization size, budget, and complexity.

**Request Body:**
```json
{
  "num_privileged_accounts": 500,
  "num_servers": 200,
  "deployment_preference": "SaaS",
  "budget": 75000,
  "compliance_requirements": ["SOX", "PCI-DSS", "HIPAA"],
  "required_features": ["session_recording", "jit_access", "password_vaulting"],
  "azure_ad_integration": true,
  "siem_integration": true,
  "cloud_environment": "Azure",
  "implementation_timeline": "Standard (3-6 months)"
}
```

**Response:** `200 OK`
```json
{
  "organization_size": "Medium",
  "size_recommendation": "Balance between features and ease of management is key.",
  "budget_status": "Within Market Range",
  "budget_advice": "Your budget is appropriate for quality PAM solutions with good feature sets.",
  "estimated_cost_range": {
    "min": 35000,
    "max": 75000
  },
  "complexity_assessment": {
    "accounts": 500,
    "servers": 200,
    "ratio": 0.4
  }
}
```

---

### 3. Get Recommendations
**POST** `/pam/recommend`

Generate ranked PAM tool recommendations based on requirements.

**Request Body:** Same as `/pam/analyze`

**Response:** `200 OK`
```json
[
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
    "operational_overhead": "Moderate maintenance required. Regular updates and monitoring needed. Dedicated admin recommended.",
    "deployment_architecture": "**SaaS Deployment Architecture**\n\n1. **Cloud-Hosted Control Plane**...",
    "executive_summary": "**Highly Recommended** - Overall Match Score: 87.5/100...",
    "features": {...},
    "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001"],
    "strengths": [...],
    "considerations": [...]
  }
]
```

**Key Features:**
- Returns all tools ranked by match score (highest first)
- Each recommendation includes:
  - Overall match score (0-100)
  - Detailed scoring breakdown across 8 criteria
  - Estimated yearly cost
  - Implementation timeline
  - Operational overhead analysis
  - Deployment architecture recommendations
  - Executive summary

---

### 4. Generate Comparison Report
**POST** `/pam/report`

Generate a comprehensive comparison report for all PAM tools.

**Request Body:** Same as `/pam/analyze`

**Response:** `200 OK`
```json
{
  "generated_at": "2026-05-19T16:00:00.000Z",
  "requirements_summary": {
    "num_privileged_accounts": 500,
    "num_servers": 200,
    "deployment_preference": "SaaS",
    "budget": 75000,
    "compliance_requirements": ["SOX", "PCI-DSS", "HIPAA"]
  },
  "tools_compared": 4,
  "comparison_matrix": [
    {
      "tool_name": "Delinea Secret Server",
      "vendor": "Delinea",
      "match_score": 87.5,
      "estimated_yearly_cost": 52800,
      "implementation_weeks": "8 weeks - Standard deployment with medium complexity",
      "operational_overhead": "Moderate maintenance required..."
    }
  ],
  "cost_analysis": {
    "lowest_cost": 46200,
    "highest_cost": 99000,
    "average_cost": 67650,
    "cost_range": 52800
  },
  "feature_comparison": {
    "session_recording": {
      "CyberArk Privileged Access Manager": true,
      "Delinea Secret Server": true,
      "BeyondTrust Privileged Remote Access": true,
      "One Identity Safeguard": true
    }
  },
  "compliance_matrix": {
    "SOX": {
      "CyberArk Privileged Access Manager": true,
      "Delinea Secret Server": true,
      "BeyondTrust Privileged Remote Access": true,
      "One Identity Safeguard": true
    }
  }
}
```

---

### 5. Generate Detailed Tool Report
**POST** `/pam/report/{tool_id}`

Generate a detailed report for a specific PAM tool.

**Path Parameters:**
- `tool_id`: Tool identifier (cyberark, delinea, beyondtrust, oneidentity)

**Request Body:** Same as `/pam/analyze`

**Response:** `200 OK`
```json
{
  "generated_at": "2026-05-19T16:00:00.000Z",
  "tool_name": "Delinea Secret Server",
  "vendor": "Delinea",
  "overall_assessment": {
    "match_score": 87.5,
    "recommendation_level": "Highly Recommended"
  },
  "detailed_scores": {
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
  "financial_analysis": {
    "estimated_yearly_cost": 52800,
    "cost_per_account": 105,
    "budget_fit": "Within budget"
  },
  "implementation_plan": {
    "timeline": "8 weeks - Standard deployment with medium complexity",
    "operational_overhead": "Moderate maintenance required...",
    "deployment_architecture": "**SaaS Deployment Architecture**..."
  },
  "feature_analysis": {
    "supported_features": {...},
    "compliance_support": [...]
  },
  "strengths": [...],
  "considerations": [...],
  "executive_summary": "**Highly Recommended** - Overall Match Score: 87.5/100..."
}
```

---

### 6. Generate Executive Briefing
**POST** `/pam/briefing`

Generate an executive briefing with top 3 recommendations.

**Request Body:** Same as `/pam/analyze`

**Response:** `200 OK`
```json
{
  "generated_at": "2026-05-19T16:00:00.000Z",
  "organization_profile": {
    "privileged_accounts": 500,
    "servers_managed": 200,
    "deployment_preference": "SaaS",
    "budget": 75000
  },
  "top_recommendations": [
    {
      "rank": 1,
      "tool_name": "Delinea Secret Server",
      "vendor": "Delinea",
      "match_score": 87.5,
      "estimated_yearly_cost": 52800,
      "key_strength": "Good balance of features and cost",
      "implementation_timeline": "8 weeks - Standard deployment with medium complexity"
    }
  ],
  "key_insights": [
    "Delinea Secret Server emerges as the top recommendation with a 87.5% match score.",
    "Cost variance among top solutions: $25,000, indicating different value propositions.",
    "All top recommendations support required compliance standards: SOX, PCI-DSS, HIPAA."
  ],
  "next_steps": [
    "Schedule vendor demonstrations with top 2-3 solutions",
    "Conduct proof-of-concept with highest-ranked solution",
    "Engage stakeholders for requirements validation",
    "Develop detailed implementation roadmap",
    "Prepare budget approval documentation"
  ]
}
```

---

## Scoring Methodology

The recommendation engine evaluates tools across 8 criteria:

1. **Feature Score (25%)** - Match with required features
2. **Compliance Score (20%)** - Support for required compliance standards
3. **Scalability Score (15%)** - Fit for account/server count
4. **Deployment Score (10%)** - Match with deployment preference
5. **Integration Score (10%)** - Support for required integrations
6. **Budget Score (10%)** - Cost fit within budget
7. **Implementation Score (5%)** - Complexity vs timeline requirements
8. **Operational Score (5%)** - Ongoing maintenance overhead

**Overall Score** = Weighted sum of all criteria (0-100)

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request**
```json
{
  "success": false,
  "error": "Invalid request",
  "error_code": "VALIDATION_ERROR",
  "details": "num_privileged_accounts must be greater than 0"
}
```

**404 Not Found**
```json
{
  "success": false,
  "error": "Tool not found",
  "error_code": "TOOL_NOT_FOUND",
  "details": "No PAM tool found with ID: invalid_id"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "Internal server error",
  "error_code": "INTERNAL_ERROR",
  "details": "An unexpected error occurred"
}
```

---

## Running the Server

1. Install dependencies:
```bash
cd pam_advisor_backend
pip install -r requirements.txt
```

2. Start the server:
```bash
python server.py
```

3. Access Swagger UI documentation:
```
http://localhost:8080/docs
```

4. Access ReDoc documentation:
```
http://localhost:8080/redoc
```

---

## Testing with cURL

**Get all tools:**
```bash
curl http://localhost:8080/pam-tools
```

**Get recommendations:**
```bash
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

---

## Integration with Frontend

The frontend should call these APIs from the PAM Advisor pages:

1. **Dashboard** - Call `/pam-tools` to show tool count
2. **Compare Tools** - Call `/pam-tools` with filters
3. **PAM Advisor** - Call `/pam/recommend` to get recommendations
4. **Architecture Advisor** - Use recommendation data for architecture suggestions

Example frontend integration:
```typescript
const getRecommendations = async (requirements: PAMRequirements) => {
  const response = await fetch('http://localhost:8080/pam/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requirements)
  });
  return response.json();
};
```

---

Made with Bob