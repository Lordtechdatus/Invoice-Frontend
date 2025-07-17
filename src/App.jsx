import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import Header from "./components/Header";
import Home from "./components/Home";
import InvoiceForm from "./components/InvoiceForm";
import About from "./components/About";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useLocation } from "react-router-dom";

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

function App() {

  return (
      <Router>
        <CssBaseline />
        <ScrollControlStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-invoice" element={<InvoiceForm />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
  );
}

export default App;

