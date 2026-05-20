# PAM Advisor MCP Tools Documentation

## Overview
The PAM Advisor provides 5 MCP (Model Context Protocol) tools for AI agents to analyze and recommend Privileged Access Management solutions.

## MCP Tools

### 1. compare_pam_tools
Compare PAM tools with optional filtering.

**Parameters:**
- `deployment_type` (optional): Filter by deployment type (SaaS, On-Prem, Hybrid)
- `pricing_category` (optional): Filter by pricing (Low, Medium, High, Enterprise)
- `min_accounts` (optional): Filter by minimum account support
- `max_accounts` (optional): Filter by maximum account support

**Returns:**
List of PAM tools with full details including features, compliance support, scalability, and pricing.

**Example Usage:**
```python
# Get all PAM tools
tools = compare_pam_tools()

# Filter by SaaS deployment
saas_tools = compare_pam_tools(deployment_type="SaaS")

# Filter by pricing and accounts
medium_tools = compare_pam_tools(
    pricing_category="Medium",
    min_accounts=100,
    max_accounts=1000
)
```

**Example Response:**
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
    "features": {
      "session_recording": true,
      "jit_access": true,
      "password_vaulting": true,
      "privileged_analytics": true,
      "threat_detection": true
    },
    "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001", "NIST"],
    "strengths": [...],
    "considerations": [...]
  }
]
```

---

### 2. calculate_pam_score
Analyze PAM requirements and calculate organization profile.

**Parameters:**
- `num_privileged_accounts` (int): Number of privileged accounts to manage
- `num_servers` (int): Number of servers to secure
- `deployment_preference` (str): Preferred deployment (SaaS, On-Prem, Hybrid)
- `budget` (int): Annual budget in USD
- `compliance_requirements` (list[str]): Required compliance standards (SOX, PCI-DSS, HIPAA, etc.)
- `required_features` (list[str]): Required features (session_recording, jit_access, etc.)
- `azure_ad_integration` (bool): Whether Azure AD integration is required
- `siem_integration` (bool): Whether SIEM integration is required
- `cloud_environment` (str): Cloud provider (AWS, Azure, GCP)
- `implementation_timeline` (str): Timeline (Urgent, Standard, Flexible)

**Returns:**
Analysis including organization size, budget status, cost range estimates, and complexity assessment.

**Example Usage:**
```python
analysis = calculate_pam_score(
    num_privileged_accounts=500,
    num_servers=200,
    deployment_preference="SaaS",
    budget=75000,
    compliance_requirements=["SOX", "PCI-DSS", "HIPAA"],
    required_features=["session_recording", "jit_access", "password_vaulting"],
    azure_ad_integration=True,
    siem_integration=True,
    cloud_environment="Azure",
    implementation_timeline="Standard (3-6 months)"
)
```

**Example Response:**
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

### 3. generate_pam_recommendation
Generate ranked PAM tool recommendations based on requirements.

**Parameters:** Same as `calculate_pam_score`

**Returns:**
Ranked list of recommendations with match scores, estimated costs, implementation timelines, deployment architectures, and executive summaries. Results are sorted by overall match score (highest first).

**Example Usage:**
```python
recommendations = generate_pam_recommendation(
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
```

**Example Response:**
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
    "operational_overhead": "Moderate maintenance required...",
    "deployment_architecture": "**SaaS Deployment Architecture**\n\n1. **Cloud-Hosted Control Plane**...",
    "executive_summary": "**Highly Recommended** - Overall Match Score: 87.5/100...",
    "features": {...},
    "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001"],
    "strengths": [...],
    "considerations": [...]
  }
]
```

---

### 4. generate_pam_report
Generate comprehensive comparison report for all PAM tools.

**Parameters:** Same as `calculate_pam_score`

**Returns:**
Comprehensive report including comparison matrix, cost analysis, feature comparison matrix, and compliance support matrix.

**Example Usage:**
```python
report = generate_pam_report(
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
```

**Example Response:**
```json
{
  "generated_at": "2026-05-19T16:00:00.000Z",
  "requirements_summary": {
    "num_privileged_accounts": 500,
    "num_servers": 200,
    "deployment_preference": "SaaS",
    "budget": 75000,
    "compliance_requirements": ["SOX", "PCI-DSS"]
  },
  "tools_compared": 4,
  "comparison_matrix": [...],
  "cost_analysis": {
    "lowest_cost": 46200,
    "highest_cost": 99000,
    "average_cost": 67650,
    "cost_range": 52800
  },
  "feature_comparison": {...},
  "compliance_matrix": {...}
}
```

---

### 5. generate_executive_briefing
Generate executive briefing with top 3 PAM recommendations.

**Parameters:** Same as `calculate_pam_score`

**Returns:**
Executive briefing with organization profile, top 3 recommendations, key insights, and recommended next steps. Designed for executive stakeholders and decision-makers.

**Example Usage:**
```python
briefing = generate_executive_briefing(
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
```

**Example Response:**
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
    "Cost variance among top solutions: $25,000, indicating different value propositions."
  ],
  "next_steps": [
    "Schedule vendor demonstrations with top 2-3 solutions",
    "Conduct proof-of-concept with highest-ranked solution",
    "Engage stakeholders for requirements validation"
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

## Error Handling

All MCP tools include error handling:

```python
try:
    result = generate_pam_recommendation(...)
except Exception as e:
    print(f"Error: {str(e)}")
```

Common errors:
- Invalid parameter values
- Missing required parameters
- Service unavailable

---

## Integration with AI Agents

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pam-advisor": {
      "command": "python",
      "args": ["-m", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"],
      "cwd": "/path/to/pam_advisor_backend"
    }
  }
}
```

### Usage in AI Conversations

**Example 1: Get Tool Comparison**
```
User: "Show me all SaaS PAM tools"
AI: Uses compare_pam_tools(deployment_type="SaaS")
```

**Example 2: Get Recommendations**
```
User: "I need a PAM solution for 500 accounts, 200 servers, $75k budget, must support SOX and PCI-DSS"
AI: Uses generate_pam_recommendation() with appropriate parameters
```

**Example 3: Executive Summary**
```
User: "Give me an executive briefing for PAM tools"
AI: Uses generate_executive_briefing() and formats the response
```

---

## Testing MCP Tools

### Using MCP Inspector

```bash
# Start the server
cd pam_advisor_backend
python server.py

