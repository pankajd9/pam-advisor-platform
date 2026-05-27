import { motion } from 'framer-motion';
import { FileText, Users, Server, Cloud, Shield, Video } from 'lucide-react';

interface RequirementItem {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

const requirements: RequirementItem[] = [
  { icon: Users, label: 'Privileged Accounts', value: '5,000', color: 'text-cyan-400' },
  { icon: Server, label: 'Managed Servers', value: '1,200', color: 'text-teal-400' },
  { icon: Cloud, label: 'Deployment Preference', value: 'Hybrid', color: 'text-blue-400' },
  { icon: Shield, label: 'Compliance', value: 'SOX, PCI-DSS', color: 'text-indigo-400' },
  { icon: FileText, label: 'Integrations', value: 'Azure AD, SIEM', color: 'text-purple-400' },
  { icon: Video, label: 'Session Recording', value: 'Required', color: 'text-emerald-400' },
];

export const RequirementsSnapshot = () => {
  return (
    <div className="cyber-card p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-500/20 rounded-lg border border-teal-500/30">
          <FileText className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Requirements Snapshot</h2>
          <p className="text-sm text-gray-400">Current deployment parameters</p>
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <motion.div
              key={req.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
            >
              <div className={`p-2 bg-slate-800 rounded-lg border border-slate-700`}>
                <Icon className={`w-5 h-5 ${req.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">{req.label}</div>
                <div className="text-sm font-semibold text-white">{req.value}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Update Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 w-full py-2 px-4 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-sm text-cyan-400 hover:bg-slate-800 hover:border-cyan-500/40 transition-all"
      >
        Update Requirements
      </motion.button>
    </div>
  );
};

// Made with Bob