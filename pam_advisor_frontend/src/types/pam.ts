// PAM Advisor Types

export interface PAMRequirements {
  privilegedAccounts: number;
  servers: number;
  azureADIntegration: boolean;
  siemIntegration: boolean;
  sessionRecording: boolean;
  jitAccess: boolean;
  deploymentPreference: 'SaaS' | 'On-Prem' | 'Hybrid';
  budgetRange: 'Low' | 'Medium' | 'High' | 'Enterprise';
  complianceRequirement: string[];
}

export interface PAMTool {
  id: string;
  name: string;
  vendor: string;
  deploymentTypes: ('SaaS' | 'On-Prem' | 'Hybrid')[];
  pricingCategory: 'Low' | 'Medium' | 'High' | 'Enterprise';
  scalability: {
    minAccounts: number;
    maxAccounts: number;
    minServers: number;
    maxServers: number;
  };
  integrations: {
    azureAD: boolean;
    siem: boolean;
    cloudProviders: string[];
  };
  features: {
    sessionRecording: boolean;
    jitAccess: boolean;
    passwordVaulting: boolean;
    privilegedAnalytics: boolean;
    threatDetection: boolean;
  };
  implementationComplexity: 'Low' | 'Medium' | 'High';
  complianceSupport: string[];
  description: string;
  strengths: string[];
  considerations: string[];
}

export interface PAMScores {
  feature_score: number;
  compliance_score: number;
  scalability_score: number;
  deployment_score: number;
  integration_score: number;
  budget_score: number;
  implementation_score: number;
  operational_score: number;
  overall_score: number;
}

export interface PAMRecommendation {
  tool_id: string;
  tool_name: string;
  vendor: string;
  match_score: number;
  scores: PAMScores;
  estimated_yearly_cost: number;
  implementation_timeline: string;
  operational_overhead: string;
  deployment_architecture: string;
  executive_summary: string;
  features: {
    session_recording: boolean;
    jit_access: boolean;
    password_vaulting: boolean;
    privileged_analytics: boolean;
    threat_detection: boolean;
  };
  compliance_support: string[];
  strengths: string[];
  considerations: string[];
}

export interface PAMAnalysis {
  organization_size: string;
  size_recommendation: string;
  budget_status: string;
  budget_advice: string;
  estimated_cost_range: {
    min: number;
    max: number;
  };
  complexity_assessment: {
    accounts: number;
    servers: number;
    ratio: number;
  };
}

export interface PAMComparisonReport {
  generated_at: string;
  requirements_summary: Record<string, any>;
  tools_compared: number;
  comparison_matrix: Array<{
    tool_name: string;
    vendor: string;
    match_score: number;
    estimated_yearly_cost: number;
    implementation_weeks: string;
    operational_overhead: string;
  }>;
  cost_analysis: {
    lowest_cost: number;
    highest_cost: number;
    average_cost: number;
    cost_range: number;
  };
  feature_comparison: Record<string, Record<string, boolean>>;
  compliance_matrix: Record<string, Record<string, boolean>>;
}

export interface PAMDetailedReport {
  generated_at: string;
  tool_name: string;
  vendor: string;
  overall_assessment: {
    match_score: number;
    recommendation_level: string;
  };
  detailed_scores: PAMScores;
  financial_analysis: {
    estimated_yearly_cost: number;
    cost_per_account: number;
    budget_fit: string;
  };
  implementation_plan: {
    timeline: string;
    operational_overhead: string;
    deployment_architecture: string;
  };
  feature_analysis: {
    supported_features: Record<string, boolean>;
    compliance_support: string[];
  };
  strengths: string[];
  considerations: string[];
  executive_summary: string;
}

export interface PAMExecutiveBriefing {
  generated_at: string;
  organization_profile: {
    privileged_accounts: number;
    servers_managed: number;
    deployment_preference: string;
    budget: number;
  };
  top_recommendations: Array<{
    rank: number;
    tool_name: string;
    vendor: string;
    match_score: number;
    estimated_yearly_cost: number;
    key_strength: string;
    implementation_timeline: string;
  }>;
  key_insights: string[];
  next_steps: string[];
}

// API Request format (matches backend schema)
export interface PAMRequirementsRequest {
  num_privileged_accounts: number;
  num_servers: number;
  deployment_preference: string;
  budget: number;
  compliance_requirements: string[];
  required_features: string[];
  azure_ad_integration: boolean;
  siem_integration: boolean;
  cloud_environment: string;
  implementation_timeline: string;
}

// Made with Bob