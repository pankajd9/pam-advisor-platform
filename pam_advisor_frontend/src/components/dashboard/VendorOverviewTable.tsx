import { motion } from 'framer-motion';
import { Table, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../common';
import { Link } from 'react-router-dom';

interface VendorData {
  vendor: string;
  overallScore: number;
  deployment: string;
  bestFor: string;
  pricingCategory: string;
  color: string;
}

const vendors: VendorData[] = [
  {
    vendor: 'CyberArk',
    overallScore: 92,
    deployment: 'Hybrid',
    bestFor: 'Enterprise Security',
    pricingCategory: 'Enterprise',
    color: 'text-cyan-400',
  },
  {
    vendor: 'Delinea',
    overallScore: 88,
    deployment: 'SaaS',
    bestFor: 'Cloud-First Orgs',
    pricingCategory: 'High',
    color: 'text-teal-400',
  },
  {
    vendor: 'BeyondTrust',
    overallScore: 85,
    deployment: 'On-Prem',
    bestFor: 'Compliance Heavy',
    pricingCategory: 'High',
    color: 'text-blue-400',
  },
  {
    vendor: 'One Identity',
    overallScore: 82,
    deployment: 'Hybrid',
    bestFor: 'Mid-Size Enterprises',
    pricingCategory: 'Medium',
    color: 'text-indigo-400',
  },
];

export const VendorOverviewTable = () => {
  return (
    <div className="cyber-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Table className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Vendor Overview</h2>
            <p className="text-sm text-gray-400">Quick comparison of PAM solutions</p>
          </div>
        </div>
        <Link to="/compare">
          <Button variant="secondary" className="flex items-center gap-2">
            Compare All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Vendor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Overall Score</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Deployment</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Best For</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Pricing</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <motion.tr
                key={vendor.vendor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${vendor.color.replace('text-', 'bg-')}`} />
                    <span className="font-semibold text-white">{vendor.vendor}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${vendor.color}`}>{vendor.overallScore}%</span>
                    {index === 0 && <TrendingUp className="w-4 h-4 text-cyan-400" />}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-300">{vendor.deployment}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-300">{vendor.bestFor}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm px-2 py-1 rounded ${
                    vendor.pricingCategory === 'Enterprise' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : vendor.pricingCategory === 'High'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-teal-500/20 text-teal-400'
                  }`}>
                    {vendor.pricingCategory}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link to="/recommendations">
                    <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      View Details →
                    </button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Made with Bob