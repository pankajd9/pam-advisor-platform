import { motion } from 'framer-motion';
import { Clock, Zap, Sparkles, TrendingUp, FileText, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityItem {
  icon: React.ElementType;
  title: string;
  time: string;
  color: string;
}

const recentActivities: ActivityItem[] = [
  { icon: Sparkles, title: 'AI Recommendation Generated', time: '2 hours ago', color: 'text-cyan-400' },
  { icon: GitCompare, title: 'Compared 4 PAM Tools', time: '5 hours ago', color: 'text-teal-400' },
  { icon: FileText, title: 'Report Downloaded', time: '1 day ago', color: 'text-blue-400' },
  { icon: TrendingUp, title: 'Requirements Updated', time: '2 days ago', color: 'text-indigo-400' },
];

interface QuickAction {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  {
    icon: Sparkles,
    title: 'Get Recommendations',
    description: 'AI-powered PAM tool suggestions',
    link: '/recommendations',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: GitCompare,
    title: 'Compare Tools',
    description: 'Side-by-side comparison',
    link: '/compare',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
  },
  {
    icon: FileText,
    title: 'Generate Report',
    description: 'Detailed analysis report',
    link: '/recommendations',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
];

export const RightSidebar = () => {
  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Recent Activity */}
      <div className="cyber-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className={`p-2 bg-slate-800 rounded-lg`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{activity.title}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="cyber-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Quick Actions</h3>
        </div>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className={`block p-4 ${action.bgColor} rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all group`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white mb-1">{action.title}</div>
                      <div className="text-xs text-gray-400">{action.description}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="cyber-card p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Assistant</h3>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Get intelligent insights and recommendations powered by advanced AI algorithms.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Engine Active</span>
          </div>
          <div className="text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">95%</span> Accuracy Rate
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
};

// Made with Bob