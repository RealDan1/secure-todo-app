import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ToDos from './components/Todos';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // Logout function(clear the token and log out):
    // ==================================
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="App">
            {/* Define routes for the app */}
            {/* =================================== */}
            <Routes>
                {/* Login Page */}
                <Route
                    path="/"
                    element={
                        <>
                            <Login onLogin={() => setIsLoggedIn(true)} />
                            <Register />
                        </>
                    }
                />
                {/* ToDos Page */}
                <Route
                    path="/todos"
                    element={
                        isLoggedIn ? (
                            <div>
                                <ToDos isLoggedIn={isLoggedIn} userName={userName} setUserName={setUserName} />
                                <button onClick={logout}>Logout</button>
                            </div>
                        ) : (
                            <div>
                                <h2>No ToDos available. You are not logged in.</h2>
                                <button onClick={() => navigate('/')}>Go to Login</button>
                            </div>
                        )
                    }
                />
                {/* send user to /login for any undefined routes */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
