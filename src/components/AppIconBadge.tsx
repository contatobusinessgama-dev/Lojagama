import React from 'react';
import {
  Layers,
  CheckCircle2,
  TrendingUp,
  Compass,
  ShieldCheck,
  FileText,
  Palette,
  Activity,
  Wallet,
  Archive,
  Cpu,
  Type,
  Box
} from 'lucide-react';

interface AppIconBadgeProps {
  iconSymbol: string;
  iconBg: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AppIconBadge: React.FC<AppIconBadgeProps> = ({
  iconSymbol,
  iconBg,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-11 h-11 rounded-xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-20 h-20 rounded-2xl',
    xl: 'w-24 h-24 rounded-3xl'
  }[size];

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  }[size];

  const renderIcon = () => {
    switch (iconSymbol) {
      case 'Layers':
        return <Layers className={`${iconSizes} text-white`} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={`${iconSizes} text-white`} />;
      case 'TrendingUp':
        return <TrendingUp className={`${iconSizes} text-white`} />;
      case 'Compass':
        return <Compass className={`${iconSizes} text-white`} />;
      case 'ShieldCheck':
        return <ShieldCheck className={`${iconSizes} text-white`} />;
      case 'FileText':
        return <FileText className={`${iconSizes} text-white`} />;
      case 'Palette':
        return <Palette className={`${iconSizes} text-white`} />;
      case 'Activity':
        return <Activity className={`${iconSizes} text-white`} />;
      case 'Wallet':
        return <Wallet className={`${iconSizes} text-white`} />;
      case 'Archive':
        return <Archive className={`${iconSizes} text-white`} />;
      case 'Cpu':
        return <Cpu className={`${iconSizes} text-white`} />;
      case 'Type':
        return <Type className={`${iconSizes} text-white`} />;
      default:
        return <Box className={`${iconSizes} text-white`} />;
    }
  };

  return (
    <div
      className={`${sizeClasses} bg-gradient-to-br ${iconBg} flex items-center justify-center shrink-0 shadow-sm ring-1 ring-black/10 dark:ring-white/15 select-none`}
    >
      {renderIcon()}
    </div>
  );
};
