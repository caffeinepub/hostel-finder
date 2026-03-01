// AdBanner component - placeholder ad slots ready for future ad network integration
// To integrate a real ad network (e.g., Google AdSense), replace the placeholder div
// with the ad network's script/ins tags and provide the adSlotId to the network.

interface AdBannerProps {
  size: 'leaderboard' | 'rectangle' | 'banner';
  label?: string;
  adSlotId?: string; // For future ad network integration (e.g., Google AdSense slot ID)
  className?: string;
}

const SIZE_CONFIG = {
  leaderboard: {
    width: 728,
    height: 90,
    containerClass: 'w-full max-w-[728px] h-[90px]',
    label: '728 × 90',
  },
  rectangle: {
    width: 300,
    height: 250,
    containerClass: 'w-[300px] h-[250px]',
    label: '300 × 250',
  },
  banner: {
    width: 468,
    height: 60,
    containerClass: 'w-full max-w-[468px] h-[60px]',
    label: '468 × 60',
  },
};

export default function AdBanner({
  size,
  label = 'Advertisement',
  adSlotId,
  className = '',
}: AdBannerProps) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={`flex items-center justify-center mx-auto ${config.containerClass} ${className}`}
      data-ad-slot={adSlotId}
      aria-label={label}
    >
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex flex-col items-center justify-center gap-1 overflow-hidden relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(180,120,0,0.1) 10px, rgba(180,120,0,0.1) 11px)',
          }} />
        </div>
        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest z-10">
          {label}
        </span>
        <span className="text-[10px] text-amber-500 dark:text-amber-600 z-10">
          {config.label}
        </span>
      </div>
    </div>
  );
}
