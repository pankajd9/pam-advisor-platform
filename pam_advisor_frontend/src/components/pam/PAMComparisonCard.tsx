import { motion } from 'framer-motion';
import { Shield, Server, Eye, Clock, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';
import clsx from 'clsx';
import type { PAMRecommendation } from '../../types/pam';

interface PAMComparisonCardProps {
  recommendation: PAMRecommendation;
  index: number;
}

export function PAMComparisonCard({ recommendation, index }: PAMComparisonCardProps) {
  // Defensive checks for undefined/null recommendation
  if (!recommendation) {
    return null;
  }

  const getPricingColor = (cost: number) => {
    if (cost < 50000) return 'text-green-400';
    if (cost < 75000) return 'text-yellow-400';
    if (cost < 100000) return 'text-orange-400';
    return 'text-red-400';
  };

  const getComplexityColor = (timeline: string) => {
    if (timeline.includes('6 weeks') || timeline.includes('8 weeks')) return 'text-green-400';
    if (timeline.includes('12 weeks')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">{recommendation.tool_name || 'Unknown Tool'}</h3>
          </div>
          <p className="text-sm text-gray-400">{recommendation.vendor || 'Unknown Vendor'}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold text-cyan-400">{(recommendation.match_score || 0).toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Match</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Yearly Cost</span>
          </div>
          <div className={clsx('text-sm font-semibold', getPricingColor(recommendation.estimated_yearly_cost || 0))}>
            ${(recommendation.estimated_yearly_cost || 0).toLocaleString()}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Implementation</span>
          </div>
          <div className={clsx('text-sm font-semibold', getComplexityColor(recommendation.implementation_timeline || ''))}>
            {(recommendation.implementation_timeline || 'N/A').split(' - ')[0]}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Operational Overhead</span>
          </div>
          <div className="text-sm font-semibold text-white line-clamp-2">
            {(recommendation.operational_overhead || 'N/A').split('.')[0]}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            {recommendation.features?.session_recording ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-600" />
            )}
            <Eye className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">Session Recording</span>
          </div>

          <div className="flex items-center gap-2">
            {recommendation.features?.jit_access ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-600" />
            )}
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">JIT Access</span>
          </div>

          <div className="flex items-center gap-2">
            {recommendation.features?.password_vaulting ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-600" />
            )}
            <Shield className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">Password Vaulting</span>
          </div>

          <div className="flex items-center gap-2">
            {recommendation.features?.threat_detection ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-600" />
            )}
            <AlertCircle className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-300">Threat Detection</span>
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Compliance Support</h4>
        <div className="flex flex-wrap gap-1">
          {(recommendation.compliance_support || []).slice(0, 4).map((compliance) => (
            <span
              key={compliance}
              className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
            >
              {compliance}
            </span>
          ))}
          {(recommendation.compliance_support || []).length > 4 && (
            <span className="px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded-full">
              +{(recommendation.compliance_support || []).length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-green-400 mb-2">Strengths</h4>
        <ul className="space-y-1">
          {(recommendation.strengths || []).slice(0, 3).map((strength, idx) => (
            <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Considerations */}
      <div>
        <h4 className="text-sm font-semibold text-yellow-400 mb-2">Considerations</h4>
        <ul className="space-y-1">
          {(recommendation.considerations || []).slice(0, 2).map((consideration, idx) => (
            <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">!</span>
              <span>{consideration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Score Badge */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">AI Recommendation Score</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${recommendation.scores?.overall_score || 0}%` }}
              />
            </div>
            <span className="text-sm font-bold text-white">{(recommendation.scores?.overall_score || 0).toFixed(0)}/100</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Made with Bob