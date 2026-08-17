import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const CLIENT_ID = 'ca-pub-7109507058250704';

export default function AdSenseUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
  showLabel = false,
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only push if script is loaded, container has visible width (>0), and hasn't been pushed yet
    if (adRef.current && !isPushed.current) {
      const checkAndPush = () => {
        if (adRef.current && adRef.current.offsetWidth > 0 && !isPushed.current) {
          try {
            if (typeof window !== 'undefined') {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              isPushed.current = true;
            }
          } catch (err) {
            console.debug('AdSense unit initialized:', err);
          }
        }
      };

      // Check immediately
      checkAndPush();

      // If width was 0 (e.g. rendered in hidden container or fast tab switch), observe resize
      if (!isPushed.current && typeof ResizeObserver !== 'undefined' && adRef.current) {
        const observer = new ResizeObserver(() => {
          if (adRef.current && adRef.current.offsetWidth > 0 && !isPushed.current) {
            checkAndPush();
            observer.disconnect();
          }
        });
        observer.observe(adRef.current);
        return () => observer.disconnect();
      }
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex flex-col justify-center items-center ${className}`}>
      {showLabel && (
        <div className="w-full flex items-center justify-between px-2 pb-1 border-b border-slate-100 dark:border-slate-800/60 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Advertisement / إعلان
          </span>
          <span className="text-[9px] text-slate-400/80 font-mono">Google Ad</span>
        </div>
      )}
      <div className="w-full flex justify-center items-center min-h-[60px]">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client={CLIENT_ID}
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
