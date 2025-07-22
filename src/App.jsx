import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import Header from "./components/Header";
import Home from "./components/Home";
import InvoiceForm from "./components/InvoiceForm";
import PreviewPage from "./components/Preview";
import About from "./components/About";
import Pricing from "./components/Pricing";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useLocation } from "react-router-dom";
import InvoicePage from "./components/Invoices";

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/create-invoice" element={<InvoiceForm />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

