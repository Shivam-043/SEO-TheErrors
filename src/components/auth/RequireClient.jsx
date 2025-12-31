
import { Navigate, Outlet } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const RequireClient = () => {
    const { activeClient, loading } = useData();

    if (loading) {
        return <div className="h-screen flex items-center justify-center text-orange-600">Loading Client Data...</div>;
    }

    if (!activeClient) {
        // If no client is selected, force them to the Client Manager
        return <Navigate to="/admin/clients" replace />;
    }

    return <Outlet />;
};

export default RequireClient;
