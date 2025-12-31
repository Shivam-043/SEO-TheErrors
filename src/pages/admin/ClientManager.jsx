
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, LogOut, Briefcase, ExternalLink, Users, Edit2, X, Save } from 'lucide-react';

const EditClientModal = ({ client, onClose }) => {
    const { updateClientProfile } = useData();

    // We only keep Name editing here. Lat/Lng and Keywords moved to AdminDashboard > Geo Grid.
    const [name, setName] = useState(client.name);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateClientProfile(client.id, { name });
            onClose();
        } catch (error) {
            console.error("Failed to update client", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
                    <h3 className="font-bold text-lg text-gray-800">Edit Client Profile</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            required
                        />
                    </div>

                    <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                        To edit <strong>coordinates</strong> and <strong>keywords</strong>, please use the <strong>Geo Grid</strong> settings in the Client Dashboard.
                    </p>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ClientManager = () => {
    const { clients, addClient, removeClient, selectClient } = useData();
    const [newClientName, setNewClientName] = useState('');
    const [newClientEmail, setNewClientEmail] = useState('');
    const [editingClient, setEditingClient] = useState(null);
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        if (!newClientName.trim() || !newClientEmail.trim()) return;

        addClient(newClientName, newClientEmail);

        setNewClientName('');
        setNewClientEmail('');
    };

    const handleSelect = (id) => {
        selectClient(id);
        navigate('/dashboard/overview');
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete client "${name}"? This cannot be undone.`)) {
            removeClient(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            <Users className="text-orange-600" size={32} />
                            Agency Client Manager
                        </h1>
                        <p className="text-gray-500 mt-1">Manage your client roster and access their individual SEO dashboards.</p>
                    </div>

                    <form onSubmit={handleCreate} className="flex gap-2 w-full md:w-auto items-end">
                        <div>
                            <input
                                type="text"
                                placeholder="Client Name"
                                value={newClientName}
                                onChange={(e) => setNewClientName(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-48"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Auth Email"
                                value={newClientEmail}
                                onChange={(e) => setNewClientEmail(e.target.value)}
                                className="px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-64"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-r-lg font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
                        >
                            <Plus size={18} /> Add
                        </button>
                    </form>
                </div>

                {/* Client Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                                        <Briefcase size={24} />
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setEditingClient(client)}
                                            className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
                                            title="Edit Client"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(client.id, client.name)}
                                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                                            title="Delete Client"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h3>
                                <p className="text-xs text-mono text-gray-400 mb-4 truncate">{client.email}</p>

                                {client.latitude && client.longitude && (
                                    <div className="mb-4 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 inline-block">
                                        📍 {client.latitude.toFixed(4)}, {client.longitude.toFixed(4)}
                                    </div>
                                )}

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Keywords Tracked:</span>
                                        <span className="font-bold">{client.seoData?.keywords?.length || 0}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleSelect(client.id)}
                                    className="w-full bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600 text-gray-700 font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    Manage SEO <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {clients.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                            <p>No clients found. Add one above to get started.</p>
                        </div>
                    )}
                </div>

                {editingClient && (
                    <EditClientModal
                        client={editingClient}
                        onClose={() => setEditingClient(null)}
                    />
                )}

            </div>
        </div>
    );
};

export default ClientManager;