# In another terminal, test MCP endpoint
curl http://localhost:8080/mcp/tools
```

### Using Python

```python
from fastmcp import FastMCP

# Connect to MCP server
mcp = FastMCP("http://localhost:8080/mcp")

# Call tools
tools = mcp.call_tool("compare_pam_tools", {})
recommendations = mcp.call_tool("generate_pam_recommendation", {
    "num_privileged_accounts": 500,
    "num_servers": 200,
    "deployment_preference": "SaaS",
    "budget": 75000,
    "compliance_requirements": ["SOX", "PCI-DSS"],
    "required_features": ["session_recording", "jit_access"],
    "azure_ad_integration": True,
    "siem_integration": True,
    "cloud_environment": "Azure",
    "implementation_timeline": "Standard (3-6 months)"
})
```

---

## Best Practices

1. **Always specify requirements clearly** - More specific requirements lead to better recommendations
2. **Use realistic budget values** - Helps with accurate cost-benefit analysis
3. **Include all compliance requirements** - Ensures recommendations meet regulatory needs
4. **Consider implementation timeline** - Affects complexity scoring
5. **Review multiple recommendations** - Top 3 recommendations provide good comparison

---

## Troubleshooting

**Issue: MCP tools not available**
- Ensure server is running: `python server.py`
- Check MCP endpoint: `http://localhost:8080/mcp`
- Verify MCP server initialized before FastAPI app

**Issue: Recommendations seem incorrect**
- Verify all parameters are provided
- Check budget is realistic for requirements
- Ensure compliance requirements are valid

**Issue: Error responses**
- Check server logs for detailed error messages
- Verify parameter types match expected types
- Ensure required parameters are not None

---

Made with Bob