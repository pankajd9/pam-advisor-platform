from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastmcp import FastMCP
from sqlalchemy.orm import Session
from typing import Union
from db import SessionLocal, init_db, get_db
from seed import seed
from services import pam_tools, pam_recommendation, pam_report
from schemas import (
    PAMRequirementsRequest, PAMToolOut, PAMRecommendationOut, PAMAnalysisOut,
    PAMComparisonReportOut, PAMDetailedReportOut, PAMExecutiveBriefingOut, ErrorResponse
)


# ==================== MCP SERVER (for AI agents) ====================
# NOTE: MCP server must be created before FastAPI app to properly combine lifespans

mcp = FastMCP("PAM Advisor Platform")


# ==================== PAM ADVISOR MCP TOOLS ====================

@mcp.tool()
def compare_pam_tools(
    deployment_type: str | None = None,
    pricing_category: str | None = None,
    min_accounts: int | None = None,
    max_accounts: int | None = None
) -> list[dict]:
    """Compare PAM tools with optional filtering.
    
    Args:
        deployment_type: Filter by deployment type (SaaS, On-Prem, Hybrid)
        pricing_category: Filter by pricing (Low, Medium, High, Enterprise)
        min_accounts: Filter by minimum account support
        max_accounts: Filter by maximum account support
    
    Returns:
        List of PAM tools matching the criteria with full details including
        features, compliance support, scalability, and pricing information.
    """
    try:
        if any([deployment_type, pricing_category, min_accounts, max_accounts]):
            return pam_tools.filter_tools(deployment_type, pricing_category, min_accounts, max_accounts)
        return pam_tools.get_all_tools()
    except Exception as e:
        raise Exception(f"Failed to compare PAM tools: {str(e)}")


@mcp.tool()
def calculate_pam_score(
    num_privileged_accounts: int,
    num_servers: int,
    deployment_preference: str,
    budget: int,
    compliance_requirements: list[str],
    required_features: list[str],
    azure_ad_integration: bool,
    siem_integration: bool,
    cloud_environment: str,
    implementation_timeline: str
) -> dict:
    """Analyze PAM requirements and calculate organization profile.
    
    Args:
        num_privileged_accounts: Number of privileged accounts to manage
        num_servers: Number of servers to secure
        deployment_preference: Preferred deployment (SaaS, On-Prem, Hybrid)
        budget: Annual budget in USD
        compliance_requirements: List of required compliance standards (SOX, PCI-DSS, HIPAA, etc.)
        required_features: List of required features (session_recording, jit_access, etc.)
        azure_ad_integration: Whether Azure AD integration is required
        siem_integration: Whether SIEM integration is required
        cloud_environment: Cloud provider (AWS, Azure, GCP)
        implementation_timeline: Timeline (Urgent, Standard, Flexible)
    
    Returns:
        Analysis including organization size, budget status, cost range estimates,
        and complexity assessment.
    """
    try:
        requirements = {
            "num_privileged_accounts": num_privileged_accounts,
            "num_servers": num_servers,
            "deployment_preference": deployment_preference,
            "budget": budget,
            "compliance_requirements": compliance_requirements,
            "required_features": required_features,
            "azure_ad_integration": azure_ad_integration,
            "siem_integration": siem_integration,
            "cloud_environment": cloud_environment,
            "implementation_timeline": implementation_timeline,
        }
        return pam_recommendation.analyze_requirements(requirements)
    except Exception as e:
        raise Exception(f"Failed to calculate PAM score: {str(e)}")


@mcp.tool()
def generate_pam_recommendation(
    num_privileged_accounts: int,
    num_servers: int,
    deployment_preference: str,
    budget: int,
    compliance_requirements: list[str],
    required_features: list[str],
    azure_ad_integration: bool,
    siem_integration: bool,
    cloud_environment: str,
    implementation_timeline: str
) -> list[dict]:
    """Generate ranked PAM tool recommendations based on requirements.
    
    Args:
        num_privileged_accounts: Number of privileged accounts to manage
        num_servers: Number of servers to secure
        deployment_preference: Preferred deployment (SaaS, On-Prem, Hybrid)
        budget: Annual budget in USD
        compliance_requirements: List of required compliance standards
        required_features: List of required features
        azure_ad_integration: Whether Azure AD integration is required
        siem_integration: Whether SIEM integration is required
        cloud_environment: Cloud provider (AWS, Azure, GCP)
        implementation_timeline: Timeline (Urgent, Standard, Flexible)
    
    Returns:
        Ranked list of recommendations with match scores, estimated costs,
        implementation timelines, deployment architectures, and executive summaries.
        Results are sorted by overall match score (highest first).
    """
    try:
        requirements = {
            "num_privileged_accounts": num_privileged_accounts,
            "num_servers": num_servers,
            "deployment_preference": deployment_preference,
            "budget": budget,
            "compliance_requirements": compliance_requirements,
            "required_features": required_features,
            "azure_ad_integration": azure_ad_integration,
            "siem_integration": siem_integration,
            "cloud_environment": cloud_environment,
            "implementation_timeline": implementation_timeline,
        }
        return pam_recommendation.generate_recommendations(requirements)
    except Exception as e:
        raise Exception(f"Failed to generate PAM recommendations: {str(e)}")


