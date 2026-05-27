import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

interface VendorScore {
  vendor: string;
  score: number;
  color: string;
}

const vendorScores: VendorScore[] = [
  { vendor: 'CyberArk', score: 92, color: 'bg-cyan-500' },
  { vendor: 'Delinea', score: 88, color: 'bg-teal-500' },
  { vendor: 'BeyondTrust', score: 85, color: 'bg-blue-500' },
  { vendor: 'One Identity', score: 82, color: 'bg-indigo-500' },
];

interface EvaluationCriteria {
  name: string;
  weight: number;
  color: string;
}

const evaluationCriteria: EvaluationCriteria[] = [
  { name: 'Feature Compatibility', weight: 25, color: 'text-cyan-400' },
  { name: 'Compliance Alignment', weight: 20, color: 'text-teal-400' },
  { name: 'Scalability Support', weight: 15, color: 'text-blue-400' },
  { name: 'Deployment Preference', weight: 10, color: 'text-indigo-400' },
  { name: 'Integration Capability', weight: 10, color: 'text-purple-400' },
  { name: 'Budget Compatibility', weight: 10, color: 'text-emerald-400' },
  { name: 'Implementation Complexity', weight: 5, color: 'text-amber-400' },
  { name: 'Operational Overhead', weight: 5, color: 'text-rose-400' },
];

export const AIRecommendationSummary = () => {
  return (
    <div className="cyber-card p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">AI Recommendation Summary</h2>
          <p className="text-sm text-gray-400">Overall score comparison across vendors</p>
        </div>
      </div>

      {/* Vendor Score Comparison */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Overall Scores</h3>
        <div className="space-y-4">
          {vendorScores.map((vendor, index) => (
            <motion.div
              key={vendor.vendor}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{vendor.vendor}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cyan-400">{vendor.score}%</span>
                  {index === 0 && <TrendingUp className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vendor.score}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className={`h-full ${vendor.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Evaluation Criteria Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Evaluation Criteria Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {evaluationCriteria.map((criteria, index) => (
            <motion.div
              key={criteria.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <span className="text-sm text-gray-300">{criteria.name}</span>
              <span className={`text-sm font-bold ${criteria.color}`}>{criteria.weight}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-cyan-400 mb-1">AI Insight</div>
            <p className="text-sm text-gray-300">
              Based on your requirements, CyberArk leads with strong feature compatibility and compliance support. 
              All vendors meet your core needs, with differences primarily in deployment flexibility and pricing.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Made with Bob