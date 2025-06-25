import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { 
  HomePage, 
  LoginPage, 
  SignUpPage, 
  ProfilePage, 
  VideoPlayer,
  SearchPage 
} from './components';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('netflix_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUpPage onSignUp={login} /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <ProfilePage user={user} onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <SearchPage user={user} onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="/watch/:id" element={user ? <VideoPlayer user={user} onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <HomePage user={user} onLogout={logout} /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;