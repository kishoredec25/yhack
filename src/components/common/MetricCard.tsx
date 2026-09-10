import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: 'pass' | 'warning' | 'fail' | 'neutral';
  badge?: string;
  progressValue?: number; // 0 to 1
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend = 'neutral',
  badge,
  progressValue,
  onClick,
  className = ''
}) => {
  const borderClass = 
    trend === 'pass' ? 'hover:border-emerald-500/50 hover:shadow-emerald-500/10' :
    trend === 'warning' ? 'hover:border-amber-500/50 hover:shadow-amber-500/10' :
    trend === 'fail' ? 'hover:border-rose-500/50 hover:shadow-rose-500/10' :
    'hover:border-cyan-500/50 hover:shadow-cyan-500/10';

  const valueColor = 
    trend === 'pass' ? 'text-emerald-400' :
    trend === 'warning' ? 'text-amber-400' :
    trend === 'fail' ? 'text-rose-400' :
    'text-cyan-300';

  return (
    <div 
      onClick={onClick}
      className={`glass-panel p-5 rounded-2xl transition-all duration-300 border border-slate-800/80 shadow-md ${borderClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className={`text-2xl font-extrabold font-mono tracking-tight ${valueColor}`}>{value}</h3>
            {badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                trend === 'pass' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' :
                trend === 'warning' ? 'bg-amber-950/80 text-amber-400 border border-amber-800' :
                trend === 'fail' ? 'bg-rose-950/80 text-rose-400 border border-rose-800' :
                'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
              }`}>
                {badge}
              </span>
            )}
          </div>
          {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${
            trend === 'pass' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50' :
            trend === 'warning' ? 'bg-amber-950/50 text-amber-400 border border-amber-800/50' :
            trend === 'fail' ? 'bg-rose-950/50 text-rose-400 border border-rose-800/50' :
            'bg-slate-800/80 text-cyan-400 border border-slate-700'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {progressValue !== undefined && (
        <div className="mt-4 w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              trend === 'pass' ? 'risk-bar-pass' :
              trend === 'warning' ? 'risk-bar-warning' :
              trend === 'fail' ? 'risk-bar-danger' :
              'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, progressValue * 100))}%` }}
          />
        </div>
      )}
    </div>
  );
};
