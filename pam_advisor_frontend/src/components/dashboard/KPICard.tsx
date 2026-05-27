import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  index?: number;
}

export const KPICard = ({
  icon: Icon,
  label,
  value,
  description,
  color,
  bgColor,
  borderColor,
  index = 0,
}: KPICardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="cyber-card p-6 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgColor} blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      <div className="relative z-10">
        <div className={`flex items-center gap-3 mb-3 ${bgColor} ${borderColor} border rounded-lg p-2 w-fit`}>
          <Icon className={`w-6 h-6 ${color}`} />
          <span className="text-sm text-gray-400 font-medium">{label}</span>
        </div>
        <div className={`text-4xl font-bold ${color} mb-1`}>{value}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </motion.div>
  );
};

// Made with Bob