import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import UserForm from './Components/Pages/UserForm';
import UserTable from './Components/Pages/UserTable';
import Home from './Components/Pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/form" element={<UserForm/>} />
      <Route path="/user-data" element={<UserTable/>} />
      </Routes>
    </Router>
  );
}

export default App;
