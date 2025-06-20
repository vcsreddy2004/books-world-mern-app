import { Navigate, Outlet } from "react-router-dom";
import UserService from "./../services/UserService";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {  
            try {
                await UserService.getUserData();  
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false); 
            } finally {
                setLoading(false);  
            }
        };

        checkAuth();
    }, []); 

    if (loading) {  
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="spinner-border text-success display-1"></div>
            </div>
        ); 
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
