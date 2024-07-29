import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

/* https://mswjs.io/docs/integrations/browser */
void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
