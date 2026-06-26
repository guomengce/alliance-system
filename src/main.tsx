import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './index.css';
import './shared/styles/tokens.css';
import './styles/design-tokens.css';
import './shared/styles/ui.css';
import './shared/antd/overrides.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
