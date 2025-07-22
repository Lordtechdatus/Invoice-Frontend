import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { InvoiceProvider } from './components/InvoiceContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
     <App />
    </InvoiceProvider>
  </StrictMode>
)
