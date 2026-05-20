from pydantic import BaseModel
from typing import Optional


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    error_code: str
    details: Optional[str] = None


# ==================== PAM SCHEMAS ====================

class PAMRequirementsRequest(BaseModel):
    num_privileged_accounts: int
    num_servers: int
    deployment_preference: str
    budget: int
    compliance_requirements: list[str]
    required_features: list[str]
    azure_ad_integration: bool
    siem_integration: bool
    cloud_environment: str
    implementation_timeline: str


class PAMToolOut(BaseModel):
    id: str
    name: str
    vendor: str
    deployment_types: list[str]
    pricing_category: str
    base_cost_per_account: int
    scalability: dict
    integrations: dict
    features: dict
    implementation_complexity: str
    implementation_weeks: int
    operational_overhead: str
    compliance_support: list[str]
    strengths: list[str]
    considerations: list[str]


class PAMScores(BaseModel):
    feature_score: float
    compliance_score: float
    scalability_score: float
    deployment_score: float
    integration_score: float
    budget_score: float
    implementation_score: float
    operational_score: float
    overall_score: float


class PAMRecommendationOut(BaseModel):
    tool_id: str
    tool_name: str
    vendor: str
    match_score: float
    scores: PAMScores
    estimated_yearly_cost: int
    implementation_timeline: str
    operational_overhead: str
    deployment_architecture: str
    executive_summary: str
    features: dict
    compliance_support: list[str]
    strengths: list[str]
    considerations: list[str]


class PAMAnalysisOut(BaseModel):
    organization_size: str
    size_recommendation: str
    budget_status: str
    budget_advice: str
    estimated_cost_range: dict
    complexity_assessment: dict


class PAMComparisonReportOut(BaseModel):
    generated_at: str
    requirements_summary: dict
    tools_compared: int
    comparison_matrix: list[dict]
    cost_analysis: dict
    feature_comparison: dict
    compliance_matrix: dict


class PAMDetailedReportOut(BaseModel):
    generated_at: str
    tool_name: str
    vendor: str
    overall_assessment: dict
    detailed_scores: dict
    financial_analysis: dict
    implementation_plan: dict
    feature_analysis: dict
    strengths: list[str]
    considerations: list[str]
    executive_summary: str


class PAMExecutiveBriefingOut(BaseModel):
    generated_at: str
    organization_profile: dict
    top_recommendations: list[dict]
    key_insights: list[str]
    next_steps: list[str]

# Made with Bob
