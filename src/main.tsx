// Safe global property handler for iframe environment logs overlay
try {
  const originalFetch = window.fetch;
  if (originalFetch) {
    let fetchStorage = originalFetch;
    const descriptor = {
      get: () => fetchStorage,
      set: (newValue: any) => { fetchStorage = newValue; },
      configurable: true,
      enumerable: true
    };
    try {
      Object.defineProperty(window, 'fetch', descriptor);
    } catch (e) {
      // Fallback
      const proto = window.constructor ? window.constructor.prototype : Window.prototype;
      if (proto) {
        try {
          Object.defineProperty(proto, 'fetch', descriptor);
        } catch (pe) {}
      }
    }
  }
} catch (e) {
  // Silent fallback
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
