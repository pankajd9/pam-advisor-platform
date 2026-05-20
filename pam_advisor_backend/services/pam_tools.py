"""PAM Tools data and management service."""

from typing import List, Dict, Any

# PAM Tools Database
PAM_TOOLS = [
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
            "max_servers": 50000,
        },
        "integrations": {
            "azure_ad": True,
            "siem": True,
            "cloud_providers": ["AWS", "Azure", "GCP"],
        },
        "features": {
            "session_recording": True,
            "jit_access": True,
            "password_vaulting": True,
            "privileged_analytics": True,
            "threat_detection": True,
        },
        "implementation_complexity": "High",
        "implementation_weeks": 16,
        "operational_overhead": "High",
        "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001", "NIST"],
        "strengths": [
            "Most comprehensive feature set",
            "Excellent threat detection and analytics",
            "Strong compliance and audit capabilities",
            "Mature product with extensive integrations",
            "Best-in-class session recording",
        ],
        "considerations": [
            "Higher cost compared to competitors",
            "Complex implementation requiring expertise",
            "Steeper learning curve",
            "May be overkill for smaller organizations",
        ],
    },
    {
        "id": "delinea",
        "name": "Delinea Secret Server",
        "vendor": "Delinea",
        "deployment_types": ["SaaS", "On-Prem"],
        "pricing_category": "Medium",
        "base_cost_per_account": 80,
        "scalability": {
            "min_accounts": 50,
            "max_accounts": 50000,
            "min_servers": 25,
            "max_servers": 25000,
        },
        "integrations": {
            "azure_ad": True,
            "siem": True,
            "cloud_providers": ["AWS", "Azure", "GCP"],
        },
        "features": {
            "session_recording": True,
            "jit_access": True,
            "password_vaulting": True,
            "privileged_analytics": True,
            "threat_detection": True,
        },
        "implementation_complexity": "Medium",
        "implementation_weeks": 8,
        "operational_overhead": "Medium",
        "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001"],
        "strengths": [
            "Good balance of features and cost",
            "Easier to implement than CyberArk",
            "Strong secret management capabilities",
            "Flexible deployment options",
            "Good customer support",
        ],
        "considerations": [
            "Less extensive analytics than CyberArk",
            "Smaller ecosystem of integrations",
            "May require additional modules for advanced features",
        ],
    },
    {
        "id": "beyondtrust",
        "name": "BeyondTrust Privileged Remote Access",
        "vendor": "BeyondTrust",
        "deployment_types": ["SaaS", "On-Prem", "Hybrid"],
        "pricing_category": "High",
        "base_cost_per_account": 120,
        "scalability": {
            "min_accounts": 75,
            "max_accounts": 75000,
            "min_servers": 30,
            "max_servers": 30000,
        },
        "integrations": {
            "azure_ad": True,
            "siem": True,
            "cloud_providers": ["AWS", "Azure", "GCP"],
        },
        "features": {
            "session_recording": True,
            "jit_access": True,
            "password_vaulting": True,
            "privileged_analytics": True,
            "threat_detection": True,
        },
        "implementation_complexity": "Medium",
        "implementation_weeks": 12,
        "operational_overhead": "Medium",
        "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR", "ISO 27001", "NIST"],
        "strengths": [
            "Excellent remote access features",
            "Unified platform for multiple use cases",
            "Strong session management",
            "Good scalability",
            "Comprehensive compliance support",
        ],
        "considerations": [
            "Can be complex to configure all features",
            "Higher pricing tier",
            "Some features require additional licenses",
        ],
    },
    {
        "id": "oneidentity",
        "name": "One Identity Safeguard",
        "vendor": "One Identity",
        "deployment_types": ["SaaS", "On-Prem"],
        "pricing_category": "Medium",
        "base_cost_per_account": 70,
        "scalability": {
            "min_accounts": 50,
            "max_accounts": 40000,
            "min_servers": 25,
            "max_servers": 20000,
        },
        "integrations": {
            "azure_ad": True,
            "siem": True,
            "cloud_providers": ["AWS", "Azure"],
        },
        "features": {
            "session_recording": True,
            "jit_access": True,
            "password_vaulting": True,
            "privileged_analytics": False,
            "threat_detection": False,
        },
        "implementation_complexity": "Low",
        "implementation_weeks": 6,
        "operational_overhead": "Low",
        "compliance_support": ["SOX", "PCI-DSS", "HIPAA", "GDPR"],
        "strengths": [
            "Easiest to implement and use",
            "Quick deployment time",
            "Good for mid-sized organizations",
            "Competitive pricing",
            "Intuitive interface",
        ],
        "considerations": [
            "Limited advanced analytics",
            "Fewer integrations than competitors",
            "Less suitable for very large enterprises",
            "Basic threat detection capabilities",
        ],
    },
]


def get_all_tools() -> List[Dict[str, Any]]:
    """Get all PAM tools."""
    return PAM_TOOLS


def get_tool_by_id(tool_id: str) -> Dict[str, Any] | None:
    """Get a specific PAM tool by ID."""
    for tool in PAM_TOOLS:
        if tool["id"] == tool_id:
            return tool
    return None


def filter_tools(
    deployment_type: str | None = None,
    pricing_category: str | None = None,
    min_accounts: int | None = None,
    max_accounts: int | None = None,
) -> List[Dict[str, Any]]:
    """Filter PAM tools based on criteria."""
    filtered = PAM_TOOLS.copy()

    if deployment_type:
        filtered = [t for t in filtered if deployment_type in t["deployment_types"]]

    if pricing_category:
        filtered = [t for t in filtered if t["pricing_category"] == pricing_category]

    if min_accounts:
        filtered = [
            t
            for t in filtered
            if t["scalability"]["min_accounts"] <= min_accounts <= t["scalability"]["max_accounts"]
        ]

    if max_accounts:
        filtered = [
            t
            for t in filtered
            if t["scalability"]["min_accounts"] <= max_accounts <= t["scalability"]["max_accounts"]
        ]

    return filtered


# Made with Bob