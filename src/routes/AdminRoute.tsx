import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Role } from '../services/IAuthService';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, roles } = useContext(AuthContext);
    if (!user || !roles || !roles.includes(Role.ADMIN)) {
        return <Navigate to="/" replace/>;
    }
    return <>{children}</>;
};

export default AdminRoute;