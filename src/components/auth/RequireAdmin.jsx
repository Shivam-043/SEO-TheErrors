
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAdmin = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Checking permissions...</div>;

    if (!user || user.role !== 'admin') {
        // If not admin, redirect to their main dashboard
        return <Navigate to="/dashboard/overview" replace />;
    }

    return <Outlet />;
};

export default RequireAdmin;
