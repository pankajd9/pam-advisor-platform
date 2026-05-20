"""PAM scoring and analysis service."""

from typing import Dict, Any, List


def calculate_feature_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate feature match score (0-100)."""
    score = 0.0
    max_score = 100.0

    features = tool.get("features", {})
    required_features = requirements.get("required_features", [])

    # Session recording (20 points)
    if "session_recording" in required_features:
        if features.get("session_recording"):
            score += 20
    else:
        score += 20  # Not required, so full points

    # JIT access (20 points)
    if "jit_access" in required_features:
        if features.get("jit_access"):
            score += 20
    else:
        score += 20

    # Password vaulting (20 points)
    if "password_vaulting" in required_features:
        if features.get("password_vaulting"):
            score += 20
    else:
        score += 20

    # Privileged analytics (20 points)
    if "privileged_analytics" in required_features:
        if features.get("privileged_analytics"):
            score += 20
    else:
        score += 20

    # Threat detection (20 points)
    if "threat_detection" in required_features:
        if features.get("threat_detection"):
            score += 20
    else:
        score += 20

    return min(score, max_score)


def calculate_compliance_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate compliance match score (0-100)."""
    required_compliance = requirements.get("compliance_requirements", [])
    if not required_compliance:
        return 100.0

    tool_compliance = set(tool.get("compliance_support", []))
    required_set = set(required_compliance)

    if not required_set:
        return 100.0

    matched = len(required_set.intersection(tool_compliance))
    total = len(required_set)

    return (matched / total) * 100.0


def calculate_scalability_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate scalability match score (0-100)."""
    scalability = tool.get("scalability", {})
    num_accounts = requirements.get("num_privileged_accounts", 0)
    num_servers = requirements.get("num_servers", 0)

    score = 0.0

    # Check accounts scalability (50 points)
    min_accounts = scalability.get("min_accounts", 0)
    max_accounts = scalability.get("max_accounts", float("inf"))

    if min_accounts <= num_accounts <= max_accounts:
        # Perfect fit
        score += 50
    elif num_accounts < min_accounts:
        # Under minimum - penalize based on gap
        gap_ratio = num_accounts / min_accounts
        score += 50 * gap_ratio
    else:
        # Over maximum - penalize
        score += 25

    # Check servers scalability (50 points)
    min_servers = scalability.get("min_servers", 0)
    max_servers = scalability.get("max_servers", float("inf"))

    if min_servers <= num_servers <= max_servers:
        score += 50
    elif num_servers < min_servers:
        gap_ratio = num_servers / min_servers
        score += 50 * gap_ratio
    else:
        score += 25

    return min(score, 100.0)


def calculate_deployment_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate deployment preference score (0-100)."""
    preferred_deployment = requirements.get("deployment_preference", "")
    tool_deployments = tool.get("deployment_types", [])

    if not preferred_deployment:
        return 100.0

    if preferred_deployment in tool_deployments:
        return 100.0
    elif "Hybrid" in tool_deployments:
        return 75.0  # Hybrid can adapt
    else:
        return 40.0  # Doesn't match but still possible


def calculate_integration_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate integration requirements score (0-100)."""
    score = 0.0
    integrations = tool.get("integrations", {})

    # Azure AD integration (40 points)
    if requirements.get("azure_ad_integration"):
        if integrations.get("azure_ad"):
            score += 40
    else:
        score += 40

    # SIEM integration (30 points)
    if requirements.get("siem_integration"):
        if integrations.get("siem"):
            score += 30
    else:
        score += 30

    # Cloud provider support (30 points)
    required_cloud = requirements.get("cloud_environment", "")
    supported_clouds = integrations.get("cloud_providers", [])

    if not required_cloud:
        score += 30
    elif required_cloud in supported_clouds:
        score += 30
    else:
        score += 10  # Partial credit

    return min(score, 100.0)


def calculate_budget_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate budget fit score (0-100)."""
    budget = requirements.get("budget", 0)
    num_accounts = requirements.get("num_privileged_accounts", 100)

    base_cost = tool.get("base_cost_per_account", 100)
    estimated_cost = base_cost * num_accounts

    if budget <= 0:
        return 100.0  # No budget constraint

    if estimated_cost <= budget:
        # Under budget - excellent
        ratio = estimated_cost / budget
        return 100.0 - (ratio * 20)  # Slight penalty for being too cheap (might lack features)
    else:
        # Over budget - penalize based on how much over
        over_ratio = estimated_cost / budget
        if over_ratio <= 1.2:
            return 80.0  # 20% over - acceptable
        elif over_ratio <= 1.5:
            return 60.0  # 50% over - concerning
        elif over_ratio <= 2.0:
            return 40.0  # 2x over - problematic
        else:
            return 20.0  # Way over budget


def calculate_implementation_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate implementation complexity score (0-100)."""
    complexity = tool.get("implementation_complexity", "Medium")
    timeline = requirements.get("implementation_timeline", "")

    complexity_scores = {
        "Low": 100.0,
        "Medium": 75.0,
        "High": 50.0,
    }

    base_score = complexity_scores.get(complexity, 75.0)

    # Adjust based on timeline requirements
    if timeline == "Urgent (< 3 months)":
        if complexity == "Low":
            return base_score
        elif complexity == "Medium":
            return base_score - 15
        else:
            return base_score - 30
    elif timeline == "Standard (3-6 months)":
        return base_score
    elif timeline == "Flexible (> 6 months)":
        return min(base_score + 10, 100.0)

    return base_score


def calculate_operational_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> float:
    """Calculate operational overhead score (0-100)."""
    overhead = tool.get("operational_overhead", "Medium")

    overhead_scores = {
        "Low": 100.0,
        "Medium": 75.0,
        "High": 50.0,
    }

    return overhead_scores.get(overhead, 75.0)


def calculate_overall_score(tool: Dict[str, Any], requirements: Dict[str, Any]) -> Dict[str, float]:
    """Calculate all scores for a tool."""
    scores = {
        "feature_score": calculate_feature_score(tool, requirements),
        "compliance_score": calculate_compliance_score(tool, requirements),
        "scalability_score": calculate_scalability_score(tool, requirements),
        "deployment_score": calculate_deployment_score(tool, requirements),
        "integration_score": calculate_integration_score(tool, requirements),
        "budget_score": calculate_budget_score(tool, requirements),
        "implementation_score": calculate_implementation_score(tool, requirements),
        "operational_score": calculate_operational_score(tool, requirements),
    }

    # Calculate weighted overall score
    weights = {
        "feature_score": 0.25,
        "compliance_score": 0.20,
        "scalability_score": 0.15,
        "deployment_score": 0.10,
        "integration_score": 0.10,
        "budget_score": 0.10,
        "implementation_score": 0.05,
        "operational_score": 0.05,
    }

    overall = sum(scores[key] * weights[key] for key in scores)
    scores["overall_score"] = round(overall, 2)

    return scores


# Made with Bob