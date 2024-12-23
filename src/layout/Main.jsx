import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Children pages with responsive container */}
            <div className="container mx-auto px-4 sm:px-4 lg:px-4">
                <Outlet />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Main;
