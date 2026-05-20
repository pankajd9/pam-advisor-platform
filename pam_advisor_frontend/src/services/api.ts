import axios from 'axios';
import type { ErrorResponse } from '../types';
import type {
  PAMRequirements,
  PAMRequirementsRequest,
  PAMTool,
  PAMRecommendation,
  PAMAnalysis,
  PAMComparisonReport,
  PAMDetailedReport,
  PAMExecutiveBriefing,
} from '../types/pam';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      // Backend returned an error response
      return Promise.reject(error.response.data);
    }
    // Network or other error
    return Promise.reject({
      success: false,
      error: 'Network error',
      error_code: 'NETWORK_ERROR',
      details: error.message,
    } as ErrorResponse);
  }
);

// ==================== Helper Functions ====================

/**
 * Check if response is an error
 */
export const isErrorResponse = (
  response: any
): response is ErrorResponse => {
  return response && response.success === false;
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<{ status: string }> => {
  const response = await api.get<{ status: string }>('/');
  return response.data;
};

// ==================== PAM Advisor Endpoints ====================

/**
 * Get all PAM tools with optional filtering
 */
export const getPAMTools = async (filters?: {
  deployment_type?: string;
  pricing_category?: string;
  min_accounts?: number;
  max_accounts?: number;
}): Promise<PAMTool[]> => {
  const response = await api.get<PAMTool[]>('/pam-tools', {
    params: filters,
  });
  return response.data;
};

/**
 * Analyze PAM requirements and get insights
 */
export const analyzeRequirements = async (
  requirements: PAMRequirements
): Promise<PAMAnalysis> => {
  const response = await api.post<PAMAnalysis>('/pam/analyze', requirements);
  return response.data;
};

/**
 * Generate PAM tool recommendations
 */
export const generateRecommendations = async (
  requirements: PAMRequirementsRequest
): Promise<PAMRecommendation[]> => {
  const response = await api.post<PAMRecommendation[]>(
    '/pam/recommend',
    requirements
  );
  return response.data;
};

/**
 * Generate comparison report for all tools
 */
export const generateComparisonReport = async (
  requirements: PAMRequirements
): Promise<PAMComparisonReport> => {
  const response = await api.post<PAMComparisonReport>(
    '/pam/report',
    requirements
  );
  return response.data;
};

/**
 * Generate detailed report for a specific tool
 */
export const generateDetailedReport = async (
  toolId: string,
  requirements: PAMRequirements
): Promise<PAMDetailedReport> => {
  const response = await api.post<PAMDetailedReport>(
    `/pam/report/${toolId}`,
    requirements
  );
  return response.data;
};

/**
 * Generate executive briefing
 */
export const generateExecutiveBriefing = async (
  requirements: PAMRequirements
): Promise<PAMExecutiveBriefing> => {
  const response = await api.post<PAMExecutiveBriefing>(
    '/pam/briefing',
    requirements
  );
  return response.data;
};

export default api;

// Made with Bob
