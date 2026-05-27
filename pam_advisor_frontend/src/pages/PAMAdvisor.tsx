import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { PAMRequirementsForm } from '../components/pam/PAMRequirementsForm';
import { PAMComparisonCard } from '../components/pam/PAMComparisonCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { generateRecommendations } from '../services/api';
import type { PAMRequirements, PAMRecommendation, PAMRequirementsRequest } from '../types/pam';

export default function PAMAdvisor() {
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<PAMRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertToAPIFormat = (requirements: PAMRequirements): PAMRequirementsRequest => {
    return {
      num_privileged_accounts: requirements.privilegedAccounts,
      num_servers: requirements.servers,
      deployment_preference: requirements.deploymentPreference,
      budget: parseInt(requirements.budgetRange.replace(/[^0-9]/g, '')) || 0,
      compliance_requirements: requirements.complianceRequirement,
      required_features: [
        requirements.sessionRecording && 'session_recording',
        requirements.jitAccess && 'jit_access',
        'password_vaulting',
      ].filter(Boolean) as string[],
      azure_ad_integration: requirements.azureADIntegration,
      siem_integration: requirements.siemIntegration,
      cloud_environment: 'Azure',
      implementation_timeline: 'Standard (3-6 months)',
    };
  };

  const handleSubmit = async (requirements: PAMRequirements) => {
    setLoading(true);
    setError(null);

    try {
      const apiRequirements = convertToAPIFormat(requirements);
      const results = await generateRecommendations(apiRequirements);
      setRecommendations(results);
      setShowResults(true);
    } catch (err: any) {
      console.error('Error fetching recommendations:', err);
      setError(err.details || err.error || 'Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setRecommendations([]);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              PAM Advisor
            </h1>
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-Powered Privileged Access Management Recommendations
          </p>
          <p className="text-gray-500 mt-2">
            Get personalized PAM tool recommendations based on your organization's requirements
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-600 font-semibold mb-1">Error</h3>
                <p className="text-gray-700 text-sm">{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded text-sm transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <LoadingSpinner size="lg" />
            <p className="text-gray-700 mt-4 text-lg">Analyzing your requirements...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </motion.div>
        )}

        {!loading && !showResults && (
          /* Requirements Form */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Tell Us About Your Requirements</h2>
              </div>
              <PAMRequirementsForm onSubmit={handleSubmit} />
            </div>
          </motion.div>
        )}

        {!loading && showResults && recommendations.length > 0 && (
          /* Results */
          <div className="space-y-8">
            {/* AI Recommendation Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">AI Recommendations</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Based on your requirements, we've analyzed {recommendations.length} leading PAM solutions
                and ranked them by compatibility with your needs.
              </p>

              {/* Top Recommendation Highlight */}
              {recommendations[0] && (
                <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Award className="w-12 h-12 text-yellow-500 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Top Recommendation: {recommendations[0].tool_name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">
                            {recommendations[0].match_score.toFixed(1)}% Match
                          </span>
                        </div>
                        <div className="text-gray-600">
                          Estimated: ${recommendations[0].estimated_yearly_cost.toLocaleString()}/year
                        </div>
                        <div className="text-gray-600">
                          {recommendations[0].implementation_timeline}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">Why this recommendation:</h4>
                        <ul className="space-y-1">
                          {recommendations[0].strengths.slice(0, 3).map((strength, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-blue-600 mt-0.5">•</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Comparison Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Comparison</h2>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Search
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendations.map((recommendation, index) => (
                  <PAMComparisonCard
                    key={recommendation.tool_id}
                    recommendation={recommendation}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Detailed Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.tool_id}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          #{index + 1} {rec.tool_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>Score: {rec.scores.overall_score.toFixed(1)}/100</span>
                          <span>•</span>
                          <span>${rec.estimated_yearly_cost.toLocaleString()}/year</span>
                          <span>•</span>
                          <span>{rec.implementation_timeline}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {rec.match_score.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-600 mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          {rec.strengths.map((strength, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">✓</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-600 mb-2">Considerations</h4>
                        <ul className="space-y-1">
                          {rec.considerations.map((consideration, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-yellow-600 mt-0.5">!</span>
                              <span>{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{rec.scores.feature_score.toFixed(0)}</div>
                          <div className="text-xs text-gray-500">Features</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{rec.scores.compliance_score.toFixed(0)}</div>
                          <div className="text-xs text-gray-500">Compliance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{rec.scores.scalability_score.toFixed(0)}</div>
                          <div className="text-xs text-gray-500">Scalability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{rec.scores.budget_score.toFixed(0)}</div>
                          <div className="text-xs text-gray-500">Budget Fit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-sm text-gray-500"
            >
              <p>
                * Recommendations are based on the information provided and general product capabilities.
                Please conduct thorough evaluation and proof-of-concept testing before making a final decision.
              </p>
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {!loading && showResults && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Recommendations Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any PAM tools matching your requirements. Please try adjusting your criteria.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Made with Bob