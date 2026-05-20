# MCP Tools Testing Guide

## Overview

This guide explains how to verify that the PAM MCP tools are properly registered and working in the server.

## MCP Endpoint Configuration

The MCP server is configured in `server.py` with the following key components:

### 1. MCP Server Creation (Line 20)
```python
mcp = FastMCP("PAM Advisor Platform")
```

### 2. PAM MCP Tools Registration (Lines 106-330)

Five PAM-specific MCP tools are registered:

1. **compare_pam_tools** - Compare PAM tools with optional filtering
2. **calculate_pam_score** - Analyze requirements and calculate organization profile
3. **generate_pam_recommendation** - Generate ranked PAM tool recommendations
4. **generate_pam_report** - Generate comprehensive comparison report
5. **generate_executive_briefing** - Generate executive briefing with top 3 recommendations

### 3. MCP HTTP App Creation (Line 334)
```python
mcp_app = mcp.http_app()
```

### 4. MCP Mounting into FastAPI (Line 524)
```python
app.mount("/mcp", mcp_app)
```

**CRITICAL**: The MCP endpoint is mounted at `/mcp`, making it accessible at:
```
http://localhost:8080/mcp
```

## Testing the MCP Tools

### Prerequisites

1. Install required dependencies:
```bash
pip install requests
```

2. Start the server:
```bash
cd pam_advisor_backend
python server.py
```

The server will start on `http://localhost:8080`

### Running the Test Script

Execute the test script:

```bash
python test_mcp_tools.py
```

### What the Test Script Does

The script performs 7 tests:

1. **MCP Endpoint Health** - Verifies the MCP endpoint is accessible
2. **List MCP Tools** - Lists all registered MCP tools (should show 5 PAM tools)
3. **compare_pam_tools** - Tests retrieving all PAM tools
4. **calculate_pam_score** - Tests PAM requirements analysis
5. **generate_pam_recommendation** - Tests recommendation generation
6. **generate_pam_report** - Tests comparison report generation
7. **generate_executive_briefing** - Tests executive briefing generation

### Expected Output

```
================================================================================
PAM MCP Tools Verification Test Suite
================================================================================

================================================================================
1. Testing MCP Endpoint Health
================================================================================

✓ MCP endpoint is accessible at http://localhost:8080/mcp

================================================================================
2. Listing All Registered MCP Tools
================================================================================

✓ Found 11 registered MCP tools:

PAM-Specific Tools (5):
  • compare_pam_tools
    Compare PAM tools with optional filtering...
  • calculate_pam_score
    Analyze PAM requirements and calculate organization profile...
  • generate_pam_recommendation
    Generate ranked PAM tool recommendations based on requirements...
  • generate_pam_report
    Generate comprehensive comparison report for all PAM tools...
  • generate_executive_briefing
    Generate executive briefing with top 3 PAM recommendations...

Other Tools (6):
  • list_flights
  • book_flight
  • get_bookings
  • cancel_booking
  • register_user
  • get_user_id

================================================================================
3. Testing compare_pam_tools
================================================================================

✓ Retrieved 4 PAM tools
ℹ Sample tool: CyberArk Privileged Access Manager

================================================================================
4. Testing calculate_pam_score
================================================================================

✓ PAM score calculated successfully
ℹ Organization size: Medium Enterprise
ℹ Budget status: Adequate

================================================================================
5. Testing generate_pam_recommendation
================================================================================

✓ Generated 4 recommendations
ℹ Top recommendation: CyberArk Privileged Access Manager
ℹ Match score: 87.5%

================================================================================
6. Testing generate_pam_report
================================================================================

✓ PAM comparison report generated successfully
ℹ Report includes: comparison_matrix, cost_analysis, feature_comparison, compliance_support

================================================================================
7. Testing generate_executive_briefing
================================================================================

✓ Executive briefing generated successfully
ℹ Top 3 recommendations included

================================================================================
Test Summary
================================================================================

✓ MCP Endpoint Health
✓ List MCP Tools
✓ compare_pam_tools
✓ calculate_pam_score
✓ generate_pam_recommendation
✓ generate_pam_report
✓ generate_executive_briefing

================================================================================
All 7 tests passed! ✓
================================================================================
```

## Manual Testing with curl

You can also test the MCP tools manually using curl:

### List all MCP tools:
```bash
curl http://localhost:8080/mcp/tools
```

### Call compare_pam_tools:
```bash
curl -X POST http://localhost:8080/mcp/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "compare_pam_tools",
    "arguments": {}
  }'
```

### Call generate_pam_recommendation:
```bash
curl -X POST http://localhost:8080/mcp/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "generate_pam_recommendation",
    "arguments": {
      "num_privileged_accounts": 500,
      "num_servers": 200,
      "deployment_preference": "Hybrid",
      "budget": 150000,
      "compliance_requirements": ["SOX", "PCI-DSS"],
      "required_features": ["session_recording", "jit_access"],
      "azure_ad_integration": true,
      "siem_integration": true,
      "cloud_environment": "AWS",
      "implementation_timeline": "Standard"
    }
  }'
```

## Troubleshooting

### Server not running
```
✗ Failed to connect to MCP endpoint: ...
ℹ Make sure the server is running: python server.py
```

**Solution**: Start the server with `python server.py`

### Import errors
```
ModuleNotFoundError: No module named 'fastmcp'
```

**Solution**: Install dependencies with `pip install -r requirements.txt`

### Port already in use
```
ERROR: [Errno 48] Address already in use
```

**Solution**: Kill the process using port 8080 or change the port in `server.py`

## MCP Architecture Notes

**CRITICAL PATTERN**: The MCP server must be created BEFORE the FastAPI app to properly combine lifespans:

```python
# 1. Create MCP server first
mcp = FastMCP("PAM Advisor Platform")

# 2. Register all tools
@mcp.tool()
def my_tool():
    pass

# 3. Create MCP HTTP app
mcp_app = mcp.http_app()

# 4. Create FastAPI app with lifespan
app = FastAPI(lifespan=lifespan)

# 5. Mount MCP into FastAPI
app.mount("/mcp", mcp_app)
```

This order is essential for proper initialization and lifespan management.

## Related Documentation

- [PAM API Documentation](./PAM_API_DOCUMENTATION.md) - REST API reference
- [MCP Tools Documentation](./MCP_TOOLS_DOCUMENTATION.md) - Detailed MCP tools guide
- [Frontend-Backend Integration](../FRONTEND_BACKEND_INTEGRATION.md) - Integration guide