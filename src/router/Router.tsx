import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routesConfig";
import { NotFoundPage } from "../pages";
import App from "../App";
import { CentralLoader } from '../components/CentralLoader';

const RouterContent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [prevLocation, setPrevLocation] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== prevLocation) {
            setIsLoading(true);
            setPrevLocation(location.pathname);
        }
    }, [location, prevLocation]);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <>
            <CentralLoader open={isLoading} />
            <Routes>
                <Route path="/" element={<App />}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export const Router = () => {
    return (
        <BrowserRouter>
            <RouterContent />
        </BrowserRouter>
    );
};