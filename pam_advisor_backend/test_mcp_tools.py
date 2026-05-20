#!/usr/bin/env python3
"""
Test script to verify PAM MCP tools are registered and working.

This script tests the MCP tools by:
1. Importing server.py directly
2. Verifying MCP object exists
3. Confirming all 5 PAM MCP tools are registered
4. Testing each tool with sample data
5. Printing pass/fail summary

Usage:
    python test_mcp_tools.py
"""

import sys

# ANSI color codes for terminal output
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
RESET = "\033[0m"


def print_section(title: str):
    """Print a formatted section header."""
    print(f"\n{BLUE}{'=' * 80}{RESET}")
    print(f"{BLUE}{title}{RESET}")
    print(f"{BLUE}{'=' * 80}{RESET}\n")


def print_success(message: str):
    """Print a success message."""
    print(f"{GREEN}✓ {message}{RESET}")


def print_error(message: str):
    """Print an error message."""
    print(f"{RED}✗ {message}{RESET}")


def print_info(message: str):
    """Print an info message."""
    print(f"{YELLOW}ℹ {message}{RESET}")


def test_import_server():
    """Test if server.py can be imported."""
    print_section("1. Importing server.py")
    
    try:
        import server
        print_success("Successfully imported server.py")
        return True, server
    except Exception as e:
        print_error(f"Failed to import server.py: {e}")
        return False, None


def test_mcp_object_exists(server):
    """Test if MCP object exists in server module."""
    print_section("2. Verifying MCP Object")
    
    try:
        if hasattr(server, 'mcp'):
            mcp = server.mcp
            print_success(f"MCP object exists: {mcp}")
            print_info(f"MCP name: {mcp.name if hasattr(mcp, 'name') else 'Unknown'}")
            return True, mcp
        else:
            print_error("MCP object not found in server module")
            return False, None
    except Exception as e:
        print_error(f"Error checking MCP object: {e}")
        return False, None


def test_tools_registered(mcp):
    """Test if PAM tools are registered in MCP."""
    print_section("3. Verifying PAM MCP Tools Registration")
    
    expected_tools = [
        'compare_pam_tools',
        'calculate_pam_score',
        'generate_pam_recommendation',
        'generate_pam_report',
        'generate_executive_briefing'
    ]
    
    try:
        # Get registered tools from MCP
        if hasattr(mcp, 'list_tools'):
            registered_tools = mcp.list_tools()
            tool_names = [tool.name for tool in registered_tools]
        elif hasattr(mcp, '_tools'):
            tool_names = list(mcp._tools.keys())
        else:
            print_error("Cannot access MCP tools registry")
            return False, []
        
        print_info(f"Total registered tools: {len(tool_names)}")
        
        # Check each expected PAM tool
        found_tools = []
        missing_tools = []
        
        for tool_name in expected_tools:
            if tool_name in tool_names:
                print_success(f"Found: {tool_name}")
                found_tools.append(tool_name)
            else:
                print_error(f"Missing: {tool_name}")
                missing_tools.append(tool_name)
        
        if missing_tools:
            print_error(f"\nMissing {len(missing_tools)} tools: {', '.join(missing_tools)}")
            return False, found_tools
        
        print_success(f"\nAll {len(expected_tools)} PAM tools are registered!")
        return True, found_tools
        
    except Exception as e:
        print_error(f"Error checking tool registration: {e}")
        return False, []


