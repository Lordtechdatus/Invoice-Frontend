import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
// import { fetchUsers } from "../api";
import Header from "./components/Header";
import Home from "./components/Home";
import InvoiceForm from "./components/InvoiceForm";
import PreviewPage from "./components/Preview";
import About from "./components/About";
import Pricing from "./components/Pricing";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminInvoices from './admin/AdminInvoices';
import AdminRoute from './admin/AdminRoute';
import AdminSalarySlips from './admin/AdminSalarySlips';
import { useLocation } from "react-router-dom";
import InvoicePage from "./components/Invoices";
import AuthSuccess from "./components/AuthSuccess";
import SalarySlipForm from "./components/SalarySlip";
import SalarySlipPage from "./components/SalarySlipsPage";
import Contact from "./components/Contact";

function ScrollControlStyles() {
  const location = useLocation();
  const noScrollPages = ['/Login', '/SignUp'];

  const isNoScroll = noScrollPages.includes(location.pathname);

  return (
    <GlobalStyles
      styles={{
        body: {
          overflow: isNoScroll ? 'hidden' : 'auto',
        },
        html: {
          overflow: isNoScroll ? 'hidden' : 'auto', // Include this!
        },
      }}
    />
  );
}

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <ScrollControlStyles />
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/invoices" element={<><Header /><InvoicePage /></>} />
          <Route path="/create-invoice" element={<><Header /><InvoiceForm /></>} />
          <Route path="/salary-slips" element={<><Header /><SalarySlipPage /></>} />
          <Route path="/salary" element={<><Header /><SalarySlipForm /></>} />
          <Route path="/preview" element={<><Header /><PreviewPage /></>} />
          <Route path="/About" element={<><Header /><About /></>} />
          <Route path="/Pricing" element={<><Header /><Pricing /></>} />
          <Route path="/contact" element={<><Header /><Contact /></>} />
          <Route path="/Login" element={<><Header /><LogIn /></>} />
          <Route path="/SignUp" element={<><Header /><SignUp /></>} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/invoices" element={<AdminRoute><AdminInvoices /></AdminRoute>} />
          <Route path="/admin/salary-slips" element={<AdminRoute><AdminSalarySlips /></AdminRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

