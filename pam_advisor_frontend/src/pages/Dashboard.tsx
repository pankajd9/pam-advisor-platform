import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Eye,
  BarChart3,
  Brain,
  Cloud,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Activity,
  ChevronDown,
  User,
  Calendar,
  X,
  FileCheck,
  AlertTriangle,
  Key,
  DollarSign,
  FileWarning
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from '../components/auth/LoginModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showExpertsModal, setShowExpertsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedStat, setExpandedStat] = useState<number | null>(null);

  const securityExperts = [
    {
      name: 'Yagya Mishra',
      role: 'Lead Cybersecurity Architect',
      specialization: 'PAM Architecture & Zero Trust Security',
      isLead: true
    },
    {
      name: 'Pankaj Dubey',
      role: 'Senior PAM Security Consultant',
      specialization: 'Identity Security & Compliance'
    },
    {
      name: 'Namit Narang',
      role: 'PAM & Identity Security Consultant',
      specialization: 'Hybrid PAM Deployments'
    },
    {
      name: 'Shreya Sehgal',
      role: 'Security Operations Consultant',
      specialization: 'Compliance Advisory & Audit'
    },
    {
      name: 'Somya Raghaw',
      role: 'Security Advisory Consultant',
      specialization: 'AI Security Advisory & Risk Management'
    },
  ];

  const pamVendors = [
    { name: 'CyberArk', color: 'text-blue-600' },
    { name: 'Delinea', color: 'text-purple-600' },
    { name: 'BeyondTrust', color: 'text-orange-600' },
    { name: 'One Identity', color: 'text-teal-600' },
    { name: 'Thycotic', color: 'text-green-600' },
    { name: 'Centrify', color: 'text-red-600' },
  ];

  const securityStats = [
    {
      icon: AlertTriangle,
      title: 'Identity Risk',
      metric: '60%',
      description: 'Breaches often involve a human element such as misuse, phishing, or credential exposure.',
      expandedText: 'This highlights why privileged access governance is critical. PAM helps reduce identity-based risk by enforcing controlled access, approval workflows, password rotation, and session monitoring.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Key,
      title: 'Credential Abuse',
      metric: '22%',
      description: 'Credential abuse remains one of the major initial access vectors in security incidents.',
      expandedText: 'Privileged credentials are high-value targets. PAM reduces this risk through vaulting, automated rotation, just-in-time access, and least privilege controls.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: DollarSign,
      title: 'High Impact Cost',
      metric: '$4.4M',
      description: 'Average global data breach cost highlights the business impact of weak access governance.',
      expandedText: 'Weak privileged access controls can create financial, operational, and reputational impact. PAM Advisor helps organizations choose the right PAM solution to reduce exposure and improve security maturity.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileWarning,
      title: 'Governance Gap',
      metric: '63%',
      description: 'Many breached organizations lack formal AI governance policies, increasing identity and access risks.',
      expandedText: 'As AI adoption grows, privileged access governance becomes more important. PAM supports secure administration, auditability, policy enforcement, and controlled access across enterprise systems.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Unified Visibility',
      description: 'Identify privileged accounts, admin IDs, service accounts, and access paths across hybrid environments.',
      expandedText: 'PAM Advisor helps organizations understand where privileged access exists and why visibility is the first step toward reducing access risk.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Vendor Intelligence',
      description: 'Compare PAM vendors across features, deployment models, compliance support, and operational effort.',
      expandedText: 'The platform reduces manual vendor evaluation by comparing CyberArk, Delinea, BeyondTrust, and One Identity using structured criteria.',
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      icon: Brain,
      title: 'AI Recommendations',
      description: 'Generate AI-assisted PAM recommendations based on enterprise security and compliance requirements.',
      expandedText: 'The recommendation engine analyzes accounts, servers, integrations, compliance needs, budget, and architecture preference to suggest the best-fit PAM solution.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Cloud,
      title: 'Hybrid Architecture',
      description: 'Plan PAM deployment across SaaS, on-premise, cloud, and distributed infrastructure.',
      expandedText: 'PAM Advisor supports architecture planning for modern enterprises operating across multiple environments and identity systems.',
      color: 'bg-sky-50 text-sky-600'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Readiness',
      description: 'Support audit readiness through access control, session monitoring, password governance, and reporting.',
      expandedText: 'The platform helps map PAM capabilities to SOX, PCI-DSS, ISO27001, SOC2, HIPAA, and enterprise audit requirements.',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Executive Insights',
      description: 'Convert PAM assessment data into business-friendly risk, cost, and implementation insights.',
      expandedText: 'PAM Advisor helps leadership understand security value, risk reduction, implementation effort, and vendor suitability.',
      color: 'bg-orange-50 text-orange-600'
    },
  ];

  const integrations = [
    { name: 'Active Directory', icon: '🔷', color: 'bg-blue-50' },
    { name: 'Azure AD', icon: '☁️', color: 'bg-sky-50' },
    { name: 'AWS IAM', icon: '🟠', color: 'bg-orange-50' },
    { name: 'Google Cloud', icon: '🌐', color: 'bg-red-50' },
    { name: 'ServiceNow', icon: '⚙️', color: 'bg-green-50' },
    { name: 'Splunk', icon: '📊', color: 'bg-emerald-50' },
    { name: 'Okta', icon: '🔐', color: 'bg-indigo-50' },
    { name: 'SailPoint', icon: '⛵', color: 'bg-cyan-50' },
    { name: 'CyberArk', icon: '🛡️', color: 'bg-purple-50' },
    { name: 'Delinea', icon: '🔒', color: 'bg-pink-50' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">PAM ADVISOR</div>
                <div className="text-[10px] text-blue-600 font-semibold tracking-wide">AI-POWERED SECURITY INTELLIGENCE</div>
              </div>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Platform Dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Platform
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      PAM Dashboard
                    </Link>
                    <Link to="/architecture" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Architecture Advisor
                    </Link>
                    <Link to="/recommendations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      AI Recommendation Engine
                    </Link>
                    <Link to="/compare" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Vendor Intelligence
                    </Link>
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Solutions
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/compare" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Vendor Comparison
                    </Link>
                    <a href="#integrations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Integration
                    </a>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Documentation
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Case Studies
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Whitepapers
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Security Reports
                    </a>
                  </div>
                </div>
              </div>

              {/* Security Experts Dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Security Experts
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => setShowExpertsModal(true)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Meeting
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link to="/request-demo">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  REQUEST DEMO
                </button>
              </Link>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-blue-600 text-sm font-semibold mb-4 tracking-wide">
                AI-POWERED PAM ADVISORY PLATFORM
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Intelligent </span>
                <span className="text-blue-600">PAM Advisory</span>
                <span className="text-gray-900">.</span>
                <br />
                <span className="text-gray-900">Stronger </span>
                <span className="text-blue-600">Security Decisions</span>
                <span className="text-gray-900">.</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Unified platform to analyze requirements, compare vendors, and 
                get AI-powered recommendations for privileged access security.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/recommendations">
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    Get AI Recommendations
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/compare">
                  <button className="px-6 py-3 text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                    Compare PAM Solutions
                  </button>
                </Link>
              </div>

              {/* Vendor Logos Strip */}
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-4 tracking-wide">TRUSTED BY LEADING PAM PROVIDERS</div>
                <div className="flex flex-wrap items-center gap-6">
                  {pamVendors.map((vendor, index) => (
                    <motion.div
                      key={vendor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Shield className={`w-5 h-5 ${vendor.color}`} />
                      <span className="text-sm font-semibold text-gray-700">{vendor.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Terminal Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">pam-advisor-ai.sh</span>
                </div>

                {/* Terminal Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span className="text-blue-600 font-semibold">Analyzing PAM Requirements...</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs">
                    <div className="text-gray-600">{`{`}</div>
                    <div className="pl-4 space-y-1">
                      <div><span className="text-orange-600">"accounts"</span>: <span className="text-green-600">"50000-100000"</span>,</div>
                      <div><span className="text-orange-600">"deployment"</span>: <span className="text-green-600">"hybrid"</span>,</div>
                      <div><span className="text-orange-600">"compliance"</span>: [<span className="text-green-600">"SOC2", "ISO27001"</span>]</div>
                    </div>
                    <div className="text-gray-600">{`}`}</div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span className="text-blue-600 font-semibold">AI Vendor Match Results</span>
                  </div>

                  {/* Vendor Match Results */}
                  <div className="space-y-3">
                    {[
                      { name: 'CyberArk', score: 92, color: 'bg-blue-600' },
                      { name: 'Delinea', score: 88, color: 'bg-purple-600' },
                      { name: 'BeyondTrust', score: 85, color: 'bg-orange-600' },
                    ].map((vendor, index) => (
                      <motion.div
                        key={vendor.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-700">{vendor.name}</span>
                          </div>
                          <span className="font-bold text-blue-600">{vendor.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${vendor.score}%` }}
                            transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                            className={`h-full ${vendor.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">Recommendation: CyberArk</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Shield */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center opacity-50">
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY PAM SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why PAM Matters for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Enterprise Security</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Privileged access remains one of the most targeted areas in cybersecurity. PAM helps reduce identity-based risk, control administrative access, improve audit readiness, and strengthen enterprise security governance.
            </p>
          </div>

          {/* Security Statistics - Expandable */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityStats.map((stat, index) => {
                const StatIcon = stat.icon;
                const isExpanded = expandedStat === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setExpandedStat(isExpanded ? null : index)}
                    className={`bg-white rounded-lg p-5 border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                      isExpanded ? 'border-blue-400 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <StatIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.title}</div>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{stat.metric}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{stat.description}</p>
                    
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg">
                              {stat.expandedText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center mt-4 italic">
              Indicative industry figures based on recent public cybersecurity breach reports.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-8 pb-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isExpanded = expandedCard === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1 hover:border-blue-400 transition-all duration-300 flex flex-col cursor-pointer group ${
                    isExpanded ? 'border-blue-400 shadow-xl shadow-blue-100' : ''
                  }`}
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 pb-3 border-b border-blue-100 flex items-center justify-between">
                    {feature.title}
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{feature.description}</p>
                  
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-blue-100 mt-3">
                          <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                            {feature.expandedText}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section id="integrations" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connected to Your <span className="text-blue-600">Security Ecosystem</span>
            </h2>
            <p className="text-lg text-gray-600">
              Seamless integration with identity providers, cloud platforms, and security tools.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`${integration.color} rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-200`}
              >
                <div className="text-4xl mb-3">{integration.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{integration.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">PAM ADVISOR</div>
                  <div className="text-[10px] text-blue-600 font-semibold">AI-POWERED SECURITY INTELLIGENCE</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enterprise-grade PAM advisory platform powered by AI. Intelligent recommendations for privileged access management.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">SOLUTIONS</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/recommendations" className="hover:text-blue-600 transition-colors">AI Recommendations</Link></li>
                <li><Link to="/compare" className="hover:text-blue-600 transition-colors">Vendor Comparison</Link></li>
                <li><Link to="/architecture" className="hover:text-blue-600 transition-colors">Architecture Advisor</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">RESOURCES</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Whitepapers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security Experts</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">COMPANY</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>© 2026 PAM Advisor. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">Security</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Compliance</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Security Experts Modal */}
      <AnimatePresence>
        {showExpertsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExpertsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Connect with Our Security Experts</h2>
                  <p className="text-gray-600 mt-1">Schedule a consultation with our PAM security specialists</p>
                </div>
                <button
                  onClick={() => setShowExpertsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Lead Expert */}
                <div className="mb-8">
                  <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wide">LEAD CYBERSECURITY ARCHITECT</div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{securityExperts[0].name}</h3>
                        <p className="text-blue-600 font-medium mt-1">{securityExperts[0].role}</p>
                        <p className="text-gray-600 mt-2">{securityExperts[0].specialization}</p>
                        <Link
                          to={`/schedule-meeting?expert=${encodeURIComponent(securityExperts[0].name)}`}
                          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 inline-flex"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Meeting
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAM Consultants */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wide">PAM SECURITY CONSULTANTS</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {securityExperts.slice(1).map((expert, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{expert.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{expert.role}</p>
                            <p className="text-xs text-gray-500 mt-2">{expert.specialization}</p>
                            <Link
                              to={`/schedule-meeting?expert=${encodeURIComponent(expert.name)}`}
                              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2 inline-flex"
                            >
                              <Calendar className="w-4 h-4" />
                              Book Meeting
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Compliance Modal */}
      <AnimatePresence>
        {showComplianceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowComplianceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <FileCheck className="w-7 h-7" />
                    PAM Compliance Dashboard
                  </h2>
                  <p className="text-blue-100 mt-1">Enterprise compliance framework alignment</p>
                </div>
                <button
                  onClick={() => setShowComplianceModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* SOX */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">SOX</h3>
                        <p className="text-sm text-gray-600 mt-1">Sarbanes-Oxley Act</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Privileged access controls</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Audit trail requirements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Financial system access</span>
                      </div>
                    </div>
                  </div>

                  {/* PCI-DSS */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">PCI-DSS</h3>
                        <p className="text-sm text-gray-600 mt-1">Payment Card Industry</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                        <span>Cardholder data access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                        <span>Multi-factor authentication</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                        <span>Session monitoring</span>
                      </div>
                    </div>
                  </div>

                  {/* ISO 27001 */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">ISO 27001</h3>
                        <p className="text-sm text-gray-600 mt-1">Information Security</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        <span>Access control policies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        <span>Identity management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        <span>Risk assessment</span>
                      </div>
                    </div>
                  </div>

                  {/* SOC 2 */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">SOC 2</h3>
                        <p className="text-sm text-gray-600 mt-1">Service Organization Control</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        <span>Security controls</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        <span>Availability monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        <span>Confidentiality measures</span>
                      </div>
                    </div>
                  </div>

                  {/* HIPAA */}
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200 md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">HIPAA</h3>
                        <p className="text-sm text-gray-600 mt-1">Health Insurance Portability and Accountability Act</p>
                      </div>
                      <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                          <span>PHI access controls</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                          <span>Audit logging</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                          <span>Encryption requirements</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                          <span>Access termination</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Need Compliance Advisory?</h4>
                      <p className="text-sm text-gray-600">Get expert guidance on PAM compliance alignment</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowComplianceModal(false);
                        navigate('/recommendations');
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Made with Bob