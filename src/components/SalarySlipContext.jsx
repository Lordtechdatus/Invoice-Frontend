// import React, { createContext, useContext, useState } from 'react';

// const SalarySlipContext = createContext();

// export const SalarySlipProvider = ({ children }) => {
//   const [slips, setSlips] = useState([]);

//   const addSlip = (slip) => {
//     setSlips((prev) => [...prev, slip]);
//   };

//   const deleteSlip = (id) => {
//     setSlips((prev) => prev.filter((s) => s.id !== id));
//   };

//   return (
//     <SalarySlipContext.Provider value={{ slips, addSlip, deleteSlip }}>
//       {children}
//     </SalarySlipContext.Provider>
//   );
// };

// export const useSalarySlipContext = () => useContext(SalarySlipContext);



// SalarySlipContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const SalarySlipContext = createContext();

export const SalarySlipProvider = ({ children }) => {
  const [slips, setSlips] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('salarySlipsList'); // separate key for list rows
      if (raw) setSlips(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('salarySlipsList', JSON.stringify(slips));
    } catch {}
  }, [slips]);

  const addSlip = (row) => setSlips((prev) => [row, ...prev]);
  const deleteSlip = (id) => setSlips((prev) => prev.filter((s) => s.id !== id));

  return (
    <SalarySlipContext.Provider value={{ slips, addSlip, deleteSlip }}>
      {children}
    </SalarySlipContext.Provider>
  );
};

export const useSalarySlipContext = () => useContext(SalarySlipContext);
