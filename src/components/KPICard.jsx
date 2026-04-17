import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorStyles = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: 'text-blue-500',
    badge: 'bg-blue-100 text-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    icon: 'text-green-500',
    badge: 'bg-green-100 text-green-700'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: 'text-red-500',
    badge: 'bg-red-100 text-red-700'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600',
    icon: 'text-yellow-500',
    badge: 'bg-yellow-100 text-yellow-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    icon: 'text-purple-500',
    badge: 'bg-purple-100 text-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    icon: 'text-orange-500',
    badge: 'bg-orange-100 text-orange-700'
  }
};

export function KPICard({ value, label, icon: Icon, color = 'blue', trend = null }) {
  const styles = colorStyles[color] || colorStyles.blue;
  
  // Parse trend: "+5", "-2", "0" format or just number
  const trendStr = typeof trend === 'string' ? trend : (trend ? `+${trend}` : '0');
  const isTrendPositive = trendStr?.startsWith('+') || trendStr === '0';
  const TrendIcon = isTrendPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}>
      {/* Icon Top Right */}
      <div className="flex justify-between items-start mb-4">
        <div />
        {Icon && (
          <Icon className={`${styles.icon} w-6 md:w-8 h-6 md:h-8 opacity-20`} />
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
      </div>

      {/* Label */}
      <div className="mb-3">
        <p className="text-xs md:text-sm text-gray-600">{label}</p>
      </div>

      {/* Trend */}
      {trend !== null && trend !== 0 && (
        <div className={`flex items-center gap-1 text-xs ${isTrendPositive ? 'text-green-600' : 'text-red-600'}`}>
          <TrendIcon className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">{trendStr} vs kemarin</span>
          <span className="sm:hidden">{trendStr}</span>
        </div>
      )}
    </div>
  );
}
