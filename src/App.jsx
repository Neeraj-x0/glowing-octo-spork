import React from 'react';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ResetPassword from './ResetPass';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
