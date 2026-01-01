
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const RequireClient = () => {
    const { activeClient, loading: dataLoading } = useData();
    const { user, loading: authLoading } = useAuth();

    const location = useLocation();

    if (dataLoading || authLoading) {
        return <div className="h-screen flex items-center justify-center text-orange-600">Loading Client Data...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!activeClient) {
        // IMPROVED LOGIC:
        // If we represent a "Client" user, we should NOT redirect to /admin/clients
        // because we don't have access. We should likely just wait (handled by loading above)
        // or if we really have no data, show an error.

        if (user?.role === 'client') {
            // If we are here, it means loading is done but no client found.
            // This corresponds to "Client logged in but no matching document".
            return <div className="p-8 text-center text-red-600">Error: No client profile found for your account. Please contact support.</div>;
        }

        // If we are Admin, we assume we need to select a client first.
        return <Navigate to="/admin/clients" replace />;
    }

    return <Outlet />;
};

export default RequireClient;
