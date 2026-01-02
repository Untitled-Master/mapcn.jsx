import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnderWork from './pages/UnderWork'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<UnderWork />} />
        <Route path="*" element={<UnderWork />} /> {/* Catch-all for other non-existent pages */}
      </Routes>
    </Router>
  );
}

export default App;

