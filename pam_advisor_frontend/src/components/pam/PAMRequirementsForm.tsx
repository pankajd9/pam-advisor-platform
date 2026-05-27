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
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Shield className="w-4 h-4 text-blue-600" />
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
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Server className="w-4 h-4 text-blue-600" />
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
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Cloud className="w-4 h-4 text-blue-600" />
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
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="SaaS">SaaS (Cloud)</option>
            <option value="On-Prem">On-Premises</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
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
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <h3 className="text-lg font-semibold text-gray-900">Feature Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={requirements.azureADIntegration}
              onChange={(e) =>
                setRequirements({ ...requirements, azureADIntegration: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Azure AD Integration</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={requirements.siemIntegration}
              onChange={(e) =>
                setRequirements({ ...requirements, siemIntegration: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">SIEM Integration</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={requirements.sessionRecording}
              onChange={(e) =>
                setRequirements({ ...requirements, sessionRecording: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <Eye className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Session Recording</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <input
              type="checkbox"
              checked={requirements.jitAccess}
              onChange={(e) => setRequirements({ ...requirements, jitAccess: e.target.checked })}
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Just-in-Time Access</span>
          </label>
        </div>
      </div>

      {/* Compliance Requirements */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <FileCheck className="w-5 h-5 text-blue-600" />
          Compliance Requirements
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {complianceOptions.map((compliance) => (
            <label
              key={compliance}
              className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={requirements.complianceRequirement.includes(compliance)}
                onChange={() => toggleCompliance(compliance)}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{compliance}</span>
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