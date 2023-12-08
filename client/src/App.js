// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'; // <Route exact path='/' element={<Home/>} />
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ProfilePage from './components/profileDisplay';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page Route */}
      </Routes>
    </Router>
  );
};

export default App;
