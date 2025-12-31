
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, DollarSign, Trophy, Wrench, LogOut, Settings, Users, Monitor, Swords } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const navItems = [
    { path: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/local-seo', label: 'Local SEO', icon: MapPin },
    { path: '/dashboard/competitors', label: 'Competitors', icon: Swords },
    { path: '/dashboard/website-experience', label: 'Website Experience', icon: Monitor },
    { path: '/dashboard/conversions', label: 'Conversions', icon: DollarSign },
    { path: '/dashboard/rankings', label: 'Rankings', icon: Trophy },
    { path: '/dashboard/technical', label: 'Technical', icon: Wrench },
];

const Sidebar = ({ className = "hidden md:flex" }) => {
    const { logout, user } = useAuth();
    const { clients, activeClient, selectClient } = useData();
    const isAdmin = user?.role === 'admin';

    // Helper: Determine logo text based on active client or default
    const clientName = activeClient ? activeClient.name.split('(')[0] : "Boss Drive In";

    return (
        <aside className={`${className} flex-col w-64 bg-white border-r border-orange-100 min-h-screen sticky top-0 h-screen z-40`}>
            <div className="p-6 border-b border-orange-50 bg-orange-50/50">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-md bg-white border border-orange-100 shadow-sm">
                        <img
                            src={activeClient?.logo || "/image_2281a3.png"}
                            onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'}
                            alt="Logo"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div>
                        <span className="block font-extrabold text-lg text-orange-900 leading-tight truncate max-w-[140px]">{clientName}</span>
                        <span className="block text-[10px] text-orange-600 font-bold tracking-wider">SEO PORTAL</span>
                    </div>
                </div>
            </div>

            {/* Admin-Only: Client Switcher / Banner */}
            {isAdmin && activeClient && (
                <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Active Client</p>
                            <p className="text-xs font-bold text-orange-900 truncate max-w-[140px]">{activeClient.name}</p>
                        </div>
                        <NavLink to="/admin/clients" className="text-orange-500 hover:text-orange-700 p-1" title="Switch Client">
                            <Users size={16} />
                        </NavLink>
                    </div>
                </div>
            )}

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                                ? 'bg-orange-600 text-white shadow-md shadow-orange-200 translate-x-1'
                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                            }
            `}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </NavLink>
                ))}

                {/* Admin-Only Links */}
                {isAdmin && (
                    <>
                        <NavLink
                            to="/dashboard/admin"
                            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mt-4 border-t border-orange-50 pt-4
              ${isActive
                                    ? 'bg-orange-600 text-white shadow-md shadow-orange-200 translate-x-1'
                                    : 'text-orange-800 hover:bg-orange-100 hover:text-orange-900'
                                }
            `}
                        >
                            <Settings size={18} />
                            Admin Settings
                        </NavLink>

                        <NavLink
                            to="/admin/clients"
                            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                                    ? 'bg-orange-600 text-white shadow-md shadow-orange-200 translate-x-1'
                                    : 'text-orange-800 hover:bg-orange-100 hover:text-orange-900'
                                }
            `}
                        >
                            <Users size={18} />
                            Client Manager
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="p-4 border-t border-orange-50">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
