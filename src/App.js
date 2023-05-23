import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { UserContext } from './common/UserContext';

function App() {
    const [uuid, setUuid] = useState(null);

    return (
        <UserContext.Provider value={{ uuid, setUuid }}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
