import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Filter } from 'lucide-react';
import { PAMComparisonCard } from '../components/pam/PAMComparisonCard';
import { pamTools } from '../data/pamTools';

export default function CompareTools() {
  const [deploymentFilter, setDeploymentFilter] = useState<string>('All');
  const [pricingFilter, setPricingFilter] = useState<string>('All');

  const filteredTools = pamTools.filter((tool) => {
    const deploymentMatch =
      deploymentFilter === 'All' || tool.deploymentTypes.includes(deploymentFilter as any);
    const pricingMatch = pricingFilter === 'All' || tool.pricingCategory === pricingFilter;
    return deploymentMatch && pricingMatch;
  });

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
            <GitCompare className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Compare PAM Tools
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Side-by-side comparison of leading Privileged Access Management solutions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deployment Type
              </label>
              <select
                value={deploymentFilter}
                onChange={(e) => setDeploymentFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Deployment Types</option>
                <option value="SaaS">SaaS</option>
                <option value="On-Prem">On-Premises</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing Category
              </label>
              <select
                value={pricingFilter}
                onChange={(e) => setPricingFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Price Ranges</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTools.length} of {pamTools.length} tools
          </div>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTools.map((tool, index) => {
            // Convert PAMTool to PAMRecommendation format
            const recommendation = {
              tool_id: tool.id,
              tool_name: tool.name,
              vendor: tool.vendor,
              match_score: 85, // Default match score for comparison view
              scores: {
                feature_score: 85,
                compliance_score: 80,
                scalability_score: 90,
                deployment_score: 85,
                integration_score: 80,
                budget_score: 75,
                implementation_score: 80,
                operational_score: 85,
                overall_score: 83,
              },
              estimated_yearly_cost: tool.pricingCategory === 'Low' ? 40000 :
                                     tool.pricingCategory === 'Medium' ? 65000 :
                                     tool.pricingCategory === 'High' ? 90000 : 120000,
              implementation_timeline: tool.implementationComplexity === 'Low' ? '6-8 weeks' :
                                       tool.implementationComplexity === 'Medium' ? '10-12 weeks' : '14-16 weeks',
              operational_overhead: tool.implementationComplexity === 'Low' ? 'Minimal - Cloud-managed with automated updates' :
                                    tool.implementationComplexity === 'Medium' ? 'Moderate - Requires dedicated admin team' :
                                    'High - Requires specialized team and infrastructure',
              deployment_architecture: tool.deploymentTypes.join(', '),
              executive_summary: tool.description,
              features: {
                session_recording: tool.features.sessionRecording,
                jit_access: tool.features.jitAccess,
                password_vaulting: tool.features.passwordVaulting,
                privileged_analytics: tool.features.privilegedAnalytics,
                threat_detection: tool.features.threatDetection,
              },
              compliance_support: tool.complianceSupport,
              strengths: tool.strengths,
              considerations: tool.considerations,
            };
            
            return (
              <PAMComparisonCard key={tool.id} recommendation={recommendation} index={index} />
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No tools match your filter criteria. Try adjusting the filters.
            </p>
          </motion.div>
        )}

        {/* Comparison Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm overflow-x-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison Matrix</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Feature</th>
                {pamTools.map((tool) => (
                  <th key={tool.id} className="text-center py-3 px-4 text-gray-700 font-semibold">
                    {tool.vendor}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Session Recording</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4">
                    {tool.features.sessionRecording ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">JIT Access</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4">
                    {tool.features.jitAccess ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Azure AD Integration</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4">
                    {tool.integrations.azureAD ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">SIEM Integration</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4">
                    {tool.integrations.siem ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">Threat Detection</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4">
                    {tool.features.threatDetection ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Implementation Complexity</td>
                {pamTools.map((tool) => (
                  <td key={tool.id} className="text-center py-3 px-4 text-gray-700">
                    {tool.implementationComplexity}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

// Made with Bob