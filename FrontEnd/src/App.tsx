// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import AdminPage from "./views/protectedpages/adminpage";
import LoginPage from "../src/views/pages/Loginpage";
import AdminPage from './views/protectedpages/adminpage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>        
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/admin" element={<AdminPage/>}/>

      </Routes>
    </Router>
  );
  
};

export default App;
