import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.module.scss';

// NOTE: We export a mock VELT_API_KEY at build-time or use real envs when integrating.
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
