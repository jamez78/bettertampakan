import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.tsx';
import './i18n';
import './fonts.css';
import './index.css';

// After a deploy, a tab opened before it still references the old chunk
// names, which no longer exist. Reload once so it picks up the new build;
// the sessionStorage flag guarantees this can never loop.
const RELOAD_FLAG = 'bt-preload-reloaded';
window.addEventListener('vite:preloadError', event => {
  let alreadyReloaded = false;
  try {
    alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === '1';
    if (!alreadyReloaded) sessionStorage.setItem(RELOAD_FLAG, '1');
  } catch {
    // sessionStorage unavailable (private mode, blocked storage): do not
    // reload, because we could not guarantee it only happens once.
    return;
  }
  if (alreadyReloaded) return;
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
