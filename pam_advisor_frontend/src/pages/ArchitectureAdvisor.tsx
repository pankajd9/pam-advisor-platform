import { motion } from 'framer-motion';
import { Network, Server, Cloud, Shield, Database, Lock, Eye, Users } from 'lucide-react';

export default function ArchitectureAdvisor() {
  const architecturePatterns = [
    {
      title: 'Cloud-Native PAM',
      icon: Cloud,
      description: 'SaaS-based PAM solution for modern cloud environments',
      components: ['Identity Provider', 'PAM SaaS Platform', 'Cloud Resources', 'SIEM Integration'],
      bestFor: ['Cloud-first organizations', 'Rapid deployment needs', 'Minimal infrastructure'],
      considerations: ['Internet dependency', 'Data residency requirements', 'Vendor lock-in'],
    },
    {
      title: 'Hybrid PAM Architecture',
      icon: Network,
      description: 'Combination of on-premises and cloud components',
      components: ['On-Prem Vault', 'Cloud Gateway', 'Hybrid Connectors', 'Session Proxy'],
      bestFor: ['Mixed environments', 'Gradual cloud migration', 'Compliance requirements'],
      considerations: ['Complex networking', 'Multiple management planes', 'Higher maintenance'],
    },
    {
      title: 'Zero Trust PAM',
      icon: Shield,
      description: 'Identity-centric PAM with continuous verification',
      components: ['Identity Broker', 'Policy Engine', 'MFA Gateway', 'Continuous Monitoring'],
      bestFor: ['High security requirements', 'Remote workforce', 'Modern security posture'],
      considerations: ['Cultural change needed', 'Initial complexity', 'User experience impact'],
    },
  ];

  const components = [
    {
      icon: Lock,
      name: 'Password Vault',
      description: 'Secure storage for privileged credentials',
      critical: true,
    },
    {
      icon: Eye,
      name: 'Session Manager',
      description: 'Record and monitor privileged sessions',
      critical: true,
    },
    {
      icon: Users,
      name: 'Access Gateway',
      description: 'Broker connections to target systems',
      critical: true,
    },
    {
      icon: Shield,
      name: 'Policy Engine',
      description: 'Enforce access policies and workflows',
      critical: true,
    },
    {
      icon: Database,
      name: 'Audit Database',
      description: 'Store audit logs and compliance data',
      critical: false,
    },
    {
      icon: Server,
      name: 'Integration Layer',
      description: 'Connect to SIEM, ITSM, and other tools',
      critical: false,
    },
  ];

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
            <Network className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Architecture Advisor
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Design optimal PAM architecture for your organization
          </p>
        </motion.div>

        {/* Architecture Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Architecture Patterns</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {architecturePatterns.map((pattern, index) => (
              <motion.div
                key={pattern.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <pattern.icon className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{pattern.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{pattern.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Key Components:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pattern.components.map((component) => (
                      <span
                        key={component}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-green-600 mb-2">Best For:</h4>
                  <ul className="space-y-1">
                    {pattern.bestFor.map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-yellow-600 mb-2">Considerations:</h4>
                  <ul className="space-y-1">
                    {pattern.considerations.map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">!</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Core PAM Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`bg-white rounded-xl p-6 border ${
                  component.critical ? 'border-blue-300' : 'border-gray-200'
                } hover:border-blue-400 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <component.icon className="w-8 h-8 text-blue-600" />
                  {component.critical && (
                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                      Critical
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{component.name}</h3>
                <p className="text-sm text-gray-700">{component.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Reference Architecture</h2>
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="space-y-8">
              {/* User Layer */}
              <div className="text-center">
                <div className="inline-block bg-blue-50 border border-blue-300 rounded-lg px-6 py-3">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold">Users & Administrators</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent"></div>
              </div>

              {/* Access Layer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">MFA Gateway</div>
                </div>
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                  <Lock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">Policy Engine</div>
                </div>
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                  <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">Session Manager</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent"></div>
              </div>

              {/* Target Layer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                  <Server className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">Servers</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                  <Cloud className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">Cloud Resources</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                  <Database className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-gray-900 font-semibold text-sm">Databases</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Simplified reference architecture showing key PAM components and data flow
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Made with Bob