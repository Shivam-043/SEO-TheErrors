
import { useData } from '../../context/DataContext';
import { BarChart, LineChart } from '../../components/charts/Charts';
import { MousePointer, Target } from 'lucide-react';

const Conversions = () => {
    const { data, loading } = useData();

    if (loading || !data) return <div>Loading...</div>;

    // KPI Cards Specific to this page
    const kpiCards = [
        {
            title: "Total Annual Clicks",
            value: "42,590",
            change: "▲ 64%",
            sub: "Verified GSC Data",
            borderColor: "border-l-orange-500",
            textColor: "text-green-600"
        },
        {
            title: "Avg. Conversion Rate",
            value: "4.8%",
            change: "▲ 1.2%",
            sub: "Goal: Calls, Directions, Orders",
            borderColor: "border-l-green-600",
            textColor: "text-green-600"
        }
    ];

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
            x: { grid: { display: false } }
        }
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: { label: (c) => c.parsed.y + '% Converted' }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 2, max: 6,
                grid: { borderDash: [5, 5] },
                ticks: { callback: (v) => v + '%' }
            },
            x: { grid: { display: false } }
        }
    };

    return (
        <section className="animate-fade-in block space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-2">Acquisition & Conversion Intelligence</h2>
                <p className="text-gray-700">Detailed analysis of traffic volume (Clicks) and how effectively we are turning those visitors into customers (Conversion Rate).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {kpiCards.map((card, i) => (
                    <div key={i} className={`p-6 bg-white rounded-xl shadow-sm border-l-4 ${card.borderColor}`}>
                        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{card.title}</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-4xl font-extrabold text-gray-900">{card.value}</span>
                            <span className={`ml-2 text-sm font-medium ${card.textColor}`}>{card.change}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Total Clicks Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Total Clicks Over Time (Google Search)</h3>
                <p className="text-sm text-gray-500 mb-6">The raw number of users who clicked your listing on Google Search and Maps.</p>
                <BarChart data={data.chartData.totalClicks} options={barOptions} />
            </div>

            {/* Conversion Rate Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">User Conversion Rate Trend</h3>
                <p className="text-sm text-gray-500 mb-6">Percentage of visitors who completed a key action (Call, Direction, Menu View) after visiting.</p>
                <LineChart data={data.chartData.conversionRate} options={lineOptions} />
            </div>

            {/* Business Impact Note */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="font-bold text-green-900 mb-2">💡 Business Impact Analysis</h4>
                <p className="text-sm text-green-800">
                    The increase in <strong>Conversion Rate</strong> from 3.6% to 4.8% in Q4 correlates directly with the "Lunch Special" page optimization. This 1.2% lift generated an estimated <strong>450 additional covers</strong> in Q4 alone.
                </p>
            </div>
        </section>
    );
};

export default Conversions;
