import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import Header from "./components/Header";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

