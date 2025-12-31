
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock } from 'lucide-react';
import SeedAdmin from '../components/SeedAdmin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard/overview';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAuthenticating(true);
        setError('');

        try {
            await login(username, password);
            // With Firebase AuthContext, the onAuthStateChanged listener usually handles state updates.
            // We can check user role here if we wanted specific redirects, 
            // but basically we just want to go to the dashboard/admin logic.
            // The context might take a split second to update 'user', 
            // but if await login() succeeds, we are authed.
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Invalid credentials. Try admin / boss');
            setIsAuthenticating(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 relative">

                {/* Header */}
                <div className="bg-orange-600 p-8 text-center">
                    <div className="mx-auto bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">The ERROR's</h1>
                    <p className="text-orange-100 text-sm mt-1">Client Reporting Portal</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-700">Access Your Annual Report</h2>
                        <p className="text-xs text-gray-500 mt-1">Secure login for Boss Drive In Management</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username (Email)</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs text-center font-bold bg-red-50 p-2 rounded animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isAuthenticating}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isAuthenticating ? (
                                <span>Authenticating...</span>
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            <Lock size={12} /> Restricted Access • Encrypted Connection
                        </p>
                    </div>

                    <SeedAdmin />
                </div>

                {/* Loading Overlay */}
                {isAuthenticating && !error && (
                    <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-50 animate-fade-in">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-bold text-gray-600">Connecting to Search Console...</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Login;
