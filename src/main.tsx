import React from 'react';
import { createRoot } from 'react-dom/client';
import AgencyApp from './AgencyApp';
import './agency.css';

createRoot(document.getElementById('root')!).render(
  <AgencyApp />
);
