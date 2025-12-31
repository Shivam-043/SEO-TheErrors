import React from 'react';
import { RadarChart, BarChart } from '../../components/charts/Charts';
import { useData } from '../../context/DataContext';

const Competitors = () => {
    const { data, loading } = useData();

    if (loading || !data || !data.competitorData) return <div className="p-8 text-center text-gray-500">Loading competitor data...</div>;

    const { profiles, radar, rankings, marketShare } = data.competitorData;

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: { display: false },
                grid: { color: '#f3f4f6' },
                pointLabels: {
                    font: { size: 12, weight: 'bold' },
                    color: '#4b5563'
                }
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                reverse: true, // Lower rank is better (higher visually)
                beginAtZero: false,
                min: 1,
                grid: { color: '#f3f4f6' },
                title: { display: true, text: 'Rank Position (Lower is Better)' }
            },
            x: {
                grid: { display: false }
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    };

    // Calculate market leader for display
    const marketLeader = marketShare && marketShare.length > 0 ? marketShare.reduce((prev, current) => (prev.value > current.value) ? prev : current) : null;
    const clientShare = marketShare ? marketShare.find(m => m.name === 'Boss Drive In') : null; // You might want to make this dynamic to client name

    return (
        <section id="view-competitors" className="view-section animate-fade-in block">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-2">⚔️ Competitor Landscape Analysis</h2>
                <p className="text-gray-700">A direct head-to-head comparison against key local rivals. We analyze market share, digital authority, and ranking dominance.</p>
            </div>

            {/* Competitor Snapshot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {profiles && profiles.map((profile, idx) => (
                    <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${profile.color === 'orange' ? 'border-orange-600' : profile.color === 'blue' ? 'border-blue-400' : 'border-gray-400'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-gray-800">{profile.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded font-bold ${profile.type === 'YOU' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-500'}`}>{profile.type}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p className="flex justify-between py-1 border-b border-gray-50"><span>Authority:</span> <span className="font-bold text-gray-900">{profile.authority}</span></p>
                            <p className="flex justify-between py-1 border-b border-gray-50"><span>Reviews:</span> <span className="font-bold text-gray-900">{profile.reviews.toLocaleString()}</span></p>
                            <p className="flex justify-between py-1"><span>Top 3 KWs:</span> <span className="font-bold text-green-600">{profile.topKws}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Radar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Power Comparison</h3>
                    <p className="text-sm text-gray-500 mb-6">Visualizing strengths across 5 key SEO pillars. Wider shape = Better Performance.</p>
                    <div className="h-80 w-full">
                        {radar && <RadarChart data={radar} options={radarOptions} />}
                    </div>
                </div>

                {/* Ranking Battle Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Head-to-Head Ranking Battle</h3>
                    <p className="text-sm text-gray-500 mb-6">Ranking position for top money keywords. <span className="font-bold text-green-600">Lower is better (#1 is top).</span></p>
                    <div className="h-80 w-full">
                        {rankings && <BarChart data={rankings} options={barOptions} />}
                    </div>
                </div>
            </div>

            {/* Market Share */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Local "Share of Voice" (Washington DC)</h3>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            {clientShare && (
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                                    {clientShare.name} ({clientShare.value}%)
                                </span>
                            )}
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-orange-600">
                                {marketLeader && marketLeader.name === clientShare?.name ? 'Market Leader' : 'Challenger'}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        {marketShare && marketShare.map((share, idx) => (
                            <div
                                key={idx}
                                style={{ width: `${share.value}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${share.color === 'orange' ? 'bg-orange-500' : share.color === 'blue' ? 'bg-blue-500' : share.color === 'gray-200' ? 'bg-gray-200' : 'bg-gray-400'}`}
                            ></div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        {marketShare && marketShare.map((share, idx) => (
                            <span key={idx} className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${share.color === 'orange' ? 'bg-orange-500' : share.color === 'blue' ? 'bg-blue-500' : share.color === 'gray-200' ? 'bg-gray-200' : 'bg-gray-400'}`}></span>
                                {share.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Competitors;
