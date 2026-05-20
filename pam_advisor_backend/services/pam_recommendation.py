"""PAM recommendation generation service."""

from typing import Dict, Any, List
from services.pam_tools import get_all_tools
from services.pam_scoring import calculate_overall_score


def calculate_yearly_cost(tool: Dict[str, Any], num_accounts: int) -> int:
    """Calculate estimated yearly cost."""
    base_cost = tool.get("base_cost_per_account", 100)
    yearly_cost = base_cost * num_accounts

    # Add implementation cost (one-time, amortized over 3 years)
    implementation_weeks = tool.get("implementation_weeks", 8)
    implementation_cost = implementation_weeks * 10000  # $10k per week
    yearly_implementation = implementation_cost / 3

    # Add operational overhead
    overhead = tool.get("operational_overhead", "Medium")
    overhead_multipliers = {
        "Low": 1.1,
        "Medium": 1.2,
        "High": 1.3,
    }
    multiplier = overhead_multipliers.get(overhead, 1.2)

    total_yearly = (yearly_cost + yearly_implementation) * multiplier
    return int(total_yearly)


def get_implementation_timeline(tool: Dict[str, Any]) -> str:
    """Get implementation timeline description."""
    weeks = tool.get("implementation_weeks", 8)
    complexity = tool.get("implementation_complexity", "Medium")

    if weeks <= 6:
        return f"{weeks} weeks - Fast deployment with {complexity.lower()} complexity"
    elif weeks <= 12:
        return f"{weeks} weeks - Standard deployment with {complexity.lower()} complexity"
    else:
        return f"{weeks} weeks - Extended deployment with {complexity.lower()} complexity"


def get_operational_overhead(tool: Dict[str, Any]) -> str:
    """Get operational overhead description."""
    overhead = tool.get("operational_overhead", "Medium")

    descriptions = {
        "Low": "Minimal ongoing maintenance required. Automated workflows and self-service capabilities reduce admin burden.",
        "Medium": "Moderate maintenance required. Regular updates and monitoring needed. Dedicated admin recommended.",
        "High": "Significant maintenance required. Dedicated team needed for ongoing management, updates, and optimization.",
    }

    return descriptions.get(overhead, descriptions["Medium"])


def get_deployment_architecture(tool: Dict[str, Any], requirements: Dict[str, Any]) -> str:
    """Get recommended deployment architecture."""
    deployment_pref = requirements.get("deployment_preference", "SaaS")
    tool_deployments = tool.get("deployment_types", [])

    if deployment_pref in tool_deployments:
        deployment_type = deployment_pref
    elif "Hybrid" in tool_deployments:
        deployment_type = "Hybrid"
    else:
        deployment_type = tool_deployments[0] if tool_deployments else "SaaS"

    architectures = {
        "SaaS": f"""**SaaS Deployment Architecture**

1. **Cloud-Hosted Control Plane**
   - Vendor-managed infrastructure
   - Automatic updates and patches
   - 99.9% uptime SLA

2. **Agent Deployment**
   - Lightweight agents on target systems
   - Secure outbound connections only
   - No inbound firewall rules required

3. **Integration Layer**
   - API-based integrations with Azure AD, SIEM
   - Webhook support for automation
   - REST API for custom integrations

4. **Data Residency**
   - Choose data center region
   - Encrypted data at rest and in transit
   - Compliance with regional regulations""",
        "On-Prem": f"""**On-Premises Deployment Architecture**

1. **Primary Vault Server**
   - Dedicated server infrastructure
   - High availability configuration
   - Database backend (SQL Server/PostgreSQL)

2. **Disaster Recovery**
   - Secondary vault in different datacenter
   - Real-time replication
   - Automated failover

3. **Agent Infrastructure**
   - Agents on all managed systems
   - Secure internal network communication
   - Centralized policy management

4. **Integration Points**
   - On-prem Active Directory integration
   - SIEM connector deployment
   - API gateway for external access""",
        "Hybrid": f"""**Hybrid Deployment Architecture**

1. **Cloud Control Plane**
   - SaaS-based management console
   - Global policy management
   - Centralized reporting and analytics

2. **On-Premises Vault**
   - Local credential storage
   - Reduced latency for local access
   - Air-gapped sensitive systems support

3. **Flexible Agent Deployment**
   - Cloud-managed agents for cloud resources
   - On-prem agents for datacenter systems
   - Unified policy enforcement

4. **Secure Connectivity**
   - Encrypted tunnels between cloud and on-prem
   - Zero-trust network architecture
   - Multi-factor authentication throughout""",
    }

    return architectures.get(deployment_type, architectures["SaaS"])


