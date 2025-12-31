
import { useData } from '../../context/DataContext';
import { LineChart } from '../../components/charts/Charts';
import { TrendingUp, MapPin, Phone, Trophy } from 'lucide-react';

const KPICard = ({ label, value, icon: Icon, trend, trendLabel, color }) => {
    const colorClasses = {
        green: 'border-l-green-500',
        orange: 'border-l-orange-500',
        blue: 'border-l-blue-500',
        purple: 'border-l-purple-500'
    };

    return (
        <div className={`stat-card bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorClasses[color]}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
                </div>
                <span className="text-2xl text-gray-400"><Icon size={28} /></span>
            </div>
            <p className="mt-4 text-sm text-green-600 font-semibold">{trendLabel}</p>
        </div>
    );
};

const ExecutiveSummary = () => {
    const { data, loading } = useData();

    if (loading || !data) return <div className="p-8 text-center text-gray-500">Loading data...</div>;

    const trafficOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
            x: { grid: { display: false } }
        }
    };

    return (
        <section className="animate-fade-in block space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-orange-900 mb-4">Annual SEO Review: Year 1</h1>
                <p className="text-lg text-orange-700 max-w-3xl mx-auto">
                    An in-depth analysis of <span className="font-bold">Boss Drive In's</span> digital growth, focusing on local dominance in Washington, organic traffic acquisition, and customer conversions.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <KPICard
                    label="Total Organic Visits"
                    value="14,502"
                    icon={TrendingUp}
                    trend="up"
                    trendLabel="▲ 145% YoY Growth"
                    color="green"
                />
                <KPICard
                    label="Direction Requests"
                    value="3,240"
                    icon={MapPin}
                    trend="up"
                    trendLabel="▲ 82% vs Previous Year"
                    color="orange"
                />
                <KPICard
                    label="Phone Calls (GBP)"
                    value="1,892"
                    icon={Phone}
                    trend="up"
                    trendLabel="▲ 65% vs Previous Year"
                    color="blue"
                />
                <KPICard
                    label="Keywords in Top 10"
                    value="42"
                    icon={Trophy}
                    trend="up"
                    trendLabel="+28 New Top Rankings"
                    color="purple"
                />
            </div>

            {/* Main Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-12">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Organic Traffic Growth Journey</h2>
                <p className="text-sm text-gray-500 mb-6">Visualizing the steady climb in monthly visitors from search engines over the last 12 months.</p>
                <div className="h-96 w-full">
                    <LineChart data={data.chartData.traffic} options={trafficOptions} />
                </div>
            </div>
        </section>
    );
};

export default ExecutiveSummary;
