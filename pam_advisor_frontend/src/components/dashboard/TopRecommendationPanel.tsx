import { motion } from 'framer-motion';
import { Award, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../common';
import { Link } from 'react-router-dom';

interface TopRecommendationPanelProps {
  toolName?: string;
  vendor?: string;
  matchScore?: number;
  reasons?: string[];
}

export const TopRecommendationPanel = ({
  toolName = 'CyberArk Privileged Access Manager',
  vendor = 'CyberArk',
  matchScore = 92,
  reasons = [
    'Best enterprise-grade security features',
    'Excellent compliance support (SOX, PCI-DSS, HIPAA)',
    'Proven scalability for large deployments'
  ]
}: TopRecommendationPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="cyber-card p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Top Recommendation</h3>
      </div>

      {/* Tool Info */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-1">{vendor}</div>
        <div className="text-xl font-bold text-white mb-3">{toolName}</div>
        
        {/* Match Score */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Match Score</span>
              <span className="text-sm font-bold text-cyan-400">{matchScore}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${matchScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Key Reasons */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-gray-300 mb-3">Key Reasons:</div>
        <div className="space-y-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-300">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link to="/recommendations">
        <Button className="w-full flex items-center justify-center gap-2">
          View Detailed Recommendation
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

// Made with Bob