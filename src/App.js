import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cars from './pages/Cars';
import Mycars from './pages/Mycars';
// import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import ServerStatusAlert from './components/ServerStatusAlert';

// Create a RouterWrapper to handle auth context with router
const RouterWrapper = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <ServerStatusAlert />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/mycars" element={<Mycars />} />
            {/* <Route path="/favorites" element={<Favorites />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <RouterWrapper />
      </Router>
    </FavoritesProvider>
  );
}

export default App;
