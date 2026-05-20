"""PAM report generation service."""

from typing import Dict, Any, List
from datetime import datetime


def generate_comparison_report(tools: List[Dict[str, Any]], requirements: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a comparison report for multiple PAM tools."""
    report = {
        "generated_at": datetime.utcnow().isoformat(),
        "requirements_summary": {
            "num_privileged_accounts": requirements.get("num_privileged_accounts", 0),
            "num_servers": requirements.get("num_servers", 0),
            "deployment_preference": requirements.get("deployment_preference", ""),
            "budget": requirements.get("budget", 0),
            "compliance_requirements": requirements.get("compliance_requirements", []),
        },
        "tools_compared": len(tools),
        "comparison_matrix": [],
        "cost_analysis": {},
        "feature_comparison": {},
        "compliance_matrix": {},
    }

    # Build comparison matrix
    for tool in tools:
        tool_summary = {
            "tool_name": tool.get("tool_name"),
            "vendor": tool.get("vendor"),
            "match_score": tool.get("match_score"),
            "estimated_yearly_cost": tool.get("estimated_yearly_cost"),
            "implementation_weeks": tool.get("implementation_timeline"),
            "operational_overhead": tool.get("operational_overhead"),
        }
        report["comparison_matrix"].append(tool_summary)

    # Cost analysis
    costs = [t.get("estimated_yearly_cost", 0) for t in tools]
    report["cost_analysis"] = {
        "lowest_cost": min(costs) if costs else 0,
        "highest_cost": max(costs) if costs else 0,
        "average_cost": sum(costs) // len(costs) if costs else 0,
        "cost_range": max(costs) - min(costs) if costs else 0,
    }

    # Feature comparison
    all_features = set()
    for tool in tools:
        features = tool.get("features", {})
        all_features.update(features.keys())

    feature_matrix = {}
    for feature in all_features:
        feature_matrix[feature] = {
            tool.get("tool_name"): tool.get("features", {}).get(feature, False) for tool in tools
        }
    report["feature_comparison"] = feature_matrix

    # Compliance matrix
    all_compliance = set()
    for tool in tools:
        compliance = tool.get("compliance_support", [])
        all_compliance.update(compliance)

    compliance_matrix = {}
    for standard in all_compliance:
        compliance_matrix[standard] = {
            tool.get("tool_name"): standard in tool.get("compliance_support", []) for tool in tools
        }
    report["compliance_matrix"] = compliance_matrix

    return report


def generate_detailed_report(recommendation: Dict[str, Any], requirements: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a detailed report for a single PAM tool recommendation."""
    report = {
        "generated_at": datetime.utcnow().isoformat(),
        "tool_name": recommendation.get("tool_name"),
        "vendor": recommendation.get("vendor"),
        "overall_assessment": {
            "match_score": recommendation.get("match_score"),
            "recommendation_level": _get_recommendation_level(recommendation.get("match_score", 0)),
        },
        "detailed_scores": recommendation.get("scores", {}),
        "financial_analysis": {
            "estimated_yearly_cost": recommendation.get("estimated_yearly_cost"),
            "cost_per_account": recommendation.get("estimated_yearly_cost", 0)
            // requirements.get("num_privileged_accounts", 1),
            "budget_fit": _calculate_budget_fit(
                recommendation.get("estimated_yearly_cost", 0), requirements.get("budget", 0)
            ),
        },
        "implementation_plan": {
            "timeline": recommendation.get("implementation_timeline"),
            "operational_overhead": recommendation.get("operational_overhead"),
            "deployment_architecture": recommendation.get("deployment_architecture"),
        },
        "feature_analysis": {
            "supported_features": recommendation.get("features", {}),
            "compliance_support": recommendation.get("compliance_support", []),
        },
        "strengths": recommendation.get("strengths", []),
        "considerations": recommendation.get("considerations", []),
        "executive_summary": recommendation.get("executive_summary"),
    }

    return report


def generate_executive_briefing(recommendations: List[Dict[str, Any]], requirements: Dict[str, Any]) -> Dict[str, Any]:
    """Generate an executive briefing with top recommendations."""
    top_3 = recommendations[:3] if len(recommendations) >= 3 else recommendations

    briefing = {
        "generated_at": datetime.utcnow().isoformat(),
        "organization_profile": {
            "privileged_accounts": requirements.get("num_privileged_accounts", 0),
            "servers_managed": requirements.get("num_servers", 0),
            "deployment_preference": requirements.get("deployment_preference", ""),
            "budget": requirements.get("budget", 0),
        },
        "top_recommendations": [],
        "key_insights": [],
        "next_steps": [],
    }

    # Add top recommendations
    for i, rec in enumerate(top_3, 1):
        briefing["top_recommendations"].append(
            {
                "rank": i,
                "tool_name": rec.get("tool_name"),
                "vendor": rec.get("vendor"),
                "match_score": rec.get("match_score"),
                "estimated_yearly_cost": rec.get("estimated_yearly_cost"),
                "key_strength": rec.get("strengths", [""])[0] if rec.get("strengths") else "",
                "implementation_timeline": rec.get("implementation_timeline"),
            }
        )

    # Generate key insights
    if top_3:
        best_match = top_3[0]
        briefing["key_insights"].append(
            f"{best_match.get('tool_name')} emerges as the top recommendation with a {best_match.get('match_score'):.1f}% match score."
        )

        cost_range = max(r.get("estimated_yearly_cost", 0) for r in top_3) - min(
            r.get("estimated_yearly_cost", 0) for r in top_3
        )
        briefing["key_insights"].append(
            f"Cost variance among top solutions: ${cost_range:,}, indicating different value propositions."
        )

        if requirements.get("compliance_requirements"):
            briefing["key_insights"].append(
                f"All top recommendations support required compliance standards: {', '.join(requirements.get('compliance_requirements', [])[:3])}."
            )

    # Next steps
    briefing["next_steps"] = [
        "Schedule vendor demonstrations with top 2-3 solutions",
        "Conduct proof-of-concept with highest-ranked solution",
        "Engage stakeholders for requirements validation",
        "Develop detailed implementation roadmap",
        "Prepare budget approval documentation",
    ]

    return briefing


def _get_recommendation_level(score: float) -> str:
    """Get recommendation level based on score."""
    if score >= 85:
        return "Highly Recommended"
    elif score >= 75:
        return "Recommended"
    elif score >= 65:
        return "Suitable"
    else:
        return "Consider Alternatives"


def _calculate_budget_fit(estimated_cost: int, budget: int) -> str:
    """Calculate budget fit description."""
    if budget <= 0:
        return "Budget not specified"

    ratio = estimated_cost / budget
    if ratio <= 0.8:
        return "Well within budget"
    elif ratio <= 1.0:
        return "Within budget"
    elif ratio <= 1.2:
        return "Slightly over budget"
    else:
        return "Significantly over budget"


# Made with Bob