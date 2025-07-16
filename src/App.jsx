import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import About from "./components/About";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/create-invoice" element={<InvoiceForm />} />
        <Route path="/About" element={<About />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

