import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { InvoiceProvider } from './components/InvoiceContext';
import { SalarySlipProvider } from "./components/SalarySlipContext";
import { AuthProvider } from "../src/utils/auth.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InvoiceProvider>
        <SalarySlipProvider>
          <App />
        </SalarySlipProvider>
      </InvoiceProvider>
    </AuthProvider>
  </StrictMode>
)
