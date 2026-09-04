import React, { useEffect, useRef, useState } from 'react';

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
  showLabel = true,
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);
  const [isAdFilled, setIsAdFilled] = useState(false);

  useEffect(() => {
    const el = adRef.current;
    if (!el) return;

    // Check if AdSense filled the slot
    const checkFilledStatus = () => {
      if (!el) return;
      const status = el.getAttribute('data-ad-status');
      const hasIframe = el.querySelector('iframe') !== null;
      const hasPositiveHeight = el.offsetHeight > 20;

      if (status === 'filled' || (hasIframe && hasPositiveHeight)) {
        setIsAdFilled(true);
      } else if (status === 'unfilled') {
        setIsAdFilled(false);
      }
    };

    // Check container width before pushing to prevent zero-width TagError
    const checkAndPush = () => {
      if (el && el.offsetWidth > 0 && !isPushed.current) {
        try {
          if (typeof window !== 'undefined') {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isPushed.current = true;
          }
        } catch (err) {
          console.debug('AdSense initialization:', err);
        }
      }
    };

    // Try immediately
    checkAndPush();

    // If width was 0 initially, observe resize
    let resizeObserver: ResizeObserver | null = null;
    if (!isPushed.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (el && el.offsetWidth > 0 && !isPushed.current) {
          checkAndPush();
          resizeObserver?.disconnect();
        }
      });
      resizeObserver.observe(el);
    }

    // Observe mutation on <ins> element for ad status updates
    const mutationObserver = new MutationObserver(() => {
      checkFilledStatus();
    });

    mutationObserver.observe(el, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style', 'class'],
      childList: true,
      subtree: true,
    });

    // Check periodically for the first few seconds
    const interval = setInterval(checkFilledStatus, 500);
    const timeout = setTimeout(() => clearInterval(interval), 6000);

    return () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        contain: 'layout style',
      }}
      className={`w-full transition-all duration-300 ease-out ${
        isAdFilled
          ? `p-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm shadow-sm animate-in fade-in duration-300 ${className}`
          : 'h-0 m-0 p-0 border-0 bg-transparent overflow-hidden opacity-0 pointer-events-none'
      }`}
    >
      {showLabel && isAdFilled && (
        <div className="w-full flex items-center justify-between px-2 pb-1 border-b border-slate-100 dark:border-slate-800/60 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Advertisement / إعلان
          </span>
          <span className="text-[9px] text-slate-400/80 font-mono">Google Ad</span>
        </div>
      )}
      <div className="w-full flex justify-center items-center">
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
