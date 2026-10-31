import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const targetId = hash ? decodeURIComponent(hash.slice(1)) : '';
    let attempts = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const scroll = () => {
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        // Lazy-loaded pages may not have rendered the target yet; retry briefly
        if (attempts++ < 20) {
          timeout = setTimeout(scroll, 100);
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    // Small delay to allow page content to load before scrolling
    timeout = setTimeout(scroll, 100);
    return () => clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
};