def generate_executive_summary(
    tool: Dict[str, Any], scores: Dict[str, float], requirements: Dict[str, Any]
) -> str:
    """Generate executive summary for the recommendation."""
    tool_name = tool.get("name", "Unknown")
    overall_score = scores.get("overall_score", 0)
    num_accounts = requirements.get("num_privileged_accounts", 100)
    yearly_cost = calculate_yearly_cost(tool, num_accounts)

    # Determine recommendation strength
    if overall_score >= 85:
        strength = "Highly Recommended"
        confidence = "excellent"
    elif overall_score >= 75:
        strength = "Recommended"
        confidence = "strong"
    elif overall_score >= 65:
        strength = "Suitable"
        confidence = "good"
    else:
        strength = "Consider Alternatives"
        confidence = "moderate"

    # Get top strengths
    strengths = tool.get("strengths", [])[:3]
    strengths_text = "\n".join(f"   • {s}" for s in strengths)

    # Get key considerations
    considerations = tool.get("considerations", [])[:2]
    considerations_text = "\n".join(f"   • {c}" for c in considerations)

    summary = f"""**{strength}** - Overall Match Score: {overall_score:.1f}/100

{tool_name} demonstrates a {confidence} fit for your organization's privileged access management requirements.

**Key Strengths:**
{strengths_text}

**Important Considerations:**
{considerations_text}

**Financial Overview:**
   • Estimated yearly cost: ${yearly_cost:,}
   • Cost per privileged account: ${yearly_cost // num_accounts:,}/year
   • Implementation timeline: {tool.get('implementation_weeks', 8)} weeks

**Compliance Alignment:**
   • Supports: {', '.join(tool.get('compliance_support', [])[:4])}
   • Compliance score: {scores.get('compliance_score', 0):.1f}/100

**Recommendation:**
Based on your requirements for {num_accounts} privileged accounts across {requirements.get('num_servers', 0)} servers, 
{tool_name} offers a {confidence} balance of features, scalability, and cost-effectiveness. The solution's 
{tool.get('implementation_complexity', 'medium').lower()} implementation complexity aligns well with your 
{requirements.get('implementation_timeline', 'standard').lower()} timeline requirements."""

    return summary


def generate_recommendations(requirements: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Generate PAM tool recommendations based on requirements."""
    tools = get_all_tools()
    recommendations = []

    for tool in tools:
        # Calculate all scores
        scores = calculate_overall_score(tool, requirements)

        # Calculate additional metrics
        num_accounts = requirements.get("num_privileged_accounts", 100)
        yearly_cost = calculate_yearly_cost(tool, num_accounts)
        timeline = get_implementation_timeline(tool)
        overhead = get_operational_overhead(tool)
        architecture = get_deployment_architecture(tool, requirements)
        executive_summary = generate_executive_summary(tool, scores, requirements)

        recommendation = {
            "tool_id": tool.get("id"),
            "tool_name": tool.get("name"),
            "vendor": tool.get("vendor"),
            "match_score": scores.get("overall_score"),
            "scores": scores,
            "estimated_yearly_cost": yearly_cost,
            "implementation_timeline": timeline,
            "operational_overhead": overhead,
            "deployment_architecture": architecture,
            "executive_summary": executive_summary,
            "features": tool.get("features"),
            "compliance_support": tool.get("compliance_support"),
            "strengths": tool.get("strengths"),
            "considerations": tool.get("considerations"),
        }

        recommendations.append(recommendation)

    # Sort by overall score (descending)
    recommendations.sort(key=lambda x: x["match_score"], reverse=True)

    return recommendations


def analyze_requirements(requirements: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze requirements and provide insights."""
    num_accounts = requirements.get("num_privileged_accounts", 0)
    num_servers = requirements.get("num_servers", 0)
    budget = requirements.get("budget", 0)

    # Determine organization size
    if num_accounts < 100:
        org_size = "Small"
        size_recommendation = "Consider solutions with lower operational overhead and faster implementation."
    elif num_accounts < 500:
        org_size = "Medium"
        size_recommendation = "Balance between features and ease of management is key."
    else:
        org_size = "Large"
        size_recommendation = "Enterprise-grade features and scalability are critical."

    # Budget analysis
    avg_cost_per_account = 100  # Average across all tools
    estimated_min_cost = num_accounts * 70
    estimated_max_cost = num_accounts * 150

    if budget > 0:
        if budget < estimated_min_cost:
            budget_status = "Below Market Range"
            budget_advice = "Your budget may be insufficient for enterprise PAM solutions. Consider phased implementation or cloud-based options."
        elif budget > estimated_max_cost:
            budget_status = "Above Market Range"
            budget_advice = "Your budget allows for premium solutions with advanced features and comprehensive support."
        else:
            budget_status = "Within Market Range"
            budget_advice = "Your budget is appropriate for quality PAM solutions with good feature sets."
    else:
        budget_status = "Not Specified"
        budget_advice = f"Typical range: ${estimated_min_cost:,} - ${estimated_max_cost:,} per year"

    analysis = {
        "organization_size": org_size,
        "size_recommendation": size_recommendation,
        "budget_status": budget_status,
        "budget_advice": budget_advice,
        "estimated_cost_range": {
            "min": estimated_min_cost,
            "max": estimated_max_cost,
        },
        "complexity_assessment": {
            "accounts": num_accounts,
            "servers": num_servers,
            "ratio": round(num_servers / num_accounts, 2) if num_accounts > 0 else 0,
        },
    }

    return analysis


# Made with Bob