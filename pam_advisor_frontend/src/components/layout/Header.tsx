import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, GitCompare, Sparkles, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Shield className="text-cyan-400 w-8 h-8 shield-glow" />
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse-glow"></div>
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PAM Advisor
              </span>
              <div className="text-xs text-cyan-400/60 font-medium">AI-Powered Security</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/')
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to="/compare"
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/compare')
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <GitCompare size={16} />
              Compare Tools
            </Link>
            <Link
              to="/recommendations"
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/recommendations')
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles size={16} className="ai-pulse" />
              AI Recommendations
            </Link>
            <Link
              to="/architecture"
              className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/architecture')
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <Network size={16} />
              Architecture
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-3 mt-4 pt-4 border-t border-cyan-500/20 overflow-x-auto">
          <Link
            to="/"
            className={`text-sm font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg ${
              isActive('/')
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
          <Link
            to="/compare"
            className={`text-sm font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg ${
              isActive('/compare')
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <GitCompare size={14} />
            Compare
          </Link>
          <Link
            to="/recommendations"
            className={`text-sm font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg ${
              isActive('/recommendations')
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Sparkles size={14} className="ai-pulse" />
            AI Advisor
          </Link>
          <Link
            to="/architecture"
            className={`text-sm font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg ${
              isActive('/architecture')
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            <Network size={14} />
            Architecture
          </Link>
        </nav>
      </div>
    </header>
  );
};

// Made with Bob
