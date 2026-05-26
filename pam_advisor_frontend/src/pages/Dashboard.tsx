import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Server, AlertCircle, CheckCircle2, Lock, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { useState } from 'react';

export default function Dashboard() {
  const [showPAMDetails, setShowPAMDetails] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardName: string) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };
  const stats = [
    {
      icon: Shield,
      label: 'PAM Solutions',
      value: '4',
      description: 'Leading vendors analyzed',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Users,
      label: 'Account Range',
      value: '50-100K',
      description: 'Privileged accounts supported',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
    },
    {
      icon: Server,
      label: 'Deployment Options',
      value: '3',
      description: 'SaaS, On-Prem, Hybrid',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: TrendingUp,
      label: 'AI Accuracy',
      value: '95%',
      description: 'Recommendation precision',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Compare PAM Tools',
      description: 'Side-by-side comparison of CyberArk, Delinea, BeyondTrust, and One Identity',
      link: '/compare',
      gradient: 'from-cyan-500/20 to-blue-500/10',
      iconColor: 'text-cyan-400',
    },
    {
      icon: TrendingUp,
      title: 'AI Recommendations',
      description: 'Get personalized PAM tool recommendations based on your requirements',
      link: '/recommendations',
      gradient: 'from-teal-500/20 to-cyan-500/10',
      iconColor: 'text-teal-400',
    },
    {
      icon: AlertCircle,
      title: 'Architecture Advisor',
      description: 'Design optimal PAM architecture for your organization',
      link: '/architecture',
      gradient: 'from-blue-500/20 to-indigo-500/10',
      iconColor: 'text-blue-400',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 cyber-grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Shield className="w-16 h-16 text-cyan-400 shield-glow" />
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse-glow"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PAM Advisor</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-2">
            AI-Powered Privileged Access Management Platform
          </p>
          <p className="text-gray-400">
            Make informed decisions with intelligent PAM tool recommendations
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="cyber-card p-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgColor} blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="relative z-10">
                <div className={`flex items-center gap-3 mb-3 ${stat.bgColor} ${stat.borderColor} border rounded-lg p-2 w-fit`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cyber-card p-8 relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Why PAM Matters</h2>
              </div>
              <Button
                onClick={() => setShowPAMDetails(!showPAMDetails)}
                className="flex items-center gap-2"
              >
                {showPAMDetails ? (
                  <>
                    <span>Hide Details</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Show Details</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Threat Reduction Card */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
                   onClick={() => toggleCard('threat')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-cyan-400">Threat Reduction</h3>
                  </div>
                  {expandedCard === 'threat' ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  Reduce insider threats and external attacks by securing privileged accounts
                </p>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === 'threat' ? 'auto' : 0,
                    opacity: expandedCard === 'threat' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-cyan-500/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>80% of breaches</strong> involve compromised privileged credentials</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Real-time monitoring</strong> detects suspicious activities instantly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Credential rotation</strong> eliminates static passwords</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Session isolation</strong> prevents lateral movement</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Compliance Card */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-all cursor-pointer"
                   onClick={() => toggleCard('compliance')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-400" />
                    <h3 className="text-lg font-semibold text-teal-400">Compliance</h3>
                  </div>
                  {expandedCard === 'compliance' ? (
                    <ChevronUp className="w-5 h-5 text-teal-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-teal-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  Meet regulatory requirements with comprehensive audit trails and access controls
                </p>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === 'compliance' ? 'auto' : 0,
                    opacity: expandedCard === 'compliance' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-teal-500/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>SOX, PCI-DSS, HIPAA</strong> compliance ready</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Complete session recording</strong> for forensic analysis</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Automated reporting</strong> for auditors</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Separation of duties</strong> enforcement</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Operational Efficiency Card */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
                   onClick={() => toggleCard('operational')}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-emerald-400">Operational Efficiency</h3>
                  </div>
                  {expandedCard === 'operational' ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  Streamline privileged access workflows with automated provisioning and JIT access
                </p>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === 'operational' ? 'auto' : 0,
                    opacity: expandedCard === 'operational' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-emerald-500/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>Just-in-Time access</strong> reduces standing privileges</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>60% reduction</strong> in helpdesk tickets</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>SSO integration</strong> for seamless access</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm"><strong>API automation</strong> for DevOps workflows</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Detailed Points - Expandable Section */}
            <motion.div
              initial={false}
              animate={{
                height: showPAMDetails ? 'auto' : 0,
                opacity: showPAMDetails ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-6">Detailed Benefits</h3>
                
                <div className="space-y-6">
                  {/* Threat Reduction Details */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-6 h-6 text-cyan-400" />
                      <h4 className="text-lg font-bold text-cyan-400">Threat Reduction in Detail</h4>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">80% of breaches</strong> involve compromised privileged credentials - PAM prevents unauthorized access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Real-time monitoring</strong> detects and blocks suspicious privileged account activities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Credential rotation</strong> automatically changes passwords, eliminating static credentials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Session isolation</strong> prevents lateral movement by containing privileged sessions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Compliance Details */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-teal-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-teal-400" />
                      <h4 className="text-lg font-bold text-teal-400">Compliance Requirements</h4>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">SOX, PCI-DSS, HIPAA</strong> compliance through comprehensive audit trails and access controls</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Complete session recording</strong> provides forensic evidence for security investigations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Automated reporting</strong> generates compliance reports for auditors and regulators</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Separation of duties</strong> enforces least privilege and prevents conflicts of interest</span>
                      </li>
                    </ul>
                  </div>

                  {/* Operational Efficiency Details */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-6 h-6 text-emerald-400" />
                      <h4 className="text-lg font-bold text-emerald-400">Operational Benefits</h4>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Just-in-Time (JIT) access</strong> provides temporary elevated privileges, reducing standing access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Self-service workflows</strong> reduce IT helpdesk burden by 60% through automated provisioning</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">Single sign-on (SSO)</strong> integration streamlines access while maintaining security</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong className="text-white">API-driven automation</strong> integrates with DevOps pipelines for secrets management</span>
                      </li>
                    </ul>
                  </div>

                  {/* Additional Business Value */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-500/30">
                    <h4 className="text-lg font-bold text-white mb-4">Business Impact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-cyan-400">$4.45M</div>
                        <div className="text-sm text-gray-400">Average cost of a data breach (IBM 2023)</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-teal-400">60%</div>
                        <div className="text-sm text-gray-400">Reduction in helpdesk tickets</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-emerald-400">90%</div>
                        <div className="text-sm text-gray-400">Faster incident response time</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-blue-400">100%</div>
                        <div className="text-sm text-gray-400">Audit trail coverage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Get Started
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`cyber-card p-6 bg-gradient-to-br ${feature.gradient} group relative overflow-hidden`}
              >
                <div className="scan-line"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${feature.iconColor} p-3 bg-slate-800/50 rounded-lg border border-cyan-500/20 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{feature.description}</p>
                <Link to={feature.link}>
                  <Button className="w-full">
                    Explore
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Made with Bob