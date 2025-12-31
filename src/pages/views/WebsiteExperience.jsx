import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Edit, Save, X, ExternalLink, Globe } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const WebsiteExperience = () => {
    const { data, updateData } = useData();
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    if (!data) return <div className="p-8 text-center text-gray-500">Loading website data...</div>;

    // Fallback if data is missing
    const experience = data.websiteExperience || {
        seoScore: 0,
        mobileLoadTime: 'N/A',
        lcp: 'N/A',
        cls: 0,
        websiteUrl: ''
    };

    const handleEdit = () => {
        setFormData({ ...experience });
        setIsEditing(true);
    };

    const handleSave = async () => {
        const newData = {
            ...data,
            websiteExperience: {
                ...formData,
                seoScore: Number(formData.seoScore), // Ensure number
                cls: Number(formData.cls) // Ensure number
            }
        };
        await updateData(newData);
        setIsEditing(false);
    };

    const chartData = {
        labels: ['Score', 'Remaining'],
        datasets: [{
            data: [experience.seoScore, 100 - experience.seoScore],
            backgroundColor: ['#16a34a', '#e5e7eb'], // green-600, gray-200
            borderWidth: 0,
            cutout: '80%',
            circumference: 360,
            rotation: 0
        }]
    };

    const chartOptions = {
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    // Determine score label
    let scoreLabel = 'Poor';
    if (experience.seoScore >= 90) scoreLabel = 'Excellent';
    else if (experience.seoScore >= 70) scoreLabel = 'Good';
    else if (experience.seoScore >= 50) scoreLabel = 'Average';

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in relative z-10 w-full max-w-4xl mx-auto mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Website Experience Data</h2>
                    <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Overall SEO Score (0-100)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={formData.seoScore}
                                onChange={(e) => setFormData({ ...formData, seoScore: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Load Time (e.g., "1.8s")</label>
                            <input
                                type="text"
                                value={formData.mobileLoadTime}
                                onChange={(e) => setFormData({ ...formData, mobileLoadTime: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Largest Contentful Paint (e.g., "1.2s")</label>
                            <input
                                type="text"
                                value={formData.lcp}
                                onChange={(e) => setFormData({ ...formData, lcp: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Cumulative Layout Shift (e.g., 0.02)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.cls}
                                onChange={(e) => setFormData({ ...formData, cls: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Website URL</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <Globe size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={formData.websiteUrl}
                                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="https://example.com"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Enter the full URL (including https://). The live website will be loaded in the device frames below.
                                <br /> <span className="text-orange-600 font-bold">Note:</span> Some websites may block embedding (X-Frame-Options).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="view-website" className="view-section animate-fade-in w-full max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-orange-900 mb-2">Website Performance & UX Audit</h2>
                    <p className="text-gray-700">Analyzing the technical foundation and user experience of your digital storefront across all devices.</p>
                </div>
                {user?.role === 'admin' && (
                    <button onClick={handleEdit} className="flex items-center gap-2 text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg font-bold transition-colors">
                        <Edit size={18} /> Edit Data
                    </button>
                )}
            </div>

            {/* Main SEO Strength Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-12 border-t-4 border-green-500">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">Overall SEO Health Score</h3>
                        <p className="text-gray-500 mt-2 max-w-md">Calculated based on site speed, mobile responsiveness, SSL security, and content structure.</p>
                    </div>
                    <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
                        {/* Donut Chart for SEO Score */}
                        <div className="w-full h-full">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-4xl font-extrabold text-green-600">{experience.seoScore}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{scoreLabel}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Speed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-700">Mobile Load Time</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Fast</span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900">{experience.mobileLoadTime}</p>
                    <p className="text-xs text-gray-500 mt-1">Target: &lt; 2.5s</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-700">Largest Contentful Paint</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Good</span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900">{experience.lcp}</p>
                    <p className="text-xs text-gray-500 mt-1">Main banner load speed</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-700">Cumulative Layout Shift</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Stable</span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900">{experience.cls}</p>
                    <p className="text-xs text-gray-500 mt-1">Visual stability score</p>
                </div>
            </div>

            {/* Device Previews */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Cross-Device Live Preview</h3>
                    {experience.websiteUrl && (
                        <a
                            href={experience.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-orange-600 transition-colors"
                            title="Open Website"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>

                {!experience.websiteUrl ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No website URL configured. Please edit settings to add a URL.</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-end justify-center gap-8">
                        {/* Laptop Mockup */}
                        <div className="w-full lg:w-2/3">
                            <div className="mockup-laptop relative mx-auto" style={{ maxWidth: '800px' }}>
                                {/* Stylized Laptop Frame */}
                                <div className="bg-gray-800 rounded-t-xl p-2 pb-0 mx-auto" style={{ width: '90%' }}>
                                    <div className="bg-white rounded-t-lg overflow-hidden border-4 border-gray-800 border-b-0 relative pt-[56.25%]"> {/* 16:9 Aspect Ratio Container */}
                                        <div className='absolute inset-0 bg-white'>
                                            <iframe
                                                src={experience.websiteUrl}
                                                className="w-full h-full border-0"
                                                title="Desktop Preview"
                                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700 h-4 rounded-b-xl mx-auto relative z-10" style={{ width: '100%' }}></div> {/* Base */}
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-4">Desktop View</p>
                        </div>

                        {/* Mobile Mockup */}
                        <div className="w-full lg:w-1/3">
                            <div className="mockup-mobile relative mx-auto" style={{ maxWidth: '300px' }}>
                                <div className="bg-gray-800 rounded-[2.5rem] p-3 border-4 border-gray-700 shadow-xl">
                                    <div className="bg-white rounded-[2rem] overflow-hidden relative pt-[216%]"> {/* Approx iPhone Aspect Ratio */}
                                        <div className='absolute inset-0 bg-white'>
                                            <iframe
                                                src={experience.websiteUrl}
                                                className="w-full h-full border-0"
                                                title="Mobile Preview"
                                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-4">Mobile View</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WebsiteExperience;