@mcp.tool()
def generate_pam_report(
    num_privileged_accounts: int,
    num_servers: int,
    deployment_preference: str,
    budget: int,
    compliance_requirements: list[str],
    required_features: list[str],
    azure_ad_integration: bool,
    siem_integration: bool,
    cloud_environment: str,
    implementation_timeline: str
) -> dict:
    """Generate comprehensive comparison report for all PAM tools.
    
    Args:
        num_privileged_accounts: Number of privileged accounts to manage
        num_servers: Number of servers to secure
        deployment_preference: Preferred deployment (SaaS, On-Prem, Hybrid)
        budget: Annual budget in USD
        compliance_requirements: List of required compliance standards
        required_features: List of required features
        azure_ad_integration: Whether Azure AD integration is required
        siem_integration: Whether SIEM integration is required
        cloud_environment: Cloud provider (AWS, Azure, GCP)
        implementation_timeline: Timeline (Urgent, Standard, Flexible)
    
    Returns:
        Comprehensive report including comparison matrix, cost analysis,
        feature comparison matrix, and compliance support matrix.
    """
    try:
        requirements = {
            "num_privileged_accounts": num_privileged_accounts,
            "num_servers": num_servers,
            "deployment_preference": deployment_preference,
            "budget": budget,
            "compliance_requirements": compliance_requirements,
            "required_features": required_features,
            "azure_ad_integration": azure_ad_integration,
            "siem_integration": siem_integration,
            "cloud_environment": cloud_environment,
            "implementation_timeline": implementation_timeline,
        }
        recommendations = pam_recommendation.generate_recommendations(requirements)
        return pam_report.generate_comparison_report(recommendations, requirements)
    except Exception as e:
        raise Exception(f"Failed to generate PAM report: {str(e)}")


@mcp.tool()
def generate_executive_briefing_mcp(
    num_privileged_accounts: int,
    num_servers: int,
    deployment_preference: str,
    budget: int,
    compliance_requirements: list[str],
    required_features: list[str],
    azure_ad_integration: bool,
    siem_integration: bool,
    cloud_environment: str,
    implementation_timeline: str
) -> dict:
    """Generate executive briefing with top 3 PAM recommendations.
    
    Args:
        num_privileged_accounts: Number of privileged accounts to manage
        num_servers: Number of servers to secure
        deployment_preference: Preferred deployment (SaaS, On-Prem, Hybrid)
        budget: Annual budget in USD
        compliance_requirements: List of required compliance standards
        required_features: List of required features
        azure_ad_integration: Whether Azure AD integration is required
        siem_integration: Whether SIEM integration is required
        cloud_environment: Cloud provider (AWS, Azure, GCP)
        implementation_timeline: Timeline (Urgent, Standard, Flexible)
    
    Returns:
        Executive briefing with organization profile, top 3 recommendations,
        key insights, and recommended next steps. Designed for executive
        stakeholders and decision-makers.
    """
    try:
        requirements = {
            "num_privileged_accounts": num_privileged_accounts,
            "num_servers": num_servers,
            "deployment_preference": deployment_preference,
            "budget": budget,
            "compliance_requirements": compliance_requirements,
            "required_features": required_features,
            "azure_ad_integration": azure_ad_integration,
            "siem_integration": siem_integration,
            "cloud_environment": cloud_environment,
            "implementation_timeline": implementation_timeline,
        }
        recommendations = pam_recommendation.generate_recommendations(requirements)
        return pam_report.generate_executive_briefing(recommendations, requirements)
    except Exception as e:
        raise Exception(f"Failed to generate executive briefing: {str(e)}")


# Create the MCP HTTP app for mounting
mcp_app = mcp.http_app()


# ==================== LIFESPAN ====================

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    seed()
    yield
    # Shutdown (nothing to do)


