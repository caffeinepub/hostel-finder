// AdBanner component - placeholder ad slots ready for Google AdSense integration
//
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ACTIVATE GOOGLE ADSENSE (3 steps):
//
//  Step 1 — Sign up at https://adsense.google.com and get your site approved.
//           You will receive a publisher ID like: ca-pub-XXXXXXXXXXXXXXXX
//
//  Step 2 — In the render output below, DELETE the placeholder <div> (the amber
//           gradient box labelled "Advertisement") and UNCOMMENT the AdSense
//           <ins> block that follows it.
//
//  Step 3 — Replace the placeholder values:
//           • data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  → your real publisher ID
//           • data-ad-slot="YYYYYYYYYY"                 → your real ad unit slot ID
//             (create ad units in your AdSense dashboard under Ads > By ad unit)
//
//  After saving, the amber placeholder will disappear and real ads will load.
// ─────────────────────────────────────────────────────────────────────────────

interface AdBannerProps {
  size: 'leaderboard' | 'rectangle' | 'banner';
  label?: string;
  adSlotId?: string; // Pass your real AdSense slot ID here once activated
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
      aria-label={label}
    >
      {/*
        ═══════════════════════════════════════════════════════════════════════
        ADSENSE INJECTION POINT
        ───────────────────────────────────────────────────────────────────────
        CURRENT STATE: Showing amber placeholder (visible to visitors).
        TO ACTIVATE ADS: Delete the placeholder <div> below and uncomment
        the <ins> AdSense block that follows it (see instructions at top of file).
        ═══════════════════════════════════════════════════════════════════════
      */}

      {/* ── PLACEHOLDER (delete this entire div when activating AdSense) ── */}
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
      {/* ── END PLACEHOLDER ── */}

      {/*
        ── ADSENSE BLOCK (uncomment this when activating AdSense) ──────────
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={adSlotId ?? "YYYYYYYYYY"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>
        ── END ADSENSE BLOCK ────────────────────────────────────────────────

        Also add the AdSense auto-ads script once in frontend/index.html <head>:
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
      */}
    </div>
  );
}
