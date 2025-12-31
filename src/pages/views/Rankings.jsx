
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { LineChart } from '../../components/charts/Charts';

const Rankings = () => {
    const { data, loading } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, top3, improved

    if (loading || !data) return <div>Loading...</div>;

    const ctrOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => c.parsed.y + '% CTR' } }
        },
        scales: {
            y: {
                beginAtZero: false, min: 1,
                grid: { borderDash: [5, 5] },
                ticks: { callback: (v) => v + '%' }
            },
            x: { grid: { display: false } }
        }
    };

    const filteredKeywords = data.keywords.filter(k => {
        const matchesText = k.term.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesCategory = true;
        if (filter === 'top3') matchesCategory = k.rank <= 3;
        if (filter === 'improved') matchesCategory = k.change > 0;
        return matchesText && matchesCategory;
    });

    return (
        <section className="animate-fade-in block space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-2">Keyword Rankings & Performance</h2>
                <p className="text-gray-700">Tracking <strong>transactional intent</strong> and how often users click through to your menu.</p>
            </div>

            {/* CTR Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Click-Through Rate (CTR) Improvement</h3>
                        <p className="text-sm text-gray-500">As rankings improved, the percentage of people clicking your link increased.</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Avg CTR: 3.2%
                    </div>
                </div>
                <LineChart data={data.chartData.ctr} options={ctrOptions} />
            </div>

            {/* Interactive Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="🔍 Search keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div className="flex space-x-2">
                    {['all', 'top3', 'improved'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${filter === f
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f === 'all' ? 'All' : f === 'top3' ? 'Top 3' : 'Improved'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-orange-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Keyword</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Current Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Change (12mo)</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Volume</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-orange-800 uppercase tracking-wider">Intent</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredKeywords.map((item, idx) => {
                                const changeColor = item.change > 0 ? 'text-green-600' : (item.change < 0 ? 'text-red-600' : 'text-gray-500');
                                const changeIcon = item.change > 0 ? '▲' : (item.change < 0 ? '▼' : '-');
                                const changeText = item.change !== 0 ? Math.abs(item.change) : '-';

                                return (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.term}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">#{item.rank}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${changeColor}`}>{changeIcon} {changeText}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vol}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">{item.intent}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredKeywords.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No keywords found matching criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Rankings;