# ==================== FASTAPI APP (REST + Swagger UI) ====================

app = FastAPI(
    title="PAM Advisor Platform API",
    description="AI-powered Privileged Access Management tool recommendations with intelligent scoring across 8 criteria. Swagger UI available at /docs",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def health_check():
    """Health check endpoint."""
    return {"status": "OK"}


# ==================== PAM ADVISOR ENDPOINTS ====================

@app.get("/pam-tools", response_model=list[PAMToolOut], tags=["PAM"])
def get_pam_tools(
    deployment_type: str | None = None,
    pricing_category: str | None = None,
    min_accounts: int | None = None,
    max_accounts: int | None = None
):
    """Get all PAM tools with optional filtering.
    
    Query parameters:
    - deployment_type: Filter by deployment type (SaaS, On-Prem, Hybrid)
    - pricing_category: Filter by pricing (Low, Medium, High, Enterprise)
    - min_accounts: Filter by minimum account support
    - max_accounts: Filter by maximum account support
    """
    if any([deployment_type, pricing_category, min_accounts, max_accounts]):
        return pam_tools.filter_tools(deployment_type, pricing_category, min_accounts, max_accounts)
    return pam_tools.get_all_tools()


@app.post("/pam/analyze", response_model=PAMAnalysisOut, tags=["PAM"])
def analyze_pam_requirements(request: PAMRequirementsRequest):
    """Analyze PAM requirements and provide insights about organization size, budget, and complexity."""
    requirements = request.model_dump()
    return pam_recommendation.analyze_requirements(requirements)


@app.post("/pam/recommend", response_model=list[PAMRecommendationOut], tags=["PAM"])
def get_pam_recommendations(request: PAMRequirementsRequest):
    """Generate PAM tool recommendations based on requirements.
    
    Returns a ranked list of PAM tools with:
    - Match scores across 8 criteria
    - Estimated yearly costs
    - Implementation timelines
    - Operational overhead analysis
    - Deployment architecture recommendations
    - Executive summaries
    
    Results are sorted by overall match score (highest first).
    """
    requirements = request.model_dump()
    recommendations = pam_recommendation.generate_recommendations(requirements)
    return recommendations


@app.post("/pam/report", response_model=PAMComparisonReportOut, tags=["PAM"])
def generate_pam_comparison_report(request: PAMRequirementsRequest):
    """Generate a comprehensive comparison report for all PAM tools.
    
    Includes:
    - Comparison matrix with key metrics
    - Cost analysis (min, max, average)
    - Feature comparison matrix
    - Compliance support matrix
    """
    requirements = request.model_dump()
    recommendations = pam_recommendation.generate_recommendations(requirements)
    return pam_report.generate_comparison_report(recommendations, requirements)


@app.post("/pam/report/{tool_id}", response_model=PAMDetailedReportOut, tags=["PAM"])
def generate_detailed_tool_report(tool_id: str, request: PAMRequirementsRequest):
    """Generate a detailed report for a specific PAM tool.
    
    Includes:
    - Overall assessment and recommendation level
    - Detailed scoring breakdown
    - Financial analysis with budget fit
    - Implementation plan and timeline
    - Feature and compliance analysis
    - Strengths and considerations
    - Executive summary
    """
    requirements = request.model_dump()
    recommendations = pam_recommendation.generate_recommendations(requirements)
    
    # Find the specific tool recommendation
    tool_recommendation = next((r for r in recommendations if r["tool_id"] == tool_id), None)
    if not tool_recommendation:
        return ErrorResponse(
            error="Tool not found",
            error_code="TOOL_NOT_FOUND",
            details=f"No PAM tool found with ID: {tool_id}"
        )
    
    return pam_report.generate_detailed_report(tool_recommendation, requirements)


@app.post("/pam/briefing", response_model=PAMExecutiveBriefingOut, tags=["PAM"])
def generate_executive_briefing(request: PAMRequirementsRequest):
    """Generate an executive briefing with top 3 recommendations.
    
    Includes:
    - Organization profile summary
    - Top 3 ranked recommendations
    - Key insights and observations
    - Recommended next steps
    
    Designed for executive stakeholders and decision-makers.
    """
    requirements = request.model_dump()
    recommendations = pam_recommendation.generate_recommendations(requirements)
    return pam_report.generate_executive_briefing(recommendations, requirements)


# ==================== MOUNT MCP INTO FASTAPI ====================

app.mount("/mcp", mcp_app)


# ==================== MAIN ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
