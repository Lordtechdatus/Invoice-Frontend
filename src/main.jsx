import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { InvoiceProvider } from './components/InvoiceContext';
import { SalarySlipProvider } from "./components/SalarySlipContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
      <SalarySlipProvider>
        <App />
      </SalarySlipProvider>
    </InvoiceProvider>
  </StrictMode>
)