def test_compare_pam_tools():
    """Test the compare_pam_tools function."""
    print_section("4. Testing compare_pam_tools()")
    
    try:
        # Import service module directly
        from services import pam_tools
        
        # Test with no filters (get all tools)
        result = pam_tools.get_all_tools()
        
        if isinstance(result, list) and len(result) > 0:
            print_success(f"Retrieved {len(result)} PAM tools")
            print_info(f"Sample tool: {result[0].get('name', 'unknown')}")
            
            # Test with filters
            filtered = pam_tools.filter_tools(deployment_type="SaaS")
            print_info(f"Filtered by SaaS: {len(filtered)} tools")
            
            return True
        else:
            print_error("No tools returned")
            return False
            
    except Exception as e:
        print_error(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_calculate_pam_score():
    """Test the calculate_pam_score function."""
    print_section("5. Testing calculate_pam_score()")
    
    try:
        # Import service module directly
        from services import pam_recommendation
        
        requirements = {
            "num_privileged_accounts": 500,
            "num_servers": 200,
            "deployment_preference": "Hybrid",
            "budget": 150000,
            "compliance_requirements": ["SOX", "PCI-DSS"],
            "required_features": ["session_recording", "jit_access"],
            "azure_ad_integration": True,
            "siem_integration": True,
            "cloud_environment": "AWS",
            "implementation_timeline": "Standard"
        }
        
        result = pam_recommendation.analyze_requirements(requirements)
        
        if isinstance(result, dict) and "organization_size" in result:
            print_success("PAM score calculated successfully")
            print_info(f"Organization size: {result.get('organization_size')}")
            print_info(f"Budget status: {result.get('budget_status')}")
            print_info(f"Complexity: {result.get('complexity')}")
            return True
        else:
            print_error("Invalid response format")
            return False
            
    except Exception as e:
        print_error(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_generate_pam_recommendation():
    """Test the generate_pam_recommendation function."""
    print_section("6. Testing generate_pam_recommendation()")
    
    try:
        # Import service module directly
        from services import pam_recommendation
        
        requirements = {
            "num_privileged_accounts": 500,
            "num_servers": 200,
            "deployment_preference": "Hybrid",
            "budget": 150000,
            "compliance_requirements": ["SOX", "PCI-DSS"],
            "required_features": ["session_recording", "jit_access"],
            "azure_ad_integration": True,
            "siem_integration": True,
            "cloud_environment": "AWS",
            "implementation_timeline": "Standard"
        }
        
        result = pam_recommendation.generate_recommendations(requirements)
        
        if isinstance(result, list) and len(result) > 0:
            print_success(f"Generated {len(result)} recommendations")
            top_rec = result[0]
            print_info(f"Top recommendation: {top_rec.get('tool_name')}")
            print_info(f"Match score: {top_rec.get('overall_score', 0):.1f}%")
            print_info(f"Estimated cost: ${top_rec.get('estimated_yearly_cost', 0):,}")
            return True
        else:
            print_error("No recommendations returned")
            return False
            
    except Exception as e:
        print_error(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_generate_pam_report():
    """Test the generate_pam_report function."""
    print_section("7. Testing generate_pam_report()")
    
    try:
        # Import service modules directly
        from services import pam_recommendation, pam_report
        
        requirements = {
            "num_privileged_accounts": 500,
            "num_servers": 200,
            "deployment_preference": "Hybrid",
            "budget": 150000,
            "compliance_requirements": ["SOX", "PCI-DSS"],
            "required_features": ["session_recording", "jit_access"],
            "azure_ad_integration": True,
            "siem_integration": True,
            "cloud_environment": "AWS",
            "implementation_timeline": "Standard"
        }
        
        recommendations = pam_recommendation.generate_recommendations(requirements)
        result = pam_report.generate_comparison_report(recommendations, requirements)
        
        if isinstance(result, dict) and "comparison_matrix" in result:
            print_success("PAM comparison report generated successfully")
            sections = list(result.keys())
            print_info(f"Report sections: {', '.join(sections)}")
            print_info(f"Tools compared: {len(result.get('comparison_matrix', []))}")
            return True
        else:
            print_error("Invalid report format")
            return False
            
    except Exception as e:
        print_error(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_generate_executive_briefing():
    """Test the generate_executive_briefing function."""
    print_section("8. Testing generate_executive_briefing()")
    
    try:
        # Import service modules directly
        from services import pam_recommendation, pam_report
        
        requirements = {
            "num_privileged_accounts": 500,
            "num_servers": 200,
            "deployment_preference": "Hybrid",
            "budget": 150000,
            "compliance_requirements": ["SOX", "PCI-DSS"],
            "required_features": ["session_recording", "jit_access"],
            "azure_ad_integration": True,
            "siem_integration": True,
            "cloud_environment": "AWS",
            "implementation_timeline": "Standard"
        }
        
        recommendations = pam_recommendation.generate_recommendations(requirements)
        result = pam_report.generate_executive_briefing(recommendations, requirements)
        
        if isinstance(result, dict) and "organization_profile" in result and "top_recommendations" in result:
            print_success("Executive briefing generated successfully")
            print_info(f"Top recommendations: {len(result.get('top_recommendations', []))}")
            print_info(f"Key insights: {len(result.get('key_insights', []))}")
            print_info(f"Next steps: {len(result.get('next_steps', []))}")
            return True
        else:
            print_error("Invalid briefing format")
            return False
            
    except Exception as e:
        print_error(f"Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all MCP tool tests."""
    print(f"\n{BLUE}{'=' * 80}{RESET}")
    print(f"{BLUE}PAM MCP Tools Verification Test Suite{RESET}")
    print(f"{BLUE}{'=' * 80}{RESET}")
    
    # Track test results
    tests = []
    
    # Test 1: Import server
    success, server = test_import_server()
    tests.append(("Import server.py", success))
    
    if not success:
        print_error("\nCannot proceed - failed to import server.py")
        sys.exit(1)
    
    # Test 2: Verify MCP object
    success, mcp = test_mcp_object_exists(server)
    tests.append(("MCP object exists", success))
    
    if not success:
        print_error("\nCannot proceed - MCP object not found")
        sys.exit(1)
    
    # Test 3: Verify tools registered
    success, found_tools = test_tools_registered(mcp)
    tests.append(("PAM tools registered", success))
    
    if not success:
        print_error("\nWarning: Some tools may not be registered correctly")
    
    # Test 4-8: Test each PAM tool function (via service layer)
    tests.append(("compare_pam_tools()", test_compare_pam_tools()))
    tests.append(("calculate_pam_score()", test_calculate_pam_score()))
    tests.append(("generate_pam_recommendation()", test_generate_pam_recommendation()))
    tests.append(("generate_pam_report()", test_generate_pam_report()))
    tests.append(("generate_executive_briefing()", test_generate_executive_briefing()))
    
    # Print summary
    print_section("Test Summary")
    
    passed = sum(1 for _, result in tests if result)
    total = len(tests)
    
    for test_name, result in tests:
        if result:
            print_success(f"{test_name}")
        else:
            print_error(f"{test_name}")
    
    print(f"\n{BLUE}{'=' * 80}{RESET}")
    if passed == total:
        print(f"{GREEN}All {total} tests passed! ✓{RESET}")
        sys.exit(0)
    else:
        print(f"{YELLOW}{passed}/{total} tests passed{RESET}")
        sys.exit(1)
    print(f"{BLUE}{'=' * 80}{RESET}\n")


if __name__ == "__main__":
    main()

# Made with Bob
