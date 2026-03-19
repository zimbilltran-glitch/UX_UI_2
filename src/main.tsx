import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { DeviceSimulator } from './components/DeviceSimulator';
import './index.css';
import './i18n/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceSimulator>
      <App />
    </DeviceSimulator>
  </StrictMode>,
);
