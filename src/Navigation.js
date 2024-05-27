import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Historico from './pages/Historico';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/historico" element={<Historico />} />

            </Routes>
        </Router>
    );
};

export default Navigation;