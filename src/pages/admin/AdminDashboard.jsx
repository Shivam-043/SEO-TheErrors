import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save } from 'lucide-react';

// 1. Keyword Editor
const KeywordEditor = ({ localData, setLocalData }) => {
    const updateKeyword = (index, field, value) => {
        const newKeywords = [...localData.keywords];
        newKeywords[index] = { ...newKeywords[index], [field]: value };
        setLocalData({ ...localData, keywords: newKeywords });
    };

    const removeKeyword = (index) => {
        const newKeywords = localData.keywords.filter((_, i) => i !== index);
        setLocalData({ ...localData, keywords: newKeywords });
    };

    const addKeyword = () => {
        const newK = { term: 'new keyword', rank: 10, change: 0, vol: 100, intent: 'Informational' };
        setLocalData({ ...localData, keywords: [newK, ...localData.keywords] });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700">Manage Keywords ({localData.keywords.length})</h3>
                <button onClick={addKeyword} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-green-700">+ Add New</button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3 text-left">Term</th>
                            <th className="p-3 w-20">Rank</th>
                            <th className="p-3 w-20">Change</th>
                            <th className="p-3 w-24">Vol</th>
                            <th className="p-3 w-32">Intent</th>
                            <th className="p-3 w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {localData.keywords.map((k, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-2"><input type="text" value={k.term} onChange={(e) => updateKeyword(i, 'term', e.target.value)} className="w-full p-1 border rounded" /></td>
                                <td className="p-2"><input type="number" value={k.rank} onChange={(e) => updateKeyword(i, 'rank', parseInt(e.target.value))} className="w-full p-1 border rounded" /></td>
                                <td className="p-2"><input type="number" value={k.change} onChange={(e) => updateKeyword(i, 'change', parseInt(e.target.value))} className="w-full p-1 border rounded" /></td>
                                <td className="p-2"><input type="number" value={k.vol} onChange={(e) => updateKeyword(i, 'vol', parseInt(e.target.value))} className="w-full p-1 border rounded" /></td>
                                <td className="p-2">
                                    <select value={k.intent} onChange={(e) => updateKeyword(i, 'intent', e.target.value)} className="w-full p-1 border rounded">
                                        <option value="Transactional">Transactional</option>
                                        <option value="Informational">Informational</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Branded">Branded</option>
                                    </select>
                                </td>
                                <td className="p-2 text-center">
                                    <button onClick={() => removeKeyword(i)} className="text-red-500 hover:text-red-700 font-bold">×</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 2. Chart Component Editor (Generic)
const DatasetEditor = ({ localData, setLocalData, chartKey, datasetIndex = 0 }) => {
    const dataset = localData.chartData[chartKey].datasets[datasetIndex];
    const labels = localData.chartData[chartKey].labels;

    const handleDataChange = (idx, val) => {
        const newData = [...dataset.data];
        newData[idx] = parseFloat(val);
        const newChartData = { ...localData.chartData };
        newChartData[chartKey].datasets[datasetIndex].data = newData;
        setLocalData({ ...localData, chartData: newChartData });
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <h4 className="font-bold text-gray-800 mb-2 capitalize">{chartKey} - {dataset.label || 'Dataset'}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {labels.map((label, i) => (
                    <div key={i} className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1 truncate">{label}</label>
                        <input
                            type="number"
                            value={dataset.data[i]}
                            onChange={(e) => handleDataChange(i, e.target.value)}
                            className="p-1 border rounded text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Competitor Editor
const CompetitorEditor = ({ localData, setLocalData }) => {
    // Initialization if missing
    if (!localData.competitorData) {
        const initCompetitorData = () => {
            setLocalData({
                ...localData,
                competitorData: {
                    profiles: [{ name: 'My Business', type: 'YOU', authority: 30, reviews: 100, topKws: 5, color: 'orange' }],
                    radar: {
                        labels: ['Authority', 'Content Depth', 'Backlinks', 'Tech Health', 'Local Visibility'],
                        datasets: [{ label: 'My Business', data: [50, 50, 50, 50, 50], backgroundColor: 'rgba(234, 88, 12, 0.2)', borderColor: 'rgba(234, 88, 12, 1)' }]
                    },
                    rankings: {
                        labels: ['Keyword 1', 'Keyword 2'],
                        datasets: [{ label: 'My Business', data: [5, 10], backgroundColor: 'rgba(234, 88, 12, 0.8)' }]
                    },
                    marketShare: [{ name: 'My Business', value: 100, color: 'orange' }]
                }
            });
        };

        return (
            <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center">
                <p className="text-gray-500 mb-4">Competitor data validation check: <strong>Not Found</strong>. <br />This might be an older client profile.</p>
                <button onClick={initCompetitorData} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-orange-700">
                    Initialize Competitor Module
                </button>
            </div>
        );
    }

    const updateProfile = (index, field, value) => {
        const newProfiles = [...localData.competitorData.profiles];
        newProfiles[index] = { ...newProfiles[index], [field]: value };
        setLocalData({
            ...localData,
            competitorData: { ...localData.competitorData, profiles: newProfiles }
        });
    };

    // Simplified editing for Market Share (just values for now)
    const updateMarketShare = (index, value) => {
        const newShare = [...localData.competitorData.marketShare];
        newShare[index] = { ...newShare[index], value: parseFloat(value) };
        setLocalData({
            ...localData,
            competitorData: { ...localData.competitorData, marketShare: newShare }
        });
    };

    const addProfile = () => {
        const newProfile = { name: 'New Competitor', type: 'RIVAL', authority: 0, reviews: 0, topKws: 0, color: 'gray' };
        setLocalData({
            ...localData,
            competitorData: { ...localData.competitorData, profiles: [...localData.competitorData.profiles, newProfile] }
        });
    };

    const removeProfile = (index) => {
        const newProfiles = localData.competitorData.profiles.filter((_, i) => i !== index);
        setLocalData({
            ...localData,
            competitorData: { ...localData.competitorData, profiles: newProfiles }
        });
    };

    return (
        <div className="space-y-8">
            {/* Profiles */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Competitor Profiles</h3>
                    <button onClick={addProfile} className="bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-green-700 flex items-center gap-1">
                        + Add Competitor
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {localData.competitorData.profiles.map((p, i) => (
                        <div key={i} className="flex flex-wrap gap-4 items-end bg-gray-50 p-4 rounded-lg">
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs font-bold text-gray-500">Name</label>
                                <input type="text" value={p.name} onChange={(e) => updateProfile(i, 'name', e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="w-24">
                                <label className="text-xs font-bold text-gray-500">Authority</label>
                                <input type="number" value={p.authority} onChange={(e) => updateProfile(i, 'authority', parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="w-32">
                                <label className="text-xs font-bold text-gray-500">Reviews</label>
                                <input type="number" value={p.reviews} onChange={(e) => updateProfile(i, 'reviews', parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="w-24">
                                <label className="text-xs font-bold text-gray-500">Top KWs</label>
                                <input type="number" value={p.topKws} onChange={(e) => updateProfile(i, 'topKws', parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="pb-1">
                                <button onClick={() => removeProfile(i)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors" title="Remove Competitor">×</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Share */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Market Share (%)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {localData.competitorData.marketShare.map((share, i) => (
                        <div key={i}>
                            <label className="text-xs font-bold text-gray-500 block mb-1">{share.name}</label>
                            <input type="number" value={share.value} onChange={(e) => updateMarketShare(i, e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Radar Data JSON Fallback for now (simplest for complex nested structures) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Advanced Chart Data (JSON)</h3>
                <p className="text-xs text-gray-500 mb-4">Edit Radar and Ranking datasets directly.</p>
                <textarea
                    className="w-full h-48 p-4 font-mono text-xs bg-gray-50 border rounded-lg"
                    value={JSON.stringify({ radar: localData.competitorData.radar, rankings: localData.competitorData.rankings }, null, 2)}
                    onChange={(e) => {
                        try {
                            const parsed = JSON.parse(e.target.value);
                            setLocalData({
                                ...localData,
                                competitorData: {
                                    ...localData.competitorData,
                                    radar: parsed.radar,
                                    rankings: parsed.rankings
                                }
                            });
                        } catch (err) { }
                    }}
                />
            </div>
        </div>
    );
};

// 4. Client Profile Editor
const ProfileEditor = ({ activeClient, updateClientProfile }) => {
    const [name, setName] = useState(activeClient?.name || '');
    // Assuming 'logo' is a field in the client document. If not, we start fresh.
    const [logo, setLogo] = useState(activeClient?.logo || '');
    const [status, setStatus] = useState('');

    const handleSave = async () => {
        if (!activeClient) return;
        try {
            setStatus('Saving...');
            await updateClientProfile(activeClient.id, { name, logo });
            setStatus('Profile updated successfully!');
            setTimeout(() => setStatus(''), 3000);
        } catch (e) {
            setStatus('Error updating profile.');
            console.error(e);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Client Profile Settings</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Client Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g. Boss Drive In"
                    />
                    <p className="text-xs text-gray-400 mt-1">This name is displayed in the sidebar and reports.</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Logo URL</label>
                    <input
                        type="text"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="https://example.com/logo.png"
                    />
                    <p className="text-xs text-gray-400 mt-1">Direct link to the logo image file (PNG/JPG).</p>
                </div>

                {logo && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-center">
                        <img src={logo} alt="Logo Preview" className="h-16 object-contain" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                )}

                <div className="pt-4 flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Save size={18} /> Update Profile
                    </button>
                    {status && <span className={`text-sm font-bold ${status.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>{status}</span>}
                </div>
            </div>
        </div>
    );
};

const DEFAULT_KEYWORDS = [
    { id: 'burgers', label: '"Best Burgers"', rank: 'Avg #3' },
    { id: 'lunch', label: '"Lunch Spot"', rank: 'Avg #5' },
    { id: 'takeout', label: '"Takeout"', rank: 'Avg #1' }
];

// 5. Geo Grid Settings
const GeoGridSettings = ({ activeClient, updateClientProfile }) => {
    // Initialize with existing keywords or deep copy of defaults
    // Note: If activeClient is null/undefined, handle gracefully
    if (!activeClient) return <div className="p-4">Please select a client to edit Geo Grid settings.</div>;

    const [latitude, setLatitude] = useState(activeClient.latitude || '');
    const [longitude, setLongitude] = useState(activeClient.longitude || '');

    // Deep copy to ensure we don't mutate state directly before saving
    const [keywords, setKeywords] = useState(
        activeClient.geoKeywords || JSON.parse(JSON.stringify(DEFAULT_KEYWORDS))
    );

    const [status, setStatus] = useState('');

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...keywords];
        newKeywords[index].label = value;
        setKeywords(newKeywords);
    };

    const handleSave = async () => {
        try {
            setStatus('Saving...');
            await updateClientProfile(activeClient.id, {
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                geoKeywords: keywords
            });
            setStatus('Settings saved successfully!');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error(error);
            setStatus('Error saving settings.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Geo Grid Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Coordinates Section */}
                <div>
                    <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        Map Center Coordinates
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Latitude</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="33.3000"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Longitude</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="-111.8000"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            Used to center the Local SEO rankings map.
                            <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-orange-600 hover:underline ml-1">Find on Maps</a>
                        </p>
                    </div>
                </div>

                {/* Keywords Section */}
                <div>
                    <h4 className="font-bold text-gray-700 mb-4">Keyword Labels</h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        {keywords.map((k, idx) => (
                            <div key={k.id}>
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                    Keyword (ID: {k.id})
                                </label>
                                <input
                                    type="text"
                                    value={k.label}
                                    onChange={(e) => handleKeywordChange(idx, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm bg-white"
                                    placeholder="Display Label"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                {status && <span className={`text-sm font-bold ${status.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>{status}</span>}
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                    <Save size={18} /> Save Grid Settings
                </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-2">Advanced Data (JSON)</h4>
                <p className="text-xs text-gray-500 mb-2">Directly edit the ranking matrix numbers here.</p>
                <textarea
                    className="w-full h-32 p-4 font-mono text-xs bg-gray-50 border rounded-lg focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    value={activeClient?.seoData?.geoData ? JSON.stringify(activeClient.seoData.geoData, null, 2) : "No geo data found."}
                    readOnly
                    placeholder="To edit matrix data, please implement full editing logic or use the mock data fallback for now."
                />
                <p className="text-xs text-gray-400 mt-2 italic">Note: The matrix data is currently read-only in this view.</p>
            </div>
        </div>
    );
};

// Main Component
const AdminDashboard = () => {
    const { data, updateData, activeClient, updateClientProfile } = useData();
    const [localData, setLocalData] = useState(data ? JSON.parse(JSON.stringify(data)) : null);
    const [activeTab, setActiveTab] = useState('keywords');
    const [saveStatus, setSaveStatus] = useState('');

    if (!localData) return <div className="p-8">Loading...</div>;

    const handleSave = () => {
        updateData(localData);
        setSaveStatus('Saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Edit content, update chart data, and manage keywords.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95"
                >
                    <Save size={20} /> Save All Changes
                </button>
            </div>

            {saveStatus && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> {saveStatus}</span>
                </div>
            )}

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full overflow-x-auto">
                {['keywords', 'charts', 'competitors', 'geo', 'profile'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-bold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab === 'geo' ? 'Geo Grid' : tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'keywords' && <KeywordEditor localData={localData} setLocalData={setLocalData} />}

                {activeTab === 'charts' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Edit Chart Datasets</h3>
                        <DatasetEditor localData={localData} setLocalData={setLocalData} chartKey="traffic" />
                        <DatasetEditor localData={localData} setLocalData={setLocalData} chartKey="ctr" />
                        <DatasetEditor localData={localData} setLocalData={setLocalData} chartKey="totalClicks" />
                        <DatasetEditor localData={localData} setLocalData={setLocalData} chartKey="conversionRate" />
                        <p className="text-sm text-gray-400 italic">Note: For multi-dataset charts (e.g. Local Actions), only primary editor is shown for simplicity in this demo.</p>
                    </div>
                )}

                {activeTab === 'competitors' && <CompetitorEditor localData={localData} setLocalData={setLocalData} />}

                {activeTab === 'geo' && <GeoGridSettings activeClient={activeClient} updateClientProfile={updateClientProfile} />}

                {activeTab === 'profile' && <ProfileEditor activeClient={activeClient} updateClientProfile={updateClientProfile} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
