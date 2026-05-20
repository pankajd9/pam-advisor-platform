# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Non-Obvious Patterns

### Backend Testing
- Tests MUST add `sys.path.insert(0, str(Path(__file__).parent.parent))` to import from parent directory
- Test fixtures use in-memory SQLite with `StaticPool` to avoid threading issues
- `conftest.py` patches both `db_module.SessionLocal` AND `server.SessionLocal` (both required)
- Run single test: `cd pam_advisor_backend && pytest tests/test_services.py::TestFlightService::test_list_flights_empty -v`

### MCP Server Initialization
- MCP server (`mcp = FastMCP()`) MUST be created BEFORE FastAPI app to properly combine lifespans
- MCP tools manually create/close database sessions (don't use FastAPI dependency injection)
- Server runs on port 8080 (not FastAPI default 8000)
- MCP endpoint available at `/mcp` (mounted into FastAPI app)

### PAM Advisor MCP Tools
- 5 MCP tools available for AI agents: `compare_pam_tools`, `calculate_pam_score`, `generate_pam_recommendation`, `generate_pam_report`, `generate_executive_briefing`
- All PAM MCP tools reuse existing service files (pam_tools, pam_scoring, pam_recommendation, pam_report)
- PAM tools don't use database - operate on in-memory data structures
- Error handling wraps service exceptions with descriptive messages
- Example: `compare_pam_tools(deployment_type="SaaS")` returns filtered PAM tools list

### Backend Service Layer
- Services return `Union[SuccessType, ErrorResponse]` - always check type before using
- `ErrorResponse` has structured fields: `error`, `error_code`, `details` (not just string messages)

### Frontend API Integration
- API base URL from `import.meta.env.VITE_API_URL` (Vite env var, not process.env)
- Error interceptor transforms all errors to `ErrorResponse` format (including network errors)
- Use `isErrorResponse()` helper to check response type before accessing data

### Database Schema
- All time fields stored as strings (not datetime objects) - format: ISO 8601
- Primary keys use `autoincrement=True` explicitly (not SQLAlchemy default)
- No cascade deletes configured - handle manually if needed

### Project Structure
- Backend runs from `pam_advisor_backend/` directory (not project root)
- Frontend env file is `.env` (not `.env.local`) - must be in `pam_advisor_frontend/`
- Start script creates `.venv` in backend directory (not project root)