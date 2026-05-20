import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Cloud, Eye, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Button, Input } from '../common';
import type { PAMRequirements } from '../../types/pam';

interface PAMRequirementsFormProps {
  onSubmit: (requirements: PAMRequirements) => void;
}

export function PAMRequirementsForm({ onSubmit }: PAMRequirementsFormProps) {
  const [requirements, setRequirements] = useState<PAMRequirements>({
    privilegedAccounts: 100,
    servers: 50,
    azureADIntegration: false,
    siemIntegration: false,
    sessionRecording: false,
    jitAccess: false,
    deploymentPreference: 'SaaS',
    budgetRange: 'Medium',
    complianceRequirement: [],
  });

  const complianceOptions = ['SOX', 'PCI-DSS', 'HIPAA', 'GDPR', 'ISO 27001', 'NIST'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requirements);
  };

  const toggleCompliance = (compliance: string) => {
    setRequirements((prev) => ({
      ...prev,
      complianceRequirement: prev.complianceRequirement.includes(compliance)
        ? prev.complianceRequirement.filter((c) => c !== compliance)
        : [...prev.complianceRequirement, compliance],
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Privileged Accounts */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Shield className="w-4 h-4 text-cosmic-purple" />
            Number of Privileged Accounts
          </label>
          <Input
            type="number"
            value={requirements.privilegedAccounts}
            onChange={(e) =>
              setRequirements({ ...requirements, privilegedAccounts: parseInt(e.target.value) || 0 })
            }
            min="1"
            required
          />
        </div>

        {/* Servers */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Server className="w-4 h-4 text-cosmic-purple" />
            Number of Servers
          </label>
          <Input
            type="number"
            value={requirements.servers}
            onChange={(e) =>
              setRequirements({ ...requirements, servers: parseInt(e.target.value) || 0 })
            }
            min="1"
            required
          />
        </div>

        {/* Deployment Preference */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Cloud className="w-4 h-4 text-cosmic-purple" />
            Deployment Preference
          </label>
          <select
            value={requirements.deploymentPreference}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                deploymentPreference: e.target.value as 'SaaS' | 'On-Prem' | 'Hybrid',
              })
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
          >
            <option value="SaaS">SaaS (Cloud)</option>
            <option value="On-Prem">On-Premises</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DollarSign className="w-4 h-4 text-cosmic-purple" />
            Budget Range
          </label>
          <select
            value={requirements.budgetRange}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                budgetRange: e.target.value as 'Low' | 'Medium' | 'High' | 'Enterprise',
              })
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
          >
            <option value="Low">Low (under $50k/year)</option>
            <option value="Medium">Medium ($50k - $200k/year)</option>
            <option value="High">High ($200k - $500k/year)</option>
            <option value="Enterprise">Enterprise (over $500k/year)</option>
          </select>
        </div>
      </div>

      {/* Feature Requirements */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Feature Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
            <input
              type="checkbox"
              checked={requirements.azureADIntegration}
              onChange={(e) =>
                setRequirements({ ...requirements, azureADIntegration: e.target.checked })
              }
              className="w-5 h-5 text-cosmic-purple bg-gray-700 border-gray-600 rounded focus:ring-cosmic-purple"
            />
            <span className="text-gray-300">Azure AD Integration</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
            <input
              type="checkbox"
              checked={requirements.siemIntegration}
              onChange={(e) =>
                setRequirements({ ...requirements, siemIntegration: e.target.checked })
              }
              className="w-5 h-5 text-cosmic-purple bg-gray-700 border-gray-600 rounded focus:ring-cosmic-purple"
            />
            <span className="text-gray-300">SIEM Integration</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
            <input
              type="checkbox"
              checked={requirements.sessionRecording}
              onChange={(e) =>
                setRequirements({ ...requirements, sessionRecording: e.target.checked })
              }
              className="w-5 h-5 text-cosmic-purple bg-gray-700 border-gray-600 rounded focus:ring-cosmic-purple"
            />
            <Eye className="w-4 h-4 text-cosmic-purple" />
            <span className="text-gray-300">Session Recording</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors">
            <input
              type="checkbox"
              checked={requirements.jitAccess}
              onChange={(e) => setRequirements({ ...requirements, jitAccess: e.target.checked })}
              className="w-5 h-5 text-cosmic-purple bg-gray-700 border-gray-600 rounded focus:ring-cosmic-purple"
            />
            <Clock className="w-4 h-4 text-cosmic-purple" />
            <span className="text-gray-300">Just-in-Time Access</span>
          </label>
        </div>
      </div>

      {/* Compliance Requirements */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-lg font-semibold text-white">
          <FileCheck className="w-5 h-5 text-cosmic-purple" />
          Compliance Requirements
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {complianceOptions.map((compliance) => (
            <label
              key={compliance}
              className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors"
            >
              <input
                type="checkbox"
                checked={requirements.complianceRequirement.includes(compliance)}
                onChange={() => toggleCompliance(compliance)}
                className="w-4 h-4 text-cosmic-purple bg-gray-700 border-gray-600 rounded focus:ring-cosmic-purple"
              />
              <span className="text-sm text-gray-300">{compliance}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button type="submit" className="px-8 py-3 text-lg">
          Get AI Recommendations
        </Button>
      </div>
    </motion.form>
  );
}

// Made with Bob