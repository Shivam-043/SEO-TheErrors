
import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const { user, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-orange-50">Loading...</div>;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return (
        <div className="flex min-h-screen bg-orange-50/50">
            <Sidebar />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center overflow-hidden rounded-md bg-white border border-orange-100">
                        <img src="/image_2281a3.png" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'} alt="Logo" className="h-full w-full object-contain" />
                    </div>
                    <span className="font-extrabold text-lg text-orange-900">Boss Drive In</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pt-20 md:pt-8 overflow-x-hidden flex flex-col">
                <div className="flex-grow">
                    <Outlet />
                </div>
                <footer className="bg-white/50 border-t border-orange-100 mt-12 py-8 rounded-xl">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-gray-500 text-sm">Annual SEO Report Generated for Boss Drive In</p>
                        <p className="text-gray-400 text-xs mt-2">© 2025 The ERROR's</p>
                    </div>
                </footer>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute right-0 top-0 bottom-0 bg-white h-full shadow-xl" onClick={e => e.stopPropagation()}>
                        <Sidebar className="flex h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
