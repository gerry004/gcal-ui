import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Properly instantiate the component */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Corrected path to match 'about' */}
      </Routes>
    </Router>
  );
}

export default App;
