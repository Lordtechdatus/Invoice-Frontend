import React, { createContext, useContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {

  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);
